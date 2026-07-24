"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  FunnelChart,
  Funnel,
  LabelList,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Calendar, ChevronDown, Filter, TrendingUp, TrendingDown, ShoppingCart, Eye, CreditCard, Package, X, Check } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/data";
type dateRangeOptions = any;
const dateRangeOptions: any = [];
type DateRangeOption = any;
const DateRangeOption: any = [];
import { staggerContainer, fadeInUp } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const FUNNEL_DATA = [
  { stage: "Browse", value: 84200, fill: CHART_COLORS.series1, icon: Eye },
  { stage: "Add to Cart", value: 31400, fill: CHART_COLORS.series2, icon: ShoppingCart },
  { stage: "Checkout", value: 18700, fill: CHART_COLORS.series3, icon: CreditCard },
  { stage: "Purchase", value: 12300, fill: CHART_COLORS.series4, icon: Package },
];

const CONVERSION_DATA = [
  { date: "Jan 1", rate: 12.4, upper: 14.1, lower: 10.7 },
  { date: "Jan 8", rate: 13.1, upper: 14.9, lower: 11.3 },
  { date: "Jan 15", rate: 11.8, upper: 13.6, lower: 10.0 },
  { date: "Jan 22", rate: 14.2, upper: 16.0, lower: 12.4 },
  { date: "Jan 29", rate: 15.7, upper: 17.5, lower: 13.9 },
  { date: "Feb 5", rate: 14.9, upper: 16.8, lower: 13.0 },
  { date: "Feb 12", rate: 16.3, upper: 18.2, lower: 14.4 },
  { date: "Feb 19", rate: 17.1, upper: 19.0, lower: 15.2 },
  { date: "Feb 26", rate: 15.8, upper: 17.7, lower: 13.9 },
  { date: "Mar 5", rate: 18.2, upper: 20.1, lower: 16.3 },
  { date: "Mar 12", rate: 19.4, upper: 21.3, lower: 17.5 },
  { date: "Mar 19", rate: 18.7, upper: 20.6, lower: 16.8 },
];

const CHANNEL_DATA = [
  { channel: "Organic", revenue: 48200, orders: 1840, aov: 26.2 },
  { channel: "Paid Search", revenue: 62400, orders: 2310, aov: 27.0 },
  { channel: "Social", revenue: 31700, orders: 1420, aov: 22.3 },
  { channel: "Email", revenue: 54900, orders: 2080, aov: 26.4 },
  { channel: "Referral", revenue: 19300, orders: 780, aov: 24.7 },
  { channel: "Direct", revenue: 38600, orders: 1560, aov: 24.7 },
];

const CATEGORIES = ["All", "Electronics", "Apparel", "Home & Garden", "Beauty", "Sports"] as const;
const REGIONS = ["All Regions", "North America", "Europe", "Asia Pacific", "Latin America"] as const;

type Category = (typeof CATEGORIES)[number];
type Region = (typeof REGIONS)[number];

// ─── Custom tooltip ──────────────────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string; unit?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
      {label && <p className="mb-2 text-xs font-semibold text-[var(--muted)]">{label}</p>}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[var(--muted)]">{entry.name}:</span>
          <span className="font-semibold text-[var(--foreground)]">
            {typeof entry.value === "number" && entry.value > 1000
              ? `$${entry.value.toLocaleString("en-US")}`
              : `${entry.value}${entry.unit ?? ""}`}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Date range picker ───────────────────────────────────────────────────────

function DateRangePicker({
  value,
  onChange,
}: {
  value: DateRangeOption;
  onChange: (v: DateRangeOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = dateRangeOptions.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5"
      >
        <Calendar className="h-4 w-4 text-[var(--accent)]" />
        {selected?.label}
        <ChevronDown className={cn("h-4 w-4 text-[var(--muted)] transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
        >
          {dateRangeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-[var(--accent)]/10",
                opt.value === value ? "text-[var(--accent)] font-semibold" : "text-[var(--foreground)]"
              )}
            >
              {opt.label}
              {opt.value === value && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Filters panel ───────────────────────────────────────────────────────────

function FiltersPanel({
  open,
  onClose,
  category,
  setCategory,
  region,
  setRegion,
}: {
  open: boolean;
  onClose: () => void;
  category: Category;
  setCategory: (c: Category) => void;
  region: Region;
  setRegion: (r: Region) => void;
}) {
  return (
    <motion.aside
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: open ? 0 : "100%", opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed right-0 top-0 z-50 h-full w-80 border-l border-[var(--border)] bg-[var(--surface)] shadow-[0_0_48px_rgba(0,0,0,0.32)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Advanced Filters</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
          aria-label="Close filters"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-8 overflow-y-auto p-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  category === cat
                    ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Region</p>
          <div className="space-y-2">
            {REGIONS.map((reg) => (
              <button
                key={reg}
                onClick={() => setRegion(reg)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all",
                  region === reg
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]/30"
                )}
              >
                {reg}
                {region === reg && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Metric View</p>
          <div className="space-y-2">
            {(["Revenue", "Orders", "AOV"] as const).map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)]/30">
                <span className="h-4 w-4 rounded border border-[var(--accent)] bg-[var(--accent)]/20 flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-[var(--accent)]" />
                </span>
                {m}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-semibold text-black transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </div>
    </motion.aside>
  );
}

// ─── Funnel stage card ───────────────────────────────────────────────────────

function FunnelStageCard({
  stage,
  value,
  fill,
  icon: Icon,
  prevValue,
  index,
}: {
  stage: string;
  value: number;
  fill: string;
  icon: React.ElementType;
  prevValue?: number;
  index: number;
}) {
  const convRate = prevValue ? ((value / prevValue) * 100).toFixed(1) : null;
  const dropOff = prevValue ? (((prevValue - value) / prevValue) * 100).toFixed(1) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
      className="relative flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl p-2.5" style={{ background: `${fill}22` }}>
            <Icon className="h-5 w-5" style={{ color: fill }} />
          </div>
          <span className="text-sm font-medium text-[var(--muted)]">{stage}</span>
        </div>
        {convRate && (
          <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-semibold text-[var(--foreground)]">
            {convRate}% conv.
          </span>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
        {value.toLocaleString("en-US")}
      </div>
      {dropOff && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <TrendingDown className="h-3.5 w-3.5 text-red-400" />
          <span className="text-red-400 font-medium">{dropOff}% drop-off</span>
          <span>from previous stage</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / FUNNEL_DATA[0].value) * 100}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.7, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: fill }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const t = useTranslations();
  const [dateRange, setDateRange] = useState<DateRangeOption>("last30");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All");
  const [region, setRegion] = useState<Region>("All Regions");
  const [channelMetric, setChannelMetric] = useState<"revenue" | "orders" | "aov">("revenue");

  const channelMetricLabel = useMemo(() => {
    if (channelMetric === "revenue") return "Revenue ($)";
    if (channelMetric === "orders") return "Orders";
    return "Avg. Order Value ($)";
  }, [channelMetric]);

  const channelColor = useMemo(() => {
    if (channelMetric === "revenue") return CHART_COLORS.series1;
    if (channelMetric === "orders") return CHART_COLORS.series2;
    return CHART_COLORS.series3;
  }, [channelMetric]);

  const activeFiltersCount = (category !== "All" ? 1 : 0) + (region !== "All Regions" ? 1 : 0);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Overlay when filters open */}
      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFiltersOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      <FiltersPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        category={category}
        setCategory={setCategory}
        region={region}
        setRegion={setRegion}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
                {t("analytics.title")}
              </h1>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {t("analytics.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
              <button
                onClick={() => setFiltersOpen(true)}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                  activeFiltersCount > 0
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]/40"
                )}
              >
                <Filter className="h-4 w-4" />
                {t("analytics.filters")}
                {activeFiltersCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-black">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── Active filter chips ── */}
        {activeFiltersCount > 0 && (
          <Reveal>
            <div className="mb-6 flex flex-wrap gap-2">
              {category !== "All" && (
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  Category: {category}
                  <button onClick={() => setCategory("All")} aria-label="Remove category filter">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {region !== "All Regions" && (
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  Region: {region}
                  <button onClick={() => setRegion("All Regions")} aria-label="Remove region filter">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </Reveal>
        )}

        {/* ── Orders Funnel ── */}
        <Reveal>
          <section className="mb-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  {t("analytics.funnel.title")}
                </h2>
                <p className="text-sm text-[var(--muted)]">{t("analytics.funnel.subtitle")}</p>
              </div>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                {dateRangeOptions.find((o) => o.value === dateRange)?.label}
              </span>
            </div>

            {/* Stage cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {FUNNEL_DATA.map((stage, i) => (
                <FunnelStageCard
                  key={stage.stage}
                  {...stage}
                  prevValue={i > 0 ? FUNNEL_DATA[i - 1].value : undefined}
                  index={i}
                />
              ))}
            </div>

            {/* Funnel visual */}
            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={FUNNEL_DATA.map((d) => ({ name: d.stage, value: d.value, fill: d.fill }))}
                  layout="vertical"
                  margin={{ top: 0, right: 24, left: 16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "var(--muted)", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)", opacity: 0.05 }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} name="Sessions">
                    {FUNNEL_DATA.map((entry) => (
                      <rect key={entry.stage} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </Reveal>

        {/* ── Conversion Rate chart ── */}
        <Reveal delay={0.05}>
          <section className="mb-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">
                    {t("analytics.conversion.title")}
                  </h2>
                  <p className="text-sm text-[var(--muted)]">{t("analytics.conversion.subtitle")}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: CHART_COLORS.series1 }} />
                    Conversion Rate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full opacity-40" style={{ background: CHART_COLORS.series1 }} />
                    Confidence Band
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-[var(--foreground)]">18.7%</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">+4.2%</span>
                    <span className="text-sm text-[var(--muted)]">vs. prior period</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-[var(--border)]" />
                <div>
                  <p className="text-sm text-[var(--muted)]">Avg. Rate</p>
                  <p className="text-xl font-bold text-[var(--foreground)]">15.3%</p>
                </div>
                <div className="h-12 w-px bg-[var(--border)]" />
                <div>
                  <p className="text-sm text-[var(--muted)]">Peak Rate</p>
                  <p className="text-xl font-bold text-[var(--foreground)]">19.4%</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={CONVERSION_DATA} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.series1} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={CHART_COLORS.series1} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.series1} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={CHART_COLORS.series1} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                    domain={[8, 22]}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHART_COLORS.series1, strokeWidth: 1, strokeDasharray: "4 4" }} />
                  <ReferenceLine y={15.3} stroke={CHART_COLORS.series3} strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "Avg", fill: "var(--muted)", fontSize: 10, position: "right" }} />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="none"
                    fill="url(#bandGrad)"
                    name="Upper Band"
                    legendType="none"
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stroke="none"
                    fill="var(--background)"
                    name="Lower Band"
                    legendType="none"
                  />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke={CHART_COLORS.series1}
                    strokeWidth={2.5}
                    fill="url(#convGrad)"
                    name="Conversion Rate"
                    dot={false}
                    activeDot={{ r: 5, fill: CHART_COLORS.series1, stroke: "var(--surface)", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </Reveal>

        {/* ── Channel Performance ── */}
        <Reveal delay={0.08}>
          <section className="mb-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">
                    {t("analytics.channel.title")}
                  </h2>
                  <p className="text-sm text-[var(--muted)]">{t("analytics.channel.subtitle")}</p>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--background)] p-1">
                  {(["revenue", "orders", "aov"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setChannelMetric(m)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all",
                        channelMetric === m
                          ? "bg-[var(--accent)] text-black shadow-sm"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {m === "aov" ? "AOV" : m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={CHANNEL_DATA}
                  margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                  barCategoryGap="28%"
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={channelColor} stopOpacity={1} />
                      <stop offset="100%" stopColor={channelColor} stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="channel"
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) =>
                      channelMetric === "revenue" || channelMetric === "aov"
                        ? `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`
                        : `${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`
                    }
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: channelColor, opacity: 0.06 }} />
                  <Bar
                    dataKey={channelMetric}
                    fill="url(#barGrad)"
                    radius={[6, 6, 0, 0]}
                    name={channelMetricLabel}
                    maxBarSize={56}
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Channel summary table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Channel</th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Revenue</th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Orders</th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">AOV</th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {CHANNEL_DATA.map((row) => {
                      const totalRevenue = CHANNEL_DATA.reduce((s, r) => s + r.revenue, 0);
                      const share = ((row.revenue / totalRevenue) * 100).toFixed(1);
                      return (
                        <tr key={row.channel} className="group transition-colors hover:bg-[var(--accent)]/5">
                          <td className="py-3 font-medium text-[var(--foreground)]">{row.channel}</td>
                          <td className="py-3 text-right text-[var(--foreground)]">
                            ${row.revenue.toLocaleString("en-US")}
                          </td>
                          <td className="py-3 text-right text-[var(--muted)]">
                            {row.orders.toLocaleString("en-US")}
                          </td>
                          <td className="py-3 text-right text-[var(--muted)]">${row.aov}</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--border)]">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${share}%`, background: CHART_COLORS.series1 }}
                                />
                              </div>
                              <span className="w-10 text-right text-[var(--muted)]">{share}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Insight callouts ── */}
        <Reveal delay={0.1}>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                color: CHART_COLORS.series2,
                label: t("analytics.insight.topChannel"),
                value: "Paid Search",
                sub: "$62,400 revenue this period",
              },
              {
                icon: ShoppingCart,
                color: CHART_COLORS.series3,
                label: t("analytics.insight.cartDropOff"),
                value: "62.7%",
                sub: "Browse to cart drop-off rate",
              },
              {
                icon: CreditCard,
                color: CHART_COLORS.series1,
                label: t("analytics.insight.bestConversion"),
                value: "Mar 12",
                sub: "Highest conversion day at 19.4%",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                <div className="rounded-xl p-2.5" style={{ background: `${item.color}22` }}>
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{item.label}</p>
                  <p className="mt-0.5 text-xl font-bold text-[var(--foreground)]">{item.value}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </section>
        </Reveal>
      </div>
    </div>
  );
}