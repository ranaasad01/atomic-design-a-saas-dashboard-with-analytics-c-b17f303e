"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Package, ArrowUpRight, ArrowDownRight, MoreHorizontal, Eye, Star, Clock, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
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
  Legend,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { CHART_COLORS } from "@/lib/data";
type dateRangeOptions = any;
const dateRangeOptions: any = [];
type DateRangeOption = any;
const DateRangeOption: any = [];

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    key: "revenue",
    label: "Total Revenue",
    value: "$128,430",
    change: 12.4,
    isPositive: true,
    icon: DollarSign,
    color: CHART_COLORS.series1,
    sparkline: [40, 55, 48, 62, 70, 65, 80, 88, 75, 92, 85, 100],
  },
  {
    key: "orders",
    label: "Total Orders",
    value: "3,842",
    change: 8.1,
    isPositive: true,
    icon: ShoppingCart,
    color: CHART_COLORS.series2,
    sparkline: [30, 42, 38, 50, 55, 48, 60, 65, 58, 72, 68, 80],
  },
  {
    key: "customers",
    label: "New Customers",
    value: "1,209",
    change: -3.2,
    isPositive: false,
    icon: Users,
    color: CHART_COLORS.series3,
    sparkline: [60, 55, 50, 48, 52, 45, 42, 40, 44, 38, 36, 34],
  },
  {
    key: "aov",
    label: "Avg. Order Value",
    value: "$33.42",
    change: 5.7,
    isPositive: true,
    icon: Package,
    color: CHART_COLORS.series5,
    sparkline: [20, 25, 22, 28, 30, 27, 32, 35, 31, 38, 36, 40],
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, orders: 820, returns: 3200 },
  { month: "Feb", revenue: 38500, orders: 740, returns: 2800 },
  { month: "Mar", revenue: 55000, orders: 1050, returns: 4100 },
  { month: "Apr", revenue: 61000, orders: 1180, returns: 4600 },
  { month: "May", revenue: 58000, orders: 1100, returns: 4300 },
  { month: "Jun", revenue: 72000, orders: 1380, returns: 5400 },
  { month: "Jul", revenue: 68000, orders: 1290, returns: 5100 },
  { month: "Aug", revenue: 80000, orders: 1520, returns: 6000 },
  { month: "Sep", revenue: 75000, orders: 1430, returns: 5600 },
  { month: "Oct", revenue: 92000, orders: 1750, returns: 7000 },
  { month: "Nov", revenue: 110000, orders: 2100, returns: 8400 },
  { month: "Dec", revenue: 128430, orders: 2450, returns: 9700 },
];

const CATEGORY_DATA = [
  { name: "Electronics", value: 38, color: CHART_COLORS.series1 },
  { name: "Apparel", value: 24, color: CHART_COLORS.series2 },
  { name: "Home & Garden", value: 18, color: CHART_COLORS.series3 },
  { name: "Sports", value: 12, color: CHART_COLORS.series4 },
  { name: "Beauty", value: 8, color: CHART_COLORS.series5 },
];

const TOP_PRODUCTS = [
  {
    id: "p1",
    name: "Wireless Pro Headphones",
    sku: "WPH-2024",
    category: "Electronics",
    revenue: "$18,420",
    units: 342,
    rating: 4.8,
    trend: "up",
    stock: 128,
  },
  {
    id: "p2",
    name: "Merino Wool Sweater",
    sku: "MWS-0091",
    category: "Apparel",
    revenue: "$12,850",
    units: 514,
    rating: 4.6,
    trend: "up",
    stock: 74,
  },
  {
    id: "p3",
    name: "Smart Garden Kit",
    sku: "SGK-3310",
    category: "Home & Garden",
    revenue: "$9,640",
    units: 193,
    rating: 4.5,
    trend: "down",
    stock: 42,
  },
  {
    id: "p4",
    name: "Yoga Performance Mat",
    sku: "YPM-7720",
    category: "Sports",
    revenue: "$7,210",
    units: 288,
    rating: 4.7,
    trend: "up",
    stock: 215,
  },
  {
    id: "p5",
    name: "Vitamin C Serum",
    sku: "VCS-5501",
    category: "Beauty",
    revenue: "$5,980",
    units: 422,
    rating: 4.9,
    trend: "up",
    stock: 310,
  },
];

const RECENT_ORDERS = [
  {
    id: "#ORD-9821",
    customer: "Sarah Mitchell",
    product: "Wireless Pro Headphones",
    amount: "$149.00",
    status: "delivered",
    time: "2h ago",
    avatar: "SM",
  },
  {
    id: "#ORD-9820",
    customer: "James Thornton",
    product: "Merino Wool Sweater",
    amount: "$89.00",
    status: "processing",
    time: "3h ago",
    avatar: "JT",
  },
  {
    id: "#ORD-9819",
    customer: "Priya Kapoor",
    product: "Smart Garden Kit",
    amount: "$210.00",
    status: "shipped",
    time: "5h ago",
    avatar: "PK",
  },
  {
    id: "#ORD-9818",
    customer: "Lucas Fernandez",
    product: "Yoga Performance Mat",
    amount: "$65.00",
    status: "delivered",
    time: "7h ago",
    avatar: "LF",
  },
  {
    id: "#ORD-9817",
    customer: "Emma Johansson",
    product: "Vitamin C Serum",
    amount: "$42.00",
    status: "cancelled",
    time: "9h ago",
    avatar: "EJ",
  },
  {
    id: "#ORD-9816",
    customer: "Noah Williams",
    product: "Wireless Pro Headphones",
    amount: "$149.00",
    status: "processing",
    time: "11h ago",
    avatar: "NW",
  },
];

const TRAFFIC_DATA = [
  { day: "Mon", organic: 1200, paid: 800, social: 400 },
  { day: "Tue", organic: 1400, paid: 950, social: 520 },
  { day: "Wed", organic: 1100, paid: 700, social: 380 },
  { day: "Thu", organic: 1600, paid: 1100, social: 620 },
  { day: "Fri", organic: 1800, paid: 1300, social: 750 },
  { day: "Sat", organic: 2100, paid: 1500, social: 900 },
  { day: "Sun", organic: 1700, paid: 1200, social: 680 },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
    delivered: {
      label: "Delivered",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    processing: {
      label: "Processing",
      className: "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20",
      icon: <Clock className="h-3 w-3" />,
    },
    shipped: {
      label: "Shipped",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      icon: <Package className="h-3 w-3" />,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: <AlertCircle className="h-3 w-3" />,
    },
  };
  const c = config[status] ?? config["processing"];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${c.className}`}>
      {c.icon}
      {c.label}
    </span>
  );
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xl">
      <p className="mb-2 text-xs font-semibold text-[var(--foreground)]/60">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[var(--foreground)]/70">{entry.name}:</span>
          <span className="font-semibold text-[var(--foreground)]">
            {typeof entry.value === "number" && entry.name.toLowerCase().includes("revenue")
              ? `$${entry.value.toLocaleString("en-US")}`
              : entry.value.toLocaleString("en-US")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const t = useTranslations();
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>("last30");
  const [rangeOpen, setRangeOpen] = useState(false);

  const selectedLabel = useMemo(
    () => dateRangeOptions.find((o) => o.value === selectedRange)?.label ?? "Last 30 Days",
    [selectedRange]
  );

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] space-y-8">

        {/* ── Page Header ── */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                {t("dashboardOverview.heading")}
              </h1>
              <p className="mt-1 text-sm text-[var(--foreground)]/50">
                {t("dashboardOverview.subheading")}
              </p>
            </div>

            {/* Date Range Picker */}
            <div className="relative">
              <button
                onClick={() => setRangeOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-200 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5"
              >
                <Clock className="h-4 w-4 text-[var(--foreground)]/50" />
                {selectedLabel}
                <ChevronDown className={`h-4 w-4 text-[var(--foreground)]/50 transition-transform ${rangeOpen ? "rotate-180" : ""}`} />
              </button>
              {rangeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
                >
                  {dateRangeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSelectedRange(opt.value); setRangeOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--accent)]/10 ${
                        selectedRange === opt.value
                          ? "bg-[var(--accent)]/10 font-semibold text-[var(--accent)]"
                          : "text-[var(--foreground)]/70"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {KPI_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                variants={scaleIn}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_4px_32px_-8px_rgba(108,71,255,0.15)]"
              >
                {/* Subtle glow */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                  style={{ background: card.color }}
                />
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${card.color}18` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: card.color }} />
                  </div>
                  <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    card.isPositive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {card.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(card.change)}%
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                    {card.value}
                  </div>
                  <div className="mt-0.5 text-sm text-[var(--foreground)]/50">{card.label}</div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-xs text-[var(--foreground)]/40">vs last period</span>
                  <Sparkline data={card.sparkline} color={card.color} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Chart + Category Pie ── */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Revenue Area Chart */}
          <Reveal className="xl:col-span-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[var(--foreground)]">
                    {t("dashboardOverview.revenueChart.title")}
                  </h2>
                  <p className="mt-0.5 text-xs text-[var(--foreground)]/50">
                    {t("dashboardOverview.revenueChart.subtitle")}
                  </p>
                </div>
                <button className="rounded-lg p-1.5 text-[var(--foreground)]/40 transition-colors hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]/70">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.series1} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={CHART_COLORS.series1} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.series2} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={CHART_COLORS.series2} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.series1} strokeWidth={2} fill="url(#gradRevenue)" dot={false} activeDot={{ r: 4, fill: CHART_COLORS.series1 }} />
                  <Area type="monotone" dataKey="returns" name="Returns" stroke={CHART_COLORS.series4} strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 3" activeDot={{ r: 3, fill: CHART_COLORS.series4 }} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/50">
                  <span className="h-2 w-4 rounded-full" style={{ background: CHART_COLORS.series1 }} />
                  Revenue
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/50">
                  <span className="h-0.5 w-4 rounded-full border-t-2 border-dashed" style={{ borderColor: CHART_COLORS.series4 }} />
                  Returns
                </div>
              </div>
            </div>
          </Reveal>

          {/* Category Pie */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[var(--foreground)]">
                    {t("dashboardOverview.categoryChart.title")}
                  </h2>
                  <p className="mt-0.5 text-xs text-[var(--foreground)]/50">
                    {t("dashboardOverview.categoryChart.subtitle")}
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-2">
                {CATEGORY_DATA.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} />
                      <span className="text-[var(--foreground)]/60">{cat.name}</span>
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Traffic Bar Chart + Recent Orders ── */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          {/* Traffic Sources */}
          <Reveal className="xl:col-span-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-[var(--foreground)]">
                  {t("dashboardOverview.trafficChart.title")}
                </h2>
                <p className="mt-0.5 text-xs text-[var(--foreground)]/50">
                  {t("dashboardOverview.trafficChart.subtitle")}
                </p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={TRAFFIC_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={8} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="organic" name="Organic" fill={CHART_COLORS.series1} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paid" name="Paid" fill={CHART_COLORS.series2} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="social" name="Social" fill={CHART_COLORS.series3} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center gap-4">
                {[
                  { label: "Organic", color: CHART_COLORS.series1 },
                  { label: "Paid", color: CHART_COLORS.series2 },
                  { label: "Social", color: CHART_COLORS.series3 },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5 text-xs text-[var(--foreground)]/50">
                    <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Recent Orders */}
          <Reveal delay={0.08} className="xl:col-span-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
                <div>
                  <h2 className="text-base font-semibold text-[var(--foreground)]">
                    {t("dashboardOverview.recentOrders.title")}
                  </h2>
                  <p className="mt-0.5 text-xs text-[var(--foreground)]/50">
                    {t("dashboardOverview.recentOrders.subtitle")}
                  </p>
                </div>
                <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10">
                  <Eye className="h-3.5 w-3.5" />
                  {t("dashboardOverview.recentOrders.viewAll")}
                </button>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-[var(--foreground)]/[0.02]">
                    {/* Avatar */}
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-bold text-[var(--accent)]">
                      {order.avatar}
                    </div>
                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--foreground)]">{order.customer}</span>
                        <span className="text-xs text-[var(--foreground)]/40">{order.id}</span>
                      </div>
                      <div className="mt-0.5 truncate text-xs text-[var(--foreground)]/50">{order.product}</div>
                    </div>
                    {/* Amount */}
                    <div className="hidden text-right sm:block">
                      <div className="text-sm font-semibold text-[var(--foreground)]">{order.amount}</div>
                      <div className="mt-0.5 text-xs text-[var(--foreground)]/40">{order.time}</div>
                    </div>
                    {/* Status */}
                    <div className="flex-shrink-0">
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Top Products Table ── */}
        <Reveal>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">
                  {t("dashboardOverview.topProducts.title")}
                </h2>
                <p className="mt-0.5 text-xs text-[var(--foreground)]/50">
                  {t("dashboardOverview.topProducts.subtitle")}
                </p>
              </div>
              <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                {t("dashboardOverview.topProducts.badge")}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    {[
                      t("dashboardOverview.topProducts.col.product"),
                      t("dashboardOverview.topProducts.col.category"),
                      t("dashboardOverview.topProducts.col.revenue"),
                      t("dashboardOverview.topProducts.col.units"),
                      t("dashboardOverview.topProducts.col.rating"),
                      t("dashboardOverview.topProducts.col.stock"),
                      t("dashboardOverview.topProducts.col.trend"),
                    ].map((col) => (
                      <th key={col} className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/40">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {TOP_PRODUCTS.map((product, i) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="group transition-colors hover:bg-[var(--foreground)]/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-[var(--foreground)]">{product.name}</div>
                        <div className="mt-0.5 text-xs text-[var(--foreground)]/40">{product.sku}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[var(--foreground)]/5 px-2.5 py-1 text-xs text-[var(--foreground)]/60">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-[var(--foreground)]">{product.revenue}</td>
                      <td className="px-6 py-4 text-[var(--foreground)]/70">{product.units.toLocaleString("en-US")}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-[var(--foreground)]">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--foreground)]/10">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min((product.stock / 350) * 100, 100)}%`,
                                background: product.stock < 60 ? CHART_COLORS.series4 : CHART_COLORS.series2,
                              }}
                            />
                          </div>
                          <span className="text-xs text-[var(--foreground)]/50">{product.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {product.trend === "up" ? (
                          <div className="flex items-center gap-1 text-emerald-400">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs font-medium">Up</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-400">
                            <TrendingDown className="h-4 w-4" />
                            <span className="text-xs font-medium">Down</span>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}