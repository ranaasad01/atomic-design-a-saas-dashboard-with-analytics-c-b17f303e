"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { User, Bell, Lock, CreditCard, Globe, Palette, Shield, Mail, Smartphone, Eye, EyeOff, Check, AlertCircle, ChevronRight, Save, Trash2, Plus } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type currentUser = any;
const currentUser: any = [];

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing & Plan", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const PLAN_FEATURES = [
  "Up to 50,000 orders/month",
  "Advanced analytics & forecasting",
  "10 team members",
  "Priority support",
  "Custom integrations",
  "Data export (CSV, JSON)",
];

const INTEGRATIONS = [
  {
    id: "shopify",
    name: "Shopify",
    description: "Sync products, orders, and customers from your Shopify store.",
    connected: true,
    logo: "/images/shopify-logo-integration.jpg",
    connectedAs: "mystore.myshopify.com",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Process payments and track revenue in real time.",
    connected: true,
    logo: "/images/stripe-payment-integration.jpg",
    connectedAs: "acct_1NxK2…",
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    description: "Sync customer segments and trigger email flows automatically.",
    connected: false,
    logo: "/images/klaviyo-email-integration.jpg",
    connectedAs: null,
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Import GA4 traffic and conversion data into your dashboard.",
    connected: false,
    logo: "/images/google-analytics-integration.jpg",
    connectedAs: null,
  },
];

const TEAM_MEMBERS = [
  { id: "1", name: "Alex Rivera", email: "alex@daticsai.com", role: "Admin", initials: "AR", active: true },
  { id: "2", name: "Jordan Lee", email: "jordan@daticsai.com", role: "Analyst", initials: "JL", active: true },
  { id: "3", name: "Sam Chen", email: "sam@daticsai.com", role: "Viewer", initials: "SC", active: false },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
        checked ? "bg-[var(--accent)]" : "bg-white/10"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-base font-semibold text-[var(--foreground)]">{children}</h2>;
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-[var(--foreground)]/70">
      {children}
    </label>
  );
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
    />
  );
}

function SaveButton({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
        saved
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-[var(--accent)] text-white hover:opacity-90"
      }`}
    >
      {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
      {saved ? "Saved" : "Save Changes"}
    </motion.button>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────
function ProfileSection() {
  const t = useTranslations();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [role, setRole] = useState(currentUser.role);
  const [bio, setBio] = useState("E-commerce analytics enthusiast. Building smarter stores with data.");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Reveal>
      <SectionCard>
        <SectionTitle>{t("settings.profile.title")}</SectionTitle>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xl font-bold text-[var(--accent)]">
            {currentUser.initials}
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">{name}</p>
            <p className="text-xs text-[var(--foreground)]/50">{email}</p>
            <button className="mt-1 text-xs font-medium text-[var(--accent)] hover:underline">
              {t("settings.profile.changeAvatar")}
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="full-name">{t("settings.profile.fullName")}</FieldLabel>
            <TextInput id="full-name" value={name} onChange={setName} placeholder="Your full name" />
          </div>
          <div>
            <FieldLabel htmlFor="email">{t("settings.profile.email")}</FieldLabel>
            <TextInput id="email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
          </div>
          <div>
            <FieldLabel htmlFor="role">{t("settings.profile.role")}</FieldLabel>
            <TextInput id="role" value={role} onChange={setRole} placeholder="Your role" />
          </div>
          <div>
            <FieldLabel htmlFor="bio">{t("settings.profile.bio")}</FieldLabel>
            <TextInput id="bio" value={bio} onChange={setBio} placeholder="Short bio" />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton onClick={handleSave} saved={saved} />
        </div>
      </SectionCard>
    </Reveal>
  );
}

// ─── Notifications Section ────────────────────────────────────────────────────
function NotificationsSection() {
  const t = useTranslations();
  const [prefs, setPrefs] = useState({
    orderAlerts: true,
    revenueDigest: true,
    lowStock: true,
    newCustomer: false,
    weeklyReport: true,
    productUpdates: false,
    emailNotifs: true,
    smsNotifs: false,
    pushNotifs: true,
  });
  const [saved, setSaved] = useState(false);

  function toggle(key: keyof typeof prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const notifRows = [
    { key: "orderAlerts" as const, label: t("settings.notifications.orderAlerts"), desc: t("settings.notifications.orderAlertsDesc") },
    { key: "revenueDigest" as const, label: t("settings.notifications.revenueDigest"), desc: t("settings.notifications.revenueDigestDesc") },
    { key: "lowStock" as const, label: t("settings.notifications.lowStock"), desc: t("settings.notifications.lowStockDesc") },
    { key: "newCustomer" as const, label: t("settings.notifications.newCustomer"), desc: t("settings.notifications.newCustomerDesc") },
    { key: "weeklyReport" as const, label: t("settings.notifications.weeklyReport"), desc: t("settings.notifications.weeklyReportDesc") },
    { key: "productUpdates" as const, label: t("settings.notifications.productUpdates"), desc: t("settings.notifications.productUpdatesDesc") },
  ];

  const channelRows = [
    { key: "emailNotifs" as const, label: t("settings.notifications.email"), icon: Mail },
    { key: "smsNotifs" as const, label: t("settings.notifications.sms"), icon: Smartphone },
    { key: "pushNotifs" as const, label: t("settings.notifications.push"), icon: Bell },
  ];

  return (
    <Reveal>
      <SectionCard>
        <SectionTitle>{t("settings.notifications.title")}</SectionTitle>
        <div className="mb-5 divide-y divide-[var(--border)]">
          {notifRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{row.label}</p>
                <p className="text-xs text-[var(--foreground)]/50">{row.desc}</p>
              </div>
              <Toggle checked={prefs[row.key]} onChange={() => toggle(row.key)} />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/40">
            {t("settings.notifications.channels")}
          </p>
          <div className="flex flex-wrap gap-4">
            {channelRows.map((ch) => (
              <div key={ch.key} className="flex items-center gap-2.5">
                <ch.icon className="h-4 w-4 text-[var(--foreground)]/50" aria-hidden="true" />
                <span className="text-sm text-[var(--foreground)]/70">{ch.label}</span>
                <Toggle checked={prefs[ch.key]} onChange={() => toggle(ch.key)} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton onClick={handleSave} saved={saved} />
        </div>
      </SectionCard>
    </Reveal>
  );
}

// ─── Security Section ─────────────────────────────────────────────────────────
function SecuritySection() {
  const t = useTranslations();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSave() {
    if (newPw && newPw !== confirmPw) {
      setError(t("settings.security.passwordMismatch"));
      return;
    }
    setError("");
    setSaved(true);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setSaved(false), 2000);
  }

  const sessions = [
    { device: "Chrome on macOS", location: "San Francisco, CA", time: "Active now", current: true },
    { device: "Safari on iPhone 15", location: "San Francisco, CA", time: "2 hours ago", current: false },
    { device: "Firefox on Windows", location: "New York, NY", time: "3 days ago", current: false },
  ];

  return (
    <Reveal>
      <SectionCard>
        <SectionTitle>{t("settings.security.title")}</SectionTitle>
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="current-pw">{t("settings.security.currentPassword")}</FieldLabel>
            <div className="relative">
              <TextInput
                id="current-pw"
                value={currentPw}
                onChange={setCurrentPw}
                placeholder="••••••••"
                type={showCurrent ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 hover:text-[var(--foreground)]/70"
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div />
          <div>
            <FieldLabel htmlFor="new-pw">{t("settings.security.newPassword")}</FieldLabel>
            <div className="relative">
              <TextInput
                id="new-pw"
                value={newPw}
                onChange={setNewPw}
                placeholder="••••••••"
                type={showNew ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 hover:text-[var(--foreground)]/70"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="confirm-pw">{t("settings.security.confirmPassword")}</FieldLabel>
            <TextInput
              id="confirm-pw"
              value={confirmPw}
              onChange={setConfirmPw}
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">{t("settings.security.twoFactor")}</p>
              <p className="text-xs text-[var(--foreground)]/50">{t("settings.security.twoFactorDesc")}</p>
            </div>
          </div>
          <Toggle checked={twoFactor} onChange={setTwoFactor} />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/40">
            {t("settings.security.activeSessions")}
          </p>
          <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {s.device}
                    {s.current && (
                      <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
                        {t("settings.security.currentSession")}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/50">
                    {s.location} · {s.time}
                  </p>
                </div>
                {!s.current && (
                  <button className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors">
                    {t("settings.security.revoke")}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton onClick={handleSave} saved={saved} />
        </div>
      </SectionCard>
    </Reveal>
  );
}

// ─── Billing Section ──────────────────────────────────────────────────────────
function BillingSection() {
  const t = useTranslations();

  const invoices = [
    { id: "INV-2024-012", date: "Dec 1, 2024", amount: "$149.00", status: "Paid" },
    { id: "INV-2024-011", date: "Nov 1, 2024", amount: "$149.00", status: "Paid" },
    { id: "INV-2024-010", date: "Oct 1, 2024", amount: "$149.00", status: "Paid" },
    { id: "INV-2024-009", date: "Sep 1, 2024", amount: "$99.00", status: "Paid" },
  ];

  return (
    <Reveal>
      <SectionCard>
        <SectionTitle>{t("settings.billing.title")}</SectionTitle>
        <div className="mb-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[var(--foreground)]">{t("settings.billing.planName")}</span>
                <span className="rounded-full bg-[var(--accent)]/20 px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                  {t("settings.billing.currentPlan")}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-[var(--foreground)]/60">{t("settings.billing.planDesc")}</p>
              <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">
                $149<span className="text-sm font-normal text-[var(--foreground)]/50">/mo</span>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
            >
              {t("settings.billing.upgrade")}
            </motion.button>
          </div>
          <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {PLAN_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-[var(--foreground)]/70">
                <Check className="h-3.5 w-3.5 flex-shrink-0 text-[var(--accent)]" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-[var(--foreground)]/50" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{t("settings.billing.paymentMethod")}</p>
                <p className="text-xs text-[var(--foreground)]/50">Visa ending in 4242 · Expires 08/27</p>
              </div>
            </div>
            <button className="text-xs font-medium text-[var(--accent)] hover:underline">
              {t("settings.billing.updateCard")}
            </button>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/40">
            {t("settings.billing.invoiceHistory")}
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--border)] text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]/50">{t("settings.billing.invoice")}</th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]/50">{t("settings.billing.date")}</th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]/50">{t("settings.billing.amount")}</th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]/50">{t("settings.billing.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[var(--background)]/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[var(--foreground)]/70">{inv.id}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]/70">{inv.date}</td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{inv.amount}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionCard>
    </Reveal>
  );
}

// ─── Integrations Section ─────────────────────────────────────────────────────
function IntegrationsSection() {
  const t = useTranslations();
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  function toggleIntegration(id: string) {
    setIntegrations((prev) =>
      prev.map((intg) =>
        intg.id === id ? { ...intg, connected: !intg.connected, connectedAs: intg.connected ? null : "Connected" } : intg
      )
    );
  }

  return (
    <Reveal>
      <SectionCard>
        <SectionTitle>{t("settings.integrations.title")}</SectionTitle>
        <p className="mb-5 text-sm text-[var(--foreground)]/60">{t("settings.integrations.desc")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {integrations.map((intg) => (
            <motion.div
              key={intg.id}
              whileHover={{ y: -2 }}
              className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                  <img
                    src={intg.logo}
                    alt={intg.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{intg.name}</p>
                  <p className="text-xs text-[var(--foreground)]/50">{intg.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {intg.connected && intg.connectedAs ? (
                  <span className="truncate text-xs text-[var(--foreground)]/40">{intg.connectedAs}</span>
                ) : (
                  <span className="text-xs text-[var(--foreground)]/30">{t("settings.integrations.notConnected")}</span>
                )}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleIntegration(intg.id)}
                  className={`ml-3 flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    intg.connected
                      ? "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      : "bg-[var(--accent)] text-white hover:opacity-90"
                  }`}
                >
                  {intg.connected ? t("settings.integrations.disconnect") : t("settings.integrations.connect")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionCard>
    </Reveal>
  );
}

// ─── Appearance Section ───────────────────────────────────────────────────────
function AppearanceSection() {
  const t = useTranslations();
  const [accentColor, setAccentColor] = useState("purple");
  const [density, setDensity] = useState("comfortable");
  const [saved, setSaved] = useState(false);

  const accentOptions = [
    { id: "purple", label: "Violet", color: "#6C47FF" },
    { id: "blue", label: "Blue", color: "#3B82F6" },
    { id: "teal", label: "Teal", color: "#00D4AA" },
    { id: "amber", label: "Amber", color: "#F59E0B" },
    { id: "rose", label: "Rose", color: "#F43F5E" },
  ];

  const densityOptions = [
    { id: "compact", label: t("settings.appearance.compact") },
    { id: "comfortable", label: t("settings.appearance.comfortable") },
    { id: "spacious", label: t("settings.appearance.spacious") },
  ];

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Reveal>
      <SectionCard>
        <SectionTitle>{t("settings.appearance.title")}</SectionTitle>
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-[var(--foreground)]/70">{t("settings.appearance.accentColor")}</p>
          <div className="flex flex-wrap gap-3">
            {accentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAccentColor(opt.id)}
                aria-label={opt.label}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                  accentColor === opt.id
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--foreground)]"
                    : "border-[var(--border)] text-[var(--foreground)]/60 hover:border-[var(--foreground)]/30"
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: opt.color }}
                />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-[var(--foreground)]/70">{t("settings.appearance.density")}</p>
          <div className="flex flex-wrap gap-3">
            {densityOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDensity(opt.id)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                  density === opt.id
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--foreground)]"
                    : "border-[var(--border)] text-[var(--foreground)]/60 hover:border-[var(--foreground)]/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/40">
            {t("settings.appearance.preview")}
          </p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center">
              <div className="h-3 w-3 rounded-sm bg-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <div className="h-2.5 w-24 rounded-full bg-[var(--foreground)]/20" />
              <div className="mt-1.5 h-2 w-36 rounded-full bg-[var(--foreground)]/10" />
            </div>
            <div className="h-7 w-16 rounded-lg bg-[var(--accent)]" />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton onClick={handleSave} saved={saved} />
        </div>
      </SectionCard>
    </Reveal>
  );
}

// ─── Team Members Section ─────────────────────────────────────────────────────
function TeamSection() {
  const t = useTranslations();
  const [members, setMembers] = useState(TEAM_MEMBERS);

  function removeMe(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <Reveal>
      <SectionCard>
        <div className="mb-5 flex items-center justify-between">
          <SectionTitle>{t("settings.team.title")}</SectionTitle>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {t("settings.team.invite")}
          </motion.button>
        </div>
        <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)]/15 text-sm font-bold text-[var(--accent)]">
                  {m.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {m.name}
                    {!m.active && (
                      <span className="ml-2 rounded-full bg-yellow-500/15 px-2 py-0.5 text-xs font-medium text-yellow-400">
                        {t("settings.team.pending")}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/50">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs font-medium text-[var(--foreground)]/60">
                  {m.role}
                </span>
                {m.id !== "1" && (
                  <button
                    onClick={() => removeMe(m.id)}
                    aria-label={`Remove ${m.name}`}
                    className="text-[var(--foreground)]/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState("profile");

  const sectionComponents: Record<string, React.ReactNode> = {
    profile: <ProfileSection />,
    notifications: <NotificationsSection />,
    security: <SecuritySection />,
    billing: <BillingSection />,
    integrations: <IntegrationsSection />,
    appearance: <AppearanceSection />,
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {t("settings.page.title")}
            </h1>
            <p className="mt-1 text-sm text-[var(--foreground)]/60">{t("settings.page.subtitle")}</p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar nav */}
          <Reveal className="lg:w-56 lg:flex-shrink-0">
            <nav className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              {SETTINGS_SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <motion.button
                    key={sec.id}
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "text-[var(--foreground)]/60 hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {sec.label}
                    {isActive && (
                      <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                    )}
                  </motion.button>
                );
              })}
            </nav>
            <Reveal delay={0.1}>
              <TeamSection />
            </Reveal>
          </Reveal>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">
            {sectionComponents[activeSection]}
          </div>
        </div>
      </div>
    </main>
  );
}