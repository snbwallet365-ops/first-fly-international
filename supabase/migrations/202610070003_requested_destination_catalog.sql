-- Align the active destination catalogue with the requested eight markets.
-- This seeds only destination metadata and official authority links; it does not
-- invent fees, processing times, visa rules, or published policy updates.

update public.countries
set is_active = false,
    updated_at = now()
where workspace_id = '00000000-0000-4000-8000-000000000001'::uuid
  and slug not in ('australia','serbia','turkiye','singapore','russia','malaysia','saudi-arabia','bahrain');

insert into public.countries (
  workspace_id, slug, name, name_bn, flag_emoji, region, official_url, short_note, sort_order, is_active
) values
  ('00000000-0000-4000-8000-000000000001','australia','Australia','অস্ট্রেলিয়া','🇦🇺','Oceania','https://immi.homeaffairs.gov.au/','সরকারি অভিবাসন ও ভিসা তথ্য দেখুন।',10,true),
  ('00000000-0000-4000-8000-000000000001','serbia','Serbia','সার্বিয়া','🇷🇸','Europe','https://www.mfa.gov.rs/en','প্রবেশের আগে সার্বিয়ার পররাষ্ট্র মন্ত্রণালয়ের নির্দেশনা যাচাই করুন।',20,true),
  ('00000000-0000-4000-8000-000000000001','turkiye','Türkiye','তুরস্ক','🇹🇷','Europe / Asia','https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa','ভ্রমণের আগে সরকারি ভিসা তথ্য যাচাই করুন।',30,true),
  ('00000000-0000-4000-8000-000000000001','singapore','Singapore','সিঙ্গাপুর','🇸🇬','Southeast Asia','https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements','প্রবেশ ও ভিসা-সংক্রান্ত ICA নির্দেশনা যাচাই করুন।',40,true),
  ('00000000-0000-4000-8000-000000000001','russia','Russia','রাশিয়া','🇷🇺','Europe / Asia','https://electronic-visa.kdmid.ru/','সরকারি কনস্যুলার ও ই-ভিসা নির্দেশনা যাচাই করুন।',50,true),
  ('00000000-0000-4000-8000-000000000001','malaysia','Malaysia','মালয়েশিয়া','🇲🇾','Southeast Asia','https://www.imi.gov.my/','মালয়েশিয়ার ইমিগ্রেশন বিভাগের নির্দেশনা যাচাই করুন।',60,true),
  ('00000000-0000-4000-8000-000000000001','saudi-arabia','Saudi Arabia','সৌদি আরব','🇸🇦','Middle East','https://visa.mofa.gov.sa/','পররাষ্ট্র মন্ত্রণালয়ের ভিসা পোর্টাল যাচাই করুন।',70,true),
  ('00000000-0000-4000-8000-000000000001','bahrain','Bahrain','বাহরাইন','🇧🇭','Middle East','https://www.evisa.gov.bh/','বাহরাইনের সরকারি ই-ভিসা পোর্টাল যাচাই করুন।',80,true)
on conflict (workspace_id,slug) do update set
  name = excluded.name,
  name_bn = excluded.name_bn,
  flag_emoji = excluded.flag_emoji,
  region = excluded.region,
  official_url = excluded.official_url,
  short_note = excluded.short_note,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = now();
