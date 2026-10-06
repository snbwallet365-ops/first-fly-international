-- First Fly International | multi-user Supabase core
-- Apply with: supabase db push
create extension if not exists pgcrypto;

do $$ begin create type public.app_role as enum ('admin','agent'); exception when duplicate_object then null; end $$;
do $$ begin create type public.applicant_stage as enum ('drafted','submitted','embassy_processed','decision'); exception when duplicate_object then null; end $$;
do $$ begin create type public.approval_status as enum ('pending','approved','needs_correction'); exception when duplicate_object then null; end $$;
do $$ begin create type public.content_status as enum ('draft','published','archived'); exception when duplicate_object then null; end $$;

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);
insert into public.workspaces(id,name,slug) values ('00000000-0000-4000-8000-000000000001','First Fly International','first-fly-international') on conflict (slug) do nothing;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id),
  full_name text not null default 'Team member',
  email text not null,
  role public.app_role not null default 'agent',
  avatar_url text,
  active boolean not null default true,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id,email)
);

create or replace function public.current_workspace_id() returns uuid
language sql stable security definer set search_path = public
as $$ select workspace_id from public.profiles where id = auth.uid() and active = true limit 1 $$;

create or replace function public.is_workspace_admin(target_workspace uuid default public.current_workspace_id()) returns boolean
language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and active = true and role = 'admin' and workspace_id = target_workspace) $$;

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end $$;

create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) default '00000000-0000-4000-8000-000000000001',
  slug text not null,
  name text not null,
  name_bn text not null,
  flag_emoji text not null default '🌐',
  region text,
  official_url text,
  short_note text,
  sort_order integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id,slug)
);

create table if not exists public.visa_categories (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) default '00000000-0000-4000-8000-000000000001',
  slug text not null,
  name text not null,
  name_bn text not null,
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  unique(workspace_id,slug)
);

create table if not exists public.country_checklists (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  country_id uuid not null references public.countries(id) on delete cascade,
  visa_category_id uuid not null references public.visa_categories(id) on delete cascade,
  required_documents jsonb not null default '[]'::jsonb check (jsonb_typeof(required_documents) = 'array'),
  source_url text,
  checked_at date,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now(),
  unique(country_id,visa_category_id)
);

create table if not exists public.visa_updates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  country_id uuid references public.countries(id) on delete set null,
  title text not null,
  title_bn text not null,
  body text not null default '',
  body_bn text not null default '',
  category text not null default 'notice',
  source_label text,
  source_url text,
  status public.content_status not null default 'draft',
  created_by uuid not null references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  country_id uuid references public.countries(id) on delete set null,
  category text not null default 'insight',
  slug text not null,
  title text not null,
  title_bn text not null,
  excerpt_bn text not null default '',
  content_markdown text not null default '',
  cover_image_path text,
  status public.content_status not null default 'draft',
  author_id uuid not null references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id,slug)
);

create table if not exists public.applicants (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  reference text not null,
  assigned_agent_id uuid not null references public.profiles(id),
  created_by uuid not null references public.profiles(id),
  full_name text not null,
  passport_number text not null,
  date_of_birth date,
  passport_expiry date not null,
  phone text,
  email text,
  occupation text,
  country_id uuid not null references public.countries(id),
  visa_category_id uuid not null references public.visa_categories(id),
  travel_start date,
  travel_end date,
  stage public.applicant_stage not null default 'drafted',
  notes text not null default '',
  consent_recorded_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id,reference),
  check (travel_end is null or travel_start is null or travel_end >= travel_start)
);

create or replace function public.can_access_applicant(target_applicant uuid) returns boolean
language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.applicants a where a.id = target_applicant and a.workspace_id = public.current_workspace_id() and (a.assigned_agent_id = auth.uid() or public.is_workspace_admin(a.workspace_id))) $$;

create table if not exists public.applicant_documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  applicant_id uuid not null references public.applicants(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  mime_type text not null,
  byte_size bigint not null check(byte_size >= 0),
  category text not null default 'other',
  extraction_status text not null default 'not_started' check(extraction_status in ('not_started','processing','complete','failed','reviewed')),
  uploaded_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  unique(storage_path)
);

create table if not exists public.ai_extracted_data (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  applicant_id uuid not null references public.applicants(id) on delete cascade,
  document_id uuid not null references public.applicant_documents(id) on delete cascade,
  provider text not null,
  model text not null,
  extracted_json jsonb not null default '{}'::jsonb,
  confidence numeric(4,3) check(confidence between 0 and 1),
  warnings jsonb not null default '[]'::jsonb,
  review_status text not null default 'needs_review' check(review_status in ('needs_review','accepted','rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.generated_reports (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  applicant_id uuid not null references public.applicants(id) on delete cascade,
  report_type text not null default 'a4_summary',
  storage_path text,
  report_snapshot jsonb not null default '{}'::jsonb,
  generated_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  applicant_id uuid not null references public.applicants(id) on delete cascade,
  requested_by uuid not null references public.profiles(id),
  status public.approval_status not null default 'pending',
  agent_note text not null default '',
  feedback text not null default '',
  reviewed_by uuid references public.profiles(id),
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists approval_requests_workspace_status_idx on public.approval_requests(workspace_id,status,requested_at desc);
create unique index if not exists one_pending_approval_per_applicant on public.approval_requests(applicant_id) where status='pending';

create or replace function public.protect_approval_identity() returns trigger
language plpgsql security definer set search_path = public
as $$ begin
  if new.workspace_id is distinct from old.workspace_id or new.applicant_id is distinct from old.applicant_id or new.requested_by is distinct from old.requested_by or new.requested_at is distinct from old.requested_at then
    raise exception 'Approval request identity fields cannot be changed.' using errcode='42501';
  end if;
  return new;
end $$;
drop trigger if exists approval_identity_guard on public.approval_requests;
create trigger approval_identity_guard before update on public.approval_requests for each row execute procedure public.protect_approval_identity();

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null default '',
  kind text not null default 'general',
  entity_type text,
  entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_unread_idx on public.notifications(user_id,created_at desc) where read_at is null;

create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  conversation_type text not null default 'team' check(conversation_type in ('team','applicant')),
  applicant_id uuid references public.applicants(id) on delete cascade,
  title text not null default 'Admin ↔ Agent Desk',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
create unique index if not exists one_team_chat_per_workspace on public.chat_conversations(workspace_id) where conversation_type='team';
create unique index if not exists one_applicant_chat_per_case on public.chat_conversations(applicant_id) where conversation_type='applicant';

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null default '',
  attachment_path text,
  attachment_name text,
  related_applicant_id uuid references public.applicants(id) on delete set null,
  created_at timestamptz not null default now(),
  check (length(body) > 0 or attachment_path is not null)
);
create index if not exists chat_messages_conversation_idx on public.chat_messages(conversation_id,created_at);

create table if not exists public.activity_logs (
  id bigint generated by default as identity primary key,
  workspace_id uuid not null references public.workspaces(id),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- OAuth tokens never leave server-side functions; the client only reads the safe status view.
create table if not exists public.google_connections (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id),
  connected_by uuid not null references public.profiles(id),
  provider text not null default 'google_workspace',
  google_email text,
  scopes text[] not null default '{}',
  access_token_ciphertext text,
  refresh_token_ciphertext text,
  access_token_iv text,
  refresh_token_iv text,
  expires_at timestamptz,
  status text not null default 'connected' check(status in ('connected','disconnected','error')),
  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id,provider)
);

create table if not exists public.google_oauth_states (
  state_hash text primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  code_verifier_ciphertext text not null,
  code_verifier_iv text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace view public.google_connection_status with (security_invoker = true) as
select id,workspace_id,connected_by,provider,google_email,scopes,expires_at,status,connected_at,updated_at
from public.google_connections;

create table if not exists public.workspace_settings (
  workspace_id uuid primary key references public.workspaces(id),
  brand_name text not null default 'First Fly International',
  tagline text not null default 'আপনার ভিসা, আমাদের অগ্রাধিকার',
  support_email text,
  support_phone text,
  public_application_url text,
  disclaimer_bn text not null default 'ভিসা সংক্রান্ত সর্বশেষ নিয়ম সংশ্লিষ্ট সরকারি কর্তৃপক্ষের ওয়েবসাইটে যাচাই করুন।',
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
insert into public.workspace_settings(workspace_id) values ('00000000-0000-4000-8000-000000000001') on conflict (workspace_id) do nothing;

do $$ declare tab text; begin
  foreach tab in array array['profiles','countries','country_checklists','visa_updates','blog_posts','applicants','approval_requests','google_connections','workspace_settings'] loop
    execute format('drop trigger if exists %I on public.%I',tab||'_touch_updated_at',tab);
    execute format('create trigger %I before update on public.%I for each row execute procedure public.touch_updated_at()',tab||'_touch_updated_at',tab);
  end loop;
end $$;

-- Backend-owned country/category master data; no client-side demo records.
insert into public.countries(workspace_id,slug,name,name_bn,flag_emoji,region,official_url,sort_order) values
('00000000-0000-4000-8000-000000000001','uk','United Kingdom','যুক্তরাজ্য','🇬🇧','Europe','https://www.gov.uk/government/organisations/uk-visas-and-immigration',10),
('00000000-0000-4000-8000-000000000001','usa','United States','যুক্তরাষ্ট্র','🇺🇸','North America','https://travel.state.gov/content/travel/en/us-visas.html',20),
('00000000-0000-4000-8000-000000000001','canada','Canada','কানাডা','🇨🇦','North America','https://www.canada.ca/en/immigration-refugees-citizenship.html',30),
('00000000-0000-4000-8000-000000000001','australia','Australia','অস্ট্রেলিয়া','🇦🇺','Oceania','https://immi.homeaffairs.gov.au/',40),
('00000000-0000-4000-8000-000000000001','schengen','Schengen Area','শেনজেন এলাকা','🇪🇺','Europe','https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',50),
('00000000-0000-4000-8000-000000000001','japan','Japan','জাপান','🇯🇵','Asia','https://www.mofa.go.jp/j_info/visit/visa/',60),
('00000000-0000-4000-8000-000000000001','uae','United Arab Emirates','সংযুক্ত আরব আমিরাত','🇦🇪','Middle East','https://u.ae/en/information-and-services/visa-and-emirates-id',70),
('00000000-0000-4000-8000-000000000001','saudi','Saudi Arabia','সৌদি আরব','🇸🇦','Middle East','https://visa.mofa.gov.sa/',80)
on conflict (workspace_id,slug) do nothing;
insert into public.visa_categories(workspace_id,slug,name,name_bn,sort_order) values
('00000000-0000-4000-8000-000000000001','tourist','Tourist / Visitor','ট্যুরিস্ট / ভিজিটর',10),
('00000000-0000-4000-8000-000000000001','business','Business','বিজনেস',20),
('00000000-0000-4000-8000-000000000001','student','Student','স্টুডেন্ট',30),
('00000000-0000-4000-8000-000000000001','work','Work / Employment','ওয়ার্ক / এমপ্লয়মেন্ট',40),
('00000000-0000-4000-8000-000000000001','family','Family / Visit','ফ্যামিলি / ভিজিট',50),
('00000000-0000-4000-8000-000000000001','transit','Transit','ট্রানজিট',60)
on conflict (workspace_id,slug) do nothing;

create or replace function public.handle_new_auth_user() returns trigger
language plpgsql security definer set search_path = public
as $$
declare workspace_key uuid := '00000000-0000-4000-8000-000000000001';
begin
  insert into public.profiles(id,workspace_id,full_name,email,role)
  values(new.id,workspace_key,coalesce(new.raw_user_meta_data->>'full_name',split_part(new.email,'@',1)),new.email,'agent')
  on conflict(id) do nothing;
  insert into public.chat_conversations(workspace_id,conversation_type,title,created_by)
  values(workspace_key,'team','Admin ↔ Agent Desk',new.id)
  on conflict do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_auth_user();

create or replace function public.protect_applicant_stage() returns trigger
language plpgsql security definer set search_path = public
as $$ begin
  if new.stage is distinct from old.stage and not public.is_workspace_admin(old.workspace_id) then
    raise exception 'Only an administrator may change the application stage.' using errcode='42501';
  end if;
  if new.assigned_agent_id is distinct from old.assigned_agent_id and not public.is_workspace_admin(old.workspace_id) then
    raise exception 'Only an administrator may reassign an application.' using errcode='42501';
  end if;
  if (new.workspace_id is distinct from old.workspace_id or new.created_by is distinct from old.created_by or new.reference is distinct from old.reference or new.consent_recorded_at is distinct from old.consent_recorded_at) and not public.is_workspace_admin(old.workspace_id) then
    raise exception 'Application identity and consent metadata are immutable to agents.' using errcode='42501';
  end if;
  return new;
end $$;
drop trigger if exists applicants_protect_stage on public.applicants;
create trigger applicants_protect_stage before update on public.applicants for each row execute procedure public.protect_applicant_stage();

create or replace function public.notify_approval_request() returns trigger
language plpgsql security definer set search_path = public
as $$
declare item record;
begin
  if tg_op='INSERT' then
    for item in select id from public.profiles where workspace_id=new.workspace_id and role='admin' and active=true loop
      insert into public.notifications(workspace_id,user_id,title,body,kind,entity_type,entity_id)
      values(new.workspace_id,item.id,'নতুন অনুমোদন অনুরোধ',coalesce((select reference||' · '||full_name from public.applicants where id=new.applicant_id),'আবেদন পর্যালোচনা করুন'),'approval','applicants',new.applicant_id);
    end loop;
  elsif new.status is distinct from old.status then
    insert into public.notifications(workspace_id,user_id,title,body,kind,entity_type,entity_id)
    select new.workspace_id,a.assigned_agent_id,
      case new.status when 'approved' then 'আবেদন অনুমোদিত' when 'needs_correction' then 'সংশোধনের অনুরোধ' else 'অনুমোদনের অবস্থা পরিবর্তিত' end,
      coalesce((select reference||' · '||full_name from public.applicants where id=new.applicant_id),'আবেদনের অবস্থা পরিবর্তিত')||case when new.feedback<>'' then ' — '||new.feedback else '' end,
      'approval','applicant',new.applicant_id from public.applicants a where a.id=new.applicant_id;
  end if;
  return new;
end $$;
drop trigger if exists approval_request_notifications on public.approval_requests;
create trigger approval_request_notifications after insert or update of status on public.approval_requests for each row execute procedure public.notify_approval_request();

create or replace function public.notify_published_content() returns trigger
language plpgsql security definer set search_path = public
as $$
declare item record; display_title text;
begin
  if new.status='published' and (tg_op='INSERT' or old.status is distinct from 'published') then
    display_title := coalesce(new.title_bn,new.title,'নতুন আপডেট');
    for item in select id from public.profiles where workspace_id=new.workspace_id and role='agent' and active=true loop
      insert into public.notifications(workspace_id,user_id,title,body,kind,entity_type,entity_id)
      values(new.workspace_id,item.id,'নতুন ভিসা আপডেট',display_title,'visa_update',tg_table_name,new.id);
    end loop;
  end if;
  return new;
end $$;
drop trigger if exists visa_update_notifications on public.visa_updates;
create trigger visa_update_notifications after insert or update of status on public.visa_updates for each row execute procedure public.notify_published_content();
drop trigger if exists blog_notifications on public.blog_posts;
create trigger blog_notifications after insert or update of status on public.blog_posts for each row execute procedure public.notify_published_content();

create or replace function public.notify_chat_message() returns trigger
language plpgsql security definer set search_path = public
as $$
declare item record;
begin
  for item in select id from public.profiles where workspace_id=new.workspace_id and active=true and id<>new.sender_id loop
    insert into public.notifications(workspace_id,user_id,title,body,kind,entity_type,entity_id)
    values(new.workspace_id,item.id,'নতুন টিম মেসেজ',left(coalesce(new.body,new.attachment_name,'ফাইল শেয়ার করা হয়েছে'),160),'chat','chat_conversation',new.conversation_id);
  end loop;
  return new;
end $$;
drop trigger if exists chat_message_notifications on public.chat_messages;
create trigger chat_message_notifications after insert on public.chat_messages for each row execute procedure public.notify_chat_message();

create or replace function public.log_workspace_activity() returns trigger
language plpgsql security definer set search_path = public
as $$
declare current_row jsonb; entity_id_value uuid; workspace_value uuid; action_value text;
begin
  current_row := to_jsonb(new);
  entity_id_value := (current_row->>'id')::uuid;
  workspace_value := (current_row->>'workspace_id')::uuid;
  action_value := tg_table_name||'_'||lower(tg_op);
  insert into public.activity_logs(workspace_id,actor_id,action,entity_type,entity_id,details)
  values(workspace_value,auth.uid(),action_value,tg_table_name,entity_id_value,jsonb_build_object('operation',tg_op));
  return new;
end $$;
drop trigger if exists activity_applicants on public.applicants;
create trigger activity_applicants after insert or update on public.applicants for each row execute procedure public.log_workspace_activity();
drop trigger if exists activity_approvals on public.approval_requests;
create trigger activity_approvals after insert or update on public.approval_requests for each row execute procedure public.log_workspace_activity();
drop trigger if exists activity_updates on public.visa_updates;
create trigger activity_updates after insert or update on public.visa_updates for each row execute procedure public.log_workspace_activity();
drop trigger if exists activity_blog on public.blog_posts;
create trigger activity_blog after insert or update on public.blog_posts for each row execute procedure public.log_workspace_activity();

-- Enable RLS on every workspace table.
do $$ declare tab text; begin
  foreach tab in array array['profiles','countries','visa_categories','country_checklists','visa_updates','blog_posts','applicants','applicant_documents','ai_extracted_data','generated_reports','approval_requests','notifications','chat_conversations','chat_messages','activity_logs','google_connections','google_oauth_states','workspace_settings'] loop
    execute format('alter table public.%I enable row level security',tab);
  end loop;
end $$;

-- Profiles: read self; workspace admins may inspect their team. Role, workspace and active are server-managed.
drop policy if exists profiles_read_scope on public.profiles;
create policy profiles_read_scope on public.profiles for select to authenticated using(id=auth.uid() or (workspace_id=public.current_workspace_id() and public.is_workspace_admin(workspace_id)));
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update to authenticated using(id=auth.uid() and workspace_id=public.current_workspace_id()) with check(id=auth.uid() and workspace_id=public.current_workspace_id());
revoke update on public.profiles from authenticated;
grant update(full_name,avatar_url,preferences) on public.profiles to authenticated;

-- Read-only destination data to signed-in users; write actions are admin-only.
drop policy if exists countries_read_workspace on public.countries;
create policy countries_read_workspace on public.countries for select to authenticated using(workspace_id=public.current_workspace_id() and (is_active or public.is_workspace_admin(workspace_id)));
drop policy if exists countries_admin_write on public.countries;
create policy countries_admin_write on public.countries for all to authenticated using(public.is_workspace_admin(workspace_id)) with check(public.is_workspace_admin(workspace_id));
drop policy if exists visa_categories_read_workspace on public.visa_categories;
create policy visa_categories_read_workspace on public.visa_categories for select to authenticated using(workspace_id=public.current_workspace_id() and (is_active or public.is_workspace_admin(workspace_id)));
drop policy if exists visa_categories_admin_write on public.visa_categories;
create policy visa_categories_admin_write on public.visa_categories for all to authenticated using(public.is_workspace_admin(workspace_id)) with check(public.is_workspace_admin(workspace_id));
drop policy if exists checklist_read_scope on public.country_checklists;
create policy checklist_read_scope on public.country_checklists for select to authenticated using(workspace_id=public.current_workspace_id());
drop policy if exists checklist_admin_write on public.country_checklists;
create policy checklist_admin_write on public.country_checklists for all to authenticated using(public.is_workspace_admin(workspace_id)) with check(public.is_workspace_admin(workspace_id));

-- Published content is visible to the Agent portal; drafts remain admin-only.
drop policy if exists visa_updates_read_scope on public.visa_updates;
create policy visa_updates_read_scope on public.visa_updates for select to authenticated using(workspace_id=public.current_workspace_id() and (status='published' or public.is_workspace_admin(workspace_id)));
drop policy if exists visa_updates_admin_write on public.visa_updates;
create policy visa_updates_admin_write on public.visa_updates for all to authenticated using(public.is_workspace_admin(workspace_id)) with check(public.is_workspace_admin(workspace_id));
drop policy if exists blog_posts_read_scope on public.blog_posts;
create policy blog_posts_read_scope on public.blog_posts for select to authenticated using(workspace_id=public.current_workspace_id() and (status='published' or public.is_workspace_admin(workspace_id)));
drop policy if exists blog_posts_admin_write on public.blog_posts;
create policy blog_posts_admin_write on public.blog_posts for all to authenticated using(public.is_workspace_admin(workspace_id)) with check(public.is_workspace_admin(workspace_id));

-- Applicants and their documents are limited to the assigned agent and workspace admins.
drop policy if exists applicants_read_scope on public.applicants;
create policy applicants_read_scope on public.applicants for select to authenticated using(workspace_id=public.current_workspace_id() and (assigned_agent_id=auth.uid() or public.is_workspace_admin(workspace_id)));
drop policy if exists applicants_insert_scope on public.applicants;
create policy applicants_insert_scope on public.applicants for insert to authenticated with check(workspace_id=public.current_workspace_id() and created_by=auth.uid() and (assigned_agent_id=auth.uid() or public.is_workspace_admin(workspace_id)));
drop policy if exists applicants_update_scope on public.applicants;
create policy applicants_update_scope on public.applicants for update to authenticated using(workspace_id=public.current_workspace_id() and (assigned_agent_id=auth.uid() or public.is_workspace_admin(workspace_id))) with check(workspace_id=public.current_workspace_id() and (assigned_agent_id=auth.uid() or public.is_workspace_admin(workspace_id)));
drop policy if exists applicants_delete_admin on public.applicants;
create policy applicants_delete_admin on public.applicants for delete to authenticated using(public.is_workspace_admin(workspace_id));

drop policy if exists applicant_documents_read_scope on public.applicant_documents;
create policy applicant_documents_read_scope on public.applicant_documents for select to authenticated using(workspace_id=public.current_workspace_id() and public.can_access_applicant(applicant_id));
drop policy if exists applicant_documents_insert_scope on public.applicant_documents;
create policy applicant_documents_insert_scope on public.applicant_documents for insert to authenticated with check(workspace_id=public.current_workspace_id() and uploaded_by=auth.uid() and public.can_access_applicant(applicant_id));
drop policy if exists applicant_documents_delete_scope on public.applicant_documents;
create policy applicant_documents_delete_scope on public.applicant_documents for delete to authenticated using(workspace_id=public.current_workspace_id() and public.can_access_applicant(applicant_id));

drop policy if exists ai_data_read_scope on public.ai_extracted_data;
create policy ai_data_read_scope on public.ai_extracted_data for select to authenticated using(workspace_id=public.current_workspace_id() and public.can_access_applicant(applicant_id));
drop policy if exists ai_data_insert_scope on public.ai_extracted_data;
create policy ai_data_insert_scope on public.ai_extracted_data for insert to authenticated with check(workspace_id=public.current_workspace_id() and public.can_access_applicant(applicant_id) and exists(select 1 from public.applicant_documents d where d.id=ai_extracted_data.document_id and d.applicant_id=ai_extracted_data.applicant_id));
drop policy if exists ai_data_review_scope on public.ai_extracted_data;
create policy ai_data_review_scope on public.ai_extracted_data for update to authenticated using(workspace_id=public.current_workspace_id() and public.can_access_applicant(applicant_id)) with check(workspace_id=public.current_workspace_id() and public.can_access_applicant(applicant_id));
revoke update on public.ai_extracted_data from authenticated;
grant update(review_status,reviewed_by,reviewed_at) on public.ai_extracted_data to authenticated;
grant insert on public.ai_extracted_data to authenticated;
drop policy if exists reports_read_scope on public.generated_reports;
create policy reports_read_scope on public.generated_reports for select to authenticated using(workspace_id=public.current_workspace_id() and public.can_access_applicant(applicant_id));
drop policy if exists reports_insert_scope on public.generated_reports;
create policy reports_insert_scope on public.generated_reports for insert to authenticated with check(workspace_id=public.current_workspace_id() and generated_by=auth.uid() and public.can_access_applicant(applicant_id));

drop policy if exists approval_read_scope on public.approval_requests;
create policy approval_read_scope on public.approval_requests for select to authenticated using(workspace_id=public.current_workspace_id() and (requested_by=auth.uid() or public.is_workspace_admin(workspace_id)));
drop policy if exists approval_agent_insert on public.approval_requests;
create policy approval_agent_insert on public.approval_requests for insert to authenticated with check(workspace_id=public.current_workspace_id() and requested_by=auth.uid() and public.can_access_applicant(applicant_id));
drop policy if exists approval_admin_update on public.approval_requests;
create policy approval_admin_update on public.approval_requests for update to authenticated using(public.is_workspace_admin(workspace_id)) with check(public.is_workspace_admin(workspace_id));

drop policy if exists notifications_read_own on public.notifications;
create policy notifications_read_own on public.notifications for select to authenticated using(workspace_id=public.current_workspace_id() and user_id=auth.uid());
drop policy if exists notifications_update_own on public.notifications;
create policy notifications_update_own on public.notifications for update to authenticated using(workspace_id=public.current_workspace_id() and user_id=auth.uid()) with check(workspace_id=public.current_workspace_id() and user_id=auth.uid());
revoke update on public.notifications from authenticated;
grant update(read_at) on public.notifications to authenticated;

drop policy if exists chat_conversation_read_scope on public.chat_conversations;
create policy chat_conversation_read_scope on public.chat_conversations for select to authenticated using(workspace_id=public.current_workspace_id());
drop policy if exists chat_conversation_insert_scope on public.chat_conversations;
create policy chat_conversation_insert_scope on public.chat_conversations for insert to authenticated with check(workspace_id=public.current_workspace_id() and created_by=auth.uid());
drop policy if exists chat_message_read_scope on public.chat_messages;
create policy chat_message_read_scope on public.chat_messages for select to authenticated using(workspace_id=public.current_workspace_id());
drop policy if exists chat_message_insert_scope on public.chat_messages;
create policy chat_message_insert_scope on public.chat_messages for insert to authenticated with check(workspace_id=public.current_workspace_id() and sender_id=auth.uid());
drop policy if exists chat_message_delete_scope on public.chat_messages;
create policy chat_message_delete_scope on public.chat_messages for delete to authenticated using(public.is_workspace_admin(workspace_id));

drop policy if exists activity_admin_read on public.activity_logs;
create policy activity_admin_read on public.activity_logs for select to authenticated using(workspace_id=public.current_workspace_id() and public.is_workspace_admin(workspace_id));
drop policy if exists settings_read_scope on public.workspace_settings;
create policy settings_read_scope on public.workspace_settings for select to authenticated using(workspace_id=public.current_workspace_id());
drop policy if exists settings_admin_write on public.workspace_settings;
create policy settings_admin_write on public.workspace_settings for all to authenticated using(public.is_workspace_admin(workspace_id)) with check(public.is_workspace_admin(workspace_id));
-- Explicit API grants: RLS policies alone do not grant SQL privileges.
-- Revoke any broad defaults, then grant only the operations used by the authenticated UI.
grant usage on schema public to authenticated;
revoke all on public.profiles, public.countries, public.visa_categories, public.country_checklists,
  public.visa_updates, public.blog_posts, public.applicants, public.applicant_documents,
  public.ai_extracted_data, public.generated_reports, public.approval_requests, public.notifications,
  public.chat_conversations, public.chat_messages, public.activity_logs, public.workspace_settings
  from anon, authenticated;
grant select on public.profiles, public.countries, public.visa_categories, public.country_checklists,
  public.visa_updates, public.blog_posts, public.applicants, public.applicant_documents,
  public.ai_extracted_data, public.generated_reports, public.approval_requests, public.notifications,
  public.chat_conversations, public.chat_messages, public.activity_logs, public.workspace_settings
  to authenticated;
grant update(full_name, avatar_url, preferences) on public.profiles to authenticated;
grant insert, update, delete on public.countries, public.visa_categories, public.country_checklists,
  public.visa_updates, public.blog_posts to authenticated;
grant insert, update, delete on public.applicants to authenticated;
grant insert, delete on public.applicant_documents to authenticated;
grant insert on public.ai_extracted_data to authenticated;
grant update(review_status, reviewed_by, reviewed_at) on public.ai_extracted_data to authenticated;
grant insert on public.generated_reports to authenticated;
grant insert, update on public.approval_requests to authenticated;
grant update(read_at) on public.notifications to authenticated;
grant insert on public.chat_conversations, public.chat_messages to authenticated;
grant delete on public.chat_messages to authenticated;
grant update on public.workspace_settings to authenticated;

-- Tokens and OAuth state are never readable/writable with an end-user JWT.
drop policy if exists google_connections_no_client_access on public.google_connections;
create policy google_connections_no_client_access on public.google_connections for all to authenticated using(false) with check(false);
revoke all on public.google_connections from public, anon, authenticated;
grant all on public.google_connections to service_role;
revoke all on public.google_oauth_states from public, anon, authenticated;
grant all on public.google_oauth_states to service_role;
revoke all on public.google_connection_status from public, anon, authenticated;
grant select on public.google_connection_status to service_role;

-- Private document buckets. File paths are: {workspace_id}/{applicant_id}/{random}-{filename}.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
('applicant-documents','applicant-documents',false,31457280,array['application/pdf','image/jpeg','image/png','image/webp','image/heic','text/plain','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
('team-chat-files','team-chat-files',false,31457280,array['application/pdf','image/jpeg','image/png','image/webp','text/plain','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
('published-content','published-content',true,10485760,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
drop policy if exists applicant_storage_read on storage.objects;
create policy applicant_storage_read on storage.objects for select to authenticated using(bucket_id='applicant-documents' and (public.is_workspace_admin((storage.foldername(name))[1]::uuid) or exists(select 1 from public.applicants a where a.id=(storage.foldername(name))[2]::uuid and a.workspace_id=(storage.foldername(name))[1]::uuid and a.assigned_agent_id=auth.uid())));
drop policy if exists applicant_storage_insert on storage.objects;
create policy applicant_storage_insert on storage.objects for insert to authenticated with check(bucket_id='applicant-documents' and (public.is_workspace_admin((storage.foldername(name))[1]::uuid) or exists(select 1 from public.applicants a where a.id=(storage.foldername(name))[2]::uuid and a.workspace_id=(storage.foldername(name))[1]::uuid and a.assigned_agent_id=auth.uid())));
drop policy if exists applicant_storage_delete on storage.objects;
create policy applicant_storage_delete on storage.objects for delete to authenticated using(bucket_id='applicant-documents' and (public.is_workspace_admin((storage.foldername(name))[1]::uuid) or exists(select 1 from public.applicants a where a.id=(storage.foldername(name))[2]::uuid and a.workspace_id=(storage.foldername(name))[1]::uuid and a.assigned_agent_id=auth.uid())));
drop policy if exists chat_storage_read on storage.objects;
create policy chat_storage_read on storage.objects for select to authenticated using(bucket_id='team-chat-files' and (storage.foldername(name))[1]=public.current_workspace_id()::text);
drop policy if exists chat_storage_insert on storage.objects;
create policy chat_storage_insert on storage.objects for insert to authenticated with check(bucket_id='team-chat-files' and (storage.foldername(name))[1]=public.current_workspace_id()::text);
drop policy if exists chat_storage_delete on storage.objects;
create policy chat_storage_delete on storage.objects for delete to authenticated using(bucket_id='team-chat-files' and (storage.foldername(name))[1]=public.current_workspace_id()::text);
drop policy if exists published_cover_public_read on storage.objects;
create policy published_cover_public_read on storage.objects for select to anon,authenticated using(bucket_id='published-content');
drop policy if exists published_cover_admin_insert on storage.objects;
create policy published_cover_admin_insert on storage.objects for insert to authenticated with check(bucket_id='published-content' and public.is_workspace_admin((storage.foldername(name))[1]::uuid));
drop policy if exists published_cover_admin_update on storage.objects;
create policy published_cover_admin_update on storage.objects for update to authenticated using(bucket_id='published-content' and public.is_workspace_admin((storage.foldername(name))[1]::uuid)) with check(bucket_id='published-content' and public.is_workspace_admin((storage.foldername(name))[1]::uuid));
drop policy if exists published_cover_admin_delete on storage.objects;
create policy published_cover_admin_delete on storage.objects for delete to authenticated using(bucket_id='published-content' and public.is_workspace_admin((storage.foldername(name))[1]::uuid));

-- Realtime is used for notices, publishing, approval decisions and messages.
do $$ declare tab text; begin
  foreach tab in array array['visa_updates','blog_posts','applicants','approval_requests','notifications','chat_messages'] loop
    if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename=tab) then
      execute format('alter publication supabase_realtime add table public.%I',tab);
    end if;
  end loop;
end $$;
