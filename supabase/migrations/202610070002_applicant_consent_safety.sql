-- Consent must be affirmatively recorded by a workspace user before documents are stored,
-- sent to Gemini, or copied to Google Drive. Never infer consent from an older client-only flow.
alter table public.applicants
  add column if not exists consent_recorded_by uuid references public.profiles(id);

-- Earlier prototype builds populated consent_recorded_at automatically. Those timestamps
-- are not evidence of consent, so clear them unless an actor was recorded explicitly.
drop trigger if exists applicants_protect_stage on public.applicants;
update public.applicants
set consent_recorded_at = null,
    consent_recorded_by = null
where consent_recorded_by is null
  and consent_recorded_at is not null;

create or replace function public.protect_applicant_stage() returns trigger
language plpgsql security definer set search_path = public
as $$
declare admin_user boolean;
begin
  if tg_op = 'INSERT' then
    if (new.consent_recorded_at is null and new.consent_recorded_by is not null)
       or (new.consent_recorded_at is not null and new.consent_recorded_by is distinct from auth.uid()) then
      raise exception 'Consent must be recorded by the authenticated workspace user.' using errcode='42501';
    end if;
    if new.consent_recorded_at is not null then new.consent_recorded_at := now(); end if;
    return new;
  end if;

  admin_user := public.is_workspace_admin(old.workspace_id);
  if new.stage is distinct from old.stage and not admin_user then
    raise exception 'Only an administrator may change the application stage.' using errcode='42501';
  end if;
  if new.assigned_agent_id is distinct from old.assigned_agent_id and not admin_user then
    raise exception 'Only an administrator may reassign an application.' using errcode='42501';
  end if;
  if (new.workspace_id is distinct from old.workspace_id or new.created_by is distinct from old.created_by or new.reference is distinct from old.reference) and not admin_user then
    raise exception 'Application identity fields are immutable to agents.' using errcode='42501';
  end if;

  if (new.consent_recorded_at is distinct from old.consent_recorded_at
      or new.consent_recorded_by is distinct from old.consent_recorded_by) and not admin_user then
    if old.consent_recorded_at is null
       and new.consent_recorded_at is not null
       and new.consent_recorded_by is not distinct from auth.uid() then
      -- Use the database clock; agents may add consent but cannot edit or remove it later.
      new.consent_recorded_at := now();
    else
      raise exception 'Agents may only add a new, self-attributed consent record.' using errcode='42501';
    end if;
  end if;
  return new;
end $$;
create trigger applicants_protect_stage
  before insert or update on public.applicants
  for each row execute procedure public.protect_applicant_stage();

-- Require a matching actor when consent is first recorded.
drop policy if exists applicants_insert_scope on public.applicants;
create policy applicants_insert_scope on public.applicants
  for insert to authenticated
  with check (
    workspace_id = public.current_workspace_id()
    and created_by = auth.uid()
    and (assigned_agent_id = auth.uid() or public.is_workspace_admin(workspace_id))
    and ((consent_recorded_at is null and consent_recorded_by is null)
      or (consent_recorded_at is not null and consent_recorded_by = auth.uid()))
  );

-- Keep consent metadata auditable without copying applicant PII into the log.
create or replace function public.log_workspace_activity() returns trigger
language plpgsql security definer set search_path = public
as $$
declare current_row jsonb; entity_id_value uuid; workspace_value uuid; action_value text; details_value jsonb;
begin
  current_row := to_jsonb(new);
  entity_id_value := (current_row->>'id')::uuid;
  workspace_value := (current_row->>'workspace_id')::uuid;
  action_value := tg_table_name||'_'||lower(tg_op);
  details_value := jsonb_build_object('operation',tg_op);
  if tg_table_name = 'applicants' then
    if tg_op = 'INSERT' and new.consent_recorded_at is not null then
      details_value := details_value || jsonb_build_object('consent_recorded',true,'consent_recorded_at',new.consent_recorded_at,'consent_recorded_by',new.consent_recorded_by);
    elsif tg_op = 'UPDATE' and new.consent_recorded_at is distinct from old.consent_recorded_at then
      details_value := details_value || jsonb_build_object('consent_recorded',new.consent_recorded_at is not null,'consent_recorded_at',new.consent_recorded_at,'consent_recorded_by',new.consent_recorded_by);
    end if;
  end if;
  insert into public.activity_logs(workspace_id,actor_id,action,entity_type,entity_id,details)
  values(workspace_value,auth.uid(),action_value,tg_table_name,entity_id_value,details_value);
  return new;
end $$;

-- File operations are forbidden until an attributed consent record exists.
drop policy if exists applicant_storage_insert on storage.objects;
create policy applicant_storage_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'applicant-documents'
    and exists (
      select 1 from public.applicants a
      where a.id = (storage.foldername(name))[2]::uuid
        and a.workspace_id = (storage.foldername(name))[1]::uuid
        and a.consent_recorded_at is not null
        and a.consent_recorded_by is not null
        and (a.assigned_agent_id = auth.uid() or public.is_workspace_admin(a.workspace_id))
    )
  );

drop policy if exists applicant_documents_insert_scope on public.applicant_documents;
create policy applicant_documents_insert_scope on public.applicant_documents
  for insert to authenticated
  with check (
    workspace_id = public.current_workspace_id()
    and uploaded_by = auth.uid()
    and public.can_access_applicant(applicant_id)
    and exists (
      select 1 from public.applicants a
      where a.id = public.applicant_documents.applicant_id
        and a.workspace_id = public.applicant_documents.workspace_id
        and a.consent_recorded_at is not null
        and a.consent_recorded_by is not null
    )
  );

-- A case cannot be submitted for review until its consent record is in place.
drop policy if exists approval_agent_insert on public.approval_requests;
create policy approval_agent_insert on public.approval_requests
  for insert to authenticated
  with check (
    workspace_id = public.current_workspace_id()
    and requested_by = auth.uid()
    and public.can_access_applicant(applicant_id)
    and exists (
      select 1 from public.applicants a
      where a.id = public.approval_requests.applicant_id
        and a.workspace_id = public.approval_requests.workspace_id
        and a.consent_recorded_at is not null
        and a.consent_recorded_by is not null
    )
  );
