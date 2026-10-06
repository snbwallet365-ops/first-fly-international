# First Fly International

A Bangla-first, mobile-first visa-agency workspace for Admin operations and Agent casework. The client is a React/Vite PWA; authentication, case records, permissions, private files, realtime events, audit data, and provider calls are designed around Supabase Auth, Postgres/RLS, Storage, and Edge Functions.

> **Deployment status (2026-10-07):** `npm run build` succeeds. Supabase, Google, and Gemini credentials are not configured in this workspace; the migrations have not been applied and no provider call, SQL execution, or end-to-end workflow has been tested. With blank public Supabase variables the app deliberately renders a setup screen—there are no demo passwords, fake cases, or sample login accounts. Do not enter real client data until the setup and security checklist below has been completed and verified in your own Supabase project.

## What is included

- Real Supabase email/password authentication, password-reset flow, invite/password setup flow, role-aware navigation, and profile/workspace loading.
- Admin / Agent dashboards, a single-page applicant intake form and case tracking, private document upload, admin approvals and correction requests, team chat, realtime notifications, and audit history.
- Country and visa-category catalogues, admin-maintained document checklists, published updates and blog content. Country records seeded by the migration contain authority links only; verify current requirements with the official source.
- Server-side Gemini document extraction and admin case assistant. Extracted fields are marked for human review; the assistant is not an immigration adviser and cannot determine eligibility or promise an outcome.
- Google Workspace OAuth (Drive, Docs, Gmail) architecture with PKCE/state validation and encrypted server-side token storage. The UI shows real configuration/connection errors when setup is incomplete.
- A4 case summary, installable PWA, responsive mobile navigation, default light appearance, optional dark theme, and reduced-motion support.
- Applicant documents are not uploaded, sent to Gemini, or copied to Drive unless an attributed consent record exists. The consent workflow is enforced in the UI, database triggers/RLS, private Storage insert policies, and provider functions. Older timestamps without an actor are cleared by migration `202610070002_applicant_consent_safety.sql` because they do not prove consent.

## Requirements

- Node.js 20.19+ (or 22.12+) and npm.
- A Supabase project for any authentication or persistent workspace data.
- Optional: a Gemini API key for AI features; a Google Cloud OAuth client for Drive / Docs / Gmail.
- HTTPS in production for authentication callbacks, service-worker registration, and PWA installation.

## Local development

```bash
npm ci
cp .env.example .env.local
# Fill only the two Vite public values described below.
npm run dev
```

Open the Vite URL printed in the terminal. Restart the dev server after changing `.env.local`.

`.env.local` contains **public client configuration only**:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

The legacy `anon` key and the newer publishable key are both browser-safe *only when Postgres RLS and Storage policies are correctly applied*. Never place a Supabase service-role key, database password, Gemini key, Google client secret, refresh token, or encryption key in a `VITE_*` variable, `src/`, or a committed file. Edge Function CORS is restricted to the `APP_ALLOWED_ORIGINS` exact-origin allow-list; add your deployed domains and local `http://localhost:4173` / `http://localhost:5173` origins as needed. Do not use `*`.

Useful commands:

```bash
npm run build
npm run preview
```

## Supabase project setup

1. Create a Supabase project and keep its database password in a password manager.
2. In **Authentication → URL Configuration**, set the production Site URL and allow the exact production callback URLs you will use, including the site root and `/invite/accept`. **Disable public sign-ups**; staff accounts should be created by the trusted bootstrap/invitation flow only. Configure production SMTP before inviting real staff; the default email sender is not a production delivery service.
3. Install the Supabase CLI, authenticate, and link this repository to the project:

   ```bash
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

   `db push` applies the SQL migrations under `supabase/migrations/`. The first migration creates the workspace schema, RLS policies, private buckets, realtime publication membership, and starter country/category catalogues. The second migration adds actor-attributed consent and gates file/review operations. The third activates the requested eight destinations (Australia, Serbia, Türkiye, Singapore, Russia, Malaysia, Saudi Arabia, and Bahrain) with official authority links; it deliberately does not fabricate fees, processing times, or visa rules. **Inspect all migrations for your Supabase/Postgres version and backup policy before production use.**
4. Create the first owner in **Authentication → Users** (or use the project’s trusted admin invitation flow). The database trigger creates a profile with the least-privileged `agent` role. Promote exactly the designated owner once, using the Supabase Dashboard SQL Editor as project owner:

   ```sql
   update public.profiles
   set role = 'admin'::public.app_role
   where lower(email) = lower('owner@example.com')
     and workspace_id = '00000000-0000-4000-8000-000000000001'::uuid
     and active = true;
   ```

   Confirm exactly one row changed. Do not expose the service-role key or allow an ordinary workspace user to run role-changing SQL. Admins can then invite Agents from **Settings → Agent invite**; the invite Edge Function assigns new profiles the Agent role. Invite emails should redirect to `https://YOUR_DOMAIN/invite/accept` so the recipient can set their initial password.
5. Review **Authentication → Policies / providers / password settings**, configure email confirmation and password requirements to match your organization, then create a second test user and verify that its profile remains an Agent.

## Supabase Edge Function secrets and deployment

The browser calls only the public Supabase API using the publishable/anon key. Provider secrets belong in Supabase Edge Function secrets. Supabase may inject its project URL/keys into the function runtime; verify the available names in your project. The functions expect `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and either `SUPABASE_ANON_KEY` or `SUPABASE_PUBLISHABLE_KEY` for the user-scoped client.

Set the core URLs/keys using the Supabase CLI (run locally; do not commit the values):

```bash
supabase secrets set --project-ref YOUR_PROJECT_REF \
  SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co" \
  SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY" \
  SUPABASE_ANON_KEY="YOUR_ANON_OR_PUBLISHABLE_KEY" \
  APP_FRONTEND_URL="https://YOUR_DOMAIN" \
  INVITE_REDIRECT_URL="https://YOUR_DOMAIN/invite/accept" \
  APP_ALLOWED_ORIGINS="https://YOUR_DOMAIN,https://www.YOUR_DOMAIN"
```

Only add Gemini secrets if you intend to enable Gemini features:

```bash
supabase secrets set --project-ref YOUR_PROJECT_REF \
  GEMINI_API_KEY="YOUR_GEMINI_API_KEY" \
  GEMINI_MODEL="gemini-2.5-flash"
```

Deploy the functions after setting secrets:

```bash
supabase functions deploy --project-ref YOUR_PROJECT_REF
```

`supabase/config.toml` requires JWT verification for authenticated functions. `google-oauth-callback` is the sole public callback because Google redirects to it; it validates one-use, expiring hashed state and PKCE before saving any tokens. Public does not mean unauthenticated provider state is trusted.

## Optional Google Workspace integration

1. In Google Cloud Console, create/select a project and enable **Google Drive API**, **Google Docs API**, and **Gmail API**.
2. Configure the OAuth consent screen, add test users while in testing, and create a **Web application** OAuth client.
3. Add this exact redirect URI to the Google OAuth client and Supabase secrets:

   ```text
   https://YOUR_PROJECT_REF.supabase.co/functions/v1/google-oauth-callback
   ```

4. Add these Supabase Edge Function secrets:

   ```bash
   supabase secrets set --project-ref YOUR_PROJECT_REF \
     GOOGLE_CLIENT_ID="YOUR_CLIENT_ID" \
     GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET" \
     GOOGLE_REDIRECT_URI="https://YOUR_PROJECT_REF.supabase.co/functions/v1/google-oauth-callback" \
     GOOGLE_TOKEN_ENCRYPTION_KEY="$(openssl rand -hex 32)"
   ```

   Store the generated encryption key safely; it must remain stable or previously encrypted tokens cannot be decrypted. The implementation requests `openid`, `email`, `profile`, `drive.file`, `documents`, and `gmail.send`. Google may require OAuth verification for production use of sensitive scopes. Review Google’s current consent, verification, and restricted-data policies before connecting real staff accounts.
5. In the Admin UI, connect the Workspace account and test Drive/Docs/Gmail only with a non-client test record. Token material is intended to stay encrypted in Supabase and is never returned to the browser.

## Vercel deployment

1. Push the project to a private GitHub repository and import it into Vercel.
2. Use the defaults from `vercel.json` / Vite: build command `npm run build`, output directory `dist`, install command `npm ci`.
3. Add only these **public** variables in Vercel’s Development/Preview/Production environments:

   ```text
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   ```

4. Deploy, add the production domain to Supabase Auth’s Site URL and Redirect URLs, and update `APP_FRONTEND_URL` / `INVITE_REDIRECT_URL` secrets in Supabase. Do not put server secrets into Vercel’s browser build environment.
5. Test the deployed PWA over HTTPS. The service worker caches the app shell only; API/provider requests are not intentionally placed in an offline cache. On iPhone/iPad, open the site in Safari → Share → **Add to Home Screen** → **Add**; the same guide is available from the setup screen and app Settings. This is an installable PWA, not an App Store native iOS binary. Browser zoom remains enabled for accessibility.

## Suggested acceptance test after credentials are configured

1. Sign in as the bootstrapped Admin; confirm no seeded applicant records exist.
2. Publish a sourced country update and verify the Agent receives a database notification/realtime refresh.
3. Invite a test Agent, open the invite link, set a password, sign in, and confirm its role is Agent.
4. Create a test applicant with explicit consent; upload a small dummy PDF/image; verify private storage permissions and applicant isolation across Agent accounts.
5. Run Gemini extraction, inspect the raw extraction as a human reviewer, accept/reject it, and verify missing-document checks match both category keys and human labels such as `passport` / `Passport`.
6. Request Admin approval, return a correction note, resubmit, approve, and verify stage/notifications/audit history.
7. Test team chat, A4 report, password reset, Google consent gating, Drive/Docs/Gmail actions, logout, mobile layout, dark theme, and PWA install on supported HTTPS devices.

Do not use real passport, bank, tax, or identity documents in acceptance testing. Use synthetic test files and accounts.

## Known boundaries / production readiness

- This workspace has no project credentials and the migrations are not applied. The preview therefore shows setup/sign-in configuration, not an authenticated operations dashboard.
- `npm run build` has passed, but SQL, Supabase Edge Functions, RLS policies, provider credentials, email delivery, live realtime, and the full user workflow still require project-level validation. No claim of production verification is made.
- Google OAuth consent verification, Gemini billing/region/retention settings, SMTP deliverability, backups, retention/deletion schedules, privacy notices, and applicable Bangladesh data-protection/legal obligations must be reviewed by the organization before handling real client data.
- Visa rules, fees, appointments, timelines, and outcomes change; use official government sources and human judgment. AI output is advisory extraction only and must be checked against original documents.
