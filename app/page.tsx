"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Package, ArrowRight, Star, Zap, BarChart2, Shield, Globe, ChevronRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { CHART_COLORS } from "@/lib/data";
import Link from "next/link";

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, orders: 320 },
  { month: "Feb", revenue: 58000, orders: 410 },
  { month: "Mar", revenue: 51000, orders: 375 },
  { month: "Apr", revenue: 67000, orders: 490 },
  { month: "May", revenue: 73000, orders: 530 },
  { month: "Jun", revenue: 89000, orders: 620 },
  { month: "Jul", revenue: 95000, orders: 680 },
  { month: "Aug", revenue: 112000, orders: 790 },
];

const CATEGORY_DATA = [
  { name: "Electronics", value: 38, color: CHART_COLORS.series1 },
  { name: "Apparel", value: 27, color: CHART_COLORS.series2 },
  { name: "Home & Garden", value: 18, color: CHART_COLORS.series3 },
  { name: "Sports", value: 17, color: CHART_COLORS.series4 },
];

const KPI_CARDS = [
  {
    label: "Total Revenue",
    value: "$112,400",
    change: "+18.4%",
    positive: true,
    icon: DollarSign,
    color: CHART_COLORS.series1,
  },
  {
    label: "Total Orders",
    value: "4,820",
    change: "+12.1%",
    positive: true,
    icon: ShoppingCart,
    color: CHART_COLORS.series2,
  },
  {
    label: "Active Customers",
    value: "9,340",
    change: "+7.6%",
    positive: true,
    icon: Users,
    color: CHART_COLORS.series3,
  },
  {
    label: "Avg. Order Value",
    value: "$23.32",
    change: "-2.3%",
    positive: false,
    icon: Package,
    color: CHART_COLORS.series4,
  },
];

const FEATURES = [
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Watch your revenue, orders, and conversion rates update live. No refresh needed, no data lag.",
    color: CHART_COLORS.series1,
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description:
      "Get notified the moment a KPI crosses a threshold. Catch drops before they become disasters.",
    color: CHART_COLORS.series2,
  },
  {
    icon: Globe,
    title: "Multi-Store Support",
    description:
      "Manage Shopify, WooCommerce, and Amazon stores from a single unified dashboard.",
    color: CHART_COLORS.series3,
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. Your sales data stays encrypted and private at every layer.",
    color: CHART_COLORS.series4,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Head of E-commerce, Luminary Co.",
    quote:
      "DaticsAI cut our reporting time from 4 hours a week to under 20 minutes. The revenue chart alone paid for itself.",
    rating: 5,
    initials: "SC",
    color: CHART_COLORS.series1,
  },
  {
    name: "Marcus Webb",
    role: "Founder, TrailGear Direct",
    quote:
      "We spotted a 30% drop in conversion on mobile before it cost us. The real-time alerts are genuinely game-changing.",
    rating: 5,
    initials: "MW",
    color: CHART_COLORS.series2,
  },
  {
    name: "Priya Nair",
    role: "VP Growth, Botanica Shop",
    quote:
      "Finally a dashboard that shows me what I actually need. Clean, fast, and the multi-store view is perfect for our brand portfolio.",
    rating: 5,
    initials: "PN",
    color: CHART_COLORS.series3,
  },
];

const STATS = [
  { value: "2.4B+", label: "Orders Tracked" },
  { value: "$18B+", label: "Revenue Analyzed" },
  { value: "12,000+", label: "Stores Connected" },
  { value: "99.97%", label: "Uptime SLA" },
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for solo founders and small stores.",
    features: [
      "1 store connection",
      "30-day data history",
      "Core KPI dashboard",
      "Email alerts",
      "CSV exports",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$129",
    period: "/mo",
    description: "For scaling brands that need deeper insight.",
    features: [
      "5 store connections",
      "1-year data history",
      "Advanced analytics",
      "Real-time alerts",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams with complex multi-brand needs.",
    features: [
      "Unlimited stores",
      "Unlimited history",
      "Custom dashboards",
      "SSO & SAML",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function HomePage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"revenue" | "orders">("revenue");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-24 pb-16 text-center overflow-hidden"
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[600px] w-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#00D4AA]/8 blur-[80px]"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              <Zap className="h-3 w-3" aria-hidden="true" />
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-6xl md:text-7xl"
          >
            {t("hero.headline1")}
            <br />
            <span className="text-[var(--accent)]">{t("hero.headline2")}</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] text-pretty"
          >
            {t("hero.subheadline")}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/analytics"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(108,71,255,0.35)] transition-all duration-300 hover:shadow-[0_0_36px_rgba(108,71,255,0.55)] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {t("hero.cta.secondary")}
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--muted)]"
          >
            {(t.raw("hero.trust") as string[]).map((item: string, i: number) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Mini dashboard preview */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="relative z-10 mt-16 w-full max-w-5xl"
        >
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_8px_64px_rgba(0,0,0,0.25)]">
            {/* Mini KPI row */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {KPI_CARDS.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--muted)]">{kpi.label}</span>
                      <Icon className="h-3.5 w-3.5" style={{ color: kpi.color }} aria-hidden="true" />
                    </div>
                    <div className="mt-1.5 text-lg font-bold">{kpi.value}</div>
                    <div
                      className={`mt-0.5 flex items-center gap-1 text-xs font-medium ${kpi.positive ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {kpi.positive ? (
                        <TrendingUp className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="h-3 w-3" aria-hidden="true" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Mini chart */}
            <div className="h-40 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.series1} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CHART_COLORS.series1} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Area type="monotone" dataKey="revenue" stroke={CHART_COLORS.series1} strokeWidth={2} fill="url(#heroGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAND ── */}
      <Reveal>
        <section id="stats" className="border-y border-[var(--border)] bg-[var(--surface)] py-12 px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-[var(--accent)] sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FEATURES ── */}
      <section id="features" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("features.eyebrow")}
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                {t("features.heading")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[var(--muted)] leading-relaxed text-pretty">
                {t("features.subheading")}
              </p>
            </div>
          </Reveal>

          {/* Asymmetric bento grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Large feature card */}
            <Reveal className="sm:col-span-2 lg:col-span-2" delay={0}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                <div
                  className="absolute -top-16 -right-16 h-48 w-48 rounded-full blur-[60px] transition-opacity duration-500 group-hover:opacity-80 opacity-40"
                  style={{ background: FEATURES[0].color }}
                  aria-hidden="true"
                />
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${FEATURES[0].color}20` }}
                >
                  <BarChart2 className="h-6 w-6" style={{ color: FEATURES[0].color }} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">{FEATURES[0].title}</h3>
                <p className="mt-2 text-[var(--muted)] leading-relaxed">{FEATURES[0].description}</p>
                {/* Mini inline chart */}
                <div className="mt-6 h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
                      <defs>
                        <linearGradient id="featGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={FEATURES[0].color} stopOpacity={0.25} />
                          <stop offset="95%" stopColor={FEATURES[0].color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tick={{ fontSize: 9, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Area type="monotone" dataKey="revenue" stroke={FEATURES[0].color} strokeWidth={2} fill="url(#featGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </Reveal>

            {/* Remaining feature cards */}
            {FEATURES.slice(1).map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal key={feat.title} delay={(i + 1) * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
                  >
                    <div
                      className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-[50px] transition-opacity duration-500 group-hover:opacity-70 opacity-30"
                      style={{ background: feat.color }}
                      aria-hidden="true"
                    />
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${feat.color}20` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: feat.color }} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold">{feat.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{feat.description}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ANALYTICS PREVIEW ── */}
      <Reveal>
        <section id="analytics-preview" className="bg-[var(--surface)] px-4 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  {t("analyticsPreview.eyebrow")}
                </span>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                  {t("analyticsPreview.heading")}
                </h2>
                <p className="mt-3 max-w-lg text-[var(--muted)] leading-relaxed">
                  {t("analyticsPreview.subheading")}
                </p>
              </div>
              {/* Tab toggle */}
              <div className="flex rounded-xl border border-[var(--border)] bg-[var(--background)] p-1">
                <button
                  onClick={() => setActiveTab("revenue")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${activeTab === "revenue" ? "bg-[var(--accent)] text-white shadow" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                >
                  {t("analyticsPreview.tab.revenue")}
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${activeTab === "orders" ? "bg-[var(--accent)] text-white shadow" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                >
                  {t("analyticsPreview.tab.orders")}
                </button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main chart */}
              <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--muted)]">
                    {activeTab === "revenue" ? t("analyticsPreview.chart.revenueLabel") : t("analyticsPreview.chart.ordersLabel")}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{t("analyticsPreview.chart.period")}</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
                      <YAxis
                        tick={{ fontSize: 11, fill: "var(--muted)" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={
                          activeTab === "revenue"
                            ? (v) => `$${(v / 1000).toFixed(0)}k`
                            : (v) => `${v}`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "12px",
                          fontSize: "12px",
                          color: "var(--foreground)",
                        }}
                        formatter={(value: number) =>
                          activeTab === "revenue"
                            ? [`$${value.toLocaleString("en-US")}`, "Revenue"]
                            : [value, "Orders"]
                        }
                      />
                      <Bar
                        dataKey={activeTab === "revenue" ? "revenue" : "orders"}
                        fill={activeTab === "revenue" ? CHART_COLORS.series1 : CHART_COLORS.series2}
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                <span className="text-sm font-semibold text-[var(--muted)]">{t("analyticsPreview.pie.label")}</span>
                <div className="mt-4 flex justify-center">
                  <PieChart width={160} height={160}>
                    <Pie
                      data={CATEGORY_DATA}
                      cx={80}
                      cy={80}
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <ul className="mt-4 space-y-2">
                  {CATEGORY_DATA.map((cat) => (
                    <li key={cat.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: cat.color }} aria-hidden="true" />
                        <span className="text-[var(--muted)]">{cat.name}</span>
                      </span>
                      <span className="font-semibold">{cat.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                {t("testimonials.heading")}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t_item, i) => (
              <Reveal key={t_item.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t_item.rating }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    &ldquo;{t_item.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: t_item.color }}
                      aria-label={t_item.name}
                    >
                      {t_item.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t_item.name}</div>
                      <div className="text-xs text-[var(--muted)]">{t_item.role}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <Reveal>
        <section id="pricing" className="bg-[var(--surface)] px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("pricing.eyebrow")}
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                {t("pricing.heading")}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[var(--muted)] leading-relaxed">
                {t("pricing.subheading")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {PRICING_PLANS.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] ${plan.highlight ? "border-[var(--accent)] bg-[var(--accent)]/5" : "border-[var(--border)] bg-[var(--background)]"}`}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white">
                          {t("pricing.popular")}
                        </span>
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-[var(--muted)]">{plan.name}</div>
                      <div className="mt-2 flex items-end gap-1">
                        <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                        {plan.period && <span className="mb-1 text-sm text-[var(--muted)]">{plan.period}</span>}
                      </div>
                      <p className="mt-2 text-sm text-[var(--muted)]">{plan.description}</p>
                    </div>
                    <ul className="flex-1 space-y-2.5 border-t border-[var(--border)] pt-4">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-[var(--accent)]" aria-hidden="true" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/analytics"
                      className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${plan.highlight ? "bg-[var(--accent)] text-white hover:opacity-90 shadow-[0_0_20px_rgba(108,71,255,0.3)]" : "border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5"}`}
                    >
                      {plan.cta}
                    </Link>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA BAND ── */}
      <Reveal>
        <section id="cta" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/15 via-[var(--surface)] to-[#00D4AA]/10 p-12 shadow-[0_8px_64px_rgba(108,71,255,0.15)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <div className="h-64 w-64 rounded-full bg-[var(--accent)]/15 blur-[80px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                  {t("cta.heading")}
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[var(--muted)] leading-relaxed text-pretty">
                  {t("cta.subheading")}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/analytics"
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(108,71,255,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(108,71,255,0.6)] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t("cta.button.primary")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/settings"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-[var(--accent)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t("cta.button.secondary")}
                  </Link>
                </div>
                <p className="mt-6 text-xs text-[var(--muted)]">{t("cta.disclaimer")}</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}