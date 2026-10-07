import React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Activity, ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, Bell, BookOpen, BriefcaseBusiness, Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, CircleHelp, CirclePlus, ClipboardCheck, Clock3, Cloud, CloudUpload, Download, Earth, Ellipsis, ExternalLink, Eye, FileCheck2, FileText, Filter, FolderClosed, FolderOpen, House, KeyRound, LayoutDashboard, LifeBuoy, LoaderCircle, LockKeyhole, LogOut, Mail, Menu, MessageCircle, Moon, Newspaper, Paperclip, Plane, Plus, RefreshCw, Search, Send, Settings, ShieldCheck, Sparkles, Sun, Trash2, TriangleAlert, UserRound, Users, WandSparkles, X } from 'lucide-react';
import { authLinkType, isSupabaseConfigured, missingPublicConfig, supabase, invokeFunction } from './lib/supabase.js';

const import_react27 = { default: React, useCallback, useEffect, useMemo, useRef, useState };
// src/App.jsx
var ASSET_BASE = String(import.meta.env.BASE_URL || "/").replace(/\/$/, "");
var asset = (path) => `${ASSET_BASE}${path.startsWith("/") ? path : `/${path}`}`;
var cn = (...classes) => classes.filter(Boolean).join(" ");
var initials = (value = "FF") => String(value).trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase() || "FF";
var formatDate = (value, options = { day: "2-digit", month: "short", year: "numeric" }) => value ? new Intl.DateTimeFormat("bn-BD", options).format(new Date(value)) : "\u2014";
var formatTime = (value) => value ? new Intl.DateTimeFormat("bn-BD", { hour: "2-digit", minute: "2-digit" }).format(new Date(value)) : "\u2014";
var formatBytes = (bytes = 0) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
var passportState = (value) => {
  if (!value) return { type: "missing", label: "\u09AE\u09C7\u09AF\u09BC\u09BE\u09A6 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09A8\u09C7\u0987" };
  const end = /* @__PURE__ */ new Date(`${value}T23:59:59`);
  const days = Math.ceil((end.getTime() - Date.now()) / 864e5);
  if (days < 0) return { type: "expired", label: "\u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F\u09C7\u09B0 \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6 \u09B6\u09C7\u09B7" };
  if (days < 183) return { type: "warning", label: `\u0986\u09B0 ${days} \u09A6\u09BF\u09A8` };
  return { type: "ok", label: "\u09AE\u09C7\u09AF\u09BC\u09BE\u09A6 \u09AF\u09BE\u099A\u09BE\u0987 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7" };
};
var stageLabels = { drafted: "\u0996\u09B8\u09A1\u09BC\u09BE", submitted: "\u099C\u09AE\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7", embassy_processed: "\u098F\u09AE\u09CD\u09AC\u09BE\u09B8\u09BF \u09AA\u09CD\u09B0\u09B8\u09C7\u09B8\u09BF\u0982", decision: "\u09B8\u09BF\u09A6\u09CD\u09A7\u09BE\u09A8\u09CD\u09A4" };
var approvalLabels = { pending: "\u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3", approved: "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4", needs_correction: "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8 \u09A6\u09B0\u0995\u09BE\u09B0" };
var safeFileName = (name = "file") => name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").slice(-110) || "file";
var BUCKET_DOCUMENTS = "applicant-documents";
var MAX_FILE_SIZE = 30 * 1024 * 1024;
function Logo({ large = false }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: cn("brand-icon", large && "large") }, /* @__PURE__ */ import_react27.default.createElement("img", { src: asset("/icon.svg"), alt: "" }));
}
function Brand({ compact = false, onClick }) {
  return /* @__PURE__ */ import_react27.default.createElement("button", { type: "button", className: "brand", onClick, "aria-label": "First Fly \u09B9\u09CB\u09AE" }, /* @__PURE__ */ import_react27.default.createElement(Logo, null), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", { className: "brand-name" }, "FIRST FLY INTERNATIONAL"), /* @__PURE__ */ import_react27.default.createElement("small", { className: "brand-tag" }, "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AD\u09BF\u09B8\u09BE, \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u0985\u0997\u09CD\u09B0\u09BE\u09A7\u09BF\u0995\u09BE\u09B0")));
}
function Pill({ children, tone = "muted", icon: Icon2 }) {
  return /* @__PURE__ */ import_react27.default.createElement("span", { className: cn("pill", tone) }, Icon2 && /* @__PURE__ */ import_react27.default.createElement(Icon2, { size: 11 }), children);
}
function Status({ value, children }) {
  const key = (value || "drafted").toLowerCase().replaceAll("-", "_");
  return /* @__PURE__ */ import_react27.default.createElement("span", { className: cn("status", key) }, children || stageLabels[value] || approvalLabels[value] || value);
}
function SectionTitle({ title, subtitle, action, actionLabel }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "section-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h2", null, title), subtitle && /* @__PURE__ */ import_react27.default.createElement("p", null, subtitle)), action && /* @__PURE__ */ import_react27.default.createElement("button", { className: "inline-link", type: "button", onClick: action }, actionLabel || "\u09B8\u09AC \u09A6\u09C7\u0996\u09C1\u09A8", " ", /* @__PURE__ */ import_react27.default.createElement(ChevronRight, null)));
}
function EmptyState({ icon: Icon2 = FolderOpen, title, body, action, actionLabel }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass empty" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "empty-icon" }, /* @__PURE__ */ import_react27.default.createElement(Icon2, null)), /* @__PURE__ */ import_react27.default.createElement("b", null, title), /* @__PURE__ */ import_react27.default.createElement("p", null, body), action && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", type: "button", onClick: action }, actionLabel || "\u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C1\u09A8", " ", /* @__PURE__ */ import_react27.default.createElement(ArrowRight, null)));
}
function LoadingDots({ label = "\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7..." }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "loading-inline" }, /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin", size: 16 }), /* @__PURE__ */ import_react27.default.createElement("span", null, label));
}
function AuthScreen({ role, onBack, onLogin, onReset, loading, error, theme, onTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const isAdmin = role === 'admin';
  const submit = (event) => {
    event.preventDefault();
    onLogin(email, password, role);
  };
  const reset = async () => {
    if (!email.trim()) return;
    const sent = await onReset(email.trim());
    if (sent) setResetSent(true);
  };

  return (
    <div className="auth-shell">
      <section className="auth-side">
        <button className="auth-back" type="button" onClick={onBack}><ArrowLeft size={16} /> পোর্টাল নির্বাচন</button>
        <div className="auth-brand"><Logo large /><span><b className="brand-name">FIRST FLY INTERNATIONAL</b><small className="brand-tag">আপনার ভিসা, আমাদের অগ্রাধিকার</small></span></div>
        <div className="auth-copy">
          <span className="eyebrow"><span className="star">✦</span> {isAdmin ? 'ADMIN CONTROL CENTER' : 'AGENT WORKSPACE'}</span>
          <h1>{isAdmin ? 'নিরাপদ অ্যাডমিন প্রবেশ' : 'আপনার ভিসা ফাইল, এক জায়গায়।'}</h1>
          <p>আপনার আমন্ত্রণে পাওয়া ইমেইল ও ব্যক্তিগত পাসওয়ার্ড দিয়ে প্রবেশ করুন। অ্যাকাউন্টের অনুমতি Supabase workspace role থেকে যাচাই হয়।</p>
        </div>
        <div className="auth-footer">নিরাপদ লগইন · {isAdmin ? 'অ্যাডমিন' : 'এজেন্ট'} অ্যাক্সেস · Your Visa, Our Priority</div>
      </section>
      <section className="auth-form-side">
        <button className="icon-btn auth-theme" type="button" onClick={onTheme} aria-label="থিম পরিবর্তন">{theme === 'dark' ? <Sun /> : <Moon />}</button>
        <form className="auth-card" onSubmit={submit}>
          <span className="eyebrow"><span className="star">✦</span> {isAdmin ? 'ADMIN PORTAL' : 'AGENT PORTAL'}</span>
          <h2>{isAdmin ? 'অ্যাডমিন হিসেবে প্রবেশ করুন' : 'এজেন্ট হিসেবে প্রবেশ করুন'}</h2>
          <p>এই পোর্টালের জন্য অনুমোদিত team account ব্যবহার করুন। নতুন অ্যাকাউন্ট কেবল Admin-এর আমন্ত্রণে তৈরি হয়।</p>
          {error && <div className="form-error" role="alert">{error}</div>}
          <label className="field"><span>ইমেইল</span><input required type="email" autoComplete="username" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" /></label>
          <label className="field"><span>পাসওয়ার্ড</span><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="আপনার পাসওয়ার্ড" /></label>
          <button className="btn wide" type="submit" disabled={loading}>{loading ? <><LoaderCircle className="spin" /> যাচাই হচ্ছে...</> : <>নিরাপদে প্রবেশ করুন <ArrowRight /></>}</button>
          <div className="auth-switch"><span>{resetSent ? 'রিসেট নির্দেশনা ইমেইলে পাঠানো হয়েছে।' : 'পাসওয়ার্ড ভুলে গেছেন?'}</span><button type="button" disabled={!email.trim() || loading} onClick={reset}>রিসেট লিংক পাঠান</button></div>
          <div className="auth-security"><ShieldCheck size={14} /><span>পোর্টাল নির্বাচন কেবল অভিজ্ঞতা সাজায়; আসল অনুমতি ব্যক্তিগত Supabase account ও database policy যাচাই করে।</span></div>
          <button className="auth-text-back" type="button" onClick={onBack}>অন্য পোর্টাল বেছে নিন</button>
        </form>
      </section>
    </div>
  );
}

function WelcomeScreen({ onChooseRole, onInstall, theme, onTheme, setupNeeded }) {
  const portals = [
    {
      role: 'agent', icon: BriefcaseBusiness, title: 'Agent Portal', subtitle: 'এজেন্ট প্রবেশদ্বার', tone: 'agent',
      features: ['আবেদনকারী ব্যবস্থাপনা', 'ক্লায়েন্ট ডকুমেন্টস', 'ভিসা অপারেশন', 'A4 সামারি', 'অ্যাডমিন যোগাযোগ'],
      action: 'এজেন্ট হিসেবে প্রবেশ করুন',
    },
    {
      role: 'admin', icon: ShieldCheck, title: 'Admin Portal', subtitle: 'অ্যাডমিন কন্ট্রোল সেন্টার', tone: 'admin',
      features: ['আবেদন অনুমোদন', 'কনটেন্ট ম্যানেজমেন্ট', 'ডকুমেন্ট ম্যানেজমেন্ট', 'ভিসা আপডেট', 'AI সহকারী ও সেটিংস'],
      action: 'অ্যাডমিন হিসেবে প্রবেশ করুন',
    },
  ];
  const trust = [
    { icon: ShieldCheck, title: 'নিরাপদ', subtitle: 'আপনার ডেটা সুরক্ষিত' },
    { icon: Sparkles, title: 'দ্রুত', subtitle: 'সহজ, নির্ভরযোগ্য কাজ' },
    { icon: Earth, title: 'বিশ্বব্যাপী', subtitle: 'গন্তব্যভিত্তিক সেবা' },
    { icon: CircleCheck, title: 'বিশ্বস্ত', subtitle: 'মানব যাচাইসহ ওয়ার্কফ্লো' },
  ];

  return (
    <main className="welcome-shell">
      <header className="welcome-topbar">
        <span className="welcome-top-brand"><Logo /><span><b>FIRST FLY</b><small>INTERNATIONAL</small></span></span>
        <div className="welcome-top-actions">
          <button className="btn soft sm" type="button" onClick={onInstall}><Download size={15} /> অ্যাপ ইনস্টল</button>
          <button className="icon-btn" type="button" onClick={onTheme} aria-label="থিম পরিবর্তন">{theme === 'dark' ? <Sun /> : <Moon />}</button>
        </div>
      </header>

      <section className="welcome-intro">
        <img className="welcome-logo" src={asset("/brand/first-fly-logo-reference.png")} alt="First Fly International — Your Visa, Our Priority" />
        <h1>স্বাগতম</h1>
        <p>আপনি কীভাবে প্রবেশ করতে চান?</p>
      </section>

      <figure className="welcome-travel-hero">
        <img src={asset("/images/travel-hero-reference.png")} alt="আন্তর্জাতিক ভ্রমণ, বিমান, পাসপোর্ট ও গন্তব্যের দৃশ্য" />
        <figcaption><span>TRAVEL WITH CONFIDENCE</span><b>আপনার পরবর্তী গন্তব্যের প্রস্তুতি শুরু হোক সঠিকভাবে।</b></figcaption>
      </figure>

      <section className="portal-grid" aria-label="পোর্টাল নির্বাচন">
        {portals.map(({ role, icon: Icon, title, subtitle, tone, features, action }) => (
          <motion.button key={role} type="button" className={`portal-card ${tone}`} onClick={() => onChooseRole(role)} whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
            <span className="portal-card-top"><span className="portal-icon"><Icon size={27} /></span><span className="portal-arrow"><ArrowRight size={17} /></span></span>
            <span className="portal-heading"><b>{title}</b><small>{subtitle}</small></span>
            <ul>{features.map((feature) => <li key={feature}><CircleCheck size={15} />{feature}</li>)}</ul>
            <span className="portal-cta">{action}<ArrowRight size={17} /></span>
          </motion.button>
        ))}
      </section>

      {setupNeeded && <div className="welcome-setup-note"><KeyRound size={15} /><span>বাস্তব প্রবেশের আগে Supabase workspace সেটআপ প্রয়োজন। কোনো shared PIN বা demo account ব্যবহার করা হয় না।</span></div>}

      <section className="welcome-trust" aria-label="First Fly সুবিধা">
        {trust.map(({ icon: Icon, title, subtitle }) => <div className="trust-item" key={title}><span><Icon size={18} /></span><b>{title}</b><small>{subtitle}</small></div>)}
      </section>
      <footer className="welcome-footer"><span>First Fly International Visa Agency</span><small>Your Visa, Our Priority</small><small className="welcome-footer-bn">আপনার ভিসা, আমাদের অগ্রাধিকার</small></footer>
    </main>
  );
}

function SetupScreen({ theme, onTheme, onInstall, onBack }) {
  return (
    <div className="setup-shell">
      <div className="setup-inner">
        <div className="setup-top">
          <Brand />
          <div className="setup-top-actions">
            {onBack && <button className="btn soft sm" type="button" onClick={onBack}><ArrowLeft size={15} /> পোর্টাল</button>}
            <button className="btn soft sm" type="button" onClick={onInstall}>
              <Download size={15} /> অ্যাপ ইনস্টল নির্দেশনা
            </button>
            <button className="icon-btn" type="button" onClick={onTheme} aria-label="থিম পরিবর্তন">
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
        <section className="setup-banner">
          <div>
            <span className="eyebrow"><span className="star">✦</span> First Fly International · production setup</span>
            <h1>নিরাপদ ওয়ার্কস্পেস সংযোগ এখনো কনফিগার করা হয়নি।</h1>
            <p>এই preview-তে কোনো demo login বা fake applicant/content দেখানো হচ্ছে না। Supabase project credentials ও database migration যুক্ত হলে authentication, case data এবং realtime content বাস্তব backend থেকে আসবে।</p>
          </div>
          <div className="config-list">
            <b>প্রয়োজনীয় public client config</b>
            {missingPublicConfig.map((key) => <div className="config-line" key={key}><KeyRound size={12} />{key}</div>)}
            <p>Project root-এর <code>.env.local</code> পূরণ করে dev server restart করুন। Client-এ শুধু Supabase publishable/anon key থাকবে; service-role, Gemini ও Google secret কেবল Supabase Edge Function secrets-এ রাখুন।</p>
          </div>
        </section>
        <div className="setup-grid">
          <article className="glass setup-feature">
            <span className="setting-icon"><ShieldCheck /></span>
            <b>বাস্তব Authentication</b>
            <p>Supabase Auth email/password, Admin invite এবং database role policy।</p>
          </article>
          <article className="glass setup-feature">
            <span className="setting-icon"><FolderOpen /></span>
            <b>Private document storage</b>
            <p>RLS-নিয়ন্ত্রিত Supabase Storage; applicant access অনুযায়ী ফাইল অনুমতি।</p>
          </article>
          <article className="glass setup-feature">
            <span className="setting-icon"><Activity /></span>
            <b>Realtime operations</b>
            <p>Visa update, approval, notification ও team message database event থেকে আসবে।</p>
          </article>
        </div>
        <div className="notice warn setup-disclaimer"><TriangleAlert size={15} /><div><strong>কোনো mock data নেই।</strong> Backend কনফিগার না হওয়া পর্যন্ত sign-in, upload, AI, Drive বা publish action চালু করা হয়নি। Setup steps: <b>README.md → Supabase + Vercel Setup</b>.</div></div>
      </div>
    </div>
  );
}

var ADMIN_NAV = [
  { id: "home", label: "\u09A1\u09CD\u09AF\u09BE\u09B6\u09AC\u09CB\u09B0\u09CD\u09A1", icon: LayoutDashboard, group: "\u0995\u09B0\u09CD\u09AE\u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u09A8\u09BE" },
  { id: "applicants", label: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0", icon: Users },
  { id: "new-applicant", label: "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0", icon: CirclePlus },
  { id: "approvals", label: "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7", icon: ClipboardCheck, badge: true },
  { id: "content", label: "\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09B8\u09CD\u099F\u09C1\u09A1\u09BF\u0993", icon: Newspaper, group: "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09A8\u09BE" },
  { id: "countries", label: "\u09A6\u09C7\u09B6 \u0993 \u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF", icon: Earth },
  { id: "documents", label: "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u09B2\u09BE\u0987\u09AC\u09CD\u09B0\u09C7\u09B0\u09BF", icon: FolderOpen },
  { id: "chat", label: "\u099F\u09BF\u09AE \u099A\u09CD\u09AF\u09BE\u099F", icon: MessageCircle, group: "\u099F\u09BF\u09AE" },
  { id: "notifications", label: "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8", icon: Bell, badge: "notifications" },
  { id: "google", label: "Google Workspace", icon: Cloud, group: "\u0987\u09A8\u09CD\u099F\u09BF\u0997\u09CD\u09B0\u09C7\u09B6\u09A8" },
  { id: "ai", label: "AI \u09B8\u09B9\u0995\u09BE\u09B0\u09C0", icon: WandSparkles },
  { id: "activity", label: "\u0985\u09CD\u09AF\u09BE\u0995\u09CD\u099F\u09BF\u09AD\u09BF\u099F\u09BF \u09B2\u0997", icon: Activity, group: "\u09B8\u09BF\u09B8\u09CD\u099F\u09C7\u09AE" },
  { id: "settings", label: "\u09B8\u09C7\u099F\u09BF\u0982\u09B8", icon: Settings }
];
var AGENT_NAV = [
  { id: "home", label: "\u09B9\u09CB\u09AE", icon: House, group: "\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8" },
  { id: "applicants", label: "\u0986\u09AE\u09BE\u09B0 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0", icon: BriefcaseBusiness },
  { id: "new-applicant", label: "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0", icon: CirclePlus },
  { id: "documents", label: "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8", icon: FolderOpen },
  { id: "updates", label: "\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F", icon: Newspaper, group: "\u09A4\u09A5\u09CD\u09AF" },
  { id: "country-browse", label: "\u09A6\u09C7\u09B6 \u0993 \u09AD\u09BF\u09B8\u09BE", icon: Earth },
  { id: "chat", label: "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u099A\u09CD\u09AF\u09BE\u099F", icon: MessageCircle, group: "\u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997" },
  { id: "notifications", label: "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8", icon: Bell, badge: "notifications" },
  { id: "profile", label: "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2", icon: UserRound, group: "\u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F" }
];
function App() {
  const prefersReducedMotion2 = useReducedMotion();
  const [theme, setTheme] = (0, import_react27.useState)(() => {
    try {
      return localStorage.getItem("firstfly.theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [session, setSession] = (0, import_react27.useState)(void 0);
  const [authReady, setAuthReady] = (0, import_react27.useState)(false);
  const [profile, setProfile] = (0, import_react27.useState)(null);
  const [profileError, setProfileError] = (0, import_react27.useState)("");
  const [profileRetry, setProfileRetry] = (0, import_react27.useState)(0);
  const [passwordRecovery, setPasswordRecovery] = (0, import_react27.useState)(false);
  const [page, setPage] = (0, import_react27.useState)("home");
  const [selectedId, setSelectedId] = (0, import_react27.useState)(null);
  const [data, setData] = (0, import_react27.useState)({ countries: [], categories: [], checklists: [], updates: [], blogs: [], applicants: [], approvals: [], documents: [], extractions: [], reports: [], notifications: [], profiles: [], settings: null });
  const [loading, setLoading] = (0, import_react27.useState)(false);
  const [refreshing, setRefreshing] = (0, import_react27.useState)(false);
  const [dataError, setDataError] = (0, import_react27.useState)("");
  const [toasts, setToasts] = (0, import_react27.useState)([]);
  const [modal, setModal] = (0, import_react27.useState)(null);
  const [search, setSearch] = (0, import_react27.useState)("");
  const [stageFilter, setStageFilter] = (0, import_react27.useState)("all");
  const [installPrompt, setInstallPrompt] = (0, import_react27.useState)(null);
  const [googleStatus, setGoogleStatus] = (0, import_react27.useState)(null);
  const [authLoading, setAuthLoading] = (0, import_react27.useState)(false);
  const [authError, setAuthError] = (0, import_react27.useState)("");
  const [portalRole, setPortalRole] = (0, import_react27.useState)(null);
  const [mobileMenu, setMobileMenu] = (0, import_react27.useState)(false);
  const [aiMessages, setAiMessages] = (0, import_react27.useState)([]);
  const [chatMessages, setChatMessages] = (0, import_react27.useState)([]);
  const [chatConversation, setChatConversation] = (0, import_react27.useState)(null);
  const [chatLoading, setChatLoading] = (0, import_react27.useState)(false);
  const [operationLoading, setOperationLoading] = (0, import_react27.useState)("");
  const toastTimer = (0, import_react27.useRef)(/* @__PURE__ */ new Map());
  const admin = profile?.role === "admin";
  const navItems = admin ? ADMIN_NAV : AGENT_NAV;
  const currentApplicant = (0, import_react27.useMemo)(() => data.applicants.find((row) => row.id === selectedId) || null, [data.applicants, selectedId]);
  const currentUpdate = (0, import_react27.useMemo)(() => data.updates.find((row) => row.id === selectedId) || null, [data.updates, selectedId]);
  const currentBlog = (0, import_react27.useMemo)(() => data.blogs.find((row) => row.id === selectedId) || null, [data.blogs, selectedId]);
  const pushToast = (0, import_react27.useCallback)((message, tone = "success") => {
    const id3 = crypto.randomUUID();
    setToasts((current) => [...current, { id: id3, message, tone }]);
    const timer = setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id3)), 3600);
    toastTimer.current.set(id3, timer);
  }, []);
  const navigate = (0, import_react27.useCallback)((next, id3 = null) => {
    if (next === "new-applicant") {
      setModal({ type: "applicant-wizard" });
      setPage("home");
      setSelectedId(null);
      setMobileMenu(false);
      return;
    }
    setPage(next);
    setSelectedId(id3);
    setSearch("");
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion2 ? "auto" : "smooth" });
  }, [prefersReducedMotion2]);
  const toggleTheme = (0, import_react27.useCallback)(() => setTheme((value) => {
    const next = value === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("firstfly.theme", next);
    } catch {
    }
    document.documentElement.dataset.theme = next;
    return next;
  }), []);
  (0, import_react27.useEffect)(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#07162b" : "#f5f7fa";
  }, [theme]);
  (0, import_react27.useEffect)(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }
    let live = true;
    const invitationFlow = authLinkType === "invite";
    supabase.auth.getSession().then(({ data: result, error }) => {
      if (!live) return;
      if (error) setAuthError(error.message);
      setSession(result.session);
      setAuthReady(true);
    }).catch((error) => {
      if (live) {
        setAuthError(error.message || "\u09B2\u0997\u0987\u09A8 \u09B8\u09C7\u09B6\u09A8 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964");
        setAuthReady(true);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      if (event === "PASSWORD_RECOVERY" || invitationFlow && Boolean(nextSession)) setPasswordRecovery(true);
      if (!nextSession) {
        setPasswordRecovery(false);
        setProfile(null);
        setData({ countries: [], categories: [], checklists: [], updates: [], blogs: [], applicants: [], approvals: [], documents: [], extractions: [], reports: [], notifications: [], profiles: [], settings: null });
      }
    });
    return () => {
      live = false;
      listener.subscription.unsubscribe();
    };
  }, []);
  (0, import_react27.useEffect)(() => {
    let live = true;
    if (!session?.user?.id || !supabase) {
      setProfile(null);
      setProfileError("");
      return;
    }
    setLoading(true);
    setProfileError("");
    supabase.from("profiles").select("id,workspace_id,full_name,email,role,active,avatar_url,preferences").eq("id", session.user.id).maybeSingle().then(({ data: row, error }) => {
      if (!live) return;
      if (error) {
        setProfileError(`\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 \u09AA\u09A1\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`);
        setProfile(null);
      } else if (!row) {
        setProfileError("\u0986\u09AA\u09A8\u09BE\u09B0 \u099F\u09BF\u09AE \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC\u09A8\u09BF\u0964 Admin-\u0995\u09C7 \u0986\u09AE\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3 \u09AC\u09BE \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 \u09B8\u09C7\u099F\u0986\u09AA \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09AC\u09B2\u09C1\u09A8\u0964");
        setProfile(null);
      } else if (!row.active) {
        setProfileError("\u098F\u0987 \u099F\u09BF\u09AE \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u09A8\u09BF\u09B7\u09CD\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u0964 Admin-\u098F\u09B0 \u09B8\u0999\u09CD\u0997\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964");
        setProfile(null);
        supabase.auth.signOut();
      } else setProfile(row);
      setLoading(false);
    });
    return () => {
      live = false;
    };
  }, [session?.user?.id, profileRetry]);
  const refreshData = (0, import_react27.useCallback)(async ({ quiet = false } = {}) => {
    if (!supabase || !profile?.workspace_id) return;
    if (quiet) setRefreshing(true);
    else setLoading(true);
    setDataError("");
    const ws = profile.workspace_id;
    const run2 = async (name, query) => {
      const result = await query;
      return { name, data: result.data || [], error: result.error };
    };
    const jobs = [
      run2("\u09A6\u09C7\u09B6\u09B8\u09AE\u09C2\u09B9", supabase.from("countries").select("*").eq("workspace_id", ws).order("sort_order").limit(150)),
      run2("\u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF", supabase.from("visa_categories").select("*").eq("workspace_id", ws).order("sort_order").limit(150)),
      run2("\u09A6\u09C7\u09B6\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0995 \u099A\u09C7\u0995\u09B2\u09BF\u09B8\u09CD\u099F", supabase.from("country_checklists").select("*").eq("workspace_id", ws).limit(300)),
      run2("\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F", supabase.from("visa_updates").select("*").eq("workspace_id", ws).order("published_at", { ascending: false, nullsFirst: false }).limit(60)),
      run2("\u09AC\u09CD\u09B2\u0997", supabase.from("blog_posts").select("*").eq("workspace_id", ws).order("published_at", { ascending: false, nullsFirst: false }).limit(40)),
      run2("\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0", supabase.from("applicants").select("*").eq("workspace_id", ws).is("archived_at", null).order("created_at", { ascending: false }).limit(500)),
      run2("\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8", supabase.from("approval_requests").select("*").eq("workspace_id", ws).order("requested_at", { ascending: false }).limit(300)),
      run2("\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0\u09B0 \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F", supabase.from("applicant_documents").select("*").eq("workspace_id", ws).order("created_at", { ascending: false }).limit(600)),
      run2("AI extraction", supabase.from("ai_extracted_data").select("*").eq("workspace_id", ws).order("created_at", { ascending: false }).limit(400)),
      run2("\u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F", supabase.from("generated_reports").select("*").eq("workspace_id", ws).order("created_at", { ascending: false }).limit(150)),
      run2("\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8", supabase.from("notifications").select("*").eq("workspace_id", ws).eq("user_id", profile.id).order("created_at", { ascending: false }).limit(150)),
      run2("\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8 \u09B8\u09C7\u099F\u09BF\u0982\u09B8", supabase.from("workspace_settings").select("*").eq("workspace_id", ws).maybeSingle())
    ];
    if (profile.role === "admin") jobs.push(run2("\u099F\u09BF\u09AE \u09B8\u09A6\u09B8\u09CD\u09AF", supabase.from("profiles").select("id,full_name,email,role,active,created_at").eq("workspace_id", ws).order("created_at").limit(300)));
    const results = await Promise.all(jobs);
    const next = { countries: [], categories: [], checklists: [], updates: [], blogs: [], applicants: [], approvals: [], documents: [], extractions: [], reports: [], notifications: [], profiles: [], settings: null };
    const map = { "\u09A6\u09C7\u09B6\u09B8\u09AE\u09C2\u09B9": "countries", "\u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF": "categories", "\u09A6\u09C7\u09B6\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0995 \u099A\u09C7\u0995\u09B2\u09BF\u09B8\u09CD\u099F": "checklists", "\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F": "updates", "\u09AC\u09CD\u09B2\u0997": "blogs", "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0": "applicants", "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8": "approvals", "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0\u09B0 \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F": "documents", "AI extraction": "extractions", "\u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F": "reports", "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8": "notifications", "\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8 \u09B8\u09C7\u099F\u09BF\u0982\u09B8": "settings", "\u099F\u09BF\u09AE \u09B8\u09A6\u09B8\u09CD\u09AF": "profiles" };
    const issues = [];
    for (const result of results) {
      next[map[result.name]] = result.name === "\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8 \u09B8\u09C7\u099F\u09BF\u0982\u09B8" ? Array.isArray(result.data) ? result.data[0] || null : result.data : result.data;
      if (result.error) {
        issues.push(`${result.name}: ${result.error.message}`);
      }
    }
    setData(next);
    if (issues.length) setDataError(issues.slice(0, 2).join(" \xB7 "));
    setLoading(false);
    setRefreshing(false);
  }, [profile?.workspace_id, profile?.id, profile?.role]);
  (0, import_react27.useEffect)(() => {
    if (profile?.workspace_id) refreshData();
  }, [profile?.workspace_id, refreshData]);
  (0, import_react27.useEffect)(() => {
    if (!supabase || !profile?.workspace_id) return;
    const channel = supabase.channel(`first-fly-${profile.workspace_id}-${profile.id}`).on("postgres_changes", { event: "*", schema: "public", table: "visa_updates", filter: `workspace_id=eq.${profile.workspace_id}` }, () => refreshData({ quiet: true })).on("postgres_changes", { event: "*", schema: "public", table: "blog_posts", filter: `workspace_id=eq.${profile.workspace_id}` }, () => refreshData({ quiet: true })).on("postgres_changes", { event: "*", schema: "public", table: "applicants", filter: `workspace_id=eq.${profile.workspace_id}` }, () => refreshData({ quiet: true })).on("postgres_changes", { event: "*", schema: "public", table: "approval_requests", filter: `workspace_id=eq.${profile.workspace_id}` }, () => refreshData({ quiet: true })).on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${profile.id}` }, (payload) => {
      refreshData({ quiet: true });
      if (document.hidden && "Notification" in window && Notification.permission === "granted") new Notification(payload.new.title, { body: payload.new.body, icon: "/icon-192.png" });
    }).on("postgres_changes", { event: "*", schema: "public", table: "chat_messages", filter: `workspace_id=eq.${profile.workspace_id}` }, () => {
      if (page === "chat") loadChatMessages();
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.workspace_id, profile?.id, page, refreshData]);
  (0, import_react27.useEffect)(() => {
    const handleInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleInstall);
  }, []);
  (0, import_react27.useEffect)(() => {
    if (!profile || page !== "google") return;
    invokeFunction("google-connection-status").then(setGoogleStatus).catch((error) => setGoogleStatus({ status: "not_configured", error: error.message }));
  }, [profile?.id, page]);
  (0, import_react27.useEffect)(() => {
    const url = new URL(window.location.href);
    const outcome = url.searchParams.get("google");
    if (!outcome) return;
    url.searchParams.delete("google");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    setPage("google");
    if (outcome === "connected") pushToast("Google Workspace \u09B8\u0982\u09AF\u09CB\u0997 \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964", "success");
    else pushToast("Google Workspace \u09B8\u0982\u09AF\u09CB\u0997 \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09A8\u09BF; \u0995\u09A8\u09AB\u09BF\u0997\u09BE\u09B0\u09C7\u09B6\u09A8 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964", "error");
  }, []);
  const handleLogin = async (email, password, requestedRole) => {
    if (!supabase) return;
    setAuthLoading(true);
    setAuthError('');
    try {
      const { data: signedIn, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setAuthError(error.message.includes('Invalid login credentials') ? 'ইমেইল বা পাসওয়ার্ড সঠিক নয়।' : error.message);
        return;
      }
      if (requestedRole && signedIn.user?.id) {
        const { data: membership, error: roleError } = await supabase
          .from('profiles').select('role,active').eq('id', signedIn.user.id).maybeSingle();
        if (roleError || !membership?.active || membership.role !== requestedRole) {
          await supabase.auth.signOut();
          setAuthError('এই অ্যাকাউন্টে নির্বাচিত পোর্টালের অনুমতি নেই। আপনার Admin-এর সঙ্গে যোগাযোগ করুন।');
          return;
        }
      }
      setAuthError('');
      pushToast('নিরাপদভাবে লগইন হয়েছে।', 'success');
    } catch (error) {
      setAuthError(error.message || 'লগইন সংযোগ ব্যর্থ হয়েছে; আবার চেষ্টা করুন।');
    } finally {
      setAuthLoading(false);
    }
  };
  const handleReset = async (email) => {
    if (!supabase) return;
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
      if (error) {
        pushToast(`\u09B0\u09BF\u09B8\u09C7\u099F \u0987\u09AE\u09C7\u0987\u09B2 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
        return false;
      }
      pushToast("\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09B0\u09BF\u09B8\u09C7\u099F \u0987\u09AE\u09C7\u0987\u09B2 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964", "success");
      return true;
    } catch (error) {
      pushToast(`\u09B0\u09BF\u09B8\u09C7\u099F \u0987\u09AE\u09C7\u0987\u09B2 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };
  const handlePasswordUpdate = async (password) => {
    if (!supabase || password.length < 10) {
      setAuthError("\u09A8\u09A4\u09C1\u09A8 \u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u0985\u09A8\u09CD\u09A4\u09A4 10 \u0985\u0995\u09CD\u09B7\u09B0\u09C7\u09B0 \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) setAuthError(error.message);
      else {
        setPasswordRecovery(false);
        setAuthError("");
        pushToast("\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6\u09AD\u09BE\u09AC\u09C7 \u09B9\u09BE\u09B2\u09A8\u09BE\u0997\u09BE\u09A6 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964", "success");
      }
    } catch (error) {
      setAuthError(error.message || "\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09B9\u09BE\u09B2\u09A8\u09BE\u0997\u09BE\u09A6 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964");
    } finally {
      setAuthLoading(false);
    }
  };
  const signOut = async () => {
    await supabase?.auth.signOut();
    setPage("home");
    setProfile(null);
    setPasswordRecovery(false);
    setPortalRole(null);
    setAuthError("");
    pushToast("\u0986\u09AA\u09A8\u09BF \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6\u09C7 \u09B2\u0997\u0986\u0989\u099F \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u09A8\u0964", "success");
  };
  const run = async (label, fn) => {
    setOperationLoading(label);
    try {
      return await fn();
    } catch (error) {
      pushToast(error.message || "\u0995\u09BE\u099C\u099F\u09BF \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09A8\u09BF\u0964", "error");
      return null;
    } finally {
      setOperationLoading("");
    }
  };
  const dataRef = (0, import_react27.useRef)(data);
  dataRef.current = data;
  async function loadChatMessages(conversationId = chatConversation?.id) {
    if (!supabase || !profile || !conversationId) return;
    setChatLoading(true);
    const { data: rows, error } = await supabase.from("chat_messages").select("id,workspace_id,conversation_id,sender_id,body,attachment_path,attachment_name,related_applicant_id,created_at").eq("conversation_id", conversationId).order("created_at").limit(500);
    if (error) pushToast(`\u099A\u09CD\u09AF\u09BE\u099F \u09B2\u09CB\u09A1 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else setChatMessages(rows || []);
    setChatLoading(false);
  }
  (0, import_react27.useEffect)(() => {
    let alive = true;
    if (!supabase || !profile || page !== "chat") return;
    (async () => {
      setChatLoading(true);
      const { data: conversation, error } = await supabase.from("chat_conversations").select("*").eq("workspace_id", profile.workspace_id).eq("conversation_type", "team").maybeSingle();
      if (!alive) return;
      if (error) {
        pushToast(`\u099A\u09CD\u09AF\u09BE\u099F \u0995\u09A8\u09AD\u09BE\u09B0\u09B8\u09C7\u09B6\u09A8 \u0996\u09CB\u09B2\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
        setChatLoading(false);
        return;
      }
      if (!conversation) {
        setChatConversation(null);
        setChatMessages([]);
        setChatLoading(false);
        return;
      }
      setChatConversation(conversation);
      const { data: rows, messageError } = await supabase.from("chat_messages").select("*").eq("conversation_id", conversation.id).order("created_at").limit(500);
      if (!alive) return;
      if (messageError) pushToast(`\u09AE\u09C7\u09B8\u09C7\u099C \u09B2\u09CB\u09A1 \u09B9\u09AF\u09BC\u09A8\u09BF: ${messageError.message}`, "error");
      setChatMessages(rows || []);
      setChatLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [profile?.id, page]);
  const unread = data.notifications.filter((item) => !item.read_at).length;
  const visibleApplicants = (0, import_react27.useMemo)(() => {
    const query = search.trim().toLowerCase();
    return data.applicants.filter((row) => {
      const country = data.countries.find((item) => item.id === row.country_id);
      const category = data.categories.find((item) => item.id === row.visa_category_id);
      const status = data.approvals.find((item) => item.applicant_id === row.id);
      const joined = `${row.full_name} ${row.reference} ${row.passport_number} ${country?.name_bn || country?.name || ""} ${category?.name_bn || category?.name || ""}`.toLowerCase();
      const filterMatch = stageFilter === "all" || row.stage === stageFilter || status?.status === stageFilter;
      return joined.includes(query) && filterMatch;
    });
  }, [data.applicants, data.countries, data.categories, data.approvals, search, stageFilter]);
  if (!isSupabaseConfigured) return (
    <>
      {portalRole ? (
        <SetupScreen theme={theme} onTheme={toggleTheme} onInstall={() => setModal({ type: 'install' })} onBack={() => setPortalRole(null)} />
      ) : (
        <WelcomeScreen theme={theme} onTheme={toggleTheme} onInstall={() => setModal({ type: 'install' })} onChooseRole={setPortalRole} setupNeeded />
      )}
      {modal?.type === 'install' && <InstallHelpModal close={() => setModal(null)} />}
      <ToastStack items={toasts} />
    </>
  );
  if (!authReady) return /* @__PURE__ */ import_react27.default.createElement(LoadingScreen, { label: "\u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u09B8\u09C7\u09B6\u09A8 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09BE \u09B9\u099A\u09CD\u099B\u09C7..." });
  if (!session) return (
    <>
      {portalRole ? (
        <AuthScreen role={portalRole} onBack={() => { setPortalRole(null); setAuthError(''); }} onLogin={handleLogin} onReset={handleReset} loading={authLoading} error={authError} theme={theme} onTheme={toggleTheme} />
      ) : (
        <WelcomeScreen theme={theme} onTheme={toggleTheme} onInstall={() => setModal({ type: 'install' })} onChooseRole={setPortalRole} />
      )}
      {modal?.type === 'install' && <InstallHelpModal close={() => setModal(null)} />}
      <ToastStack items={toasts} />
    </>
  );
  if (passwordRecovery) return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement(PasswordRecoveryScreen, { onSave: handlePasswordUpdate, loading: authLoading, error: authError, theme, onTheme: toggleTheme }), /* @__PURE__ */ import_react27.default.createElement(ToastStack, { items: toasts }));
  if (loading && !profile && !profileError) return /* @__PURE__ */ import_react27.default.createElement(LoadingScreen, { label: "\u099F\u09BF\u09AE \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 \u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7..." });
  if (profileError && !profile) return /* @__PURE__ */ import_react27.default.createElement(ProfileError, { error: profileError, onRetry: () => {
    setProfileError("");
    setProfileRetry((value) => value + 1);
  }, onSignOut: signOut });
  if (!profile) return /* @__PURE__ */ import_react27.default.createElement(LoadingScreen, { label: "\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8 \u09A4\u09C8\u09B0\u09BF \u09B9\u099A\u09CD\u099B\u09C7..." });
  const common = { profile, admin, data, loading, refreshing, dataError, refreshData, visibleApplicants, navigate, pushToast, run, operationLoading, theme, toggleTheme, unread, installPrompt, setInstallPrompt, signOut, setModal, search, setSearch, stageFilter, setStageFilter, selectedId, setSelectedId, currentApplicant, currentUpdate, currentBlog, chatMessages, setChatMessages, chatConversation, chatLoading, loadChatMessages, aiMessages, setAiMessages, googleStatus, setGoogleStatus };
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "app-frame" }, /* @__PURE__ */ import_react27.default.createElement(Sidebar, { ...common, page, mobileMenu, onNavigate: navigate }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "workspace" }, /* @__PURE__ */ import_react27.default.createElement(TopBar, { ...common, page, onMenu: () => setMobileMenu((v) => !v), onNavigate: navigate }), /* @__PURE__ */ import_react27.default.createElement("main", { className: "main" }, dataError && /* @__PURE__ */ import_react27.default.createElement("div", { className: "error-banner" }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, { size: 15 }), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "\u0995\u09BF\u099B\u09C1 \u09A1\u09C7\u099F\u09BE \u09B2\u09CB\u09A1 \u09B9\u09AF\u09BC\u09A8\u09BF"), /* @__PURE__ */ import_react27.default.createElement("br", null), dataError), /* @__PURE__ */ import_react27.default.createElement("button", { onClick: () => refreshData({ quiet: true }) }, "\u0986\u09AC\u09BE\u09B0 \u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0995\u09B0\u09C1\u09A8")), /* @__PURE__ */ import_react27.default.createElement(AnimatePresence, { mode: "wait", initial: false }, /* @__PURE__ */ import_react27.default.createElement(motion.div, { key: page + (selectedId || ""), initial: prefersReducedMotion2 ? false : { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, exit: prefersReducedMotion2 ? {} : { opacity: 0, y: -3 }, transition: { duration: 0.16 } }, /* @__PURE__ */ import_react27.default.createElement(PageRouter, { ...common, page, setPage, setModal, setOperationLoading, operationLoading, aiMessages, setAiMessages, setGoogleStatus, googleStatus, chatConversation, setChatConversation, chatMessages, setChatMessages, chatLoading, loadChatMessages })))), /* @__PURE__ */ import_react27.default.createElement(DesktopFooter, { settings: data.settings })), /* @__PURE__ */ import_react27.default.createElement(MobileNav, { ...common, page, onNavigate: navigate }), /* @__PURE__ */ import_react27.default.createElement(ToastStack, { items: toasts }), /* @__PURE__ */ import_react27.default.createElement(ModalRouter, { modal, setModal, ...common, setOperationLoading }), /* @__PURE__ */ import_react27.default.createElement(LoadingOverlay, { label: operationLoading }));
}
var PAGE_TITLES = { home: ["First Fly \u09A1\u09C7\u09B8\u09CD\u0995", "\u09AA\u09CD\u09B0\u09A4\u09BF\u09A6\u09BF\u09A8\u09C7\u09B0 \u09AD\u09BF\u09B8\u09BE \u0985\u09AA\u09BE\u09B0\u09C7\u09B6\u09A8"], applicants: ["\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0", "\u09B8\u09AC \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u0993 \u09AB\u09BE\u0987\u09B2\u09C7\u09B0 \u0985\u0997\u09CD\u09B0\u0997\u09A4\u09BF"], applicant: ["\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09AB\u09BE\u0987\u09B2", "\u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u09A4\u09A5\u09CD\u09AF, \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u0993 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8"], approvals: ["\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A1\u09C7\u09B8\u09CD\u0995", "\u098F\u099C\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09AB\u09BE\u0987\u09B2 \u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE"], content: ["\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09B8\u09CD\u099F\u09C1\u09A1\u09BF\u0993", "\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F \u0993 \u09AC\u09CD\u09B2\u0997 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09A8\u09BE"], countries: ["\u09A6\u09C7\u09B6 \u0993 \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF", "\u0997\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF \u098F\u09AC\u0982 \u09AD\u09BF\u09B8\u09BE \u09B8\u09C7\u09AC\u09BE \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u09A8\u09BE"], documents: ["\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u09B2\u09BE\u0987\u09AC\u09CD\u09B0\u09C7\u09B0\u09BF", "\u0985\u09A8\u09C1\u09AE\u09A4\u09BF\u09B8\u09B9 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09A8\u09A5\u09BF"], chat: ["\u099F\u09BF\u09AE \u099A\u09CD\u09AF\u09BE\u099F", "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u0993 \u098F\u099C\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09B0\u09BF\u09AF\u09BC\u09C7\u09B2-\u099F\u09BE\u0987\u09AE \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE"], notifications: ["\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8", "\u0986\u09AA\u09A8\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09CD\u09B0\u09BE\u09B8\u0999\u09CD\u0997\u09BF\u0995 \u099F\u09BF\u09AE \u0986\u09AA\u09A1\u09C7\u099F"], google: ["Google Workspace", "OAuth-\u09B8\u09C1\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 Google \u0987\u09A8\u09CD\u099F\u09BF\u0997\u09CD\u09B0\u09C7\u09B6\u09A8"], ai: ["AI \u09B8\u09B9\u0995\u09BE\u09B0\u09C0", "Gemini-\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0995 \u09A8\u09A5\u09BF \u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE"], activity: ["\u0985\u09CD\u09AF\u09BE\u0995\u09CD\u099F\u09BF\u09AD\u09BF\u099F\u09BF \u09B2\u0997", "\u0985\u09A1\u09BF\u099F\u09AF\u09CB\u0997\u09CD\u09AF \u0995\u09BE\u099C\u09C7\u09B0 \u0987\u09A4\u09BF\u09B9\u09BE\u09B8"], settings: ["\u09B8\u09C7\u099F\u09BF\u0982\u09B8", "\u099F\u09BF\u09AE \u0993 \u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8 \u09AA\u099B\u09A8\u09CD\u09A6"], profile: ["\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2", "\u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u09A4\u09A5\u09CD\u09AF \u0993 \u09AA\u099B\u09A8\u09CD\u09A6"], blog: ["First Fly Insights", "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u0985\u09AD\u09BF\u09AC\u09BE\u09B8\u09A8 \u0993 \u09AD\u09BF\u09B8\u09BE \u09AC\u09BF\u09B7\u09AF\u09BC\u0995 \u09B2\u09C7\u0996\u09BE"], update: ["\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F", "\u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09B8\u09C2\u09A4\u09CD\u09B0\u09B8\u09B9 \u099F\u09BF\u09AE \u09AC\u09C1\u09B2\u09C7\u099F\u09BF\u09A8"], checklists: ["\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u099A\u09C7\u0995\u09B2\u09BF\u09B8\u09CD\u099F", "\u09A6\u09C7\u09B6 \u0993 \u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 \u09B6\u09B0\u09CD\u09A4"] };
PAGE_TITLES.updates = ["ভিসা আপডেট", "প্রকাশিত টিম বুলেটিন ও যাচাইকৃত সরকারি সূত্র"];
PAGE_TITLES["country-browse"] = ["দেশ ও ভিসা", "গন্তব্য, সেবা ও প্রাসঙ্গিক সরকারি তথ্য"];
PAGE_TITLES.more = ["আরও", "অ্যাডমিন অপারেশন ও ওয়ার্কস্পেস টুলস"];
function Sidebar({ profile, admin, page, navigate, unread, data, mobileMenu, onNavigate, signOut }) {
  const items = admin ? ADMIN_NAV : AGENT_NAV;
  const menu = /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement(Brand, { onClick: () => onNavigate("home") }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "workspace-chip" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "mark" }, /* @__PURE__ */ import_react27.default.createElement(Plane, { size: 14 })), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "First Fly Workspace"), /* @__PURE__ */ import_react27.default.createElement("small", null, admin ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u0985\u09AA\u09BE\u09B0\u09C7\u09B6\u09A8\u09B8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F \u09AA\u09CB\u09B0\u09CD\u099F\u09BE\u09B2")), /* @__PURE__ */ import_react27.default.createElement(ChevronDown, { size: 13, className: "muted" })), /* @__PURE__ */ import_react27.default.createElement("nav", { className: "side-nav", "aria-label": "\u09AA\u09CD\u09B0\u09A7\u09BE\u09A8 \u09A8\u09C7\u09AD\u09BF\u0997\u09C7\u09B6\u09A8" }, items.map((item, index) => /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, { key: item.id }, item.group && /* @__PURE__ */ import_react27.default.createElement("div", { className: "nav-label" }, item.group), /* @__PURE__ */ import_react27.default.createElement("button", { type: "button", className: cn("nav-link", page === item.id || item.id === "applicants" && page === "applicant" ? "active" : ""), onClick: () => navigate(item.id) }, /* @__PURE__ */ import_react27.default.createElement(item.icon, null), /* @__PURE__ */ import_react27.default.createElement("span", null, item.label), item.badge === "notifications" && unread > 0 ? /* @__PURE__ */ import_react27.default.createElement("span", { className: "nav-count" }, unread > 9 ? "9+" : unread) : item.badge === true && data.approvals.filter((row) => row.status === "pending").length > 0 ? /* @__PURE__ */ import_react27.default.createElement("span", { className: "nav-count" }, data.approvals.filter((row) => row.status === "pending").length) : null)))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "sidebar-bottom" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "sidebar-account" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "avatar" }, initials(profile.full_name)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "account-copy" }, /* @__PURE__ */ import_react27.default.createElement("b", null, profile.full_name), /* @__PURE__ */ import_react27.default.createElement("small", null, admin ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F", " \xB7 ", profile.email)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-btn", onClick: signOut, title: "\u09B2\u0997\u0986\u0989\u099F", "aria-label": "\u09B2\u0997\u0986\u0989\u099F" }, /* @__PURE__ */ import_react27.default.createElement(LogOut, { size: 14 })))));
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("aside", { className: "sidebar" }, menu), mobileMenu && /* @__PURE__ */ import_react27.default.createElement("div", { className: "mobile-drawer-backdrop", onClick: (event) => event.target === event.currentTarget && onNavigate(page) }, /* @__PURE__ */ import_react27.default.createElement("aside", { className: "mobile-drawer" }, menu)));
}
function TopBar({ profile, admin, page, navigate, onMenu, toggleTheme, theme, unread, refreshData, refreshing, installPrompt, setInstallPrompt }) {
  const title = PAGE_TITLES[page]?.[0] || "First Fly International";
  const runInstall = async () => {
    if (!installPrompt) {
      navigate("settings");
      return;
    }
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };
  return /* @__PURE__ */ import_react27.default.createElement("header", { className: "topbar" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-btn menu-mobile", onClick: onMenu, "aria-label": "\u09AE\u09C7\u09A8\u09C1 \u0996\u09C1\u09B2\u09C1\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(Menu, null)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "topbar-title" }, /* @__PURE__ */ import_react27.default.createElement("b", null, title), /* @__PURE__ */ import_react27.default.createElement("small", null, PAGE_TITLES[page]?.[1] || "First Fly International")), /* @__PURE__ */ import_react27.default.createElement("span", { className: "top-spacer" }), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-btn", onClick: runInstall, "aria-label": "\u0985\u09CD\u09AF\u09BE\u09AA \u0987\u09A8\u09B8\u09CD\u099F\u09B2 \u0995\u09B0\u09C1\u09A8", title: "\u0985\u09CD\u09AF\u09BE\u09AA \u0987\u09A8\u09B8\u09CD\u099F\u09B2" }, " ", /* @__PURE__ */ import_react27.default.createElement(ArrowDownToLine, null)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-btn", onClick: () => refreshData({ quiet: true }), disabled: refreshing, "aria-label": "\u09B0\u09BF\u09AB\u09CD\u09B0\u09C7\u09B6", title: "\u09B0\u09BF\u09AB\u09CD\u09B0\u09C7\u09B6" }, refreshing ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(RefreshCw, null)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-btn", onClick: toggleTheme, "aria-label": "\u09A5\u09BF\u09AE \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8", title: "\u09A5\u09BF\u09AE \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8" }, theme === "dark" ? /* @__PURE__ */ import_react27.default.createElement(Sun, null) : /* @__PURE__ */ import_react27.default.createElement(Moon, null)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-btn", onClick: () => navigate("notifications"), "aria-label": "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8", title: "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(Bell, null), unread > 0 && /* @__PURE__ */ import_react27.default.createElement("i", { className: "badge-dot" })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "header-user" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "header-user-copy" }, /* @__PURE__ */ import_react27.default.createElement("b", null, profile.full_name), /* @__PURE__ */ import_react27.default.createElement("small", null, admin ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F")), /* @__PURE__ */ import_react27.default.createElement("span", { className: "avatar" }, initials(profile.full_name))));
}
function MobileNav({ page, admin, navigate }) {
  const items = admin ? [["home", House, "\u09B9\u09CB\u09AE"], ["applicants", Users, "\u09AB\u09BE\u0987\u09B2"], ["ai", WandSparkles, "AI"], ["approvals", ClipboardCheck, "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8"], ["more", Ellipsis, "\u0986\u09B0\u0993"]] : [["home", House, "\u09B9\u09CB\u09AE"], ["applicants", BriefcaseBusiness, "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0"], ["new-applicant", Plus, "\u09A8\u09A4\u09C1\u09A8"], ["chat", MessageCircle, "\u099A\u09CD\u09AF\u09BE\u099F"], ["profile", UserRound, "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2"]];
  return /* @__PURE__ */ import_react27.default.createElement("nav", { className: "mobile-bottom", "aria-label": "\u09AE\u09CB\u09AC\u09BE\u0987\u09B2 \u09A8\u09C7\u09AD\u09BF\u0997\u09C7\u09B6\u09A8" }, items.map(([id3, Icon2, label]) => /* @__PURE__ */ import_react27.default.createElement("button", { key: id3, className: cn("mobile-nav-item", id3 === "ai" || id3 === "new-applicant" ? "center" : "", admin && id3 === "ai" ? "admin" : "", page === id3 || id3 === "applicants" && page === "applicant" ? "active" : ""), onClick: () => navigate(id3) }, id3 === "ai" || id3 === "new-applicant" ? /* @__PURE__ */ import_react27.default.createElement("span", { className: "nav-orb" }, /* @__PURE__ */ import_react27.default.createElement(Icon2, null)) : /* @__PURE__ */ import_react27.default.createElement(Icon2, null), /* @__PURE__ */ import_react27.default.createElement("span", null, label))));
}
function DesktopFooter({ settings }) {
  return /* @__PURE__ */ import_react27.default.createElement("footer", { className: "desktop-footer" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " ", settings?.brand_name || "First Fly International", " \xB7 \u0986\u09AA\u09A8\u09BE\u09B0 \u09AD\u09BF\u09B8\u09BE, \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u0985\u0997\u09CD\u09B0\u09BE\u09A7\u09BF\u0995\u09BE\u09B0"), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, { size: 11 }), " \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u099F\u09BF\u09AE \u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8"));
}
function ToastStack({ items }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "toast-stack", "aria-live": "polite" }, items.map((item) => /* @__PURE__ */ import_react27.default.createElement("div", { className: "toast", key: item.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: item.tone === "error" ? "toast-error-icon" : "" }, item.tone === "error" ? /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null) : /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, item.message))));
}
function LoadingScreen({ label }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "loading-shell" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass loading-card" }, /* @__PURE__ */ import_react27.default.createElement(Logo, { large: true }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "skeleton skeleton-line" }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "skeleton skeleton-line", style: { width: "48%" } }), /* @__PURE__ */ import_react27.default.createElement(LoadingDots, { label })));
}
function LoadingOverlay({ label }) {
  return label ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "loading-overlay", role: "status" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "loader-ring" }, /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" })), /* @__PURE__ */ import_react27.default.createElement("b", null, label), /* @__PURE__ */ import_react27.default.createElement("small", null, "\u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u098F\u0987 \u09AA\u09C7\u099C \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE")) : null;
}
function ProfileError({ error, onRetry, onSignOut }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "profile-error" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass profile-error-card" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "empty-icon" }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null)), /* @__PURE__ */ import_react27.default.createElement("h2", null, "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF"), /* @__PURE__ */ import_react27.default.createElement("p", null, error), /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn", onClick: onRetry }, "\u0986\u09AC\u09BE\u09B0 \u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0995\u09B0\u09C1\u09A8 ", /* @__PURE__ */ import_react27.default.createElement(RefreshCw, null)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass", onClick: onSignOut }, "\u09B2\u0997\u0986\u0989\u099F"))));
}
function PageRouter(props) {
  const { page, admin, data, loading, refreshData, visibleApplicants, navigate, pushToast, setModal, profile, currentApplicant, currentUpdate, currentBlog, search, setSearch, stageFilter, setStageFilter, operationLoading, setOperationLoading, chatMessages, chatConversation, chatLoading, loadChatMessages, aiMessages, setAiMessages, googleStatus, setGoogleStatus, run, theme, toggleTheme, installPrompt, setInstallPrompt, signOut } = props;
  switch (page) {
    case "home":
      return /* @__PURE__ */ import_react27.default.createElement(HomePage, { ...props });
    case "applicants":
      return /* @__PURE__ */ import_react27.default.createElement(ApplicantsPage, { ...props });
    case "applicant":
      return /* @__PURE__ */ import_react27.default.createElement(ApplicantDetailPage, { ...props });
    case "approvals":
      return admin ? /* @__PURE__ */ import_react27.default.createElement(ApprovalsPage, { ...props }) : /* @__PURE__ */ import_react27.default.createElement(RestrictedPage, null);
    case "content":
      return admin ? /* @__PURE__ */ import_react27.default.createElement(ContentPage, { ...props }) : /* @__PURE__ */ import_react27.default.createElement(RestrictedPage, null);
    case "countries":
      return admin ? /* @__PURE__ */ import_react27.default.createElement(CountriesPage, { ...props }) : /* @__PURE__ */ import_react27.default.createElement(RestrictedPage, null);
    case "country-browse":
      return /* @__PURE__ */ import_react27.default.createElement(CountryBrowsePage, { ...props });
    case "updates":
      return /* @__PURE__ */ import_react27.default.createElement(UpdatesPage, { ...props });
    case "documents":
      return /* @__PURE__ */ import_react27.default.createElement(DocumentsPage, { ...props });
    case "chat":
      return /* @__PURE__ */ import_react27.default.createElement(ChatPage, { ...props });
    case "notifications":
      return /* @__PURE__ */ import_react27.default.createElement(NotificationsPage, { ...props });
    case "google":
      return /* @__PURE__ */ import_react27.default.createElement(GooglePage, { ...props });
    case "ai":
      return admin ? /* @__PURE__ */ import_react27.default.createElement(AiPage, { ...props }) : /* @__PURE__ */ import_react27.default.createElement(RestrictedPage, null);
    case "activity":
      return admin ? /* @__PURE__ */ import_react27.default.createElement(ActivityPage, { ...props }) : /* @__PURE__ */ import_react27.default.createElement(RestrictedPage, null);
    case "settings":
      return /* @__PURE__ */ import_react27.default.createElement(SettingsPage, { ...props });
    case "profile":
      return /* @__PURE__ */ import_react27.default.createElement(ProfilePage, { ...props });
    case "more":
      return admin ? /* @__PURE__ */ import_react27.default.createElement(AdminMorePage, { ...props }) : /* @__PURE__ */ import_react27.default.createElement(ProfilePage, { ...props });
    case "update":
      return /* @__PURE__ */ import_react27.default.createElement(UpdateDetailPage, { ...props, update: currentUpdate });
    case "blog":
      return /* @__PURE__ */ import_react27.default.createElement(BlogDetailPage, { ...props, blog: currentBlog });
    case "checklists":
      return admin ? /* @__PURE__ */ import_react27.default.createElement(ChecklistsPage, { ...props }) : /* @__PURE__ */ import_react27.default.createElement(RestrictedPage, null);
    case "report":
      return /* @__PURE__ */ import_react27.default.createElement(ReportPage, { ...props });
    default:
      return /* @__PURE__ */ import_react27.default.createElement(HomePage, { ...props });
  }
}
function RestrictedPage() {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u098F\u0987 \u0985\u0982\u09B6\u09C7 \u0985\u09CD\u09AF\u09BE\u0995\u09CD\u09B8\u09C7\u09B8 \u09A8\u09C7\u0987"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2\u09C7\u09B0 workspace role \u098F\u0987 \u0995\u09BE\u099C\u09C7\u09B0 \u0985\u09A8\u09C1\u09AE\u09A4\u09BF \u09A6\u09C7\u09AF\u09BC \u09A8\u09BE\u0964 \u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8\u09C7\u09B0 \u09B8\u0999\u09CD\u0997\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964")));
}
var countryFor = (rows, id3) => rows.find((row) => row.id === id3) || null;
var categoryFor = (rows, id3) => rows.find((row) => row.id === id3) || null;
var countryLabel = (row) => row?.name_bn || row?.name || "\u09A6\u09C7\u09B6 \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09BF\u09A4 \u09A8\u09AF\u09BC";
var categoryLabel = (row) => row?.name_bn || row?.name || "\u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF";
var latestApproval = (rows, applicantId) => rows.filter((row) => row.applicant_id === applicantId).sort((a, b) => new Date(b.requested_at) - new Date(a.requested_at))[0] || null;
var isPublished = (row) => row?.status === "published";
function Hero({ profile, admin, onNew, onApplicants }) {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "\u09B8\u09C1\u09AA\u09CD\u09B0\u09AD\u09BE\u09A4" : hour < 17 ? "\u09B6\u09C1\u09AD \u09A6\u09C1\u09AA\u09C1\u09B0" : "\u09B6\u09C1\u09AD \u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE";
  return /* @__PURE__ */ import_react27.default.createElement("section", { className: "hero" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "hero-ornament" }, /* @__PURE__ */ import_react27.default.createElement(Plane, null)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "hero-content" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "eyebrow" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "star" }, "\u2726"), " ", admin ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u0985\u09AA\u09BE\u09B0\u09C7\u09B6\u09A8\u09B8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F \u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8", " \xB7 ", formatDate(/* @__PURE__ */ new Date())), /* @__PURE__ */ import_react27.default.createElement("h1", null, greeting, ", ", profile.full_name?.split(" ")[0], "\u0964", /* @__PURE__ */ import_react27.default.createElement("br", null), admin ? "\u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09AB\u09BE\u0987\u09B2\u09C7\u09B0 \u0985\u0997\u09CD\u09B0\u0997\u09A4\u09BF \u098F\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09AF\u09BC\u0964" : "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u09AD\u09BF\u09B8\u09BE \u09AB\u09BE\u0987\u09B2\u099F\u09BF \u0997\u09C1\u099B\u09BF\u09AF\u09BC\u09C7 \u09A8\u09BF\u09A8\u0964"), /* @__PURE__ */ import_react27.default.createElement("p", null, admin ? "\u098F\u099C\u09C7\u09A8\u09CD\u099F\u09A6\u09C7\u09B0 \u0986\u09AC\u09C7\u09A6\u09A8 \u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE \u0995\u09B0\u09C1\u09A8, \u0997\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0995 \u0986\u09AA\u09A1\u09C7\u099F \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C1\u09A8 \u098F\u09AC\u0982 \u099F\u09BF\u09AE\u09C7\u09B0 \u0995\u09BE\u099C\u0995\u09C7 \u09A7\u09BE\u09B0\u09BE\u09AC\u09BE\u09B9\u09BF\u0995 \u09B0\u09BE\u0996\u09C1\u09A8\u0964" : "\u0995\u09CD\u09B2\u09BE\u09AF\u09BC\u09C7\u09A8\u09CD\u099F \u09A4\u09A5\u09CD\u09AF, \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F, \u0986\u09AA\u09A1\u09C7\u099F \u0993 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8\u09C7\u09B0 \u09A7\u09BE\u09AA\u2014\u09B8\u09AC \u098F\u0995 \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8\u09C7 \u09B0\u09BE\u0996\u09C1\u09A8\u0964"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "hero-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", onClick: onNew }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass", onClick: onApplicants }, /* @__PURE__ */ import_react27.default.createElement(Users, null), "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09A6\u09C7\u0996\u09C1\u09A8"))));
}
function StatCard({ label, value, icon: Icon2, tone = "blue", note }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass stat" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "stat-top" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "stat-icon" }, /* @__PURE__ */ import_react27.default.createElement(Icon2, null)), note && /* @__PURE__ */ import_react27.default.createElement(Pill, { tone }, note)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "stat-value" }, value), /* @__PURE__ */ import_react27.default.createElement("div", { className: "stat-label" }, label));
}
function QuickAction({ icon: Icon2, title, sub, onClick }) {
  return /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass quick-action", type: "button", onClick }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "quick-icon" }, /* @__PURE__ */ import_react27.default.createElement(Icon2, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, title), /* @__PURE__ */ import_react27.default.createElement("small", null, sub)));
}
function latestCountryUpdate(updates, countryId) {
  return (updates || []).filter((row) => row.country_id === countryId && isPublished(row)).sort((a, b) => Date.parse(b.published_at || b.created_at || 0) - Date.parse(a.published_at || a.created_at || 0))[0] || null;
}
function CountryCard({ country, onClick, latestUpdate }) {
  return <button className="glass country-card" type="button" onClick={onClick}>
    <span className="flag">{country.flag_emoji || '🌐'}</span>
    <b>{countryLabel(country)}</b>
    <small>{country.region || 'Visa destination'}</small>
    <small className={cn('country-latest', !latestUpdate && 'country-latest-empty')}>
      {latestUpdate ? <><i aria-hidden="true" />সর্বশেষ আপডেট · {formatDate(latestUpdate.published_at, { day: '2-digit', month: 'short' })}</> : 'এখনো কোনো প্রকাশিত আপডেট নেই'}
    </small>
    <span className="country-arrow"><ArrowUpRight /></span>
  </button>;
}
function VisaUpdateCard({ update, country, onClick }) {
  return /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass news-card", type: "button", onClick }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "news-top" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "country-chip" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "flag" }, country?.flag_emoji || "\u{1F310}"), countryLabel(country)), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: update.category === "urgent" ? "orange" : "blue" }, update.category === "urgent" ? "\u099C\u09B0\u09C1\u09B0\u09BF" : "\u0986\u09AA\u09A1\u09C7\u099F")), /* @__PURE__ */ import_react27.default.createElement("h3", null, update.title_bn || update.title), /* @__PURE__ */ import_react27.default.createElement("p", null, update.body_bn || update.body), /* @__PURE__ */ import_react27.default.createElement("span", { className: "news-meta" }, /* @__PURE__ */ import_react27.default.createElement("span", null, update.published_at ? formatDate(update.published_at) : "\u2014"), /* @__PURE__ */ import_react27.default.createElement(ArrowRight, { size: 12 })));
}
function BlogCard({ blog, country, onClick }) {
  const image = blog.cover_image_path && supabase ? supabase.storage.from("published-content").getPublicUrl(blog.cover_image_path).data.publicUrl : null;
  return /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass article-card", type: "button", onClick }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "article-cover" }, image ? /* @__PURE__ */ import_react27.default.createElement("img", { src: image, alt: "", loading: "lazy" }) : /* @__PURE__ */ import_react27.default.createElement(BookOpen, null)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "article-content" }, /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "orange" }, countryLabel(country) || "First Fly Insights"), /* @__PURE__ */ import_react27.default.createElement("h3", null, blog.title_bn || blog.title), /* @__PURE__ */ import_react27.default.createElement("p", null, blog.excerpt_bn || blog.title), /* @__PURE__ */ import_react27.default.createElement("footer", null, /* @__PURE__ */ import_react27.default.createElement("span", null, formatDate(blog.published_at)), /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AA\u09A1\u09BC\u09C1\u09A8 ", /* @__PURE__ */ import_react27.default.createElement(ArrowRight, { size: 10 })))));
}
function ApplicantRow({ applicant, data, navigate, admin }) {
  const country = countryFor(data.countries, applicant.country_id);
  const category = categoryFor(data.categories, applicant.visa_category_id);
  const approval = latestApproval(data.approvals, applicant.id);
  const health = passportState(applicant.passport_expiry);
  return /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass applicant-row", type: "button", onClick: () => navigate("applicant", applicant.id) }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "applicant-main" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "flag-square" }, country?.flag_emoji || "\u{1F310}"), /* @__PURE__ */ import_react27.default.createElement("span", { className: "applicant-copy" }, /* @__PURE__ */ import_react27.default.createElement("b", null, applicant.full_name), /* @__PURE__ */ import_react27.default.createElement("small", null, /* @__PURE__ */ import_react27.default.createElement("span", null, countryLabel(country)), /* @__PURE__ */ import_react27.default.createElement("span", null, "\xB7"), /* @__PURE__ */ import_react27.default.createElement("span", null, categoryLabel(category)), /* @__PURE__ */ import_react27.default.createElement("span", null, "\xB7"), /* @__PURE__ */ import_react27.default.createElement("span", null, applicant.reference)))), /* @__PURE__ */ import_react27.default.createElement("span", { className: "applicant-side" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "ref" }, admin ? applicant.reference : formatDate(applicant.created_at, { day: "2-digit", month: "short" })), /* @__PURE__ */ import_react27.default.createElement(Status, { value: approval?.status || applicant.stage }), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: health.type === "warning" || health.type === "expired" || health.type === "missing" ? "red" : "green" }, health.label)));
}
function HomePage(props) {
  const { profile, admin, data, loading, visibleApplicants, navigate, setModal, pushToast } = props;
  const applications = visibleApplicants.slice(0, 5);
  const publishedUpdates = data.updates.filter(isPublished).slice(0, 6);
  const publishedBlogs = data.blogs.filter(isPublished).slice(0, 3);
  const pending = data.approvals.filter((row) => row.status === "pending");
  const alertCases = visibleApplicants.filter((row) => ["warning", "expired", "missing"].includes(passportState(row.passport_expiry).type));
  const quick = admin ? [[ClipboardCheck, "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A6\u09C7\u0996\u09C1\u09A8", "\u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3 \u09AB\u09BE\u0987\u09B2", () => navigate("approvals")], [Newspaper, "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AA\u09A1\u09C7\u099F", "\u098F\u099C\u09C7\u09A8\u09CD\u099F\u0995\u09C7 \u099C\u09BE\u09A8\u09BE\u09A4\u09C7", () => setModal({ type: "content-editor", kind: "update" })], [FileText, "\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09B2\u09BF\u0996\u09C1\u09A8", "Blog / Insights", () => setModal({ type: "content-editor", kind: "blog" })], [Users, "\u099F\u09BF\u09AE \u09A6\u09C7\u0996\u09C1\u09A8", "Agent profiles", () => navigate("settings")]] : [[CirclePlus, "\u0986\u09AC\u09C7\u09A6\u09A8 \u09A4\u09C8\u09B0\u09BF", "\u09A8\u09A4\u09C1\u09A8 \u0995\u09CD\u09B2\u09BE\u09AF\u09BC\u09C7\u09A8\u09CD\u099F \u09AB\u09BE\u0987\u09B2", () => navigate("new-applicant")], [FolderOpen, "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8", "\u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u09AB\u09BE\u0987\u09B2 \u09AD\u09BF\u0989", () => navigate("documents")], [MessageCircle, "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8\u0995\u09C7 \u09B2\u09BF\u0996\u09C1\u09A8", "\u099F\u09BF\u09AE \u099A\u09CD\u09AF\u09BE\u099F", () => navigate("chat")], [Bell, "\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F", "\u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7 \u099F\u09BF\u09AE \u09A8\u09CB\u099F", () => navigate("updates")]];
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "First Fly \u09B9\u09CB\u09AE"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AC\u09CD\u09B0\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1, \u09A6\u09B0\u0995\u09BE\u09B0\u09BF \u09B8\u09C7\u09AC\u09BE \u0993 \u09B8\u09BE\u09AE\u09CD\u09AA\u09CD\u09B0\u09A4\u09BF\u0995 \u0985\u09AA\u09BE\u09B0\u09C7\u09B6\u09A8\u2014\u098F\u0995\u099F\u09BF editorial desk-\u098F\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "green", icon: Activity }, "\u09B2\u09BE\u0987\u09AD \u09A1\u09C7\u099F\u09BE\u09AC\u09C7\u09B8"))), /* @__PURE__ */ import_react27.default.createElement(Hero, { profile, admin, onNew: () => navigate("new-applicant"), onApplicants: () => navigate("applicants") }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "quick-grid" }, quick.map(([Icon2, title, sub, onClick]) => /* @__PURE__ */ import_react27.default.createElement(QuickAction, { key: title, icon: Icon2, title, sub, onClick }))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "home-layout", style: { marginTop: 18 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "editorial-main" }, /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u09AD\u09BF\u09B8\u09BE \u0997\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF", subtitle: "\u09A6\u09C7\u09B6 \u0993 \u0985\u099E\u09CD\u099A\u09B2 \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u09AF\u09BC\u09C7 \u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7 \u099F\u09BF\u09AE \u0986\u09AA\u09A1\u09C7\u099F \u09A6\u09C7\u0996\u09C1\u09A8\u0964", action: () => navigate(admin ? "countries" : "country-browse"), actionLabel: "\u09B8\u09AC \u09A6\u09C7\u09B6" }), data.countries.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "country-grid" }, data.countries.slice(0, 8).map((country) => /* @__PURE__ */ import_react27.default.createElement(CountryCard, { key: country.id, country, latestUpdate: latestCountryUpdate(data.updates, country.id), onClick: () => navigate("updates", country.id) }))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Earth, title: "\u0995\u09CB\u09A8\u09CB \u09A6\u09C7\u09B6 \u0995\u09A8\u09AB\u09BF\u0997\u09BE\u09B0 \u09A8\u09C7\u0987", body: admin ? "Admin \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09A6\u09C7\u09B6 \u09AF\u09CB\u0997 \u0995\u09B0\u09C7 \u098F\u099C\u09C7\u09A8\u09CD\u099F\u09A6\u09C7\u09B0 intake \u099A\u09BE\u09B2\u09C1 \u0995\u09B0\u09C1\u09A8\u0964" : "Admin \u098F\u0996\u09A8\u09CB \u0995\u09CB\u09A8\u09CB \u0997\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C7\u09A8\u09A8\u09BF\u0964", action: admin ? () => navigate("countries") : void 0, actionLabel: "\u09A6\u09C7\u09B6 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8" }), /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u09B8\u09BE\u09AE\u09CD\u09AA\u09CD\u09B0\u09A4\u09BF\u0995 \u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F", subtitle: "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u099F\u09BF\u09AE \u09A8\u09CB\u099F \u0993 \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09B8\u09C2\u09A4\u09CD\u09B0\u0964", action: () => navigate("updates"), actionLabel: "\u09B8\u09AC \u0986\u09AA\u09A1\u09C7\u099F" }), publishedUpdates.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "news-grid" }, publishedUpdates.map((update) => /* @__PURE__ */ import_react27.default.createElement(VisaUpdateCard, { key: update.id, update, country: countryFor(data.countries, update.country_id), onClick: () => navigate("update", update.id) }))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Newspaper, title: "\u098F\u0996\u09A8\u09CB \u0995\u09CB\u09A8\u09CB \u0986\u09AA\u09A1\u09C7\u099F \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09AF\u09BC\u09A8\u09BF", body: "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7 Visa Update \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09B2\u09C7 \u09A4\u09BE \u098F\u0996\u09BE\u09A8\u09C7 \u0986\u09B8\u09AC\u09C7\u0964", action: admin ? () => setModal({ type: "content-editor", kind: "update" }) : void 0, actionLabel: "\u0986\u09AA\u09A1\u09C7\u099F \u09A4\u09C8\u09B0\u09BF" }), /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0\u09B0 \u0985\u0997\u09CD\u09B0\u0997\u09A4\u09BF", subtitle: admin ? "\u09B8\u09BE\u09AE\u09CD\u09AA\u09CD\u09B0\u09A4\u09BF\u0995 \u099F\u09BF\u09AE \u0995\u09C7\u09B8" : "\u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u09BE\u09AE\u09CD\u09AA\u09CD\u09B0\u09A4\u09BF\u0995 \u09AB\u09BE\u0987\u09B2", action: () => navigate("applicants"), actionLabel: "\u09B8\u09AC \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0" }), applications.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "recent-list" }, applications.map((applicant) => /* @__PURE__ */ import_react27.default.createElement(ApplicantRow, { key: applicant.id, applicant, data, navigate, admin }))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: BriefcaseBusiness, title: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF", body: "\u098F\u0995\u099F\u09BF \u09A8\u09A4\u09C1\u09A8 \u09AB\u09BE\u0987\u09B2 \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09B2\u09C7 \u09A4\u09BE\u09B0 \u09A4\u09A5\u09CD\u09AF \u098F\u0996\u09BE\u09A8\u09C7 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7\u0964", action: () => navigate("new-applicant"), actionLabel: "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0" }), admin && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8", subtitle: "\u09A8\u09A4\u09C1\u09A8 \u09B0\u09BF\u0995\u09CB\u09AF\u09BC\u09C7\u09B8\u09CD\u099F \u098F\u09B2\u09C7 \u09B0\u09BF\u09AF\u09BC\u09C7\u09B2-\u099F\u09BE\u0987\u09AE\u09C7 \u0986\u09AA\u09A1\u09C7\u099F \u09B9\u09AC\u09C7\u0964", action: () => navigate("approvals"), actionLabel: "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A1\u09C7\u09B8\u09CD\u0995" }), pending.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-grid" }, pending.slice(0, 4).map((item) => /* @__PURE__ */ import_react27.default.createElement(ApprovalCard, { key: item.id, approval: item, applicant: data.applicants.find((row) => row.id === item.applicant_id), data, navigate }))) : /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass notice-card" }, /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8\u09C7 \u0995\u09CB\u09A8\u09CB \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3 \u09A8\u09C7\u0987\u0964"))), /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "First Fly Insights", subtitle: "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09AC\u09CD\u09B2\u0997 \u0993 \u09AD\u09BF\u09B8\u09BE-\u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u09BF \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09A8\u09BE\u0964", action: () => navigate("blog"), actionLabel: "\u09B8\u09AC \u09B2\u09C7\u0996\u09BE" }), publishedBlogs.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "article-grid" }, publishedBlogs.map((blog) => /* @__PURE__ */ import_react27.default.createElement(BlogCard, { key: blog.id, blog, country: countryFor(data.countries, blog.country_id), onClick: () => navigate("blog", blog.id) }))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: BookOpen, title: "\u098F\u0996\u09A8\u09CB \u0995\u09CB\u09A8\u09CB \u09AC\u09CD\u09B2\u0997 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09AF\u09BC\u09A8\u09BF", body: "Admin Blog Studio \u09A5\u09C7\u0995\u09C7 \u09AA\u09CD\u09B0\u09BF\u09AD\u09BF\u0989 \u0995\u09B0\u09C7 \u09B2\u09C7\u0996\u09BE \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C1\u09A8\u0964", action: admin ? () => setModal({ type: "content-editor", kind: "blog" }) : void 0, actionLabel: "Blog \u09B2\u09BF\u0996\u09C1\u09A8" })), /* @__PURE__ */ import_react27.default.createElement("aside", { className: "editorial-side" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "side-stack" }, /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "First Fly Snapshot"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u098F\u0987 \u09AE\u09C1\u09B9\u09C2\u09B0\u09CD\u09A4\u09C7\u09B0 workspace data")), /* @__PURE__ */ import_react27.default.createElement(Activity, { size: 15 })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "stats-row", style: { gridTemplateColumns: "1fr 1fr", marginTop: 0 } }, /* @__PURE__ */ import_react27.default.createElement(StatCard, { label: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0", value: visibleApplicants.length, icon: Users }), /* @__PURE__ */ import_react27.default.createElement(StatCard, { label: "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3", value: pending.length, icon: Clock3, tone: "orange" })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "stats-row", style: { gridTemplateColumns: "1fr 1fr", marginTop: 7 } }, /* @__PURE__ */ import_react27.default.createElement(StatCard, { label: "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u0986\u09AA\u09A1\u09C7\u099F", value: publishedUpdates.length, icon: Newspaper }), /* @__PURE__ */ import_react27.default.createElement(StatCard, { label: "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8", value: data.documents.length, icon: FolderOpen }))), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u0997\u09C1\u09B0\u09C1\u09A4\u09CD\u09AC\u09AA\u09C2\u09B0\u09CD\u09A3 \u09B8\u09A4\u09B0\u09CD\u0995\u09A4\u09BE"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u0985\u09AA\u09BE\u09B0\u09C7\u09B6\u09A8\u09BE\u09B2 \u099A\u09C7\u0995")), /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, { size: 15 })), alertCases.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature-list" }, alertCases.slice(0, 4).map((item) => /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature", key: item.id }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, item.full_name), " \u2014 ", passportState(item.passport_expiry).label, /* @__PURE__ */ import_react27.default.createElement("br", null), /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", onClick: () => navigate("applicant", item.id) }, "\u09AB\u09BE\u0987\u09B2 \u0996\u09C1\u09B2\u09C1\u09A8 ", /* @__PURE__ */ import_react27.default.createElement(ChevronRight, { size: 11 })))))) : /* @__PURE__ */ import_react27.default.createElement("p", { className: "muted tiny", style: { lineHeight: 1.7, margin: 0 } }, "\u0995\u09CB\u09A8\u09CB \u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6 \u09B8\u09A4\u09B0\u09CD\u0995\u09A4\u09BE \u09A8\u09C7\u0987\u0964 \u09A8\u09BF\u09AF\u09BC\u09AE\u09BF\u09A4 \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09B8\u09C2\u09A4\u09CD\u09B0 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE \u0993 \u09B8\u09BE\u09AA\u09CB\u09B0\u09CD\u099F"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u099F\u09BF\u09AE\u0995\u09C7 \u09A6\u09CD\u09B0\u09C1\u09A4 \u09AA\u09CC\u0981\u099B\u09BE\u09A8")), /* @__PURE__ */ import_react27.default.createElement(LifeBuoy, { size: 15 })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "service-links" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "service-link", onClick: () => navigate("chat") }, /* @__PURE__ */ import_react27.default.createElement(MessageCircle, null), "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u099F\u09BF\u09AE \u099A\u09CD\u09AF\u09BE\u099F"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "service-link", onClick: () => navigate("notifications") }, /* @__PURE__ */ import_react27.default.createElement(Bell, null), "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8 \u09A6\u09C7\u0996\u09C1\u09A8"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "service-link", onClick: () => navigate("settings") }, /* @__PURE__ */ import_react27.default.createElement(CircleHelp, null), "\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8 \u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn" }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u09A8\u09C0\u09A4\u09BF-\u09B8\u0982\u0995\u09CD\u09B0\u09BE\u09A8\u09CD\u09A4 \u09A8\u09CB\u099F"), /* @__PURE__ */ import_react27.default.createElement("br", null), "\u09B8\u09AC \u09B6\u09B0\u09CD\u09A4, \u09AB\u09BF \u0993 \u09AB\u09B0\u09CD\u09AE \u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0993\u09AF\u09BC\u09C7\u09AC\u09B8\u09BE\u0987\u099F\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7 \u09A8\u09BF\u09A8\u0964"))))));
}
function ApprovalCard({ approval, applicant, data, navigate }) {
  if (!applicant) return null;
  const country = countryFor(data.countries, applicant.country_id);
  const docs = data.documents.filter((doc) => doc.applicant_id === applicant.id);
  const health = passportState(applicant.passport_expiry);
  return /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass queue-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-card-top" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "queue-client" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "applicant-avatar" }, initials(applicant.full_name)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, applicant.full_name), /* @__PURE__ */ import_react27.default.createElement("small", null, country?.flag_emoji || "\u{1F310}", " ", countryLabel(country), " \xB7 ", applicant.reference))), /* @__PURE__ */ import_react27.default.createElement(Status, { value: approval.status })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-meta" }, /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue" }, docs.length, " \u09A8\u09A5\u09BF"), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: health.type === "warning" || health.type === "expired" ? "red" : "green" }, health.label)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => navigate("applicant", applicant.id) }, /* @__PURE__ */ import_react27.default.createElement(Eye, null), "\u09AB\u09BE\u0987\u09B2 \u09A6\u09C7\u0996\u09C1\u09A8"), /* @__PURE__ */ import_react27.default.createElement("span", { className: "pill" }, formatDate(approval.requested_at))));
}
function ApplicantsPage({ admin, data, loading, visibleApplicants, search, setSearch, stageFilter, setStageFilter, navigate }) {
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, admin ? "\u09B8\u09AC \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0" : "\u0986\u09AE\u09BE\u09B0 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u0985\u09CD\u09AF\u09BE\u09AA\u09CD\u09B2\u09BF\u0995\u09C7\u09B6\u09A8 \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8, \u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6 \u0993 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u0995\u09BE\u099C \u098F\u0995\u09B8\u0999\u09CD\u0997\u09C7 \u09A6\u09C7\u0996\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", onClick: () => navigate("new-applicant") }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "toolbar" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "search-wrap" }, /* @__PURE__ */ import_react27.default.createElement(Search, null), /* @__PURE__ */ import_react27.default.createElement("input", { className: "search-input", value: search, onChange: (event) => setSearch(event.target.value), placeholder: "\u09A8\u09BE\u09AE, \u09AB\u09BE\u0987\u09B2 \u09A8\u09AE\u09CD\u09AC\u09B0, \u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u09AC\u09BE \u09A6\u09C7\u09B6 \u0996\u09C1\u0981\u099C\u09C1\u09A8", "aria-label": "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u0996\u09C1\u0981\u099C\u09C1\u09A8" })), /* @__PURE__ */ import_react27.default.createElement("select", { className: "select-input", value: stageFilter, onChange: (event) => setStageFilter(event.target.value) }, /* @__PURE__ */ import_react27.default.createElement("option", { value: "all" }, "\u09B8\u09AC \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8"), /* @__PURE__ */ import_react27.default.createElement("option", { value: "drafted" }, "\u0996\u09B8\u09A1\u09BC\u09BE"), /* @__PURE__ */ import_react27.default.createElement("option", { value: "submitted" }, "\u099C\u09AE\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7"), /* @__PURE__ */ import_react27.default.createElement("option", { value: "embassy_processed" }, "\u098F\u09AE\u09CD\u09AC\u09BE\u09B8\u09BF \u09AA\u09CD\u09B0\u09B8\u09C7\u09B8\u09BF\u0982"), /* @__PURE__ */ import_react27.default.createElement("option", { value: "decision" }, "\u09B8\u09BF\u09A6\u09CD\u09A7\u09BE\u09A8\u09CD\u09A4"), /* @__PURE__ */ import_react27.default.createElement("option", { value: "pending" }, "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3"), /* @__PURE__ */ import_react27.default.createElement("option", { value: "approved" }, "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4"), /* @__PURE__ */ import_react27.default.createElement("option", { value: "needs_correction" }, "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8 \u09A6\u09B0\u0995\u09BE\u09B0")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue" }, visibleApplicants.length, " \u09AB\u09BE\u0987\u09B2")), loading ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "loading-placeholder" }, [1, 2, 3].map((n) => /* @__PURE__ */ import_react27.default.createElement("div", { className: "skeleton", key: n, style: { height: 62, marginBottom: 8 } }))) : visibleApplicants.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "applicant-list" }, visibleApplicants.map((applicant) => /* @__PURE__ */ import_react27.default.createElement(ApplicantRow, { key: applicant.id, applicant, data, navigate, admin }))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Users, title: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF", body: "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C1\u09A8, \u0985\u09A5\u09AC\u09BE \u09B8\u09BE\u09B0\u09CD\u099A / \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8 \u09AB\u09BF\u09B2\u09CD\u099F\u09BE\u09B0 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0\u09C1\u09A8\u0964", action: () => navigate("new-applicant"), actionLabel: "\u09A8\u09A4\u09C1\u09A8 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0" }));
}
function ApplicantDetailPage(props) {
  const { currentApplicant: applicant, data, admin, profile, navigate, setModal, pushToast, refreshData, setOperationLoading, operationLoading } = props;
  const [dragging, setDragging] = (0, import_react27.useState)(false);
  const [uploadCategory, setUploadCategory] = (0, import_react27.useState)("passport");
  const [scanning, setScanning] = (0, import_react27.useState)("");
  if (!applicant) return /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Users, title: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09AB\u09BE\u0987\u09B2 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF", body: "\u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09AF\u09BC \u09AB\u09BF\u09B0\u09C7 \u0985\u09A8\u09CD\u09AF \u09AB\u09BE\u0987\u09B2 \u0996\u09C1\u09B2\u09C1\u09A8\u0964", action: () => navigate("applicants"), actionLabel: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE" });
  const country = countryFor(data.countries, applicant.country_id);
  const category = categoryFor(data.categories, applicant.visa_category_id);
  const docs = data.documents.filter((doc) => doc.applicant_id === applicant.id);
  const approval = latestApproval(data.approvals, applicant.id);
  const health = passportState(applicant.passport_expiry);
  const steps = ["drafted", "submitted", "embassy_processed", "decision"];
  const currentStep = steps.indexOf(applicant.stage);
  const checklist = data.checklists.find((item) => item.country_id === applicant.country_id && item.visa_category_id === applicant.visa_category_id);
  const extracted = data.extractions.filter((item) => item.applicant_id === applicant.id);
  const uploadFiles = async (files) => {
    if (!applicant.consent_recorded_at || !applicant.consent_recorded_by) {
      pushToast("নথি আপলোডের আগে ক্লায়েন্টের সম্মতি রেকর্ড করুন; পরে ফাইলটি আবার নির্বাচন করতে হবে।", "error");
      setModal({ type: "consent", applicantId: applicant.id, applicantName: applicant.full_name });
      return;
    }
    const picked = [...files];
    if (!picked.length) return;
    const invalid = picked.find((file) => file.size > MAX_FILE_SIZE);
    if (invalid) {
      pushToast(`${invalid.name}: \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09AB\u09BE\u0987\u09B2 \u09B8\u09BE\u0987\u099C \u09E9\u09E6 MB\u0964`, "error");
      return;
    }
    await uploadApplicantFiles({ applicant, files: picked, category: uploadCategory, profile, refreshData, pushToast, setOperationLoading });
  };
  const requestDeleteDoc = (doc) => setModal({ type: "confirm", title: "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2\u09AC\u09C7\u09A8?", body: `${doc.file_name} private storage \u09A5\u09C7\u0995\u09C7 \u09B8\u09CD\u09A5\u09BE\u09AF\u09BC\u09C0\u09AD\u09BE\u09AC\u09C7 \u09AE\u09C1\u099B\u09C7 \u09AF\u09BE\u09AC\u09C7\u0964`, confirmLabel: "\u09B8\u09CD\u09A5\u09BE\u09AF\u09BC\u09C0\u09AD\u09BE\u09AC\u09C7 \u09AE\u09C1\u099B\u09C1\u09A8", onConfirm: async () => {
    setOperationLoading("\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2\u09BE \u09B9\u099A\u09CD\u099B\u09C7...");
    const { error } = await supabase.storage.from(BUCKET_DOCUMENTS).remove([doc.storage_path]);
    if (!error) {
      const { error: rowError } = await supabase.from("applicant_documents").delete().eq("id", doc.id);
      if (rowError) pushToast(rowError.message, "error");
      else {
        pushToast("\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
        await refreshData({ quiet: true });
      }
    } else pushToast(error.message, "error");
    setOperationLoading("");
  } });
  const updateStage = async (event) => {
    const next = event.target.value;
    if (next === applicant.stage) return;
    const { error } = await supabase.from("applicants").update({ stage: next }).eq("id", applicant.id);
    if (error) pushToast(`\u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8 \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      pushToast("\u0985\u09CD\u09AF\u09BE\u09AA\u09CD\u09B2\u09BF\u0995\u09C7\u09B6\u09A8 \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8 \u0986\u09AA\u09A1\u09C7\u099F \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  const scan = async (doc) => {
    setScanning(doc.id);
    setOperationLoading("\u09A8\u09A5\u09BF \u09AA\u09A1\u09BC\u09BE \u09B9\u099A\u09CD\u099B\u09C7...");
    try {
      const result = await invokeFunction("visa-document-analysis", { document_id: doc.id });
      pushToast("\u09A8\u09A5\u09BF\u09B0 \u09A4\u09A5\u09CD\u09AF \u09AC\u09BF\u09B6\u09CD\u09B2\u09C7\u09B7\u09A3 \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      await refreshData({ quiet: true });
      if (result?.warnings?.length) pushToast(result.warnings[0], "error");
    } catch (error) {
      pushToast(error.message || "Gemini \u09A8\u09A5\u09BF \u09AC\u09BF\u09B6\u09CD\u09B2\u09C7\u09B7\u09A3 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u09BF\u0964", "error");
    } finally {
      setScanning("");
      setOperationLoading("");
    }
  };
  const createReport = async () => {
    const snapshot = { reference: applicant.reference, full_name: applicant.full_name, passport_number: applicant.passport_number, date_of_birth: applicant.date_of_birth, passport_expiry: applicant.passport_expiry, phone: applicant.phone, email: applicant.email, occupation: applicant.occupation, country: country?.name_bn || country?.name, category: category?.name_bn || category?.name, stage: applicant.stage, travel_start: applicant.travel_start, travel_end: applicant.travel_end, agent: profile.full_name, notes: applicant.notes, documents: docs.map((doc) => ({ file_name: doc.file_name, category: doc.category })), generated_at: (/* @__PURE__ */ new Date()).toISOString() };
    setOperationLoading("A4 \u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F \u09A4\u09C8\u09B0\u09BF \u09B9\u099A\u09CD\u099B\u09C7...");
    const { data: report, error } = await supabase.from("generated_reports").insert({ workspace_id: profile.workspace_id, applicant_id: applicant.id, report_type: "a4_summary", report_snapshot: snapshot, generated_by: profile.id }).select().single();
    setOperationLoading("");
    if (error) {
      pushToast(`\u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F \u09B0\u09C7\u0995\u09B0\u09CD\u09A1 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
      return;
    }
    await refreshData({ quiet: true });
    navigate("report", report.id);
  };
  const shareWhatsApp = () => {
    const msg = `First Fly International \u2014 ${applicant.full_name}, \u0986\u09AA\u09A8\u09BE\u09B0 ${countryLabel(country)} ${categoryLabel(category)} \u09AB\u09BE\u0987\u09B2 (${applicant.reference})-\u098F\u09B0 \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u0985\u09AC\u09B8\u09CD\u09A5\u09BE: ${approvalLabels[approval?.status] || stageLabels[applicant.stage] || "\u0996\u09B8\u09A1\u09BC\u09BE"}\u0964 \u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7 \u09A4\u09A5\u09CD\u09AF\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u099F\u09BF\u09AE\u09C7\u09B0 \u09B8\u0999\u09CD\u0997\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964 \u098F\u0987 \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE\u09AF\u09BC passport \u09AC\u09BE document details \u09A8\u09C7\u0987\u0964`;
    let phone = (applicant.phone || "").replace(/\D/g, "");
    if (phone.startsWith("0") && phone.length === 11) phone = `880${phone.slice(1)}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };
  const requestApproval = async () => {
    if (!applicant.consent_recorded_at) {
      pushToast("Admin review-এ পাঠানোর আগে Applicant detail থেকে ক্লায়েন্টের সম্মতি রেকর্ড করুন।", "error");
      return;
    }
    if (approval?.status === "pending") {
      pushToast("\u098F\u0987 \u09AB\u09BE\u0987\u09B2\u099F\u09BF \u0987\u09A4\u09BF\u09AE\u09A7\u09CD\u09AF\u09C7 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8\u09C7\u09B0 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE\u09AF\u09BC \u0986\u099B\u09C7\u0964");
      return;
    }
    setOperationLoading("\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u099A\u09CD\u099B\u09C7...");
    const { error } = await supabase.from("approval_requests").insert({ workspace_id: profile.workspace_id, applicant_id: applicant.id, requested_by: profile.id, status: "pending", agent_note: "" });
    setOperationLoading("");
    if (error) {
      pushToast(`\u09B0\u09BF\u0995\u09CB\u09AF\u09BC\u09C7\u09B8\u09CD\u099F \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
      return;
    }
    await refreshData({ quiet: true });
    pushToast("Admin-\u098F\u09B0 \u0995\u09BE\u099B\u09C7 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
  };
  const review = async (status, feedback = "") => {
    if (status === "needs_correction" && !feedback.trim()) return;
    const { error } = await supabase.from("approval_requests").update({ status, feedback, reviewed_by: profile.id, reviewed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", approval.id);
    if (error) pushToast(`\u09B0\u09BF\u09AD\u09BF\u0989 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      pushToast(status === "approved" ? "\u0986\u09AC\u09C7\u09A6\u09A8 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964" : "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C7\u09B0 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  const openReview = (status) => setModal({ type: "review", decision: status, applicantId: applicant.id, onSubmit: (feedback) => review(status, feedback) });
  const scanMissing = (label) => {
    if (!checklist) {
      pushToast("\u098F\u0987 \u09A6\u09C7\u09B6 \u0993 \u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF\u09B0 \u099C\u09A8\u09CD\u09AF Admin checklist \u098F\u0996\u09A8\u09CB \u09B8\u09C7\u099F \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF\u0964", "error");
      return;
    }
    const required = Array.isArray(checklist.required_documents) ? checklist.required_documents : [];
    const missing = required.filter((item) => !docs.some((doc) => matchesDocumentCategory(doc.category, item)));
    const missingLabels = missing.map(documentRequirementLabel);
    pushToast(missing.length ? `\u0985\u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8: ${missingLabels.join(", ")}` : "Checklist \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C0\u09AF\u09BC \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8 \u09B8\u0982\u09AF\u09C1\u0995\u09CD\u09A4 \u0986\u099B\u09C7\u0964", missing.length ? "error" : "success");
  };
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", onClick: () => navigate("applicants") }, /* @__PURE__ */ import_react27.default.createElement(ArrowLeft, null), "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09AF\u09BC \u09AB\u09BF\u09B0\u09C1\u09A8"), /* @__PURE__ */ import_react27.default.createElement("h1", { style: { marginTop: 8 } }, "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09AB\u09BE\u0987\u09B2"), /* @__PURE__ */ import_react27.default.createElement("p", null, applicant.reference, " \xB7 \u09A4\u09C8\u09B0\u09BF ", formatDate(applicant.created_at))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: shareWhatsApp }, /* @__PURE__ */ import_react27.default.createElement(MessageCircle, null), "WhatsApp"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", onClick: createReport }, /* @__PURE__ */ import_react27.default.createElement(FileCheck2, null), "A4 \u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "detail-grid" }, /* @__PURE__ */ import_react27.default.createElement("section", { className: "detail-main" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass detail-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "detail-heading" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "applicant-avatar" }, initials(applicant.full_name)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "grow" }, /* @__PURE__ */ import_react27.default.createElement("h2", null, applicant.full_name), /* @__PURE__ */ import_react27.default.createElement("p", null, country?.flag_emoji || "\u{1F310}", " ", countryLabel(country), " \xB7 ", categoryLabel(category), " \xB7 ", applicant.reference)), /* @__PURE__ */ import_react27.default.createElement(Status, { value: approval?.status || applicant.stage })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "tracker" }, steps.map((stage, index) => /* @__PURE__ */ import_react27.default.createElement("div", { key: stage, className: cn("tracker-step", index < currentStep ? "done" : "", index === currentStep ? "current" : "") }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "dot" }), stageLabels[stage]))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "detail-actions" }, !applicant.consent_recorded_at && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => setModal({ type: "consent", applicantId: applicant.id, applicantName: applicant.full_name }) }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), "সম্মতি রেকর্ড করুন"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => navigate("chat", applicant.id) }, /* @__PURE__ */ import_react27.default.createElement(MessageCircle, null), "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8\u0995\u09C7 \u09B2\u09BF\u0996\u09C1\u09A8"), !admin && approval?.status !== "pending" && approval?.status !== "approved" && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", onClick: requestApproval, disabled: !applicant.consent_recorded_at, title: applicant.consent_recorded_at ? "" : "\u0986\u0997\u09C7 \u0995\u09CD\u09B2\u09BE\u09DF\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09B8\u09AE\u09CD\u09AE\u09A4\u09BF \u09B0\u09C7\u0995\u09CD\u09A1 \u0995\u09B0\u09C1\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(Send, null), approval?.status === "needs_correction" ? "\u09AA\u09C1\u09A8\u09B0\u09BE\u09AF\u09BC \u099C\u09AE\u09BE \u09A6\u09BF\u09A8" : "Admin \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u099A\u09BE\u0987\u09C1\u09A8"), admin && /* @__PURE__ */ import_react27.default.createElement("label", { className: "field", style: { margin: 0, minWidth: 170 } }, /* @__PURE__ */ import_react27.default.createElement("select", { value: applicant.stage, onChange: updateStage, "aria-label": "\u0985\u09CD\u09AF\u09BE\u09AA\u09CD\u09B2\u09BF\u0995\u09C7\u09B6\u09A8 \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8" }, Object.entries(stageLabels).map(([value, label]) => /* @__PURE__ */ import_react27.default.createElement("option", { key: value, value }, label)))), admin && approval?.status === "pending" && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", onClick: () => openReview("approved") }, /* @__PURE__ */ import_react27.default.createElement(Check, null), "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn danger sm", onClick: () => openReview("needs_correction") }, /* @__PURE__ */ import_react27.default.createElement(RefreshCw, null), "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8 \u099A\u09BE\u0987")))), health.type === "warning" || health.type === "expired" || health.type === "missing" ? /* @__PURE__ */ import_react27.default.createElement("div", { className: cn("notice expiry-banner", health.type === "expired" ? "err" : "warn") }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6 \u09B8\u09A4\u09B0\u09CD\u0995\u09A4\u09BE: ", health.label), /* @__PURE__ */ import_react27.default.createElement("br", null), "\u098F\u099F\u09BF \u09EC \u09AE\u09BE\u09B8\u09C7\u09B0 workflow reminder\u0964 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u09A6\u09C7\u09B6\u09C7\u09B0 \u09B8\u09B0\u0995\u09BE\u09B0\u09BF passport validity rule \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964")) : null, approval?.status === "needs_correction" && /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass panel", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "Admin-\u098F\u09B0 \u09B8\u0982\u09B6\u09CB\u09A7\u09A8 \u09A8\u09CB\u099F"), /* @__PURE__ */ import_react27.default.createElement("p", null, formatDate(approval.reviewed_at))), /* @__PURE__ */ import_react27.default.createElement(Status, { value: "needs_correction" })), /* @__PURE__ */ import_react27.default.createElement("p", { className: "muted tiny", style: { whiteSpace: "pre-wrap", lineHeight: 1.7 } }, approval.feedback || "Admin \u0985\u09A4\u09BF\u09B0\u09BF\u0995\u09CD\u09A4 \u09A4\u09A5\u09CD\u09AF \u099A\u09C7\u09AF\u09BC\u09C7\u099B\u09C7\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0\u09B0 \u09A4\u09A5\u09CD\u09AF"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u09A4\u09A5\u09CD\u09AF \u09B6\u09C1\u09A7\u09C1 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 workspace \u09B8\u09A6\u09B8\u09CD\u09AF\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue" }, applicant.reference)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "info-grid" }, infoItem("\u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u09A8\u09AE\u09CD\u09AC\u09B0", applicant.passport_number), infoItem("\u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6", formatDate(applicant.passport_expiry)), infoItem("\u099C\u09A8\u09CD\u09AE\u09A4\u09BE\u09B0\u09BF\u0996", formatDate(applicant.date_of_birth)), infoItem("\u09AB\u09CB\u09A8 / WhatsApp", applicant.phone), infoItem("\u0987\u09AE\u09C7\u0987\u09B2", applicant.email), infoItem("\u09AA\u09C7\u09B6\u09BE", applicant.occupation), infoItem("\u09A8\u09A5\u09BF \u09AA\u09CD\u09B0\u0995\u09CD\u09B0\u09BF\u09DF\u09BE\u0995\u09B0\u09A3\u09C7 \u09B8\u09AE\u09CD\u09AE\u09A4\u09BF", applicant.consent_recorded_at ? `\u09B0\u09C7\u0995\u09B0\u09CD\u09A1: ${formatDate(applicant.consent_recorded_at)}` : "\u09A8\u09C7\u0987"), infoItem("\u09AD\u09CD\u09B0\u09AE\u09A3\u09C7\u09B0 \u09A4\u09BE\u09B0\u09BF\u0996", applicant.travel_start ? `${formatDate(applicant.travel_start)}${applicant.travel_end ? ` \u2014 ${formatDate(applicant.travel_end)}` : ""}` : "\u2014"), infoItem("\u09A6\u09BE\u09AF\u09BC\u09BF\u09A4\u09CD\u09AC\u09AA\u09CD\u09B0\u09BE\u09AA\u09CD\u09A4 \u098F\u099C\u09C7\u09A8\u09CD\u099F", data.profiles.find((user) => user.id === applicant.assigned_agent_id)?.full_name || profile.full_name), applicant.notes && /* @__PURE__ */ import_react27.default.createElement("div", { className: "info-item", style: { gridColumn: "1/-1" } }, /* @__PURE__ */ import_react27.default.createElement("small", null, "\u098F\u099C\u09C7\u09A8\u09CD\u099F \u09A8\u09CB\u099F"), /* @__PURE__ */ import_react27.default.createElement("b", null, applicant.notes)))), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "Applicant Documents"), /* @__PURE__ */ import_react27.default.createElement("p", null, docs.length, "\u099F\u09BF \u09AB\u09BE\u0987\u09B2 \xB7 private storage")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue" }, docs.length, " \u09AB\u09BE\u0987\u09B2")), docs.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "doc-list" }, docs.map((doc) => /* @__PURE__ */ import_react27.default.createElement(DocumentRow, { key: doc.id, doc, applicant, onAnalyze: () => scan(doc), analyzing: scanning === doc.id, onGoogle: () => googleUpload(doc, pushToast, setOperationLoading), onDelete: () => requestDeleteDoc(doc), admin, consentRecorded: Boolean(applicant.consent_recorded_at && applicant.consent_recorded_by) }))) : /* @__PURE__ */ import_react27.default.createElement("div", { className: "empty" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "empty-icon" }, /* @__PURE__ */ import_react27.default.createElement(FolderOpen, null)), /* @__PURE__ */ import_react27.default.createElement("b", null, "\u0995\u09CB\u09A8\u09CB \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u0986\u09AA\u09B2\u09CB\u09A1 \u09B9\u09AF\u09BC\u09A8\u09BF"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F, Bank Statement, NID \u09AC\u09BE \u0985\u09A8\u09CD\u09AF\u09BE\u09A8\u09CD\u09AF \u09AB\u09BE\u0987\u09B2 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: cn("dropbox", dragging ? "drag" : ""), onDragOver: (event) => {
    event.preventDefault();
    setDragging(true);
  }, onDragLeave: () => setDragging(false), onDrop: (event) => {
    event.preventDefault();
    setDragging(false);
    uploadFiles(event.dataTransfer.files);
  } }, /* @__PURE__ */ import_react27.default.createElement("b", null, "\u09AB\u09BE\u0987\u09B2 \u098F\u0996\u09BE\u09A8\u09C7 \u099B\u09C7\u09A1\u09BC\u09C7 \u09A6\u09BF\u09A8 \u0985\u09A5\u09AC\u09BE \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8"), /* @__PURE__ */ import_react27.default.createElement("p", null, "PDF, \u099B\u09AC\u09BF \u09AC\u09BE Office document \xB7 \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09E9\u09E6 MB \u09AA\u09CD\u09B0\u09A4\u09BF \u09AB\u09BE\u0987\u09B2"), /* @__PURE__ */ import_react27.default.createElement("input", { type: "file", multiple: true, accept: ".pdf,.png,.jpg,.jpeg,.webp,.heic,.doc,.docx,.xls,.xlsx", onChange: (event) => uploadFiles(event.target.files), disabled: !applicant.consent_recorded_at || !applicant.consent_recorded_by, "aria-label": "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u0986\u09AA\u09B2\u09CB\u09A1" }), operationLoading.includes("\u09AB\u09BE\u0987\u09B2 \u0986\u09AA\u09B2\u09CB\u09A1") && /* @__PURE__ */ import_react27.default.createElement("span", { className: "drop-loading" }, /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }), " \u0986\u09AA\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7")), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field", style: { maxWidth: 220, marginTop: 9 } }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF"), /* @__PURE__ */ import_react27.default.createElement("select", { value: uploadCategory, onChange: (event) => setUploadCategory(event.target.value) }, DOCUMENT_TYPES.map((type) => /* @__PURE__ */ import_react27.default.createElement("option", { key: type.value, value: type.value }, type.label))))), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "Gemini AI extraction"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09A8\u09A5\u09BF \u09AA\u09A1\u09BC\u09BE \xB7 structured data \xB7 human review")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "orange", icon: Sparkles }, "Gemini")), extracted.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "ai-extract-list" }, extracted.map((record) => /* @__PURE__ */ import_react27.default.createElement(ExtractionCard, { key: record.id, record, applicant, refreshData, pushToast }))) : /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice" }, " ", /* @__PURE__ */ import_react27.default.createElement(Sparkles, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u0995\u09CB\u09A8\u09CB AI extraction \u09A8\u09C7\u0987\u0964"), /* @__PURE__ */ import_react27.default.createElement("br", null), "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4 \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09C7 \u201CAI \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AA\u09A1\u09BC\u09C1\u09A8\u201D \u099A\u09BE\u09AA\u09B2\u09C7 server-side Gemini \u09AB\u09BE\u0982\u09B6\u09A8 \u0995\u09BE\u099C \u0995\u09B0\u09AC\u09C7\u0964 API key \u0995\u0996\u09A8\u09CB browser-\u098F \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC \u09A8\u09BE\u0964")))), /* @__PURE__ */ import_react27.default.createElement("aside", { className: "detail-aside" }, /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u09AB\u09BE\u0987\u09B2 \u0993 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 workflow status")), /* @__PURE__ */ import_react27.default.createElement(ClipboardCheck, { size: 15 })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "info-item" }, /* @__PURE__ */ import_react27.default.createElement("small", null, "\u0985\u09CD\u09AF\u09BE\u09AA\u09CD\u09B2\u09BF\u0995\u09C7\u09B6\u09A8 \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8"), /* @__PURE__ */ import_react27.default.createElement("b", null, stageLabels[applicant.stage] || applicant.stage)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "info-item" }, /* @__PURE__ */ import_react27.default.createElement("small", null, "\u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8"), /* @__PURE__ */ import_react27.default.createElement("b", null, /* @__PURE__ */ import_react27.default.createElement(Status, { value: approval?.status || "drafted" }, approvalLabels[approval?.status] || "\u099C\u09AE\u09BE \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "info-item" }, /* @__PURE__ */ import_react27.default.createElement("small", null, "\u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C7\u099B\u09C7\u09A8"), /* @__PURE__ */ import_react27.default.createElement("b", null, data.profiles.find((user) => user.id === applicant.created_by)?.full_name || "\u099F\u09BF\u09AE \u09B8\u09A6\u09B8\u09CD\u09AF")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "info-item" }, /* @__PURE__ */ import_react27.default.createElement("small", null, "\u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7 \u0986\u09AA\u09A1\u09C7\u099F"), /* @__PURE__ */ import_react27.default.createElement("b", null, formatDate(applicant.updated_at))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn wide soft sm", style: { marginTop: 12 }, onClick: () => scanMissing() }, /* @__PURE__ */ import_react27.default.createElement(ClipboardCheck, null), "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F checklist \u09AF\u09BE\u099A\u09BE\u0987")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass panel", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C0\u09AF\u09BC \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8"), /* @__PURE__ */ import_react27.default.createElement("p", null, checklist ? "Admin-maintained checklist" : "Checklist \u09B8\u09C7\u099F\u0986\u09AA \u09A6\u09B0\u0995\u09BE\u09B0")), /* @__PURE__ */ import_react27.default.createElement(FileCheck2, { size: 15 })), checklist ? Array.isArray(checklist.required_documents) && checklist.required_documents.length ? checklist.required_documents.map((item) => {
    const has = docs.some((doc) => matchesDocumentCategory(doc.category, item));
    return /* @__PURE__ */ import_react27.default.createElement("div", { className: cn("checklist-item", !has ? "missing" : ""), key: item }, has ? /* @__PURE__ */ import_react27.default.createElement(Check, null) : /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("span", null, documentRequirementLabel(item)), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: has ? "green" : "red" }, has ? "\u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u0997\u09C7\u099B\u09C7" : "\u0985\u09A8\u09C1\u09AA\u09B8\u09CD\u09A5\u09BF\u09A4"));
  }) : /* @__PURE__ */ import_react27.default.createElement("p", { className: "muted tiny" }, "\u098F\u0987 checklist-\u098F \u0995\u09CB\u09A8\u09CB \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C0\u09AF\u09BC document \u09AF\u09CB\u0997 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF\u0964") : /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("p", { className: "muted tiny", style: { lineHeight: 1.7 } }, "Admin Countries \u2192 Checklists \u09A5\u09C7\u0995\u09C7 official-source \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964 \u0995\u09CB\u09A8\u09CB demo requirement \u09A6\u09C7\u0996\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"), admin && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => navigate("checklists") }, /* @__PURE__ */ import_react27.default.createElement(Settings, null), "Checklist \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u09A8\u09BE"))), country?.official_url && /* @__PURE__ */ import_react27.default.createElement("a", { className: "source-link", href: country.official_url, target: "_blank", rel: "noopener noreferrer" }, " ", /* @__PURE__ */ import_react27.default.createElement(ExternalLink, null), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "\u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09A4\u09A5\u09CD\u09AF \u09AF\u09BE\u099A\u09BE\u0987"), /* @__PURE__ */ import_react27.default.createElement("br", null), country.official_url)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u0997\u09CB\u09AA\u09A8\u09C0\u09AF\u09BC\u09A4\u09BE"), /* @__PURE__ */ import_react27.default.createElement("br", null), "\u09B6\u09C1\u09A7\u09C1 \u0995\u09CD\u09B2\u09BE\u09AF\u09BC\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09B8\u09AE\u09CD\u09AE\u09A4\u09BF\u09B8\u09B9 \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C0\u09AF\u09BC \u09A8\u09A5\u09BF \u0986\u09AA\u09B2\u09CB\u09A1 \u0995\u09B0\u09C1\u09A8\u0964 AI extraction-\u098F\u09B0 \u09AB\u09B2\u09BE\u09AB\u09B2 \u09AE\u09BE\u09A8\u09AC-\u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE \u0986\u09AC\u09B6\u09CD\u09AF\u0995\u0964")))));
}
function infoItem(label, value) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "info-item" }, /* @__PURE__ */ import_react27.default.createElement("small", null, label), /* @__PURE__ */ import_react27.default.createElement("b", null, value || "\u2014"));
}
var DOCUMENT_TYPES = [{ value: "passport", label: "\u09AA\u09BE\u09B8\u09AA\u09CB\u09B0\u09CD\u099F" }, { value: "bank_statement", label: "Bank Statement" }, { value: "national_id", label: "\u099C\u09BE\u09A4\u09C0\u09AF\u09BC \u09AA\u09B0\u09BF\u099A\u09AF\u09BC\u09AA\u09A4\u09CD\u09B0 (NID)" }, { value: "tax_documents", label: "Tax documents" }, { value: "employment", label: "\u099A\u09BE\u0995\u09B0\u09BF / \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE\u09B0 \u09A8\u09A5\u09BF" }, { value: "photo", label: "\u099B\u09AC\u09BF" }, { value: "itinerary", label: "\u09AD\u09CD\u09B0\u09AE\u09A3 \u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09A8\u09BE" }, { value: "other", label: "\u0985\u09A8\u09CD\u09AF\u09BE\u09A8\u09CD\u09AF" }];
var DOCUMENT_ALIASES = { "passport copy": "passport", "bank statements": "bank_statement", nid: "national_id", "national id": "national_id", "national identity card": "national_id", "tax document": "tax_documents", "tax return": "tax_documents", "employment letter": "employment", "job letter": "employment", "passport photo": "photo", photograph: "photo", "travel itinerary": "itinerary" };
var resolveDocumentType = (value) => {
  const normalized = String(value ?? "").normalize("NFKC").trim().toLocaleLowerCase();
  const alias = DOCUMENT_ALIASES[normalized];
  return DOCUMENT_TYPES.find((type) => type.value === (alias || normalized) || type.label.normalize("NFKC").trim().toLocaleLowerCase() === normalized) || null;
};
var normalizeDocumentCategory = (value) => {
  const normalized = String(value ?? "").normalize("NFKC").trim().toLocaleLowerCase();
  return resolveDocumentType(normalized)?.value || DOCUMENT_ALIASES[normalized] || normalized.replace(/[\s-]+/g, "_");
};
var matchesDocumentCategory = (category, requirement) => normalizeDocumentCategory(category) === normalizeDocumentCategory(requirement);
var documentRequirementLabel = (value) => resolveDocumentType(value)?.label || String(value);
async function uploadApplicantFiles({ applicant, files, category, profile, refreshData, pushToast, setOperationLoading }) {
  if (!supabase) return;
  let uploaded = 0;
  setOperationLoading("\u09AB\u09BE\u0987\u09B2 \u0986\u09AA\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7...");
  for (const file of files) {
    const path = `${profile.workspace_id}/${applicant.id}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const { error: storageError } = await supabase.storage.from(BUCKET_DOCUMENTS).upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
    if (storageError) {
      pushToast(`${file.name} \u0986\u09AA\u09B2\u09CB\u09A1 \u09B9\u09AF\u09BC\u09A8\u09BF: ${storageError.message}`, "error");
      continue;
    }
    const { error: rowError } = await supabase.from("applicant_documents").insert({ workspace_id: profile.workspace_id, applicant_id: applicant.id, storage_path: path, file_name: file.name, mime_type: file.type || "application/octet-stream", byte_size: file.size, category, uploaded_by: profile.id });
    if (rowError) {
      await supabase.storage.from(BUCKET_DOCUMENTS).remove([path]);
      pushToast(`${file.name} \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09AF\u09BC \u09AF\u09CB\u0997 \u09B9\u09AF\u09BC\u09A8\u09BF: ${rowError.message}`, "error");
      continue;
    }
    uploaded++;
  }
  setOperationLoading("");
  await refreshData({ quiet: true });
  if (uploaded) pushToast(`${uploaded}\u099F\u09BF \u09AB\u09BE\u0987\u09B2 private storage-\u098F \u09AF\u09CB\u0997 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964`);
}
async function googleUpload(doc, pushToast, setOperationLoading) {
  setOperationLoading("Google Drive Sync \u09B9\u099A\u09CD\u099B\u09C7...");
  try {
    await invokeFunction("google-workspace-action", { action: "drive_upload", document_id: doc.id });
    pushToast("Google Drive-\u098F \u09AB\u09BE\u0987\u09B2 \u0995\u09AA\u09BF \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
  } catch (error) {
    pushToast(error.message || "Google Drive-\u098F \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964", "error");
  } finally {
    setOperationLoading("");
  }
}
function DocumentRow({ doc, onAnalyze, analyzing, onGoogle, onDelete, admin, consentRecorded }) {
  const [fileBusy, setFileBusy] = (0, import_react27.useState)(false);
  const download = async () => {
    setFileBusy(true);
    const { data, error } = await supabase.storage.from(BUCKET_DOCUMENTS).createSignedUrl(doc.storage_path, 60);
    setFileBusy(false);
    if (error) {
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };
  const mimeType = String(doc.mime_type || "").toLowerCase().split(";")[0];
  const canAnalyzeType = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/heic"].includes(mimeType);
  const canAnalyze = consentRecorded && canAnalyzeType;
  const analyzeTitle = !consentRecorded ? "Gemini বিশ্লেষণের আগে ক্লায়েন্টের সম্মতি রেকর্ড করুন" : !canAnalyzeType ? "AI extraction শুধু PDF, JPEG, PNG, WebP বা HEIC নথি পড়ে" : "Gemini দিয়ে নথি পড়ুন";
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "doc-row" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "doc-icon" }, /* @__PURE__ */ import_react27.default.createElement(FileText, null)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "doc-row-copy" }, /* @__PURE__ */ import_react27.default.createElement("b", { title: doc.file_name }, doc.file_name), /* @__PURE__ */ import_react27.default.createElement("small", null, DOCUMENT_TYPES.find((item) => item.value === doc.category)?.label || doc.category, " \xB7 ", formatBytes(doc.byte_size), " \xB7 ", formatDate(doc.created_at))), doc.extraction_status === "complete" && /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "green" }, "AI \u09AA\u09A1\u09BC\u09C7\u099B\u09C7"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", type: "button", onClick: download, disabled: fileBusy, "aria-label": "\u09A8\u09A5\u09BF \u0996\u09C1\u09B2\u09C1\u09A8" }, fileBusy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Eye, null)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", type: "button", onClick: onAnalyze, disabled: !canAnalyze || analyzing, title: analyzeTitle, "aria-label": "AI \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A8\u09A5\u09BF \u09AA\u09A1\u09BC\u09C1\u09A8" }, analyzing ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(WandSparkles, null)), admin && /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", type: "button", onClick: onGoogle, disabled: !consentRecorded, title: consentRecorded ? "Google Drive-এ কপি করুন" : "Google Drive-এ পাঠানোর আগে ক্লায়েন্টের সম্মতি রেকর্ড করুন", "aria-label": "Google Drive-\u098F \u0995\u09AA\u09BF" }, /* @__PURE__ */ import_react27.default.createElement(CloudUpload, null)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", type: "button", onClick: onDelete, "aria-label": "\u09A8\u09A5\u09BF \u09AE\u09C1\u099B\u09C1\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(Trash2, null)));
}
function ExtractionCard({ record, applicant, refreshData, pushToast }) {
  const [expanded, setExpanded] = (0, import_react27.useState)(false);
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const fields = record.extracted_json || {};
  const review = async (status) => {
    setBusy(true);
    const { error } = await supabase.from("ai_extracted_data").update({ review_status: status, reviewed_by: (await supabase.auth.getUser()).data.user?.id, reviewed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", record.id);
    setBusy(false);
    if (error) pushToast(error.message, "error");
    else {
      pushToast(status === "accepted" ? "Extraction \u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE \u0995\u09B0\u09C7 \u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964" : "Extraction \u09AC\u09BE\u09A4\u09BF\u09B2 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  const applyFields = async () => {
    const update = {};
    if (fields.full_name) update.full_name = fields.full_name;
    if (fields.passport_number) update.passport_number = fields.passport_number;
    if (fields.passport_expiry) update.passport_expiry = fields.passport_expiry;
    if (fields.date_of_birth) update.date_of_birth = fields.date_of_birth;
    if (!Object.keys(update).length) {
      pushToast("\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u0997 \u0995\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB applicant field \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964", "error");
      return;
    }
    const { error } = await supabase.from("applicants").update(update).eq("id", applicant.id);
    if (error) pushToast(error.message, "error");
    else {
      pushToast("Human-reviewed \u09A4\u09A5\u09CD\u09AF applicant profile-\u098F \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u0997 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass extraction-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-card-top" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", { style: { fontSize: 11.48 } }, "Gemini extraction \xB7 ", formatDate(record.created_at)), /* @__PURE__ */ import_react27.default.createElement("small", { className: "muted", style: { display: "block", fontSize: 9.45, marginTop: 3 } }, record.model, " \xB7 ", record.confidence ? `${Math.round(record.confidence * 100)}% confidence` : "")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: record.review_status === "accepted" ? "green" : record.review_status === "rejected" ? "red" : "gold" }, record.review_status === "accepted" ? "\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7" : record.review_status === "rejected" ? "\u09AC\u09BE\u09A4\u09BF\u09B2" : "\u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE \u09A6\u09B0\u0995\u09BE\u09B0")), record.warnings?.length > 0 && /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 8 } }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), record.warnings.join(" \xB7 ")), /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", onClick: () => setExpanded((value) => !value) }, expanded ? "\u09A4\u09A5\u09CD\u09AF \u09B2\u09C1\u0995\u09BE\u09A8" : "\u0989\u09A6\u09CD\u09A7\u09BE\u09B0 \u0995\u09B0\u09BE \u09A4\u09A5\u09CD\u09AF \u09A6\u09C7\u0996\u09C1\u09A8", " ", /* @__PURE__ */ import_react27.default.createElement(ChevronDown, null)), expanded && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("pre", { className: "json-preview" }, JSON.stringify(fields, null, 2)), record.review_status === "needs_review" && /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => review("accepted"), disabled: busy }, /* @__PURE__ */ import_react27.default.createElement(Check, null), "\u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE \u0995\u09B0\u09C7 \u0997\u09CD\u09B0\u09B9\u09A3"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: applyFields, disabled: busy }, "Applicant \u09A4\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u0997"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn danger sm", onClick: () => review("rejected"), disabled: busy }, "\u09AC\u09BE\u09A4\u09BF\u09B2"))));
}
function ModalRouter(props) {
  const { modal, setModal } = props;
  if (!modal) return null;
  const close = () => setModal(null);
  if (modal.type === "applicant-wizard") return /* @__PURE__ */ import_react27.default.createElement(ApplicantWizardModal, { ...props, close });
  if (modal.type === "content-editor") return /* @__PURE__ */ import_react27.default.createElement(ContentEditorModal, { ...props, close });
  if (modal.type === "confirm") return /* @__PURE__ */ import_react27.default.createElement(ConfirmModal, { modal, close });
  if (modal.type === "consent") return /* @__PURE__ */ import_react27.default.createElement(ConsentModal, { ...props, close });
  if (modal.type === "review") return /* @__PURE__ */ import_react27.default.createElement(ReviewModal, { modal, close });
  if (modal.type === "invite") return /* @__PURE__ */ import_react27.default.createElement(InviteAgentModal, { ...props, close });
  if (modal.type === "country") return /* @__PURE__ */ import_react27.default.createElement(CountryModal, { ...props, close });
  if (modal.type === "category") return /* @__PURE__ */ import_react27.default.createElement(CategoryModal, { ...props, close });
  if (modal.type === "checklist") return /* @__PURE__ */ import_react27.default.createElement(ChecklistModal, { ...props, close });
  if (modal.type === "google-help") return /* @__PURE__ */ import_react27.default.createElement(GoogleHelpModal, { close });
  if (modal.type === "google-action") return /* @__PURE__ */ import_react27.default.createElement(GoogleActionModal, { ...props, close });
  if (modal.type === "gmail") return /* @__PURE__ */ import_react27.default.createElement(GoogleActionModal, { ...props, close, action: "gmail_send" });
  if (modal.type === "install") return /* @__PURE__ */ import_react27.default.createElement(InstallHelpModal, { close });
  return null;
}
function InstallHelpModal({ close }) {
  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
    || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isInstalled = typeof window !== 'undefined'
    && (window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true);
  const steps = isIOS ? [
    { icon: ArrowUpRight, title: 'Safari-এর Share বোতাম চাপুন', detail: 'এই পৃষ্ঠাটি Safari-তে খুলে শেয়ার আইকনটি নির্বাচন করুন।' },
    { icon: Plus, title: 'Add to Home Screen বাছুন', detail: 'শেয়ার মেনুতে নিচে স্ক্রল করে “Add to Home Screen” চাপুন।' },
    { icon: Check, title: 'Add চাপুন', detail: 'নাম নিশ্চিত করে Add দিন; এরপর Home Screen-এর First Fly আইকন থেকে খুলুন।' },
  ] : [
    { icon: Ellipsis, title: 'ব্রাউজার মেনু খুলুন', detail: 'Chrome বা Edge-এর ⋮ মেনুতে “Install app” / “Add to Home screen” খুঁজুন।' },
    { icon: Download, title: 'ইনস্টল নিশ্চিত করুন', detail: 'স্বয়ংক্রিয় Install prompt এলে সেটিও ব্যবহার করতে পারেন।' },
    { icon: Check, title: 'অ্যাপের মতো খুলুন', detail: 'Home Screen বা Apps তালিকার First Fly আইকন থেকে চালু করুন।' },
  ];

  return (
    <ModalFrame
      close={close}
      title={isInstalled ? 'First Fly ইনস্টল করা আছে' : isIOS ? 'iPhone / iPad-এ যোগ করুন' : 'অ্যাপ হিসেবে ইনস্টল করুন'}
      subtitle="হোম স্ক্রিন থেকে দ্রুত, পূর্ণ-স্ক্রিন অভিজ্ঞতায় First Fly খুলুন।"
    >
      {isInstalled ? (
        <div className="install-installed">
          <CircleCheck size={24} />
          <div><b>আপনি এখন ইনস্টল করা অ্যাপ ব্যবহার করছেন।</b><p>Home Screen-এর First Fly আইকন থেকেই অ্যাপটি খুলুন।</p></div>
        </div>
      ) : (
        <div className="install-guide">
          <div className="install-guide-intro">
            <span className="setting-icon"><Download /></span>
            <div><b>{isIOS ? 'Safari দিয়ে ইনস্টল করুন' : 'এই ডিভাইসে ইনস্টল করুন'}</b><p>{isIOS ? 'iOS-এ ইনস্টল অপশনটি Safari-এর Share মেনুতে থাকে।' : 'সমর্থিত ব্রাউজারে First Fly একটি installable web app হিসেবে চলে।'}</p></div>
          </div>
          <div className="install-steps">
            {steps.map(({ icon: Icon, title, detail }, index) => (
              <article className="install-step" key={title}>
                <span className="install-step-icon"><Icon size={18} /></span>
                <span className="install-step-copy"><b><i>{index + 1}</i>{title}</b><small>{detail}</small></span>
              </article>
            ))}
          </div>
          <div className="notice warn install-disclaimer"><TriangleAlert /><div><b>একটি installable PWA</b> — এটি App Store-এর native iOS অ্যাপ নয়। পাসপোর্ট/ক্লায়েন্ট ডেটা সুরক্ষার জন্য কেবল অনুমোদিত ডিভাইসে ব্যবহার করুন।</div></div>
        </div>
      )}
      <div className="modal-footer install-footer"><span>পেজ জুম ও সিস্টেম অ্যাক্সেসিবিলিটি সেটিংস চালু থাকে।</span><button className="btn soft sm" type="button" onClick={close}>বুঝেছি</button></div>
    </ModalFrame>
  );
}

function ModalFrame({ children, close, wide = false, title, subtitle }) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-backdrop", onMouseDown: (event) => event.target === event.currentTarget && close() }, /* @__PURE__ */ import_react27.default.createElement(motion.section, { className: cn("modal", wide && "wide"), role: "dialog", "aria-modal": "true", "aria-label": title, initial: { opacity: 0, y: 12, scale: 0.99 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 8 }, transition: { duration: 0.19 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h2", null, title), subtitle && /* @__PURE__ */ import_react27.default.createElement("p", null, subtitle)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "close-btn", onClick: close, "aria-label": "\u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09C1\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(X, null))), children));
}
function ApplicantWizardModal({ profile, data, refreshData, navigate, pushToast, close, setOperationLoading }) {
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileCategory, setFileCategory] = useState('passport');
  const [form, setForm] = useState({
    country_id: data.countries[0]?.id || '', visa_category_id: data.categories[0]?.id || '',
    travel_start: '', travel_end: '', full_name: '', passport_number: '', date_of_birth: '', passport_expiry: '',
    phone: '', email: '', occupation: '', notes: '', consent: false,
  });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const checklist = data.checklists.find((item) => item.country_id === form.country_id && item.visa_category_id === form.visa_category_id);
  const requiredDocuments = Array.isArray(checklist?.required_documents) ? checklist.required_documents : [];
  const normalize = (value = '') => String(value).toLowerCase().replace(/[^a-z0-9\u0980-\u09ff]+/g, '');
  const categoryKey = (value = '') => {
    const text = normalize(value);
    const rules = [
      ['passport', ['passport', 'পাসপোর্ট']], ['bank_statement', ['bank', 'statement', 'ব্যাংক']],
      ['national_id', ['nationalid', 'nid', 'জাতীয়পরিচয়', 'জাতীয়পরিচয়']], ['tax_documents', ['tax', 'tin', 'কর']],
      ['employment', ['employment', 'employer', 'work', 'চাকরি', 'ব্যবসা']], ['photo', ['photo', 'photograph', 'ছবি']],
      ['itinerary', ['itinerary', 'travelplan', 'ভ্রমণপরিকল্পনা']],
    ];
    return rules.find(([, words]) => words.some((word) => text.includes(normalize(word))))?.[0] || null;
  };
  const knownMissing = requiredDocuments.filter((requirement) => {
    const key = categoryKey(requirement);
    return key && !files.some((item) => categoryKey(item.category) === key);
  });
  const reviewRequirements = requiredDocuments.filter((requirement) => !categoryKey(requirement));

  const addFiles = (incoming) => {
    const selected = [...(incoming || [])];
    const valid = selected.filter((file) => file.size <= MAX_FILE_SIZE && file.size > 0);
    if (valid.length < selected.length) pushToast('শূন্য বা ৩০ MB-এর বেশি ফাইল যোগ করা যায়নি।', 'error');
    setFiles((current) => [...current, ...valid.map((file) => ({ file, category: fileCategory }))]);
  };
  const fileMime = (file) => {
    if (file.type) return file.type;
    const ext = file.name.split('.').pop()?.toLowerCase();
    return ({
      pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', heic: 'image/heic',
      txt: 'text/plain', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })[ext] || 'application/octet-stream';
  };

  const create = async (mode) => {
    if (!form.full_name.trim() || !form.passport_number.trim() || !form.passport_expiry || !form.country_id || !form.visa_category_id) {
      pushToast('নাম, পাসপোর্ট নম্বর, মেয়াদ, দেশ ও ভিসা ক্যাটাগরি পূরণ করুন।', 'error');
      return;
    }
    if (form.passport_expiry < today) {
      pushToast('পাসপোর্টের মেয়াদ শেষ; তারিখটি যাচাই করুন।', 'error');
      return;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      pushToast('ইমেইল ঠিকানাটি যাচাই করুন।', 'error');
      return;
    }
    if (mode === 'submit' && files.length === 0) {
      pushToast('Admin review-এ পাঠানোর আগে অন্তত একটি নথি যোগ করুন; নথি প্রস্তুত না হলে খসড়া সংরক্ষণ করুন।', 'error');
      return;
    }
    if (form.travel_start && form.travel_end && form.travel_end < form.travel_start) {
      pushToast('ভ্রমণের শেষ তারিখ শুরুর তারিখের আগে হতে পারে না।', 'error');
      return;
    }
    if (files.length && !form.consent) {
      pushToast('নথি আপলোডের আগে ক্লায়েন্টের স্পষ্ট সম্মতি রেকর্ড করুন।', 'error');
      return;
    }
    if (mode === 'submit' && !form.consent) {
      pushToast('Admin review-এ পাঠানোর আগে ক্লায়েন্টের নথি-প্রক্রিয়াকরণ সম্মতি প্রয়োজন।', 'error');
      return;
    }
    if (!profile.workspace_id) {
      pushToast('Workspace ID পাওয়া যায়নি।', 'error');
      return;
    }

    setBusy(true);
    setOperationLoading('আবেদনকারী ফাইল তৈরি হচ্ছে...');
    const ref = `FF-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const payload = {
      workspace_id: profile.workspace_id, reference: ref, assigned_agent_id: profile.id, created_by: profile.id,
      full_name: form.full_name.trim(), passport_number: form.passport_number.trim().toUpperCase(),
      date_of_birth: form.date_of_birth || null, passport_expiry: form.passport_expiry,
      phone: form.phone.trim() || null, email: form.email.trim() || null, occupation: form.occupation.trim() || null,
      country_id: form.country_id, visa_category_id: form.visa_category_id,
      travel_start: form.travel_start || null, travel_end: form.travel_end || null, notes: form.notes.trim(),
      consent_recorded_at: form.consent ? new Date().toISOString() : null,
      consent_recorded_by: form.consent ? profile.id : null,
    };

    try {
      const { data: applicant, error } = await supabase.from('applicants').insert(payload).select().single();
      if (error) {
        pushToast(`আবেদনকারী তৈরি হয়নি: ${error.message}`, 'error');
        return;
      }
      let uploadErrors = 0;
      for (const item of files) {
        setOperationLoading(`ফাইল আপলোড হচ্ছে... ${item.file.name}`);
        const path = `${profile.workspace_id}/${applicant.id}/${crypto.randomUUID()}-${safeFileName(item.file.name)}`;
        const mimeType = fileMime(item.file);
        const { error: storageError } = await supabase.storage.from(BUCKET_DOCUMENTS).upload(path, item.file, { contentType: mimeType, upsert: false });
        if (storageError) {
          uploadErrors++;
          pushToast(`${item.file.name} আপলোড হয়নি: ${storageError.message}`, 'error');
          continue;
        }
        const { error: docError } = await supabase.from('applicant_documents').insert({
          workspace_id: profile.workspace_id, applicant_id: applicant.id, storage_path: path,
          file_name: item.file.name, mime_type: mimeType, byte_size: item.file.size,
          category: item.category, uploaded_by: profile.id,
        });
        if (docError) {
          uploadErrors++;
          await supabase.storage.from(BUCKET_DOCUMENTS).remove([path]);
          pushToast(`${item.file.name} নথি তালিকায় যুক্ত হয়নি: ${docError.message}`, 'error');
        }
      }

      let approvalError = null;
      if (mode === 'submit' && uploadErrors === 0) {
        setOperationLoading('Admin অনুমোদনের অনুরোধ পাঠানো হচ্ছে...');
        const result = await supabase.from('approval_requests').insert({
          workspace_id: profile.workspace_id, applicant_id: applicant.id, requested_by: profile.id,
          status: 'pending', agent_note: form.notes.trim(),
        });
        approvalError = result.error;
      }
      close();
      await refreshData({ quiet: true });
      navigate('applicant', applicant.id);
      if (approvalError) pushToast(`আবেদন তৈরি হয়েছে, কিন্তু অনুমোদন অনুরোধ পাঠানো যায়নি: ${approvalError.message}`, 'error');
      else if (uploadErrors) pushToast('আবেদন তৈরি হয়েছে; ব্যর্থ নথি Applicant detail থেকে আবার আপলোড করুন।', 'error');
      else pushToast(mode === 'submit' ? 'ফাইল Admin review-এ পাঠানো হয়েছে।' : 'আবেদনকারী খসড়া হিসেবে সংরক্ষিত হয়েছে।', 'success');
    } catch (error) {
      pushToast(error.message || 'আবেদন তৈরি করা যায়নি।', 'error');
    } finally {
      setBusy(false);
      setOperationLoading('');
    }
  };

  return (
    <ModalFrame close={close} wide title="দ্রুত নতুন আবেদনকারী" subtitle="এক পৃষ্ঠায় আবেদন, নথি ও Admin review জমা — বাধ্যতামূলক ক্লায়েন্ট সম্মতিসহ।">
      <div className="quick-applicant-form">
        <section className="quick-form-section">
          <div className="quick-form-heading"><span>০১</span><div><b>গন্তব্য ও ভ্রমণ</b><small>দেশভিত্তিক checklist থাকলে ফর্মে দেখানো হবে।</small></div></div>
          <div className="field-grid">
            <label className="field"><span>গন্তব্য দেশ <em>*</em></span><select value={form.country_id} onChange={(event) => set('country_id', event.target.value)} required><option value="">দেশ নির্বাচন করুন</option>{data.countries.filter((country) => country.is_active).map((country) => <option value={country.id} key={country.id}>{country.flag_emoji} {countryLabel(country)}</option>)}</select></label>
            <label className="field"><span>ভিসা ক্যাটাগরি <em>*</em></span><select value={form.visa_category_id} onChange={(event) => set('visa_category_id', event.target.value)} required><option value="">ক্যাটাগরি নির্বাচন করুন</option>{data.categories.filter((category) => category.is_active).map((category) => <option value={category.id} key={category.id}>{categoryLabel(category)}</option>)}</select></label>
            <label className="field"><span>ভ্রমণ শুরু</span><input type="date" value={form.travel_start} onChange={(event) => set('travel_start', event.target.value)} /></label>
            <label className="field"><span>ভ্রমণ শেষ</span><input type="date" value={form.travel_end} min={form.travel_start || undefined} onChange={(event) => set('travel_end', event.target.value)} /></label>
          </div>
        </section>

        <section className="quick-form-section">
          <div className="quick-form-heading"><span>০২</span><div><b>আবেদনকারীর তথ্য</b><small>পাসপোর্টের তথ্য মূল নথির সঙ্গে মিলিয়ে লিখুন।</small></div></div>
          <div className="field-grid">
            <label className="field"><span>পূর্ণ নাম <em>*</em></span><input autoComplete="name" value={form.full_name} onChange={(event) => set('full_name', event.target.value)} required /></label>
            <label className="field"><span>পাসপোর্ট নম্বর <em>*</em></span><input autoCapitalize="characters" autoComplete="off" value={form.passport_number} onChange={(event) => set('passport_number', event.target.value.toUpperCase())} required /></label>
            <label className="field"><span>জন্মতারিখ</span><input type="date" value={form.date_of_birth} onChange={(event) => set('date_of_birth', event.target.value)} /></label>
            <label className="field"><span>পাসপোর্টের মেয়াদ শেষ <em>*</em></span><input type="date" min={today} value={form.passport_expiry} onChange={(event) => set('passport_expiry', event.target.value)} required /></label>
            <label className="field"><span>ফোন</span><input type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(event) => set('phone', event.target.value)} placeholder="+880…" /></label>
            <label className="field"><span>ইমেইল</span><input type="email" autoComplete="email" inputMode="email" value={form.email} onChange={(event) => set('email', event.target.value)} placeholder="name@example.com" /></label>
            <label className="field"><span>পেশা</span><input value={form.occupation} onChange={(event) => set('occupation', event.target.value)} /></label>
          </div>
        </section>

        <section className="quick-form-section">
          <div className="quick-form-heading"><span>০৩</span><div><b>নথি ও সম্মতি</b><small>ব্যক্তিগত নথি কেবল অনুমোদিত private storage-এ যাবে।</small></div></div>
          <div className="field-grid">
            <label className="field"><span>আপলোড করা নথির ক্যাটাগরি</span><select value={fileCategory} onChange={(event) => setFileCategory(event.target.value)}>{DOCUMENT_TYPES.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}</select></label>
            <div className="field"><span>নিরাপদ নথি জমা</span><div className="muted tiny">প্রতি ফাইল সর্বোচ্চ ৩০ MB · PDF, ছবি ও Office ফাইল</div></div>
          </div>
          <div className={cn('dropbox', dragging && 'drag')} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
            <CloudUpload size={25} /><b>এক বা একাধিক ফাইল যোগ করুন</b><p>পাসপোর্ট, ব্যাংক স্টেটমেন্ট, NID, ট্যাক্স নথি, ছবি বা ভ্রমণ পরিকল্পনা</p>
            <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.webp,.heic,.txt,.doc,.docx,.xls,.xlsx" onChange={(event) => { addFiles(event.target.files); event.target.value = ''; }} aria-label="এক বা একাধিক ডকুমেন্ট নির্বাচন" />
          </div>
          {files.length > 0 && <div className="file-list">{files.map((item, index) => <div className="file-chip" key={`${item.file.name}-${index}`}><FileText size={14} /><b>{item.file.name}</b><small>{DOCUMENT_TYPES.find((type) => type.value === item.category)?.label} · {formatBytes(item.file.size)}</small><button className="icon-mini" type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} aria-label="ফাইল সরান"><X /></button></div>)}</div>}
          {requiredDocuments.length > 0 ? <div className={cn('notice', knownMissing.length ? 'warn' : 'success')}><ClipboardCheck /><div><b>Admin-যাচাইকৃত checklist</b><br />{knownMissing.length ? <>সম্ভাব্য অনুপস্থিত নথি: {knownMissing.join(', ')}।</> : 'চেনা checklist ক্যাটাগরিগুলোর ফাইল পাওয়া গেছে; Admin-কে মূল নথি মিলিয়ে দেখতে হবে।'}{reviewRequirements.length > 0 && <div className="muted tiny">মানব যাচাই প্রয়োজন: {reviewRequirements.join(', ')}</div>}</div></div> : <div className="notice"><CircleHelp /><div>এই দেশ ও ভিসার জন্য Admin এখনো কোনো checklist যোগ করেননি। নথির প্রয়োজনীয়তা নিজে থেকে অনুমান করা হবে না।</div></div>}
          <label className="consent-check quick-consent"><input type="checkbox" checked={form.consent} onChange={(event) => set('consent', event.target.checked)} /><span>ক্লায়েন্ট First Fly-এর private storage-এ নথি রাখা এবং আলাদা অনুমোদিত AI বিশ্লেষণের জন্য নথি প্রক্রিয়াকরণে সম্মতি দিয়েছেন। Google Drive-এ কপি করার সম্মতি প্রতিবার আলাদাভাবে যাচাই করা হবে। <em>*</em></span></label>
        </section>

        <label className="field"><span>Admin-এর জন্য নোট</span><textarea value={form.notes} onChange={(event) => set('notes', event.target.value)} placeholder="আবেদন প্রস্তুতির প্রাসঙ্গিক তথ্য" /></label>
        <div className="notice warn"><TriangleAlert /><div>AI নথি থেকে তথ্য বের করতে পারে, কিন্তু ভিসা যোগ্যতা বা ফল নিশ্চিত করে না। কোনো visa/permit portal-এ চূড়ান্ত সাবমিশনের আগে Admin-কে তথ্য ও মূল নথি যাচাই করতে হবে।</div></div>
      </div>
      <div className="modal-footer quick-form-footer"><button className="btn glass sm" type="button" onClick={close} disabled={busy}>বাতিল</button><div className="footer-right"><button className="btn soft sm" type="button" onClick={() => create('draft')} disabled={busy}>{busy ? <LoaderCircle className="spin" /> : <FileText />} খসড়া সংরক্ষণ</button><button className="btn orange sm" type="button" onClick={() => create('submit')} disabled={busy || !form.consent}>{busy ? <LoaderCircle className="spin" /> : <Send />} Admin-এ পাঠান</button></div></div>
    </ModalFrame>
  );
}

function reviewItem(label, value) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "review-item" }, /* @__PURE__ */ import_react27.default.createElement("small", null, label), /* @__PURE__ */ import_react27.default.createElement("b", null, value || "\u2014"));
}
function ApprovalsPage({ data, navigate, setModal, refreshData, pushToast, profile }) {
  const pending = data.approvals.filter((item) => item.status === "pending");
  const reviewed = data.approvals.filter((item) => item.status !== "pending").slice(0, 12);
  const review = async (approval, status, feedback = "") => {
    const { error } = await supabase.from("approval_requests").update({ status, feedback, reviewed_by: profile.id, reviewed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", approval.id);
    if (error) pushToast(`\u09B0\u09BF\u09AD\u09BF\u0989 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      pushToast(status === "approved" ? "\u0986\u09AC\u09C7\u09A6\u09A8 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964" : "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C7\u09B0 \u09A8\u09CB\u099F \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      await refreshData({ quiet: true });
    }
  };
  const openReview = (approval, status) => setModal({ type: "review", decision: status, applicantId: approval.applicant_id, onSubmit: (feedback) => review(approval, status, feedback) });
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A1\u09C7\u09B8\u09CD\u0995"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u098F\u099C\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u099C\u09AE\u09BE \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09AB\u09BE\u0987\u09B2 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8, \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A6\u09BF\u09A8 \u09AC\u09BE \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C7\u09B0 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7 \u09AA\u09BE\u09A0\u09BE\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "orange", icon: Clock3 }, pending.length, "\u099F\u09BF \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3")), pending.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-grid" }, pending.map((approval) => {
    const applicant = data.applicants.find((row) => row.id === approval.applicant_id);
    if (!applicant) return null;
    const country = countryFor(data.countries, applicant.country_id);
    return /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass queue-card", key: approval.id }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-card-top" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "queue-client" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "applicant-avatar" }, initials(applicant.full_name)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, applicant.full_name), /* @__PURE__ */ import_react27.default.createElement("small", null, country?.flag_emoji || "\u{1F310}", " ", countryLabel(country), " \xB7 ", applicant.reference))), /* @__PURE__ */ import_react27.default.createElement(Status, { value: "pending" })), approval.agent_note && /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice", style: { marginTop: 9 } }, /* @__PURE__ */ import_react27.default.createElement(FileText, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u098F\u099C\u09C7\u09A8\u09CD\u099F \u09A8\u09CB\u099F"), /* @__PURE__ */ import_react27.default.createElement("br", null), approval.agent_note)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-meta" }, /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue" }, data.documents.filter((doc) => doc.applicant_id === applicant.id).length, " \u09A8\u09A5\u09BF"), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: passportState(applicant.passport_expiry).type === "warning" || passportState(applicant.passport_expiry).type === "expired" ? "red" : "green" }, passportState(applicant.passport_expiry).label), /* @__PURE__ */ import_react27.default.createElement(Pill, null, formatDate(approval.requested_at))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "queue-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => navigate("applicant", applicant.id) }, /* @__PURE__ */ import_react27.default.createElement(Eye, null), "\u09AB\u09BE\u0987\u09B2 \u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", onClick: () => openReview(approval, "approved") }, /* @__PURE__ */ import_react27.default.createElement(Check, null), "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn danger sm", onClick: () => openReview(approval, "needs_correction") }, /* @__PURE__ */ import_react27.default.createElement(RefreshCw, null), "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8 \u099A\u09BE\u0987")));
  })) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: ClipboardCheck, title: "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0", body: "\u098F\u099C\u09C7\u09A8\u09CD\u099F \u09A8\u09A4\u09C1\u09A8 \u09B0\u09BF\u0995\u09CB\u09AF\u09BC\u09C7\u09B8\u09CD\u099F \u09AA\u09BE\u09A0\u09BE\u09B2\u09C7 \u09A4\u09BE \u09B8\u09CD\u09AC\u09AF\u09BC\u0982\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09AD\u09BE\u09AC\u09C7 \u098F\u0996\u09BE\u09A8\u09C7 \u0986\u09B8\u09AC\u09C7\u0964" }), reviewed.length > 0 && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u09B8\u09AE\u09CD\u09AA\u09CD\u09B0\u09A4\u09BF \u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09BF\u09A4", subtitle: "\u09B8\u09BF\u09A6\u09CD\u09A7\u09BE\u09A8\u09CD\u09A4 \u0993 \u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C7\u09B0 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7\u0964" }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "data-table-wrap" }, /* @__PURE__ */ import_react27.default.createElement("table", null, /* @__PURE__ */ import_react27.default.createElement("thead", null, /* @__PURE__ */ import_react27.default.createElement("tr", null, /* @__PURE__ */ import_react27.default.createElement("th", null, "\u09AB\u09BE\u0987\u09B2"), /* @__PURE__ */ import_react27.default.createElement("th", null, "\u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u099F\u09BE\u09B8"), /* @__PURE__ */ import_react27.default.createElement("th", null, "\u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE"), /* @__PURE__ */ import_react27.default.createElement("th", null, "Feedback"), /* @__PURE__ */ import_react27.default.createElement("th", null))), /* @__PURE__ */ import_react27.default.createElement("tbody", null, reviewed.map((row) => {
    const applicant = data.applicants.find((item) => item.id === row.applicant_id);
    return /* @__PURE__ */ import_react27.default.createElement("tr", { key: row.id }, /* @__PURE__ */ import_react27.default.createElement("td", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, applicant?.full_name || "Applicant"), /* @__PURE__ */ import_react27.default.createElement("small", null, applicant?.reference || row.applicant_id)), /* @__PURE__ */ import_react27.default.createElement("td", null, /* @__PURE__ */ import_react27.default.createElement(Status, { value: row.status })), /* @__PURE__ */ import_react27.default.createElement("td", null, formatDate(row.reviewed_at)), /* @__PURE__ */ import_react27.default.createElement("td", null, row.feedback || "\u2014"), /* @__PURE__ */ import_react27.default.createElement("td", null, /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", onClick: () => applicant && navigate("applicant", applicant.id), "aria-label": "\u09AB\u09BE\u0987\u09B2 \u0996\u09C1\u09B2\u09C1\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(ChevronRight, null))));
  }))))));
}
function ContentPage({ data, navigate, setModal, refreshData, pushToast, profile, admin }) {
  const [tab, setTab] = (0, import_react27.useState)("updates");
  const [query, setQuery] = (0, import_react27.useState)("");
  const [busy, setBusy] = (0, import_react27.useState)("");
  const rows = tab === "updates" ? data.updates : data.blogs;
  const filtered = rows.filter((row) => `${row.title_bn || ""} ${row.title || ""} ${row.body_bn || row.excerpt_bn || ""}`.toLowerCase().includes(query.toLowerCase()));
  const publish = async (row) => {
    setBusy(row.id);
    const table = tab === "updates" ? "visa_updates" : "blog_posts";
    const { error } = await supabase.from(table).update({ status: "published", published_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", row.id);
    setBusy("");
    if (error) pushToast(`Publish \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      pushToast("\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7; \u098F\u099C\u09C7\u09A8\u09CD\u099F\u09A6\u09C7\u09B0 \u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  const archive = async (row) => {
    setBusy(row.id);
    const table = tab === "updates" ? "visa_updates" : "blog_posts";
    const { error } = await supabase.from(table).update({ status: "archived" }).eq("id", row.id);
    setBusy("");
    if (error) pushToast(error.message, "error");
    else {
      pushToast("\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u0986\u09B0\u09CD\u0995\u09BE\u0987\u09AD \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09B8\u09CD\u099F\u09C1\u09A1\u09BF\u0993"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F \u0993 First Fly Insights \u09A4\u09C8\u09B0\u09BF, draft, preview \u098F\u09AC\u0982 publish \u0995\u09B0\u09C1\u09A8\u2014\u0995\u09CB\u09A8\u09CB redeploy \u099B\u09BE\u09A1\u09BC\u09BE\u0987\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft", onClick: () => setModal({ type: "content-editor", kind: "update" }) }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "Visa Update"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", onClick: () => setModal({ type: "content-editor", kind: "blog" }) }, /* @__PURE__ */ import_react27.default.createElement(BookOpen, null), "Blog \u09B2\u09BF\u0996\u09C1\u09A8"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "content-tabs" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: tab === "updates" ? "active" : "", onClick: () => setTab("updates") }, /* @__PURE__ */ import_react27.default.createElement(Newspaper, null), "Visa Updates ", /* @__PURE__ */ import_react27.default.createElement("span", null, data.updates.length)), /* @__PURE__ */ import_react27.default.createElement("button", { className: tab === "blogs" ? "active" : "", onClick: () => setTab("blogs") }, /* @__PURE__ */ import_react27.default.createElement(BookOpen, null), "First Fly Insights ", /* @__PURE__ */ import_react27.default.createElement("span", null, data.blogs.length))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "toolbar" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "search-wrap" }, /* @__PURE__ */ import_react27.default.createElement(Search, null), /* @__PURE__ */ import_react27.default.createElement("input", { className: "search-input", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "\u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE \u09AC\u09BE \u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u0996\u09C1\u0981\u099C\u09C1\u09A8" })), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue" }, filtered.length, "\u099F\u09BF")), filtered.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "content-list" }, filtered.map((row) => {
    const country = countryFor(data.countries, row.country_id);
    return /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass content-row", key: row.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "flag-square" }, country?.flag_emoji || "\u{1F4F0}"), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, row.title_bn || row.title), /* @__PURE__ */ import_react27.default.createElement("small", null, countryLabel(country), " \xB7 ", formatDate(row.published_at || row.updated_at || row.created_at))), /* @__PURE__ */ import_react27.default.createElement(Status, { value: row.status }), row.status === "draft" && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", onClick: () => publish(row), disabled: busy === row.id }, busy === row.id ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Check, null), "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C1\u09A8"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", onClick: () => tab === "updates" ? navigate("update", row.id) : navigate("blog", row.id), "aria-label": "\u09AA\u09CD\u09B0\u09BF\u09AD\u09BF\u0989" }, /* @__PURE__ */ import_react27.default.createElement(Eye, null)), row.status !== "archived" && /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", onClick: () => archive(row), "aria-label": "\u0986\u09B0\u09CD\u0995\u09BE\u0987\u09AD" }, /* @__PURE__ */ import_react27.default.createElement(FolderClosed, null)));
  })) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: tab === "updates" ? Newspaper : BookOpen, title: tab === "updates" ? "\u09AD\u09BF\u09B8\u09BE \u0986\u09AA\u09A1\u09C7\u099F \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF" : "\u09AC\u09CD\u09B2\u0997 \u09AA\u09CB\u09B8\u09CD\u099F \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF", body: "\u09A8\u09A4\u09C1\u09A8 \u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C7 draft preview \u0995\u09B0\u09C1\u09A8, \u09A4\u09BE\u09B0\u09AA\u09B0 publish \u0995\u09B0\u09C1\u09A8\u0964", action: () => setModal({ type: "content-editor", kind: tab === "updates" ? "update" : "blog" }), actionLabel: "\u09A8\u09A4\u09C1\u09A8 \u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F" }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 13 } }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09A8\u09BE\u09B0 \u09A6\u09BE\u09AF\u09BC\u09BF\u09A4\u09CD\u09AC:"), " live policy feed \u09B8\u09CD\u09AC\u09AF\u09BC\u0982\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u09A8\u09AF\u09BC\u0964 \u0986\u09AA\u09A1\u09C7\u099F publish \u0995\u09B0\u09BE\u09B0 \u0986\u0997\u09C7 \u09B8\u09B0\u0995\u09BE\u09B0\u09BF source, checked date \u098F\u09AC\u0982 \u09B8\u09A0\u09BF\u0995 \u09AD\u09BE\u09B7\u09BE \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964")));
}
function CountriesPage({ data, profile, pushToast, refreshData, setModal, navigate }) {
  const [tab, setTab] = (0, import_react27.useState)("countries");
  const [categoryName, setCategoryName] = (0, import_react27.useState)("");
  const [categoryNameBn, setCategoryNameBn] = (0, import_react27.useState)("");
  const addCategory = async (event) => {
    event.preventDefault();
    if (!categoryName.trim() || !categoryNameBn.trim()) return;
    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `category-${crypto.randomUUID().slice(0, 6)}`;
    const { error } = await supabase.from("visa_categories").insert({ workspace_id: profile.workspace_id, slug, name: categoryName.trim(), name_bn: categoryNameBn.trim(), is_active: true, sort_order: 100 });
    if (error) pushToast(`\u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09AF\u09CB\u0997 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      setCategoryName("");
      setCategoryNameBn("");
      pushToast("\u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09AF\u09CB\u0997 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u09A6\u09C7\u09B6 \u0993 \u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Backend master data; \u09A6\u09C7\u09B6, \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09B8\u09C2\u09A4\u09CD\u09B0, \u09AC\u09BF\u09AD\u09BE\u0997 \u0993 checklist \u09A4\u09A5\u09CD\u09AF \u098F\u0996\u09BE\u09A8\u09C7 \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u09BF\u09A4 \u09B9\u09AF\u09BC\u0964")), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", onClick: () => setModal({ type: "country" }) }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "\u09A6\u09C7\u09B6 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "content-tabs" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: tab === "countries" ? "active" : "", onClick: () => setTab("countries") }, /* @__PURE__ */ import_react27.default.createElement(Earth, null), "\u09A6\u09C7\u09B6\u09B8\u09AE\u09C2\u09B9 ", /* @__PURE__ */ import_react27.default.createElement("span", null, data.countries.length)), /* @__PURE__ */ import_react27.default.createElement("button", { className: tab === "categories" ? "active" : "", onClick: () => setTab("categories") }, /* @__PURE__ */ import_react27.default.createElement(Filter, null), "Visa Categories ", /* @__PURE__ */ import_react27.default.createElement("span", null, data.categories.length)), /* @__PURE__ */ import_react27.default.createElement("button", { className: tab === "checklists" ? "active" : "", onClick: () => setTab("checklists") }, /* @__PURE__ */ import_react27.default.createElement(ClipboardCheck, null), "Checklists ", /* @__PURE__ */ import_react27.default.createElement("span", null, data.checklists.length))), tab === "countries" && /* @__PURE__ */ import_react27.default.createElement("div", { className: "country-admin-grid" }, data.countries.map((country) => /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass country-admin-card", key: country.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "flag-square" }, country.flag_emoji || "\u{1F310}"), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("b", null, country.name_bn || country.name), /* @__PURE__ */ import_react27.default.createElement("small", null, country.name, " \xB7 ", country.region || "\u2014")), /* @__PURE__ */ import_react27.default.createElement("span", { className: "top-spacer" }), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: country.is_active ? "green" : "gold" }, country.is_active ? "\u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC" : "\u09A8\u09BF\u09B7\u09CD\u0995\u09CD\u09B0\u09BF\u09AF\u09BC"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", onClick: () => window.open(country.official_url, "_blank", "noopener,noreferrer"), disabled: !country.official_url, "aria-label": "\u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0989\u09CE\u09B8" }, /* @__PURE__ */ import_react27.default.createElement(ExternalLink, null)))), !data.countries.length && /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Earth, title: "\u09A6\u09C7\u09B6 \u09AF\u09CB\u0997 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF", body: "Admin \u0997\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF country data \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964" })), tab === "categories" && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("form", { className: "glass category-add-form", onSubmit: addCategory }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Category name (English)"), /* @__PURE__ */ import_react27.default.createElement("input", { value: categoryName, onChange: (event) => setCategoryName(event.target.value), placeholder: "e.g. Medical", required: true })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AC\u09BE\u0982\u09B2\u09BE \u09A8\u09BE\u09AE"), /* @__PURE__ */ import_react27.default.createElement("input", { value: categoryNameBn, onChange: (event) => setCategoryNameBn(event.target.value), placeholder: "\u09AF\u09C7\u09AE\u09A8: \u09AE\u09C7\u09A1\u09BF\u0995\u09C7\u09B2", required: true })), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", type: "submit" }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "\u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "list-stack" }, data.categories.map((category) => /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass list-row", key: category.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(Filter, null)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, category.name_bn || category.name), /* @__PURE__ */ import_react27.default.createElement("small", null, category.name, " \xB7 ", category.slug)), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: category.is_active ? "green" : "gold" }, category.is_active ? "\u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC" : "\u09A8\u09BF\u09B7\u09CD\u0995\u09CD\u09B0\u09BF\u09AF\u09BC"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: async () => {
    const { error } = await supabase.from("visa_categories").update({ is_active: !category.is_active }).eq("id", category.id);
    if (error) pushToast(error.message, "error");
    else refreshData({ quiet: true });
  } }, category.is_active ? "\u09A8\u09BF\u09B7\u09CD\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0\u09C1\u09A8" : "\u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0\u09C1\u09A8"))))), tab === "checklists" && /* @__PURE__ */ import_react27.default.createElement(ChecklistsInline, { ...{ data, profile, pushToast, refreshData, setModal } }));
}
function ChecklistsInline({ data, profile, pushToast, refreshData, setModal }) {
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions", style: { marginBottom: 12 } }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft", onClick: () => setModal({ type: "checklist" }) }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "Checklist \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C1\u09A8")), data.checklists.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "list-stack" }, data.checklists.map((item) => /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass content-row", key: item.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(ClipboardCheck, null)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, countryLabel(countryFor(data.countries, item.country_id)), " \xB7 ", categoryLabel(categoryFor(data.categories, item.visa_category_id))), /* @__PURE__ */ import_react27.default.createElement("small", null, Array.isArray(item.required_documents) ? item.required_documents.length : 0, "\u099F\u09BF document requirement \xB7 \u09AF\u09BE\u099A\u09BE\u0987 ", formatDate(item.checked_at))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: () => setModal({ type: "checklist", checklist: item }) }, "\u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE")))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: ClipboardCheck, title: "\u0995\u09CB\u09A8\u09CB checklist \u09A8\u09C7\u0987", body: "\u0985\u09AB\u09BF\u09B8\u09BF\u09AF\u09BC\u09BE\u09B2 \u0989\u09CE\u09B8 \u09A6\u09C7\u0996\u09C7 country + visa category \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 required documents \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964", action: () => setModal({ type: "checklist" }), actionLabel: "Checklist \u09A4\u09C8\u09B0\u09BF" }));
}
function DocumentsPage({ data, visibleApplicants, navigate, admin, pushToast }) {
  const [query, setQuery] = (0, import_react27.useState)("");
  const applicantById = new Map(visibleApplicants.map((item) => [item.id, item]));
  const rows = data.documents.filter((doc) => applicantById.has(doc.applicant_id)).filter((doc) => `${doc.file_name} ${doc.category} ${applicantById.get(doc.applicant_id)?.full_name || ""}`.toLowerCase().includes(query.toLowerCase()));
  const open = async (doc) => {
    const { data: result, error } = await supabase.storage.from(BUCKET_DOCUMENTS).createSignedUrl(doc.storage_path, 60);
    if (error) {
      pushToast(`\u09A8\u09A5\u09BF \u0996\u09CB\u09B2\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
      return;
    }
    window.open(result.signedUrl, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u09B2\u09BE\u0987\u09AC\u09CD\u09B0\u09C7\u09B0\u09BF"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AA\u09CD\u09B0\u09BE\u0987\u09AD\u09C7\u099F Storage \u09A5\u09C7\u0995\u09C7 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u0993 \u0985\u09A8\u09C1\u09AE\u09A4\u09BF\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0995 \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u0964")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue", icon: FolderOpen }, rows.length, " \u09A8\u09A5\u09BF")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginBottom: 12 } }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "Private storage:"), " download link \u09EC\u09E6 \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1\u09C7 \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6\u09CB\u09A4\u09CD\u09A4\u09C0\u09B0\u09CD\u09A3 \u09B9\u09AF\u09BC\u0964 Agent \u0995\u09C7\u09AC\u09B2 \u09A8\u09BF\u099C\u09C7\u09B0 assigned applicant-\u098F\u09B0 \u09A8\u09A5\u09BF \u09A6\u09C7\u0996\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "toolbar" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "search-wrap" }, /* @__PURE__ */ import_react27.default.createElement(Search, null), /* @__PURE__ */ import_react27.default.createElement("input", { className: "search-input", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "\u09AB\u09BE\u0987\u09B2\u09C7\u09B0 \u09A8\u09BE\u09AE, \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09AC\u09BE \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0" }))), rows.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "content-list" }, rows.map((doc) => {
    const applicant = applicantById.get(doc.applicant_id);
    return /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass content-row", key: doc.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "doc-icon" }, /* @__PURE__ */ import_react27.default.createElement(FileText, null)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, doc.file_name), /* @__PURE__ */ import_react27.default.createElement("small", null, applicant?.reference, " \xB7 ", applicant?.full_name, " \xB7 ", DOCUMENT_TYPES.find((item) => item.value === doc.category)?.label || doc.category, " \xB7 ", formatBytes(doc.byte_size))), /* @__PURE__ */ import_react27.default.createElement(Pill, null, formatDate(doc.created_at)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => open(doc) }, /* @__PURE__ */ import_react27.default.createElement(Eye, null), "\u0996\u09C1\u09B2\u09C1\u09A8"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", onClick: () => navigate("applicant", applicant.id), "aria-label": "Applicant profile" }, /* @__PURE__ */ import_react27.default.createElement(ChevronRight, null)));
  })) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: FolderOpen, title: "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF", body: "Applicant file \u09A5\u09C7\u0995\u09C7 document upload \u0995\u09B0\u09B2\u09C7 \u09A4\u09BE \u098F\u0996\u09BE\u09A8\u09C7 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7\u0964", action: () => navigate("applicants"), actionLabel: "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u09A6\u09C7\u0996\u09C1\u09A8" }));
}
function ChatPage({ profile, admin, data, chatMessages, chatConversation, chatLoading, loadChatMessages, pushToast, setOperationLoading, navigate, selectedId }) {
  const [text, setText] = (0, import_react27.useState)("");
  const [file, setFile] = (0, import_react27.useState)(null);
  const [sending, setSending] = (0, import_react27.useState)(false);
  const endRef = (0, import_react27.useRef)(null);
  const context = data.applicants.find((row) => row.id === selectedId) || null;
  (0, import_react27.useEffect)(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatMessages.length]);
  const send = async (event) => {
    event.preventDefault();
    if (!chatConversation) {
      pushToast("Team conversation \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC\u09A8\u09BF\u0964 Supabase migration \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964", "error");
      return;
    }
    if (!text.trim() && !file) return;
    setSending(true);
    let attachmentPath = null;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setSending(false);
        pushToast("Chat attachment \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09E9\u09E6 MB\u0964", "error");
        return;
      }
      attachmentPath = `${profile.workspace_id}/${chatConversation.id}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
      const { error: error2 } = await supabase.storage.from("team-chat-files").upload(attachmentPath, file, { contentType: file.type || "application/octet-stream" });
      if (error2) {
        setSending(false);
        pushToast(`\u09AB\u09BE\u0987\u09B2 \u09B6\u09C7\u09AF\u09BC\u09BE\u09B0 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error2.message}`, "error");
        return;
      }
    }
    const { error } = await supabase.from("chat_messages").insert({ workspace_id: profile.workspace_id, conversation_id: chatConversation.id, sender_id: profile.id, body: text.trim(), attachment_path: attachmentPath, attachment_name: file?.name || null, related_applicant_id: context?.id || null });
    setSending(false);
    if (error) {
      if (attachmentPath) await supabase.storage.from("team-chat-files").remove([attachmentPath]);
      pushToast(`\u09AE\u09C7\u09B8\u09C7\u099C \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
      return;
    }
    setText("");
    setFile(null);
    await loadChatMessages(chatConversation.id);
  };
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u099F\u09BF\u09AE \u099A\u09CD\u09AF\u09BE\u099F"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Admin \u2194 Agent realtime conversation; \u09AB\u09BE\u0987\u09B2 attach \u098F\u09AC\u0982 applicant context \u09B6\u09C7\u09AF\u09BC\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "green", icon: Activity }, "Supabase Realtime")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "chat-shell" }, /* @__PURE__ */ import_react27.default.createElement("aside", { className: "glass chat-list" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u0995\u09A5\u09CB\u09AA\u0995\u09A5\u09A8"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Workspace channel")), /* @__PURE__ */ import_react27.default.createElement(MessageCircle, { size: 15 })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "chat-thread" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "avatar" }, "FF"), /* @__PURE__ */ import_react27.default.createElement("span", { style: { flex: 1 } }, /* @__PURE__ */ import_react27.default.createElement("b", null, "Admin \u2194 Agent Desk"), /* @__PURE__ */ import_react27.default.createElement("small", null, "\u099F\u09BF\u09AE \u0995\u09A8\u09AD\u09BE\u09B0\u09B8\u09C7\u09B6\u09A8 \xB7 private")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "green" }, "\u09B2\u09BE\u0987\u09AD")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "Messages authenticated workspace membership \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09BF\u09A4\u0964 RLS \u099B\u09BE\u09A1\u09BC\u09BE message/file access \u09B8\u09AE\u09CD\u09AD\u09AC \u09A8\u09AF\u09BC\u0964"))), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass chat-main" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "chat-top" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "avatar" }, admin ? "FF" : initials(profile.full_name)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Admin \u2194 Agent Desk"), /* @__PURE__ */ import_react27.default.createElement("small", null, admin ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F", " \xB7 \u09B0\u09BF\u09AF\u09BC\u09C7\u09B2-\u099F\u09BE\u0987\u09AE \u099F\u09BF\u09AE \u099A\u09CD\u09AF\u09BE\u099F")), /* @__PURE__ */ import_react27.default.createElement("span", { className: "top-spacer" }), chatConversation ? /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "green" }, "\u09B8\u0982\u09AF\u09C1\u0995\u09CD\u09A4") : /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "gold" }, "\u0995\u09A8\u09AB\u09BF\u0997\u09BE\u09B0\u09C7\u09B6\u09A8 \u09AF\u09BE\u099A\u09BE\u0987")), context && /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice", style: { margin: "9px 10px 0" } }, /* @__PURE__ */ import_react27.default.createElement(BriefcaseBusiness, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "\u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u09AB\u09BE\u0987\u09B2: ", /* @__PURE__ */ import_react27.default.createElement("strong", null, context.reference, " \xB7 ", context.full_name), /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", onClick: () => navigate("applicant", context.id) }, "\u09AB\u09BE\u0987\u09B2 \u09A6\u09C7\u0996\u09C1\u09A8 ", /* @__PURE__ */ import_react27.default.createElement(ChevronRight, null))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", onClick: () => navigate("chat"), "aria-label": "Context \u09B8\u09B0\u09BE\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(X, null))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "chat-messages" }, chatLoading ? /* @__PURE__ */ import_react27.default.createElement(LoadingDots, { label: "\u09AE\u09C7\u09B8\u09C7\u099C \u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7..." }) : chatMessages.length ? chatMessages.map((message) => /* @__PURE__ */ import_react27.default.createElement(ChatBubble, { key: message.id, message, profile, data, navigate, pushToast })) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: MessageCircle, title: "\u0995\u09A5\u09CB\u09AA\u0995\u09A5\u09A8 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C1\u09A8", body: "\u098F\u0996\u09BE\u09A8\u09C7 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE database-\u098F \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09AC\u09C7 \u098F\u09AC\u0982 \u0985\u09AA\u09B0 portal-\u098F realtime-\u098F \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7\u0964" }), /* @__PURE__ */ import_react27.default.createElement("div", { ref: endRef })), file && /* @__PURE__ */ import_react27.default.createElement("div", { className: "chat-file" }, /* @__PURE__ */ import_react27.default.createElement(Paperclip, { size: 12 }), /* @__PURE__ */ import_react27.default.createElement("b", null, file.name), /* @__PURE__ */ import_react27.default.createElement("small", null, formatBytes(file.size)), /* @__PURE__ */ import_react27.default.createElement("button", { className: "icon-mini", onClick: () => setFile(null), "aria-label": "\u09AB\u09BE\u0987\u09B2 \u09B8\u09B0\u09BE\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(X, null))), /* @__PURE__ */ import_react27.default.createElement("form", { className: "chat-compose", onSubmit: send }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "icon-mini attachment-control", title: "\u09AB\u09BE\u0987\u09B2 \u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09C1\u09A8" }, /* @__PURE__ */ import_react27.default.createElement(Paperclip, null), /* @__PURE__ */ import_react27.default.createElement("input", { type: "file", hidden: true, onChange: (event) => setFile(event.target.files?.[0] || null), accept: ".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xlsx" })), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: text, onChange: (event) => setText(event.target.value), placeholder: "\u09AC\u09BE\u0982\u09B2\u09BE\u09AF\u09BC \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE \u09B2\u09BF\u0996\u09C1\u09A8...", maxLength: 2e3, rows: 1 }), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn sm", type: "submit", disabled: sending }, sending ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Send, null), "\u09AA\u09BE\u09A0\u09BE\u09A8")))));
}
function ChatBubble({ message, profile, data, navigate, pushToast }) {
  const mine = message.sender_id === profile.id;
  const sender = data.profiles.find((user) => user.id === message.sender_id);
  const openAttachment = async () => {
    const { data: result, error } = await supabase.storage.from("team-chat-files").createSignedUrl(message.attachment_path, 60);
    if (error) pushToast(`\u09AB\u09BE\u0987\u09B2 \u0996\u09CB\u09B2\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else window.open(result.signedUrl, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: cn("bubble", mine ? "mine" : "") }, /* @__PURE__ */ import_react27.default.createElement("span", null, message.body), message.attachment_path && /* @__PURE__ */ import_react27.default.createElement("button", { className: "chat-attachment", onClick: openAttachment }, /* @__PURE__ */ import_react27.default.createElement(FileText, { size: 13 }), message.attachment_name || "Attachment", " ", /* @__PURE__ */ import_react27.default.createElement(Download, { size: 11 })), message.related_applicant_id && data.applicants.find((item) => item.id === message.related_applicant_id) && /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", style: { color: mine ? "white" : "var(--blue)" }, onClick: () => navigate("applicant", message.related_applicant_id) }, "\u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0: ", data.applicants.find((item) => item.id === message.related_applicant_id)?.reference, " ", /* @__PURE__ */ import_react27.default.createElement(ChevronRight, null)), /* @__PURE__ */ import_react27.default.createElement("small", null, sender?.full_name || (mine ? profile.full_name : "\u099F\u09BF\u09AE \u09B8\u09A6\u09B8\u09CD\u09AF"), " \xB7 ", formatTime(message.created_at)));
}
function NotificationsPage({ data, refreshData, navigate, pushToast }) {
  const markRead = async (note) => {
    const { error } = await supabase.from("notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", note.id);
    if (error) pushToast(error.message, "error");
    else refreshData({ quiet: true });
  };
  const open = async (note) => {
    if (!note.read_at) await markRead(note);
    if (note.entity_type === "applicants" && note.entity_id) navigate("applicant", note.entity_id);
    else if (note.entity_type === "visa_updates" && note.entity_id) navigate("update", note.entity_id);
    else if (note.entity_type === "blog_posts" && note.entity_id) navigate("blog", note.entity_id);
    else if (note.entity_type === "chat_conversation") navigate("chat");
  };
  const unread = data.notifications.filter((item) => !item.read_at);
  const markAll = async () => {
    const ids = unread.map((item) => item.id);
    if (!ids.length) return;
    const { error } = await supabase.from("notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).in("id", ids);
    if (error) pushToast(error.message, "error");
    else {
      pushToast("\u09B8\u09AC \u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8 \u09AA\u09A0\u09BF\u09A4 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u099A\u09BF\u09B9\u09CD\u09A8\u09BF\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Database event \u09A5\u09C7\u0995\u09C7 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8, publish \u0993 team message alert\u0964")), unread.length > 0 && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: markAll }, /* @__PURE__ */ import_react27.default.createElement(Check, null), "\u09B8\u09AC \u09AA\u09A0\u09BF\u09A4")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notification-list" }, data.notifications.length ? data.notifications.map((note) => /* @__PURE__ */ import_react27.default.createElement("button", { className: cn("glass notification-row", !note.read_at ? "unread" : ""), key: note.id, onClick: () => open(note) }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(Bell, null)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, note.title), /* @__PURE__ */ import_react27.default.createElement("small", null, note.body), /* @__PURE__ */ import_react27.default.createElement("small", null, formatDate(note.created_at), " \xB7 ", formatTime(note.created_at))), !note.read_at && /* @__PURE__ */ import_react27.default.createElement("i", { className: "unread-dot" }), /* @__PURE__ */ import_react27.default.createElement(ChevronRight, { size: 14 }))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Bell, title: "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8 \u09A8\u09C7\u0987", body: "Admin Visa Update \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09B2\u09C7 \u09AC\u09BE approval/chat event \u0998\u099F\u09B2\u09C7 \u098F\u0996\u09BE\u09A8\u09C7 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7\u0964" })));
}
function UpdateDetailPage({ update, data, navigate }) {
  if (!update) return /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Newspaper, title: "\u0986\u09AA\u09A1\u09C7\u099F \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF", body: "\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09AF\u09BC \u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u09A8\u0964", action: () => navigate("updates"), actionLabel: "\u0986\u09AA\u09A1\u09C7\u099F \u09A4\u09BE\u09B2\u09BF\u0995\u09BE" });
  const country = countryFor(data.countries, update.country_id);
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", onClick: () => navigate("updates") }, /* @__PURE__ */ import_react27.default.createElement(ArrowLeft, null), "\u09B8\u09AC \u0986\u09AA\u09A1\u09C7\u099F"), /* @__PURE__ */ import_react27.default.createElement("p", null, country?.flag_emoji || "\u{1F310}", " ", countryLabel(country))), /* @__PURE__ */ import_react27.default.createElement(Status, { value: update.status })), /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass update-detail" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "news-top" }, /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "orange" }, update.category || "Team Update"), /* @__PURE__ */ import_react27.default.createElement(Pill, null, formatDate(update.published_at || update.created_at))), /* @__PURE__ */ import_react27.default.createElement("h2", null, update.title_bn || update.title), /* @__PURE__ */ import_react27.default.createElement("p", { className: "body" }, update.body_bn || update.body), update.source_url && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09B8\u09C2\u09A4\u09CD\u09B0" }), /* @__PURE__ */ import_react27.default.createElement("a", { className: "source-link", target: "_blank", rel: "noopener noreferrer", href: update.source_url }, /* @__PURE__ */ import_react27.default.createElement(ExternalLink, null), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, update.source_label || "\u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0993\u09AF\u09BC\u09C7\u09AC\u09B8\u09BE\u0987\u099F"), /* @__PURE__ */ import_react27.default.createElement("br", null), update.source_url))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 13 } }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u09B6\u09C1\u09A7\u09C1 \u09A4\u09A5\u09CD\u09AF\u09B8\u09C2\u09A4\u09CD\u09B0:"), " \u098F\u0987 internal update \u0995\u09CB\u09A8\u09CB \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0998\u09CB\u09B7\u09A3\u09BE \u09AC\u09BE \u0986\u0987\u09A8\u09BF \u09AA\u09B0\u09BE\u09AE\u09B0\u09CD\u09B6 \u09A8\u09AF\u09BC\u0964"))));
}
function BlogDetailPage({ blog, data, navigate }) {
  const [query, setQuery] = (0, import_react27.useState)("");
  if (!blog) {
    const blogs = data.blogs.filter((item) => item.status === "published").filter((item) => `${item.title_bn} ${item.title} ${item.excerpt_bn}`.toLowerCase().includes(query.toLowerCase()));
    return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "First Fly Insights"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AD\u09BF\u09B8\u09BE \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u09BF, \u0986\u09AC\u09C7\u09A6\u09A8 \u09AA\u09CD\u09B0\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE \u0993 \u099F\u09BF\u09AE\u09C7\u09B0 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u099C\u09CD\u099E\u09BE\u09A8\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0995 \u09B2\u09C7\u0996\u09BE\u0964"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "toolbar" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "search-wrap" }, /* @__PURE__ */ import_react27.default.createElement(Search, null), /* @__PURE__ */ import_react27.default.createElement("input", { className: "search-input", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "\u09AC\u09CD\u09B2\u0997 \u0996\u09C1\u0981\u099C\u09C1\u09A8" }))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "article-grid" }, blogs.map((item) => /* @__PURE__ */ import_react27.default.createElement(BlogCard, { key: item.id, blog: item, country: countryFor(data.countries, item.country_id), onClick: () => navigate("blog", item.id) }))), !blogs.length && /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: BookOpen, title: "\u0995\u09CB\u09A8\u09CB \u09AC\u09CD\u09B2\u0997 \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09A8\u09C7\u0987", body: "Admin \u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09B8\u09CD\u099F\u09C1\u09A1\u09BF\u0993 \u09A5\u09C7\u0995\u09C7 \u09B2\u09C7\u0996\u09BE \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09B2\u09C7 \u098F\u0996\u09BE\u09A8\u09C7 \u0986\u09B8\u09AC\u09C7\u0964" }));
  }
  const cover = blog.cover_image_path && supabase.storage.from("published-content").getPublicUrl(blog.cover_image_path).data.publicUrl;
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", onClick: () => navigate("blog") }, /* @__PURE__ */ import_react27.default.createElement(ArrowLeft, null), "\u09B8\u09AC \u09B2\u09C7\u0996\u09BE"), /* @__PURE__ */ import_react27.default.createElement("p", null, formatDate(blog.published_at), " \xB7 ", countryLabel(countryFor(data.countries, blog.country_id))))), /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass article-detail" }, cover && /* @__PURE__ */ import_react27.default.createElement("img", { className: "cover", src: cover, alt: "" }), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "orange" }, "First Fly Insights"), /* @__PURE__ */ import_react27.default.createElement("h2", null, blog.title_bn || blog.title), /* @__PURE__ */ import_react27.default.createElement("p", { className: "muted tiny" }, blog.excerpt_bn), /* @__PURE__ */ import_react27.default.createElement("hr", { className: "soft-rule" }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "markdown-body" }, blog.content_markdown), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 16 } }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "\u09AC\u09CD\u09B2\u0997\u099F\u09BF \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09A4\u09A5\u09CD\u09AF; \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u09AD\u09BF\u09B8\u09BE \u09A8\u09BF\u09AF\u09BC\u09AE \u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09B8\u09C2\u09A4\u09CD\u09B0\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964"))));
}
function GooglePage({ profile, admin, googleStatus, setGoogleStatus, pushToast, setModal, run }) {
  const [working, setWorking] = (0, import_react27.useState)(false);
  const status = googleStatus?.status || "loading";
  const connect = async () => {
    setWorking(true);
    try {
      const result = await invokeFunction("google-oauth-start");
      if (!result?.authorization_url) throw new Error("OAuth URL \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC\u09A8\u09BF\u0964 Supabase function secrets \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964");
      window.location.assign(result.authorization_url);
    } catch (error) {
      setGoogleStatus({ status: "not_configured", error: error.message });
      pushToast(error.message, "error");
    } finally {
      setWorking(false);
    }
  };
  const disconnect = async () => {
    setWorking(true);
    try {
      await invokeFunction("google-disconnect");
      setGoogleStatus({ status: "disconnected" });
      pushToast("Google connection \u09AC\u09BF\u099A\u09CD\u099B\u09BF\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
    } catch (error) {
      pushToast(error.message, "error");
    } finally {
      setWorking(false);
    }
  };
  const createDoc = () => setModal({ type: "google-action", action: "docs_create" });
  const gmail = () => setModal({ type: "gmail", action: "gmail_send" });
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "Google Workspace"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Google Drive, Docs \u0993 Gmail-\u098F\u09B0 server-side OAuth connection \u098F\u09AC\u0982 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u099F\u09CB\u0995\u09C7\u09A8 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8\u09BE\u0964")), status === "connected" ? /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "green", icon: CircleCheck }, "\u09B8\u0982\u09AF\u09C1\u0995\u09CD\u09A4") : /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "gold", icon: Cloud }, "\u09B8\u0982\u09AF\u09CB\u0997 \u09A8\u09C7\u0987")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass integration-hero" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "integration-symbol" }, /* @__PURE__ */ import_react27.default.createElement(Cloud, { size: 25 })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "grow" }, /* @__PURE__ */ import_react27.default.createElement("h2", null, "Google Workspace connection"), /* @__PURE__ */ import_react27.default.createElement("p", null, status === "loading" ? "Connection status \u09AF\u09BE\u099A\u09BE\u0987 \u09B9\u099A\u09CD\u099B\u09C7..." : status === "connected" ? `${googleStatus.google_email || "Google account"} \xB7 ${googleStatus.scopes?.length || 0} \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 scope` : "OAuth consent \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09B2\u09C7 \u09B6\u09C1\u09A7\u09C1 encrypted token Supabase-\u098F \u09A5\u09BE\u0995\u09AC\u09C7; client-\u098F refresh token \u0995\u0996\u09A8\u09CB \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC \u09A8\u09BE\u0964")), status === "connected" ? /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn danger sm", onClick: disconnect, disabled: working }, working ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(X, null), "\u09B8\u0982\u09AF\u09CB\u0997 \u09AC\u09BF\u099A\u09CD\u099B\u09BF\u09A8\u09CD\u09A8") : /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", onClick: connect, disabled: working || status === "loading" }, working ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(ExternalLink, null), "Google OAuth \u09B8\u0982\u09AF\u09CB\u0997")), googleStatus?.error && /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 10 } }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "Connection status \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF:"), " ", googleStatus.error, /* @__PURE__ */ import_react27.default.createElement("br", null), "Supabase Edge Functions deploy \u098F\u09AC\u0982 OAuth credentials configure \u0995\u09B0\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u09B8\u0982\u09AF\u09C1\u0995\u09CD\u09A4\u09BF\u09B0 \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE", subtitle: "\u0985\u09A8\u09C1\u09AE\u09A4\u09BF \u09A8\u09BE \u09A5\u09BE\u0995\u09BE \u0985\u09AC\u09B8\u09CD\u09A5\u09BE\u09AF\u09BC \u0995\u09CB\u09A8\u09CB action \u0985\u09A8\u09C1\u0995\u09B0\u09A3 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC \u09A8\u09BE\u0964" }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "integration-grid" }, /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass setting-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "setting-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(FolderOpen, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Google Drive"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Applicant file permission \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 secure export"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", disabled: status !== "connected", onClick: () => pushToast("Applicant document \u09A5\u09C7\u0995\u09C7 Google Drive action \u09A8\u09BF\u09A8\u0964") }, "Drive action ", /* @__PURE__ */ import_react27.default.createElement(ArrowRight, null))), /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass setting-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "setting-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(FileText, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Google Docs"), /* @__PURE__ */ import_react27.default.createElement("small", null, "A4 summary \u09A5\u09C7\u0995\u09C7 Google Doc \u09A4\u09C8\u09B0\u09BF"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", disabled: status !== "connected", onClick: createDoc }, "Google Doc \u09A4\u09C8\u09B0\u09BF ", /* @__PURE__ */ import_react27.default.createElement(Plus, null))), /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass setting-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "setting-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(Mail, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Gmail"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Applicant-\u0995\u09C7 account-\u098F\u09B0 \u09AA\u0995\u09CD\u09B7 \u09A5\u09C7\u0995\u09C7 \u0987\u09AE\u09C7\u0987\u09B2"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", disabled: status !== "connected", onClick: gmail }, "\u0987\u09AE\u09C7\u0987\u09B2 \u09B2\u09BF\u0996\u09C1\u09A8 ", /* @__PURE__ */ import_react27.default.createElement(Send, null)))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass panel", style: { marginTop: 12 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE \u09B8\u09CD\u09A5\u09BE\u09AA\u09A4\u09CD\u09AF"), /* @__PURE__ */ import_react27.default.createElement("p", null, "OAuth server-side only")), /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature-list" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature" }, /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null), "Google Client Secret \u0993 refresh token Supabase Edge Function secrets \u098F\u09AC\u0982 encrypted DB field-\u098F \u09A5\u09BE\u0995\u09C7\u0964"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature" }, /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null), "OAuth state HMAC \u09A6\u09BF\u09AF\u09BC\u09C7 \u09B8\u09CD\u09AC\u09BE\u0995\u09CD\u09B7\u09B0\u09BF\u09A4; callback URL Supabase function route\u0964"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature" }, /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null), "Client \u0995\u09C7\u09AC\u09B2 connection status \u09AA\u09A1\u09BC\u09C7; token table RLS-\u098F deny \u0995\u09B0\u09BE\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 12 } }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "Google Cloud project-\u098F Drive, Docs \u0993 Gmail API enable, OAuth consent screen publish/verify \u098F\u09AC\u0982 redirect URL allowlist \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964"))));
}
function AiPage({ profile, data, aiMessages, setAiMessages, pushToast, setOperationLoading }) {
  const [question, setQuestion] = (0, import_react27.useState)("");
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const transcriptRef = (0, import_react27.useRef)(null);
  (0, import_react27.useEffect)(() => transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" }), [aiMessages.length]);
  const ask = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    const prompt = question.trim();
    setAiMessages((current) => [...current, { role: "user", text: prompt, created_at: (/* @__PURE__ */ new Date()).toISOString() }]);
    setQuestion("");
    setBusy(true);
    setOperationLoading("AI \u09B8\u09B9\u0995\u09BE\u09B0\u09C0 \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4 \u09B9\u099A\u09CD\u099B\u09C7...");
    try {
      const result = await invokeFunction("visa-case-assistant", { question: prompt });
      setAiMessages((current) => [...current, { role: "assistant", text: result.answer || "Server \u09A5\u09C7\u0995\u09C7 \u0989\u09A4\u09CD\u09A4\u09B0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964", sources: result.sources || [], created_at: (/* @__PURE__ */ new Date()).toISOString() }]);
    } catch (error) {
      setAiMessages((current) => [...current, { role: "error", text: `AI service \u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09BF\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u09BF: ${error.message}`, created_at: (/* @__PURE__ */ new Date()).toISOString() }]);
    } finally {
      setBusy(false);
      setOperationLoading("");
    }
  };
  const example = ["\u0986\u09AE\u09BE\u09B0 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3 approval-\u0997\u09C1\u09B2\u09CB \u09B8\u09BE\u09B0\u09B8\u0982\u0995\u09CD\u09B7\u09C7\u09AA \u0995\u09B0\u09C1\u09A8", "\u0995\u09CB\u09A8 applicant-\u098F\u09B0 passport expiry \u09EC \u09AE\u09BE\u09B8\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7?", "\u09AB\u09BE\u0987\u09B2 \u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE\u09B0 checklist \u0995\u09C0\u09AD\u09BE\u09AC\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09AC?"];
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "Admin AI Assistant"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Gemini-backed server function; real case context permission-\u09B8\u09B9 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09C7\u0964")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "orange", icon: Sparkles }, "Admin only")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "ai-hero" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "ai-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "ai-orb" }, /* @__PURE__ */ import_react27.default.createElement(WandSparkles, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "First Fly Visa Assistant"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Gemini \xB7 server-side key \xB7 permission-scoped context")), /* @__PURE__ */ import_react27.default.createElement("span", { className: "top-spacer" }), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "green" }, "\u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 context")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "ai-log", ref: transcriptRef }, aiMessages.length ? aiMessages.map((message, index) => /* @__PURE__ */ import_react27.default.createElement("div", { key: index, className: cn("ai-message", message.role === "user" ? "mine" : "") }, message.text, message.sources?.length > 0 && /* @__PURE__ */ import_react27.default.createElement("div", { className: "ai-sources" }, message.sources.map((source, i) => /* @__PURE__ */ import_react27.default.createElement("a", { key: i, href: source.url, target: "_blank", rel: "noopener noreferrer" }, source.title || source.url, " ", /* @__PURE__ */ import_react27.default.createElement(ExternalLink, { size: 10 })))), /* @__PURE__ */ import_react27.default.createElement("small", { style: { display: "block", opacity: 0.55, fontSize: 8.1, marginTop: 4 } }, formatTime(message.created_at)))) : /* @__PURE__ */ import_react27.default.createElement("div", { className: "ai-message" }, "\u0986\u09AE\u09BF Admin-\u098F\u09B0 \u0995\u09C7\u09B8 \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u09A8\u09BE\u09AF\u09BC \u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF\u0964 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7 \u0995\u09CB\u09A8\u09CB passport number \u09AC\u09BE \u0985\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C0\u09AF\u09BC \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u09A4\u09A5\u09CD\u09AF \u09A6\u09C7\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964 AI output \u09B8\u09BF\u09A6\u09CD\u09A7\u09BE\u09A8\u09CD\u09A4 \u09A8\u09AF\u09BC; \u09B8\u09AC \u09A4\u09A5\u09CD\u09AF \u09B8\u09B0\u0995\u09BE\u09B0\u09BF source \u0993 \u09AE\u09BE\u09A8\u09AC-\u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE\u09AF\u09BC \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("form", { className: "ai-compose", onSubmit: ask }, /* @__PURE__ */ import_react27.default.createElement("textarea", { value: question, onChange: (event) => setQuestion(event.target.value), placeholder: "\u09AD\u09BF\u09B8\u09BE \u09AA\u09B2\u09BF\u09B8\u09BF, rejection concern \u09AC\u09BE case summary \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09C7 \u09B2\u09BF\u0996\u09C1\u09A8...", maxLength: 3e3 }), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", disabled: busy || !question.trim() }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Send, null), "\u099C\u09BF\u099C\u09CD\u099E\u09BE\u09B8\u09BE")), /* @__PURE__ */ import_react27.default.createElement("p", { className: "ai-note" }, "API key browser-\u098F \u09A8\u09C7\u0987\u0964 Server function AI model/context error \u09B9\u09B2\u09C7 \u09A6\u09C3\u09B6\u09CD\u09AF\u09AE\u09BE\u09A8 error \u09A6\u09C7\u0996\u09BE\u09AF\u09BC; \u0995\u09CB\u09A8\u09CB fake answer fallback \u09A8\u09C7\u0987\u0964 AI \u0986\u0987\u09A8\u0997\u09A4 \u09AA\u09B0\u09BE\u09AE\u09B0\u09CD\u09B6, visa decision \u09AC\u09BE live web search-\u098F\u09B0 \u09AC\u09BF\u0995\u09B2\u09CD\u09AA \u09A8\u09AF\u09BC\u0964")), /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u09A6\u09CD\u09B0\u09C1\u09A4 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8", subtitle: "\u098F\u0995\u099F\u09BF \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u09A8\u0964" }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "quick-grid" }, example.map((item) => /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass quick-action", key: item, onClick: () => setQuestion(item) }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "quick-icon" }, /* @__PURE__ */ import_react27.default.createElement(Sparkles, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, item), /* @__PURE__ */ import_react27.default.createElement("small", null, "\u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE \u0995\u09B0\u09C7 \u09AA\u09BE\u09A0\u09BE\u09A8"))))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 12 } }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "Gemini extraction \u0993 assistant call \u0995\u09B0\u09A4\u09C7 Edge Functions \u098F\u09AC\u0982 `GEMINI_API_KEY` secret deploy \u09A5\u09BE\u0995\u09BE \u0986\u09AC\u09B6\u09CD\u09AF\u0995\u0964")));
}
function ActivityPage({ profile, admin }) {
  const [logs, setLogs] = (0, import_react27.useState)([]);
  const [busy, setBusy] = (0, import_react27.useState)(true);
  const [error, setError] = (0, import_react27.useState)("");
  (0, import_react27.useEffect)(() => {
    let live = true;
    supabase.from("activity_logs").select("id,actor_id,action,entity_type,entity_id,details,created_at").eq("workspace_id", profile.workspace_id).order("created_at", { ascending: false }).limit(200).then(({ data, error: error2 }) => {
      if (!live) return;
      if (error2) setError(error2.message);
      setLogs(data || []);
      setBusy(false);
    });
    return () => {
      live = false;
    };
  }, [profile.workspace_id]);
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u0985\u09CD\u09AF\u09BE\u0995\u09CD\u099F\u09BF\u09AD\u09BF\u099F\u09BF \u09B2\u0997"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Database trigger \u09A5\u09C7\u0995\u09C7 applicant, approval \u0993 publishing event\u0964")), /* @__PURE__ */ import_react27.default.createElement(Pill, null, logs.length, " \u0987\u09AD\u09C7\u09A8\u09CD\u099F")), error && /* @__PURE__ */ import_react27.default.createElement("div", { className: "form-error" }, error), busy ? /* @__PURE__ */ import_react27.default.createElement(LoadingDots, { label: "\u0985\u09CD\u09AF\u09BE\u0995\u09CD\u099F\u09BF\u09AD\u09BF\u099F\u09BF \u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7..." }) : logs.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "content-list" }, logs.map((log) => /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass content-row", key: log.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(Activity, null)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, log.action), /* @__PURE__ */ import_react27.default.createElement("small", null, log.entity_type, " \xB7 ", log.entity_id || "\u2014", " \xB7 ", formatDate(log.created_at), " ", formatTime(log.created_at))), /* @__PURE__ */ import_react27.default.createElement(Pill, null, log.actor_id === profile.id ? "\u0986\u09AA\u09A8\u09BF" : "\u099F\u09BF\u09AE \u09B8\u09A6\u09B8\u09CD\u09AF")))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: Activity, title: "\u0995\u09CB\u09A8\u09CB activity \u09A8\u09C7\u0987", body: "\u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u09B9\u09B2\u09C7 database audit trail \u098F\u0996\u09BE\u09A8\u09C7 \u09A6\u09C7\u0996\u09BE\u09AC\u09C7\u0964" }));
}
function SettingsPage({ profile, admin, data, refreshData, pushToast, setModal, theme, toggleTheme, signOut, installPrompt, setInstallPrompt }) {
  const [settings, setSettings] = (0, import_react27.useState)(data.settings || {});
  const [saving, setSaving] = (0, import_react27.useState)(false);
  const [permission, setPermission] = (0, import_react27.useState)(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
  (0, import_react27.useEffect)(() => setSettings(data.settings || {}), [data.settings]);
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = { workspace_id: profile.workspace_id, brand_name: settings.brand_name || "First Fly International", tagline: settings.tagline || "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AD\u09BF\u09B8\u09BE, \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u0985\u0997\u09CD\u09B0\u09BE\u09A7\u09BF\u0995\u09BE\u09B0", support_email: settings.support_email || null, support_phone: settings.support_phone || null, public_application_url: settings.public_application_url || null, disclaimer_bn: settings.disclaimer_bn || "", updated_by: profile.id, updated_at: (/* @__PURE__ */ new Date()).toISOString() };
    const { error } = await supabase.from("workspace_settings").upsert(payload);
    setSaving(false);
    if (error) pushToast(`\u09B8\u09C7\u099F\u09BF\u0982\u09B8 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      pushToast("\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8\u09CD\u09AA\u09C7\u09B8 \u09B8\u09C7\u099F\u09BF\u0982\u09B8 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
    }
  };
  const enable = async () => {
    if (!("Notification" in window)) {
      pushToast("\u098F\u0987 browser notification \u09B8\u09AE\u09B0\u09CD\u09A5\u09A8 \u0995\u09B0\u09C7 \u09A8\u09BE\u0964", "error");
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    pushToast(result === "granted" ? "Browser notification permission \u099A\u09BE\u09B2\u09C1 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964" : "Notification permission \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF\u0964", result === "granted" ? "success" : "error");
  };
  const install = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
    } else setModal({ type: "install" });
  };
  const field = (key, label, placeholder = "") => /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, label), /* @__PURE__ */ import_react27.default.createElement("input", { value: settings[key] || "", onChange: (event) => setSettings((current) => ({ ...current, [key]: event.target.value })), placeholder, disabled: !admin }));
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u09B8\u09C7\u099F\u09BF\u0982\u09B8"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2, workspace contact, appearance \u0993 \u09AA\u09C1\u09B6 \u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: admin ? "blue" : "green" }, admin ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "settings-grid" }, /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass setting-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "setting-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, theme === "dark" ? /* @__PURE__ */ import_react27.default.createElement(Moon, null) : /* @__PURE__ */ import_react27.default.createElement(Sun, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Appearance"), /* @__PURE__ */ import_react27.default.createElement("small", null, "\u09B8\u09BE\u09A6\u09BE Liquid Glass \u0985\u09A5\u09AC\u09BE \u0997\u09AD\u09C0\u09B0 \u09A8\u09C0\u09B2 night theme"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: toggleTheme }, theme === "dark" ? /* @__PURE__ */ import_react27.default.createElement(Sun, null) : /* @__PURE__ */ import_react27.default.createElement(Moon, null), theme === "dark" ? "Light theme" : "Dark-blue theme")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass setting-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "setting-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(Bell, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Browser notifications"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Permission: ", permission))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: enable }, /* @__PURE__ */ import_react27.default.createElement(Bell, null), "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8 \u099A\u09BE\u09B2\u09C1 \u0995\u09B0\u09C1\u09A8")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass setting-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "setting-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(Download, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Installable PWA"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Android install prompt \xB7 iPhone Safari Add to Home Screen"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: install }, /* @__PURE__ */ import_react27.default.createElement(Download, null), "Install / A2HS \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09A8\u09BE")), /* @__PURE__ */ import_react27.default.createElement("section", { className: "glass setting-card" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "setting-head" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(Cloud, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "Google Workspace"), /* @__PURE__ */ import_react27.default.createElement("small", null, "OAuth status \u098F\u09AC\u0982 token security"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: () => setModal({ type: "google-help" }) }, /* @__PURE__ */ import_react27.default.createElement(Settings, null), "\u0987\u09A8\u09CD\u099F\u09BF\u0997\u09CD\u09B0\u09C7\u09B6\u09A8 \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09A8\u09BE"))), /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "Workspace \u09A4\u09A5\u09CD\u09AF", subtitle: admin ? "Published content \u0993 footer information" : "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09BF\u09A4 \u09AA\u09CD\u09B0\u09A4\u09BF\u09B7\u09CD\u09A0\u09BE\u09A8 \u09A4\u09A5\u09CD\u09AF" }), /* @__PURE__ */ import_react27.default.createElement("form", { className: "glass panel settings-form", onSubmit: save }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "field-grid" }, field("brand_name", "Brand name"), field("tagline", "Tagline"), field("support_email", "Support email", "help@example.com"), field("support_phone", "Support phone", "+880\u2026")), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u0997\u09C1\u09B0\u09C1\u09A4\u09CD\u09AC\u09AA\u09C2\u09B0\u09CD\u09A3 notice / disclaimer"), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: settings.disclaimer_bn || "", disabled: !admin, onChange: (event) => setSettings((current) => ({ ...current, disclaimer_bn: event.target.value })) })), admin && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", type: "submit", disabled: saving }, saving ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Check, null), "\u09B8\u09C7\u099F\u09BF\u0982\u09B8 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3")), admin && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement(SectionTitle, { title: "\u099F\u09BF\u09AE \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F", subtitle: "Agent access \u0986\u09AE\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3-\u09A8\u09BF\u09B0\u09CD\u09AD\u09B0; role Supabase profile-\u098F server-side \u09B8\u09C7\u099F \u09B9\u09AF\u09BC." }), /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass panel" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u099F\u09BF\u09AE \u09B8\u09A6\u09B8\u09CD\u09AF"), /* @__PURE__ */ import_react27.default.createElement("p", null, data.profiles.filter((user) => user.active).length, " \u099C\u09A8")), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", onClick: () => setModal({ type: "invite" }) }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "Agent invite")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "team-list" }, data.profiles.map((user) => /* @__PURE__ */ import_react27.default.createElement("div", { className: "content-row", key: user.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "avatar" }, initials(user.full_name)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, user.full_name), /* @__PURE__ */ import_react27.default.createElement("small", null, user.email)), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: user.role === "admin" ? "orange" : "blue" }, user.role === "admin" ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F"), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: user.active ? "green" : "red" }, user.active ? "Active" : "Inactive")))))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 13 } }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "Security by design:"), " browser-\u098F \u0995\u09C7\u09AC\u09B2 Supabase anon/publishable key\u0964 Role, private data, file policy, Gemini \u0993 Google secret server/RLS \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09BF\u09A4\u0964")), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn danger sm", style: { marginTop: 12 }, onClick: signOut }, /* @__PURE__ */ import_react27.default.createElement(LogOut, null), "\u09A8\u09BF\u09B0\u09BE\u09AA\u09A6\u09C7 \u09B2\u0997\u0986\u0989\u099F"));
}
function ProfilePage({ profile, admin, data, navigate, signOut, theme, toggleTheme, setModal }) {
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 account \u09A4\u09A5\u09CD\u09AF \u0993 portal preferences\u0964"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass profile-card" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "avatar large" }, initials(profile.full_name)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, profile.full_name), /* @__PURE__ */ import_react27.default.createElement("small", null, profile.email), /* @__PURE__ */ import_react27.default.createElement("small", null, profile.role === "admin" ? "Administrator" : "Visa Agent", " \xB7 ", formatDate(profile.created_at))), /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: admin ? "orange" : "blue" }, admin ? "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8" : "\u098F\u099C\u09C7\u09A8\u09CD\u099F")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "settings-grid", style: { marginTop: 12 } }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass quick-action", onClick: () => navigate("documents") }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "quick-icon" }, /* @__PURE__ */ import_react27.default.createElement(FolderOpen, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Applicant files"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass quick-action", onClick: () => navigate("notifications") }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "quick-icon" }, /* @__PURE__ */ import_react27.default.createElement(Bell, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Approval \u0993 update"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass quick-action", onClick: () => navigate("chat") }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "quick-icon" }, /* @__PURE__ */ import_react27.default.createElement(MessageCircle, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "\u099F\u09BF\u09AE \u099A\u09CD\u09AF\u09BE\u099F"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Admin-\u098F\u09B0 \u09B8\u0999\u09CD\u0997\u09C7 \u0995\u09A5\u09BE \u09AC\u09B2\u09C1\u09A8"))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "glass quick-action", onClick: () => navigate("settings") }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "quick-icon" }, /* @__PURE__ */ import_react27.default.createElement(Settings, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "\u09B8\u09C7\u099F\u09BF\u0982\u09B8"), /* @__PURE__ */ import_react27.default.createElement("small", null, "Theme \u0993 account")))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass panel", style: { marginTop: 12 } }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "panel-head" }, /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u0985\u09CD\u09AF\u09BE\u0995\u09B6\u09A8"), /* @__PURE__ */ import_react27.default.createElement("p", null, "\u098F\u099C\u09C7\u09A8\u09CD\u09B8\u09BF role Supabase Auth \u0993 profile \u09A5\u09C7\u0995\u09C7 \u0986\u09B8\u09C7\u0964")), /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", onClick: toggleTheme }, theme === "dark" ? /* @__PURE__ */ import_react27.default.createElement(Sun, null) : /* @__PURE__ */ import_react27.default.createElement(Moon, null), theme === "dark" ? "Light theme" : "Dark theme"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn danger sm", onClick: signOut }, /* @__PURE__ */ import_react27.default.createElement(LogOut, null), "\u09B2\u0997\u0986\u0989\u099F"))));
}
function ReportPage({ data, selectedId, profile, pushToast, refreshData }) {
  const report = data.reports.find((row) => row.id === selectedId);
  const applicant = data.applicants.find((row) => row.id === report?.applicant_id);
  const snapshot = report?.report_snapshot || {};
  if (!report || !applicant) return /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: FileText, title: "\u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF", body: "Applicant detail \u09A5\u09C7\u0995\u09C7 \u09A8\u09A4\u09C1\u09A8 A4 summary \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C1\u09A8\u0964" });
  const print = () => window.print();
  const country = countryFor(data.countries, applicant.country_id);
  const category = categoryFor(data.categories, applicant.visa_category_id);
  const whatsapp = () => {
    const text = `First Fly International \xB7 ${applicant.reference} \xB7 ${applicant.full_name} \xB7 ${countryLabel(country)} ${categoryLabel(category)} \xB7 ${stageLabels[applicant.stage] || applicant.stage}. \u098F\u0987 \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE\u09AF\u09BC \u0995\u09CB\u09A8\u09CB passport details \u09A8\u09C7\u0987\u0964`;
    let phone = (applicant.phone || "").replace(/\D/g, "");
    if (phone.startsWith("0") && phone.length === 11) phone = `880${phone.slice(1)}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("button", { className: "text-btn", onClick: () => window.history.length > 1 ? window.history.back() : null }, /* @__PURE__ */ import_react27.default.createElement(ArrowLeft, null), "Report"), /* @__PURE__ */ import_react27.default.createElement("h1", { style: { marginTop: 7 } }, "A4 \u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 summary"), /* @__PURE__ */ import_react27.default.createElement("p", null, applicant.reference, " \xB7 \u09A4\u09C8\u09B0\u09BF ", formatDate(report.created_at)))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "report-toolbar" }, /* @__PURE__ */ import_react27.default.createElement(Pill, { tone: "blue", icon: FileCheck2 }, "Print dialog \u09A5\u09C7\u0995\u09C7 Save as PDF"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-actions" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: whatsapp }, /* @__PURE__ */ import_react27.default.createElement(MessageCircle, null), "WhatsApp"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", onClick: print }, /* @__PURE__ */ import_react27.default.createElement(Download, null), "Print / Save PDF"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "report-preview" }, /* @__PURE__ */ import_react27.default.createElement("article", { className: "report-paper" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "report-reference" }, "FILE REF", /* @__PURE__ */ import_react27.default.createElement("br", null), /* @__PURE__ */ import_react27.default.createElement("b", null, snapshot.reference || applicant.reference)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "report-brand" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "report-mark" }, /* @__PURE__ */ import_react27.default.createElement(Plane, null)), /* @__PURE__ */ import_react27.default.createElement("span", null, /* @__PURE__ */ import_react27.default.createElement("b", null, "FIRST FLY INTERNATIONAL"), /* @__PURE__ */ import_react27.default.createElement("small", null, "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AD\u09BF\u09B8\u09BE, \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u0985\u0997\u09CD\u09B0\u09BE\u09A7\u09BF\u0995\u09BE\u09B0 \xB7 Applicant summary"))), /* @__PURE__ */ import_react27.default.createElement("h1", { className: "report-title" }, "Visa Application Summary"), /* @__PURE__ */ import_react27.default.createElement("p", { className: "report-intro" }, "Admin \u0993 agent review-\u098F\u09B0 \u099C\u09A8\u09CD\u09AF \u0985\u09AD\u09CD\u09AF\u09A8\u09CD\u09A4\u09B0\u09C0\u09A3 case summary\u0964 \u098F\u099F\u09BF \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09AB\u09B0\u09CD\u09AE, \u09AD\u09BF\u09B8\u09BE, legal opinion \u09AC\u09BE application outcome-\u098F\u09B0 \u09A8\u09BF\u09B6\u09CD\u099A\u09AF\u09BC\u09A4\u09BE \u09A8\u09AF\u09BC\u0964"), /* @__PURE__ */ import_react27.default.createElement("section", { className: "report-section" }, /* @__PURE__ */ import_react27.default.createElement("h3", null, "\u0986\u09AC\u09C7\u09A6\u09A8\u0995\u09BE\u09B0\u09C0 \u0993 \u0997\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "report-grid" }, reportField("Applicant full name", snapshot.full_name || applicant.full_name), reportField("Destination", snapshot.country || countryLabel(country)), reportField("Visa category", snapshot.category || categoryLabel(category)), reportField("Passport number", snapshot.passport_number || applicant.passport_number), reportField("Date of birth", formatDate(snapshot.date_of_birth || applicant.date_of_birth)), reportField("Passport expiry", formatDate(snapshot.passport_expiry || applicant.passport_expiry)), reportField("Phone", snapshot.phone || applicant.phone || "Not provided"), reportField("Email", snapshot.email || applicant.email || "Not provided"), reportField("Occupation", snapshot.occupation || applicant.occupation || "Not provided"), reportField("Application stage", stageLabels[snapshot.stage || applicant.stage]), reportField("Travel dates", snapshot.travel_start ? `${formatDate(snapshot.travel_start)}${snapshot.travel_end ? ` \u2014 ${formatDate(snapshot.travel_end)}` : ""}` : "Not provided"), reportField("Assigned agent", snapshot.agent || profile.full_name))), /* @__PURE__ */ import_react27.default.createElement("section", { className: "report-section" }, /* @__PURE__ */ import_react27.default.createElement("h3", null, "Supporting documents (", snapshot.documents?.length || 0, ")"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "report-docs" }, snapshot.documents?.length ? snapshot.documents.map((doc, index) => /* @__PURE__ */ import_react27.default.createElement("span", { key: index }, "\u25A1 ", doc.category, " \xB7 ", doc.file_name)) : /* @__PURE__ */ import_react27.default.createElement("span", null, "Report \u09A4\u09C8\u09B0\u09BF\u09B0 \u09B8\u09AE\u09AF\u09BC \u0995\u09CB\u09A8\u09CB supporting file \u099B\u09BF\u09B2 \u09A8\u09BE\u0964"))), snapshot.notes && /* @__PURE__ */ import_react27.default.createElement("section", { className: "report-section" }, /* @__PURE__ */ import_react27.default.createElement("h3", null, "Agent notes"), /* @__PURE__ */ import_react27.default.createElement("p", { style: { fontSize: 10.8, lineHeight: 1.55, whiteSpace: "pre-wrap" } }, snapshot.notes)), /* @__PURE__ */ import_react27.default.createElement("div", { className: "report-disclaimer" }, data.settings?.disclaimer_bn || "\u09AD\u09BF\u09B8\u09BE \u09B8\u0982\u0995\u09CD\u09B0\u09BE\u09A8\u09CD\u09A4 \u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7 \u09A8\u09BF\u09AF\u09BC\u09AE \u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7\u09C7\u09B0 website-\u098F \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964", /* @__PURE__ */ import_react27.default.createElement("br", null), "\u09A4\u09C8\u09B0\u09BF ", formatDate(snapshot.generated_at || report.created_at), " \xB7 \u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F metadata database-\u098F \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4\u0964"), /* @__PURE__ */ import_react27.default.createElement("footer", { className: "report-footer" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "FIRST FLY INTERNATIONAL \xB7 INTERNAL SUMMARY"), /* @__PURE__ */ import_react27.default.createElement("span", null, applicant.reference, " \xB7 ", formatDate(report.created_at))))));
}
function reportField(label, value) {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "report-field" }, /* @__PURE__ */ import_react27.default.createElement("label", null, label), /* @__PURE__ */ import_react27.default.createElement("b", null, value || "\u2014"));
}
function ContentEditorModal({ modal, profile, data, pushToast, refreshData, close }) {
  const isBlog = modal.kind === "blog";
  const [preview, setPreview] = (0, import_react27.useState)(false);
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const [cover, setCover] = (0, import_react27.useState)(null);
  const [form, setForm] = (0, import_react27.useState)({ country_id: "", category: "", title_bn: "", body_bn: "", excerpt_bn: "", content_markdown: "", source_label: "", source_url: "" });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const save = async (status) => {
    if (!form.title_bn.trim() || (isBlog ? !form.content_markdown.trim() : !form.body_bn.trim())) {
      pushToast(isBlog ? "\u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE \u0993 \u09B2\u09C7\u0996\u09BE\u09B0 \u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09AA\u09C2\u09B0\u09A3 \u0995\u09B0\u09C1\u09A8\u0964" : "\u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE \u0993 update \u09AC\u09BF\u09AC\u09B0\u09A3 \u09AA\u09C2\u09B0\u09A3 \u0995\u09B0\u09C1\u09A8\u0964", "error");
      return;
    }
    if (!isBlog && form.source_url) {
      try {
        if (new URL(form.source_url).protocol !== "https:") throw new Error();
      } catch {
        pushToast("\u09B8\u09B0\u0995\u09BE\u09B0\u09BF source-\u098F\u09B0 HTTPS URL \u09A6\u09BF\u09A8\u0964", "error");
        return;
      }
    }
    setBusy(true);
    let coverPath = null;
    if (isBlog && cover) {
      if (cover.size > 10 * 1024 * 1024) {
        setBusy(false);
        pushToast("Cover image \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09E7\u09E6 MB\u0964", "error");
        return;
      }
      coverPath = `${profile.workspace_id}/blog/${crypto.randomUUID()}-${safeFileName(cover.name)}`;
      const { error: error2 } = await supabase.storage.from("published-content").upload(coverPath, cover, { contentType: cover.type, upsert: false });
      if (error2) {
        setBusy(false);
        pushToast(`Cover image \u0986\u09AA\u09B2\u09CB\u09A1 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error2.message}`, "error");
        return;
      }
    }
    const title = form.title_bn.trim();
    const slug = title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `insight-${crypto.randomUUID().slice(0, 8)}`;
    const payload = isBlog ? { workspace_id: profile.workspace_id, country_id: form.country_id || null, category: form.category || "insight", slug, title, title_bn: title, excerpt_bn: form.excerpt_bn.trim(), content_markdown: form.content_markdown.trim(), cover_image_path: coverPath, status, published_at: status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null, author_id: profile.id } : { workspace_id: profile.workspace_id, country_id: form.country_id || null, title, title_bn: title, body: form.body_bn.trim(), body_bn: form.body_bn.trim(), category: form.category || "notice", source_label: form.source_label.trim() || null, source_url: form.source_url.trim() || null, status, published_at: status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null, created_by: profile.id };
    const table = isBlog ? "blog_posts" : "visa_updates";
    const { error } = await supabase.from(table).insert(payload);
    setBusy(false);
    if (error) {
      if (coverPath) await supabase.storage.from("published-content").remove([coverPath]);
      pushToast(`${isBlog ? "Blog" : "Update"} \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
      return;
    }
    close();
    await refreshData({ quiet: true });
    pushToast(status === "published" ? "\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4; database trigger notification \u09AA\u09BE\u09A0\u09BF\u09AF\u09BC\u09C7\u099B\u09C7\u0964" : "\u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F draft \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4\u0964");
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, wide: true, title: isBlog ? "First Fly Insights \u09B2\u09C7\u0996\u09BE" : "Visa Update \u09A4\u09C8\u09B0\u09BF", subtitle: isBlog ? "Draft \u2192 preview \u2192 publish; cover image Supabase Storage-\u098F \u09AF\u09BE\u09AF\u09BC\u0964" : "\u09B6\u09C1\u09A7\u09C1 \u09AF\u09BE\u099A\u09BE\u0987\u0995\u09C3\u09A4 internal notice \u0993 \u09B8\u09B0\u0995\u09BE\u09B0\u09BF source publish \u0995\u09B0\u09C1\u09A8\u0964" }, preview ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "glass update-preview" }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "pill orange" }, isBlog ? "First Fly Insights" : countryLabel(countryFor(data.countries, form.country_id))), /* @__PURE__ */ import_react27.default.createElement("h2", null, form.title_bn || "\u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE"), /* @__PURE__ */ import_react27.default.createElement("p", null, isBlog ? form.excerpt_bn : form.body_bn), isBlog ? /* @__PURE__ */ import_react27.default.createElement("pre", null, form.content_markdown) : /* @__PURE__ */ import_react27.default.createElement("a", { href: form.source_url || "#", target: "_blank", rel: "noreferrer" }, form.source_label || form.source_url), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: () => setPreview(false) }, /* @__PURE__ */ import_react27.default.createElement(ArrowLeft, null), "\u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE\u09AF\u09BC \u09AB\u09BF\u09B0\u09C1\u09A8")) : /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "field-grid" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09A6\u09C7\u09B6 / \u0985\u099E\u09CD\u099A\u09B2"), /* @__PURE__ */ import_react27.default.createElement("select", { value: form.country_id, onChange: (event) => set("country_id", event.target.value) }, /* @__PURE__ */ import_react27.default.createElement("option", { value: "" }, "\u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 / \u09B8\u09AC \u09A6\u09C7\u09B6"), data.countries.map((country) => /* @__PURE__ */ import_react27.default.createElement("option", { key: country.id, value: country.id }, country.flag_emoji, " ", countryLabel(country))))), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09A7\u09B0\u09A8"), /* @__PURE__ */ import_react27.default.createElement("select", { value: form.category, onChange: (event) => set("category", event.target.value) }, (isBlog ? [["insight", "Insight"], ["guide", "Guide"], ["company", "Company"]] : [["notice", "\u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09A8\u09CB\u099F\u09BF\u09B6"], ["urgent", "\u099C\u09B0\u09C1\u09B0\u09BF \u0986\u09AA\u09A1\u09C7\u099F"], ["checklist", "\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F \u099A\u09C7\u0995\u09B2\u09BF\u09B8\u09CD\u099F"], ["embassy", "\u098F\u09AE\u09CD\u09AC\u09BE\u09B8\u09BF \u09A8\u09CB\u099F\u09BF\u09B6"]]).map(([value, label]) => /* @__PURE__ */ import_react27.default.createElement("option", { key: value, value }, label))))), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AC\u09BE\u0982\u09B2\u09BE \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE ", /* @__PURE__ */ import_react27.default.createElement("em", null, "*")), /* @__PURE__ */ import_react27.default.createElement("input", { maxLength: 140, value: form.title_bn, onChange: (event) => set("title_bn", event.target.value), placeholder: "\u09B8\u09CD\u09AA\u09B7\u09CD\u099F \u0993 \u09B8\u0982\u0995\u09CD\u09B7\u09BF\u09AA\u09CD\u09A4 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE", required: true })), isBlog ? /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09B8\u0982\u0995\u09CD\u09B7\u09BF\u09AA\u09CD\u09A4 \u09AA\u09B0\u09BF\u099A\u09BF\u09A4\u09BF"), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: form.excerpt_bn, onChange: (event) => set("excerpt_bn", event.target.value), placeholder: "\u0995\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF, \u0995\u09C0 \u0989\u09AA\u0995\u09BE\u09B0\u2014\u09B8\u0982\u0995\u09CD\u09B7\u09C7\u09AA\u09C7" })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Cover image"), /* @__PURE__ */ import_react27.default.createElement("input", { type: "file", accept: "image/jpeg,image/png,image/webp", onChange: (event) => setCover(event.target.files?.[0] || null) }), cover && /* @__PURE__ */ import_react27.default.createElement("small", null, cover.name, " \xB7 ", formatBytes(cover.size))), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Article body (Markdown/plain text) ", /* @__PURE__ */ import_react27.default.createElement("em", null, "*")), /* @__PURE__ */ import_react27.default.createElement("textarea", { className: "markdown-input", value: form.content_markdown, onChange: (event) => set("content_markdown", event.target.value), placeholder: "\u09AA\u09C7\u09B6\u09BE\u09A6\u09BE\u09B0 \u09AC\u09BE\u0982\u09B2\u09BE \u0995\u09A8\u099F\u09C7\u09A8\u09CD\u099F \u09B2\u09BF\u0996\u09C1\u09A8...", required: true }))) : /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AC\u09BF\u09AC\u09B0\u09A3 ", /* @__PURE__ */ import_react27.default.createElement("em", null, "*")), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: form.body_bn, onChange: (event) => set("body_bn", event.target.value), placeholder: "\u098F\u099C\u09C7\u09A8\u09CD\u099F\u09A6\u09C7\u09B0 \u0995\u09C0 \u099C\u09BE\u09A8\u09A4\u09C7 \u09AC\u09BE \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7?", required: true })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "field-grid" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Source label"), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.source_label, onChange: (event) => set("source_label", event.target.value), placeholder: "\u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7 / \u09A8\u09CB\u099F\u09BF\u09B6" })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Official HTTPS URL"), /* @__PURE__ */ import_react27.default.createElement("input", { type: "url", value: form.source_url, onChange: (event) => set("source_url", event.target.value), placeholder: "https://..." })))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn" }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "Publish \u09B9\u09B2\u09C7 database trigger Agent notifications \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09AC\u09C7\u0964 Draft public/Agent Home-\u098F \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7 \u09A8\u09BE\u0964"))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: close }, "\u09AC\u09BE\u09A4\u09BF\u09B2"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "footer-right" }, !preview && /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: () => setPreview(true) }, /* @__PURE__ */ import_react27.default.createElement(Eye, null), "Preview"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn soft sm", disabled: busy, onClick: () => save("draft") }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(FileText, null), "Draft \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", disabled: busy, onClick: () => save("published") }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Send, null), "\u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C1\u09A8"))));
}
function ReviewModal({ modal, close }) {
  const [feedback, setFeedback] = (0, import_react27.useState)("");
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const needsCorrection = modal.decision === "needs_correction";
  const submit = async (event) => {
    event.preventDefault();
    if (needsCorrection && !feedback.trim()) return;
    setBusy(true);
    try {
      await modal.onSubmit(feedback);
    } finally {
      setBusy(false);
      close();
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: needsCorrection ? "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C7\u09B0 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7" : "\u0986\u09AC\u09C7\u09A6\u09A8 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8", subtitle: needsCorrection ? "\u098F\u099C\u09C7\u09A8\u09CD\u099F\u0995\u09C7 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F, \u0995\u09B0\u09A3\u09C0\u09AF\u09BC feedback \u09B2\u09BF\u0996\u09C1\u09A8\u0964" : "\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C7 \u098F\u0995\u099F\u09BF \u09B8\u0982\u0995\u09CD\u09B7\u09BF\u09AA\u09CD\u09A4 approval note \u09B2\u09BF\u0996\u09C1\u09A8\u0964" }, /* @__PURE__ */ import_react27.default.createElement("form", { onSubmit: submit }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice" }, /* @__PURE__ */ import_react27.default.createElement(ClipboardCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, modal.applicantId ? "Applicant file ID: " + modal.applicantId : "Review request")), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field", style: { marginTop: 12 } }, /* @__PURE__ */ import_react27.default.createElement("span", null, needsCorrection ? "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C7\u09B0 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u0995\u09BE\u09B0\u09A3" : "Approval note"), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: feedback, onChange: (event) => setFeedback(event.target.value), required: needsCorrection, placeholder: needsCorrection ? "\u09AF\u09C7\u09AE\u09A8: \u09AC\u09CD\u09AF\u09BE\u0982\u0995 \u09B8\u09CD\u099F\u09C7\u099F\u09AE\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09A4\u09BE\u09B0\u09BF\u0996/\u09A8\u09BE\u09AE \u09AE\u09BF\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AA\u09C1\u09A8\u09B0\u09BE\u09AF\u09BC \u0986\u09AA\u09B2\u09CB\u09A1 \u0995\u09B0\u09C1\u09A8" : "\u0990\u099A\u09CD\u099B\u09BF\u0995 \u09A8\u09CB\u099F", autoFocus: true })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { type: "button", className: "btn glass sm", onClick: close }, "\u09AC\u09BE\u09A4\u09BF\u09B2"), /* @__PURE__ */ import_react27.default.createElement("button", { className: cn("btn sm", needsCorrection ? "danger" : "orange"), disabled: busy || needsCorrection && !feedback.trim() }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : needsCorrection ? /* @__PURE__ */ import_react27.default.createElement(RefreshCw, null) : /* @__PURE__ */ import_react27.default.createElement(Check, null), needsCorrection ? "\u09B8\u0982\u09B6\u09CB\u09A7\u09A8\u09C7\u09B0 \u09A8\u09CB\u099F \u09AA\u09BE\u09A0\u09BE\u09A8" : "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8"))));
}
function ConfirmModal({ modal, close }) {
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const confirm = async () => {
    setBusy(true);
    try {
      await modal.onConfirm?.();
    } finally {
      setBusy(false);
      close();
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: modal.title || "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8", subtitle: modal.body }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: close }, "\u09AC\u09BE\u09A4\u09BF\u09B2"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn danger sm", onClick: confirm, disabled: busy }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Trash2, null), modal.confirmLabel || "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8")));
}
function ConsentModal({ modal, profile, pushToast, refreshData, close }) {
  const [confirmed, setConfirmed] = (0, import_react27.useState)(false);
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const submit = async () => {
    if (!confirmed || !modal.applicantId) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.from("applicants").update({ consent_recorded_at: (/* @__PURE__ */ new Date()).toISOString(), consent_recorded_by: profile.id }).eq("id", modal.applicantId).is("consent_recorded_at", null).select("id").maybeSingle();
      if (error) throw new Error(error.message);
      if (!data) throw new Error("সম্মতির অবস্থা বদলে গেছে বা আপনার এই ফাইলে প্রবেশাধিকার নেই। ফাইলটি রিফ্রেশ করে দেখুন।");
      await refreshData({ quiet: true });
      pushToast("ক্লায়েন্টের নথি-প্রক্রিয়াকরণ সম্মতি সময় ও রেকর্ডকারীসহ সংরক্ষিত হয়েছে।");
      close();
    } catch (error) {
      pushToast(`সম্মতি রেকর্ড করা যায়নি: ${error.message}`, "error");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: "ক্লায়েন্টের সম্মতি রেকর্ড", subtitle: `${modal.applicantName || "এই আবেদনকারী"} · AI ও Google Workspace ব্যবহারের আগে নিশ্চিত করুন` },
    /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn" }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "শুধু ক্লায়েন্টের কাছ থেকে স্পষ্ট সম্মতি পাওয়ার পর নিশ্চিত করুন। এই রেকর্ডটি Gemini-তে নথির নির্দিষ্ট তথ্য পাঠানো এবং connected Google Drive-এ কপি করার অনুমতি বোঝায়; এটি ভিসা-যোগ্যতা নির্ধারণে ব্যবহৃত হয় না।")),
    /* @__PURE__ */ import_react27.default.createElement("label", { className: "consent-check", style: { marginTop: 14 } }, /* @__PURE__ */ import_react27.default.createElement("input", { type: "checkbox", checked: confirmed, onChange: (event) => setConfirmed(event.target.checked) }), /* @__PURE__ */ import_react27.default.createElement("span", null, "আমি নিশ্চিত করছি যে আবেদনকারীকে এই নথি সংরক্ষণ, ঐচ্ছিক Gemini AI বিশ্লেষণ এবং অনুমোদিত Google Drive কপির বিষয়ে জানানো হয়েছে এবং তিনি সম্মতি দিয়েছেন।")),
    /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", type: "button", onClick: close, disabled: busy }, "বাতিল"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", type: "button", onClick: submit, disabled: busy || !confirmed }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), "সম্মতি সংরক্ষণ")));
}
function InviteAgentModal({ profile, pushToast, refreshData, close }) {
  const [email, setEmail] = (0, import_react27.useState)("");
  const [name, setName] = (0, import_react27.useState)("");
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const [error, setError] = (0, import_react27.useState)("");
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await invokeFunction("invite-agent", { email: email.trim(), full_name: name.trim() });
      pushToast(`Agent invitation \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7: ${result.email || email}`);
      await refreshData({ quiet: true });
      close();
    } catch (err) {
      setError(err.message);
      pushToast(err.message, "error");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: "Agent \u0986\u09AE\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3", subtitle: "Supabase Auth invitation email \u09AA\u09BE\u09A0\u09BE\u09AC\u09C7; \u0995\u09CB\u09A8\u09CB client-side demo account \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC \u09A8\u09BE\u0964" }, /* @__PURE__ */ import_react27.default.createElement("form", { onSubmit: submit }, error && /* @__PURE__ */ import_react27.default.createElement("div", { className: "form-error" }, error), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u098F\u099C\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09A8\u09BE\u09AE ", /* @__PURE__ */ import_react27.default.createElement("em", null, "*")), /* @__PURE__ */ import_react27.default.createElement("input", { value: name, onChange: (event) => setName(event.target.value), required: true })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u0987\u09AE\u09C7\u0987\u09B2 ", /* @__PURE__ */ import_react27.default.createElement("em", null, "*")), /* @__PURE__ */ import_react27.default.createElement("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn" }, /* @__PURE__ */ import_react27.default.createElement(LockKeyhole, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "\u09A8\u09A4\u09C1\u09A8 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0 server-side invite \u09B9\u09AF\u09BC\u09C7 Agent role \u09AA\u09BE\u09AC\u09C7\u0964 Admin role \u0995\u09C7\u09AC\u09B2 trusted admin SQL/service access \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09BF\u09A4 \u09B9\u09AC\u09C7\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", type: "button", onClick: close }, "\u09AC\u09BE\u09A4\u09BF\u09B2"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", disabled: busy }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Mail, null), "\u0986\u09AE\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3 \u09AA\u09BE\u09A0\u09BE\u09A8"))));
}
function CountryModal({ profile, pushToast, refreshData, close }) {
  const [form, setForm] = (0, import_react27.useState)({ name: "", name_bn: "", slug: "", flag_emoji: "\u{1F310}", region: "", official_url: "", short_note: "", sort_order: 100 });
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    const slug = (form.slug || form.name.toLowerCase()).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (form.official_url && !form.official_url.startsWith("https://")) {
      pushToast("Official source-\u098F\u09B0 HTTPS URL \u09A6\u09BF\u09A8\u0964", "error");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("countries").insert({ ...form, slug, workspace_id: profile.workspace_id });
    setBusy(false);
    if (error) pushToast(`\u09A6\u09C7\u09B6 \u09AF\u09CB\u0997 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      pushToast("\u09A6\u09C7\u09B6 database-\u098F \u09AF\u09C1\u0995\u09CD\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      await refreshData({ quiet: true });
      close();
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: "\u09A6\u09C7\u09B6 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8", subtitle: "Country information workspace database-\u098F \u09AF\u09BE\u09AC\u09C7; agent UI-\u09A4\u09C7 \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09A6\u09C7\u0996\u09BE\u09AC\u09C7\u0964" }, /* @__PURE__ */ import_react27.default.createElement("form", { onSubmit: submit }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "field-grid" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09A6\u09C7\u09B6\u09C7\u09B0 \u09A8\u09BE\u09AE (English) ", /* @__PURE__ */ import_react27.default.createElement("em", null, "*")), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.name, onChange: (event) => set("name", event.target.value), required: true })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AC\u09BE\u0982\u09B2\u09BE \u09A8\u09BE\u09AE ", /* @__PURE__ */ import_react27.default.createElement("em", null, "*")), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.name_bn, onChange: (event) => set("name_bn", event.target.value), required: true })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Slug"), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.slug, onChange: (event) => set("slug", event.target.value), placeholder: "auto from English name" })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Flag emoji / region"), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.flag_emoji, onChange: (event) => set("flag_emoji", event.target.value), maxLength: 8 })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Region"), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.region, onChange: (event) => set("region", event.target.value) })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Official URL"), /* @__PURE__ */ import_react27.default.createElement("input", { type: "url", value: form.official_url, onChange: (event) => set("official_url", event.target.value), placeholder: "https://..." }))), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09B8\u0982\u0995\u09CD\u09B7\u09BF\u09AA\u09CD\u09A4 \u09A8\u09CB\u099F"), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: form.short_note, onChange: (event) => set("short_note", event.target.value) })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { type: "button", className: "btn glass sm", onClick: close }, "\u09AC\u09BE\u09A4\u09BF\u09B2"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", disabled: busy }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Plus, null), "\u09A6\u09C7\u09B6 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3"))));
}
function CategoryModal({ profile, pushToast, refreshData, close }) {
  const [english, setEnglish] = (0, import_react27.useState)("");
  const [bengali, setBengali] = (0, import_react27.useState)("");
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const submit = async (event) => {
    event.preventDefault();
    const slug = english.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setBusy(true);
    const { error } = await supabase.from("visa_categories").insert({ workspace_id: profile.workspace_id, name: english.trim(), name_bn: bengali.trim(), slug, is_active: true });
    setBusy(false);
    if (error) pushToast(error.message, "error");
    else {
      pushToast("\u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09AF\u09CB\u0997 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
      close();
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: "\u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8" }, /* @__PURE__ */ import_react27.default.createElement("form", { onSubmit: submit }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "English name"), /* @__PURE__ */ import_react27.default.createElement("input", { required: true, value: english, onChange: (event) => setEnglish(event.target.value) })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AC\u09BE\u0982\u09B2\u09BE \u09A8\u09BE\u09AE"), /* @__PURE__ */ import_react27.default.createElement("input", { required: true, value: bengali, onChange: (event) => setBengali(event.target.value) })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { type: "button", className: "btn glass sm", onClick: close }, "\u09AC\u09BE\u09A4\u09BF\u09B2"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", disabled: busy }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Plus, null), "\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3"))));
}
function ChecklistsPage({ data, profile, pushToast, refreshData, setModal }) {
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("div", { className: "page-title-row" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("h1", null, "Country Checklists"), /* @__PURE__ */ import_react27.default.createElement("p", null, "Admin-maintained required document sets; \u0986\u09AA\u09A1\u09C7\u099F \u0995\u09B0\u09BE\u09B0 \u0986\u0997\u09C7 official source \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange", onClick: () => setModal({ type: "checklist" }) }, /* @__PURE__ */ import_react27.default.createElement(Plus, null), "Checklist \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8")), data.checklists.length ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "content-list" }, data.checklists.map((item) => /* @__PURE__ */ import_react27.default.createElement("article", { className: "glass content-row", key: item.id }, /* @__PURE__ */ import_react27.default.createElement("span", { className: "setting-icon" }, /* @__PURE__ */ import_react27.default.createElement(ClipboardCheck, null)), /* @__PURE__ */ import_react27.default.createElement("span", { className: "row-main" }, /* @__PURE__ */ import_react27.default.createElement("b", null, countryLabel(countryFor(data.countries, item.country_id)), " \xB7 ", categoryLabel(categoryFor(data.categories, item.visa_category_id))), /* @__PURE__ */ import_react27.default.createElement("small", null, Array.isArray(item.required_documents) ? item.required_documents.join(" \xB7 ") : "\u0995\u09CB\u09A8\u09CB document \u09A8\u09C7\u0987", " \xB7 \u09AF\u09BE\u099A\u09BE\u0987 ", formatDate(item.checked_at))), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", onClick: () => setModal({ type: "checklist", checklist: item }) }, "\u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE")))) : /* @__PURE__ */ import_react27.default.createElement(EmptyState, { icon: ClipboardCheck, title: "Checklist \u09A8\u09C7\u0987", body: "\u09A6\u09C7\u09B6 \u0993 category \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F document list Admin \u098F\u0996\u09BE\u09A8\u09C7 \u09AF\u09CB\u0997 \u0995\u09B0\u09AC\u09C7\u09A8\u0964", action: () => setModal({ type: "checklist" }), actionLabel: "\u09A8\u09A4\u09C1\u09A8 checklist" }));
}
function ChecklistModal({ modal, profile, data, pushToast, refreshData, close }) {
  const existing = modal.checklist;
  const [countryId, setCountry] = (0, import_react27.useState)(existing?.country_id || data.countries[0]?.id || "");
  const [categoryId, setCategory] = (0, import_react27.useState)(existing?.visa_category_id || data.categories[0]?.id || "");
  const [requirements, setRequirements] = (0, import_react27.useState)((existing?.required_documents || []).join("\n"));
  const [source, setSource] = (0, import_react27.useState)(existing?.source_url || "");
  const [checked, setChecked] = (0, import_react27.useState)(existing?.checked_at || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const save = async (event) => {
    event.preventDefault();
    const list = requirements.split(/\n|,/).map((item) => item.trim()).filter(Boolean).map((item) => resolveDocumentType(item)?.value || item);
    if (!countryId || !categoryId || !list.length) {
      pushToast("\u09A6\u09C7\u09B6, \u09AD\u09BF\u09B8\u09BE \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u0993 \u0985\u09A8\u09CD\u09A4\u09A4 \u098F\u0995\u099F\u09BF requirement \u09A6\u09BF\u09A8\u0964", "error");
      return;
    }
    if (source && !source.startsWith("https://")) {
      pushToast("\u09B8\u09B0\u0995\u09BE\u09B0\u09BF source-\u098F\u09B0 HTTPS URL \u09A6\u09BF\u09A8\u0964", "error");
      return;
    }
    setBusy(true);
    const payload = { workspace_id: profile.workspace_id, country_id: countryId, visa_category_id: categoryId, required_documents: list, source_url: source || null, checked_at: checked || null, updated_by: profile.id, updated_at: (/* @__PURE__ */ new Date()).toISOString() };
    const { error } = await supabase.from("country_checklists").upsert(payload, { onConflict: "country_id,visa_category_id" });
    setBusy(false);
    if (error) pushToast(`Checklist \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09AF\u09BC\u09A8\u09BF: ${error.message}`, "error");
    else {
      pushToast("Checklist database-\u098F \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
      refreshData({ quiet: true });
      close();
    }
  };
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: existing ? "Checklist \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE" : "Checklist \u09A4\u09C8\u09B0\u09BF", subtitle: "\u098F\u0987 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE applicant file-\u098F missing document check-\u098F \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u09B9\u09AC\u09C7\u0964" }, /* @__PURE__ */ import_react27.default.createElement("form", { onSubmit: save }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "field-grid" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09A6\u09C7\u09B6"), /* @__PURE__ */ import_react27.default.createElement("select", { value: countryId, onChange: (event) => setCountry(event.target.value), required: true }, data.countries.map((country) => /* @__PURE__ */ import_react27.default.createElement("option", { key: country.id, value: country.id }, country.flag_emoji, " ", countryLabel(country))))), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Visa category"), /* @__PURE__ */ import_react27.default.createElement("select", { value: categoryId, onChange: (event) => setCategory(event.target.value), required: true }, data.categories.map((category) => /* @__PURE__ */ import_react27.default.createElement("option", { key: category.id, value: category.id }, categoryLabel(category)))))), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C0\u09AF\u09BC \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09B8 (\u09AA\u09CD\u09B0\u09A4\u09BF \u09B2\u09BE\u0987\u09A8\u09C7 \u098F\u0995\u099F\u09BF)"), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: requirements, onChange: (event) => setRequirements(event.target.value), placeholder: "পাসপোর্ট / passport\nBank Statement / bank_statement\nভ্রমণ পরিকল্পনা / itinerary", required: true })), /* @__PURE__ */ import_react27.default.createElement("div", { className: "field-grid" }, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Official source HTTPS URL"), /* @__PURE__ */ import_react27.default.createElement("input", { value: source, onChange: (event) => setSource(event.target.value), type: "url", placeholder: "https://..." })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09B6\u09C7\u09B7 \u09AF\u09BE\u099A\u09BE\u0987\u09AF\u09BC\u09C7\u09B0 \u09A4\u09BE\u09B0\u09BF\u0996"), /* @__PURE__ */ import_react27.default.createElement("input", { value: checked, onChange: (event) => setChecked(event.target.value), type: "date" }))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn" }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "\u099A\u09C7\u0995\u09B2\u09BF\u09B8\u09CD\u099F\u09C7 generic/fake policy insert \u09A8\u09AF\u09BC\u0964 \u0997\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7\u09C7\u09B0 \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 official instructions \u09A6\u09C7\u0996\u09C7 admin \u09A8\u09BF\u099C\u09C7 \u09A4\u09A5\u09CD\u09AF \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09AC\u09C7\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { type: "button", className: "btn glass sm", onClick: close }, "\u09AC\u09BE\u09A4\u09BF\u09B2"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", disabled: busy }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ import_react27.default.createElement(Check, null), "\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3"))));
}
function GoogleActionModal({ modal, profile, close, pushToast }) {
  const action = modal.action || "docs_create";
  const [form, setForm] = (0, import_react27.useState)({ title: "", body: "", to: "", subject: "", text: "" });
  const [busy, setBusy] = (0, import_react27.useState)(false);
  const [result, setResult] = (0, import_react27.useState)(null);
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      const payload = action === "gmail_send" ? { action, to: form.to, subject: form.subject, text: form.text } : { action, title: form.title, body: form.body };
      const response = await invokeFunction("google-workspace-action", payload);
      setResult(response);
      pushToast(action === "gmail_send" ? "Gmail \u09A5\u09C7\u0995\u09C7 \u0987\u09AE\u09C7\u0987\u09B2 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964" : "Google Docs \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964");
    } catch (error) {
      pushToast(error.message || "Google Workspace action \u09AC\u09CD\u09AF\u09B0\u09CD\u09A5\u0964", "error");
    } finally {
      setBusy(false);
    }
  };
  const gmail = action === "gmail_send";
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: gmail ? "Gmail \u09AA\u09BE\u09A0\u09BE\u09A8" : "Google Docs \u09A4\u09C8\u09B0\u09BF", subtitle: gmail ? "OAuth \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 account \u09A5\u09C7\u0995\u09C7 \u0987\u09AE\u09C7\u0987\u09B2 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AC\u09C7\u0964" : "\u098F\u0987 \u09B2\u09C7\u0996\u09BE Google Docs-\u098F server-side \u09A4\u09C8\u09B0\u09BF \u09B9\u09AC\u09C7\u0964" }, result ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice success" }, /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "\u0995\u09BE\u099C \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7"), result.document_url && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("br", null), /* @__PURE__ */ import_react27.default.createElement("a", { href: result.document_url, target: "_blank", rel: "noopener noreferrer" }, "Google Doc \u0996\u09C1\u09B2\u09C1\u09A8 ", /* @__PURE__ */ import_react27.default.createElement(ExternalLink, { size: 11 }))), result.message_id && /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("br", null), "Gmail message ID: ", result.message_id))) : /* @__PURE__ */ import_react27.default.createElement("form", { onSubmit: submit }, gmail ? /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AA\u09CD\u09B0\u09BE\u09AA\u0995 \u0987\u09AE\u09C7\u0987\u09B2"), /* @__PURE__ */ import_react27.default.createElement("input", { type: "email", value: form.to, onChange: (event) => setForm((current) => ({ ...current, to: event.target.value })), required: true })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Subject"), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.subject, onChange: (event) => setForm((current) => ({ ...current, subject: event.target.value })), required: true })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "\u09AC\u09BE\u09B0\u09CD\u09A4\u09BE"), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: form.text, onChange: (event) => setForm((current) => ({ ...current, text: event.target.value })), required: true }))) : /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Document title"), /* @__PURE__ */ import_react27.default.createElement("input", { value: form.title, onChange: (event) => setForm((current) => ({ ...current, title: event.target.value })), required: true })), /* @__PURE__ */ import_react27.default.createElement("label", { className: "field" }, /* @__PURE__ */ import_react27.default.createElement("span", null, "Document content"), /* @__PURE__ */ import_react27.default.createElement("textarea", { value: form.body, onChange: (event) => setForm((current) => ({ ...current, body: event.target.value })), required: true }))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn" }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "Google OAuth tokens server-side encrypted; request Edge Function \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AC\u09C7\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn glass sm", type: "button", onClick: close }, "\u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09C1\u09A8"), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn orange sm", disabled: busy }, busy ? /* @__PURE__ */ import_react27.default.createElement(LoaderCircle, { className: "spin" }) : gmail ? /* @__PURE__ */ import_react27.default.createElement(Send, null) : /* @__PURE__ */ import_react27.default.createElement(FileText, null), gmail ? "\u0987\u09AE\u09C7\u0987\u09B2 \u09AA\u09BE\u09A0\u09BE\u09A8" : "Google Doc \u09A4\u09C8\u09B0\u09BF"))), result && /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn", onClick: close }, "\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8")));
}
function GoogleHelpModal({ close }) {
  return /* @__PURE__ */ import_react27.default.createElement(ModalFrame, { close, title: "Google Workspace \u09B8\u0982\u09AF\u09CB\u0997", subtitle: "OAuth \u098F\u09AC\u0982 server-side secrets \u099B\u09BE\u09A1\u09BC\u09BE real Google integration \u099A\u09BE\u09B2\u09C1 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC \u09A8\u09BE\u0964" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature-list" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature" }, /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null), "Google Cloud-\u098F Drive API, Docs API \u0993 Gmail API enable \u0995\u09B0\u09C1\u09A8\u0964"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature" }, /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null), "OAuth consent screen, client ID/secret \u0993 callback URL \u09B8\u09C7\u099F \u0995\u09B0\u09C1\u09A8\u0964"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature" }, /* @__PURE__ */ import_react27.default.createElement(CircleCheck, null), "Supabase Edge Function secrets-\u098F OAuth secret \u0993 encryption key \u09B0\u09BE\u0996\u09C1\u09A8\u0964"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "feature" }, /* @__PURE__ */ import_react27.default.createElement(ShieldCheck, null), "Refresh token database-\u098F encrypted \u09A5\u09BE\u0995\u09AC\u09C7; browser-\u098F \u0995\u09CB\u09A8\u09CB token \u09A8\u09AF\u09BC\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "notice warn", style: { marginTop: 12 } }, /* @__PURE__ */ import_react27.default.createElement(TriangleAlert, null), /* @__PURE__ */ import_react27.default.createElement("div", null, "Google Workspace sensitive scopes \u09AF\u09BE\u099A\u09BE\u0987/\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u099A\u09BE\u0987\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964 README-\u09A4\u09C7 scope \u0993 setup checklist \u09A6\u09C7\u0996\u09C1\u09A8\u0964")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ import_react27.default.createElement("span", null), /* @__PURE__ */ import_react27.default.createElement("button", { className: "btn", onClick: close }, "\u09AC\u09C1\u099D\u09C7\u099B\u09BF")));
}
export {
  App as default
} ;


function UpdatesPage({ data, selectedId, navigate, admin, setModal }) {
  const [query, setQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState(selectedId && data.countries.some((row) => row.id === selectedId) ? selectedId : "");
  const updates = data.updates
    .filter((row) => row.status === "published")
    .filter((row) => !countryFilter || row.country_id === countryFilter)
    .filter((row) => {
      const country = countryFor(data.countries, row.country_id);
      return `${row.title_bn || ""} ${row.title || ""} ${row.body_bn || ""} ${row.body || ""} ${country?.name_bn || ""} ${country?.name || ""}`.toLowerCase().includes(query.trim().toLowerCase());
    });
  return <>
    <div className="page-title-row">
      <div>
        <span className="eyebrow"><span className="star">✦</span> First Fly bulletin</span>
        <h1>ভিসা আপডেট</h1>
        <p>টিমের প্রকাশিত বুলেটিন, গন্তব্যভিত্তিক তথ্য ও মূল সরকারি সূত্র এক জায়গায়। ভিসা-সংক্রান্ত সিদ্ধান্তের আগে সংশ্লিষ্ট কর্তৃপক্ষের ওয়েবসাইট যাচাই করুন।</p>
      </div>
      {admin && <button className="btn orange" onClick={() => setModal({ type: "content-editor", kind: "update" })}><Plus /> নতুন আপডেট</button>}
    </div>
    <div className="toolbar">
      <label className="search-wrap"><Search /><input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="শিরোনাম, বিবরণ বা দেশ খুঁজুন" aria-label="ভিসা আপডেট খুঁজুন" /></label>
      <select className="select-input" value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} aria-label="দেশ অনুযায়ী ফিল্টার">
        <option value="">সব গন্তব্য</option>
        {data.countries.map((country) => <option key={country.id} value={country.id}>{countryLabel(country)}</option>)}
      </select>
    </div>
    <div className="updates-count-row"><Pill tone="blue" icon={Newspaper}>{updates.length}টি প্রকাশিত আপডেট</Pill>{countryFilter && <button className="text-btn" onClick={() => setCountryFilter("")}>ফিল্টার সরান <X /></button>}</div>
    {updates.length ? <div className="news-grid">{updates.map((update) => <VisaUpdateCard key={update.id} update={update} country={countryFor(data.countries, update.country_id)} onClick={() => navigate("update", update.id)} />)}</div> : <EmptyState icon={Newspaper} title="কোনো প্রকাশিত আপডেট পাওয়া যায়নি" body={query || countryFilter ? "সার্চ বা দেশ ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।" : "অ্যাডমিন যাচাই করে আপডেট প্রকাশ করলে এখানে দেখা যাবে।"} action={admin ? () => setModal({ type: "content-editor", kind: "update" }) : undefined} actionLabel="আপডেট তৈরি করুন" />}
    <div className="notice warn updates-disclaimer"><TriangleAlert /><div><strong>তথ্য যাচাই জরুরি</strong><br />এই টিম বুলেটিন সরকারি ঘোষণা বা আইনি পরামর্শ নয়। আপডেটের ভেতরে দেয়া সরকারি সূত্রই চূড়ান্তভাবে যাচাই করুন।</div></div>
  </>;
}

function CountryBrowsePage({ data, navigate }) {
  const [query, setQuery] = useState("");
  const countries = data.countries.filter((country) => `${country.name_bn || ""} ${country.name || ""} ${country.region || ""}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="page-title-row"><div><span className="eyebrow"><span className="star">✦</span> Destination guide</span><h1>দেশ ও ভিসা সেবা</h1><p>গন্তব্য বেছে নিয়ে প্রকাশিত আপডেট এবং সংরক্ষিত document checklist দেখুন। সরকারি নিয়ম পরিবর্তন হতে পারে—মূল সূত্র যাচাই করুন।</p></div></div>
    <div className="toolbar"><label className="search-wrap"><Search /><input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="দেশ বা অঞ্চল খুঁজুন" aria-label="দেশ খুঁজুন" /></label><Pill tone="blue" icon={Earth}>{countries.length}টি গন্তব্য</Pill></div>
    {countries.length ? <div className="country-grid country-browse-grid">{countries.map((country) => {
      const publishedCount = data.updates.filter((row) => row.country_id === country.id && row.status === "published").length;
      const checklistCount = data.checklists.filter((row) => row.country_id === country.id).length;
      return <article className="country-browse-item" key={country.id}>
        <CountryCard country={country} latestUpdate={latestCountryUpdate(data.updates, country.id)} onClick={() => navigate("updates", country.id)} />
        <div className="country-browse-meta"><Pill tone="blue">{publishedCount} আপডেট</Pill><Pill>{checklistCount} checklist</Pill></div>
        {country.official_url ? <a className="source-link" href={country.official_url} target="_blank" rel="noopener noreferrer"><ExternalLink /><span><b>সরকারি সূত্র</b><br />{country.official_url}</span></a> : <span className="country-source-missing">সরকারি সূত্র যোগ করা হয়নি</span>}
      </article>;
    })}</div> : <EmptyState icon={Earth} title="গন্তব্য পাওয়া যায়নি" body="সার্চ শব্দ পরিবর্তন করে আবার চেষ্টা করুন।" />}
  </>;
}

function AdminMorePage({ navigate }) {
  const actions = [
    [Earth, "দেশ ও ভিসা", "গন্তব্য, category ও official link", "countries"],
    [ClipboardCheck, "ডকুমেন্ট checklist", "গন্তব্য ও visa category অনুযায়ী", "checklists"],
    [Newspaper, "কনটেন্ট স্টুডিও", "আপডেট ও ব্লগ প্রকাশ", "content"],
    [FolderOpen, "ডকুমেন্ট লাইব্রেরি", "অনুমতিসহ private case files", "documents"],
    [Cloud, "Google Workspace", "OAuth সংযোগ ও কার্যক্রম", "google"],
    [Activity, "অ্যাক্টিভিটি লগ", "অডিটযোগ্য অপারেশন ইতিহাস", "activity"],
    [Bell, "নোটিফিকেশন", "সিস্টেম ও টিম আপডেট", "notifications"],
    [Settings, "সেটিংস", "টিম, ব্র্যান্ড ও PWA", "settings"],
  ];
  return <>
    <div className="page-title-row"><div><span className="eyebrow"><span className="star">✦</span> Admin workspace</span><h1>আরও অপারেশন</h1><p>অ্যাডমিনের country, content, integration ও workspace controls। অনুমতি অনুযায়ী server-side policy প্রতিটি action যাচাই করে।</p></div></div>
    <div className="quick-grid admin-more-grid">{actions.map(([Icon, title, sub, route]) => <QuickAction key={route} icon={Icon} title={title} sub={sub} onClick={() => navigate(route)} />)}</div>
    <section className="glass admin-more-note"><ShieldCheck /><div><b>অনুমতি সার্ভারে যাচাই হয়</b><p>শুধু মেনু লুকানো নয়—Supabase Auth, Edge Function role check এবং Postgres RLS অ্যাক্সেস নিয়ন্ত্রণ করে।</p></div></section>
  </>;
}

function PasswordRecoveryScreen({ onSave, loading, error, theme, onTheme }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (password !== confirm) return;
    onSave(password);
  };
  return <div className="auth-shell recovery-shell">
    <section className="auth-side"><div className="auth-brand"><Logo large /><span><b className="brand-name">FIRST FLY INTERNATIONAL</b><small className="brand-tag">আপনার ভিসা, আমাদের অগ্রাধিকার</small></span><button className="icon-btn auth-theme" type="button" onClick={onTheme} aria-label="থিম পরিবর্তন">{theme === "dark" ? <Sun /> : <Moon />}</button></div><div className="auth-copy"><span className="eyebrow"><span className="star">✦</span> নিরাপদ অ্যাকাউন্ট</span><h1>নতুন পাসওয়ার্ড<br /><em>নির্ধারণ করুন।</em></h1><p>পাসওয়ার্ড রিসেট লিংকটি Supabase Auth থেকে এসেছে। পরিবর্তনের পর নিরাপদে আপনার First Fly workspace-এ ফিরবেন।</p></div></section>
    <section className="auth-form-side"><form className="auth-card" onSubmit={submit}><span className="eyebrow"><span className="star">✦</span> Account recovery</span><h2>পাসওয়ার্ড হালনাগাদ</h2><p>কমপক্ষে ১০ অক্ষরের নতুন পাসওয়ার্ড দিন।</p>{error && <div className="form-error" role="alert">{error}</div>}<label className="field"><span>নতুন পাসওয়ার্ড</span><input required type="password" autoComplete="new-password" minLength={10} value={password} onChange={(event) => setPassword(event.target.value)} /></label><label className="field"><span>নতুন পাসওয়ার্ড আবার লিখুন</span><input required type="password" autoComplete="new-password" minLength={10} value={confirm} onChange={(event) => setConfirm(event.target.value)} /></label>{password && confirm && password !== confirm && <p className="form-error" role="alert">দুটি পাসওয়ার্ড এক নয়।</p>}<button className="btn wide" disabled={loading || password.length < 10 || password !== confirm}>{loading ? <><LoaderCircle className="spin" /> সংরক্ষণ হচ্ছে...</> : <>নতুন পাসওয়ার্ড সংরক্ষণ <ArrowRight /></>}</button><div className="auth-security"><ShieldCheck size={14} /><span>পাসওয়ার্ড শুধু Supabase Auth-এ সংরক্ষিত হয়।</span></div></form></section>
  </div>;
}
