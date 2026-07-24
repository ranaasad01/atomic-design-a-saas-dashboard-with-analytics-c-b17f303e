"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Users, TrendingUp, Star, ArrowUpDown, ChevronDown, Mail, Calendar, DollarSign, Filter } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

type Segment = "All" | "New" | "Returning" | "VIP";

interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  acquiredDate: string;
  segment: "New" | "Returning" | "VIP";
  ltv: number;
  orders: number;
  location: string;
}

const CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Sophia Hartmann",
    email: "sophia.hartmann@email.com",
    avatar: "",
    initials: "SH",
    acquiredDate: "2024-11-03",
    segment: "VIP",
    ltv: 4820.5,
    orders: 34,
    location: "Berlin, DE",
  },
  {
    id: "c2",
    name: "Marcus Chen",
    email: "marcus.chen@email.com",
    avatar: "",
    initials: "MC",
    acquiredDate: "2025-01-15",
    segment: "New",
    ltv: 129.0,
    orders: 1,
    location: "San Francisco, US",
  },
  {
    id: "c3",
    name: "Priya Nair",
    email: "priya.nair@email.com",
    avatar: "",
    initials: "PN",
    acquiredDate: "2024-06-22",
    segment: "Returning",
    ltv: 1340.75,
    orders: 12,
    location: "Mumbai, IN",
  },
  {
    id: "c4",
    name: "James Okafor",
    email: "james.okafor@email.com",
    avatar: "",
    initials: "JO",
    acquiredDate: "2024-03-10",
    segment: "VIP",
    ltv: 7210.0,
    orders: 58,
    location: "Lagos, NG",
  },
  {
    id: "c5",
    name: "Elena Vasquez",
    email: "elena.vasquez@email.com",
    avatar: "",
    initials: "EV",
    acquiredDate: "2025-02-01",
    segment: "New",
    ltv: 89.99,
    orders: 1,
    location: "Madrid, ES",
  },
  {
    id: "c6",
    name: "Liam Fitzgerald",
    email: "liam.fitz@email.com",
    avatar: "",
    initials: "LF",
    acquiredDate: "2024-08-14",
    segment: "Returning",
    ltv: 2105.4,
    orders: 19,
    location: "Dublin, IE",
  },
  {
    id: "c7",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@email.com",
    avatar: "",
    initials: "YT",
    acquiredDate: "2023-12-05",
    segment: "VIP",
    ltv: 9540.0,
    orders: 72,
    location: "Tokyo, JP",
  },
  {
    id: "c8",
    name: "Amara Diallo",
    email: "amara.diallo@email.com",
    avatar: "",
    initials: "AD",
    acquiredDate: "2025-01-28",
    segment: "New",
    ltv: 210.0,
    orders: 2,
    location: "Dakar, SN",
  },
  {
    id: "c9",
    name: "Noah Bergmann",
    email: "noah.bergmann@email.com",
    avatar: "",
    initials: "NB",
    acquiredDate: "2024-05-17",
    segment: "Returning",
    ltv: 875.25,
    orders: 8,
    location: "Vienna, AT",
  },
  {
    id: "c10",
    name: "Isabella Rossi",
    email: "isabella.rossi@email.com",
    avatar: "",
    initials: "IR",
    acquiredDate: "2024-09-30",
    segment: "Returning",
    ltv: 1620.0,
    orders: 15,
    location: "Rome, IT",
  },
  {
    id: "c11",
    name: "Carlos Mendez",
    email: "carlos.mendez@email.com",
    avatar: "",
    initials: "CM",
    acquiredDate: "2025-03-02",
    segment: "New",
    ltv: 55.0,
    orders: 1,
    location: "Mexico City, MX",
  },
  {
    id: "c12",
    name: "Fatima Al-Rashid",
    email: "fatima.alrashid@email.com",
    avatar: "",
    initials: "FA",
    acquiredDate: "2023-10-11",
    segment: "VIP",
    ltv: 12340.0,
    orders: 94,
    location: "Dubai, AE",
  },
];

const ACQUISITION_DATA = [
  { month: "Aug", newCustomers: 320, returning: 180 },
  { month: "Sep", newCustomers: 410, returning: 220 },
  { month: "Oct", newCustomers: 380, returning: 260 },
  { month: "Nov", newCustomers: 520, returning: 310 },
  { month: "Dec", newCustomers: 640, returning: 390 },
  { month: "Jan", newCustomers: 480, returning: 420 },
  { month: "Feb", newCustomers: 560, returning: 450 },
  { month: "Mar", newCustomers: 610, returning: 490 },
];

const SUMMARY_STATS = [
  { value: "12,847", label: "Total Customers", icon: "users", delta: "+8.4%" },
  { value: "3,210", label: "New This Month", icon: "trending", delta: "+12.1%" },
  { value: "847", label: "VIP Members", icon: "star", delta: "+3.2%" },
  { value: "$2,340", label: "Avg. Lifetime Value", icon: "dollar", delta: "+5.7%" },
];

const SEGMENTS: Segment[] = ["All", "New", "Returning", "VIP"];

const SEGMENT_CONFIG: Record<string, { label: string; classes: string }> = {
  New: {
    label: "New",
    classes:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  Returning: {
    label: "Returning",
    classes: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  VIP: {
    label: "VIP",
    classes:
      "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",
  },
};

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getAvatarColor(id: string): string {
  const index = parseInt(id.replace("c", ""), 10) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
      <p className="mb-2 text-xs font-semibold text-[var(--foreground)]/60">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-[var(--foreground)]/70">{entry.name}:</span>
          <span className="font-semibold text-[var(--foreground)]">
            {entry.value.toLocaleString("en-US")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomersPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [activeSegment, setActiveSegment] = useState<Segment>("All");
  const [sortField, setSortField] = useState<keyof Customer>("ltv");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let list = CUSTOMERS;
    if (activeSegment !== "All") {
      list = list.filter((c) => c.segment === activeSegment);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return list;
  }, [search, activeSegment, sortField, sortDir]);

  function handleSort(field: keyof Customer) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function SortIcon({ field }: { field: keyof Customer }) {
    if (sortField !== field)
      return <ArrowUpDown className="h-3.5 w-3.5 opacity-30" />;
    return (
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 text-[var(--accent)] transition-transform",
          sortDir === "asc" && "rotate-180"
        )}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Header ── */}
        <Reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("customers.eyebrow")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                {t("customers.heading")}
              </h1>
              <p className="mt-1.5 text-sm text-[var(--foreground)]/50">
                {t("customers.subheading")}
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_20px_-4px_var(--accent)] transition-all duration-300 hover:brightness-110 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
              <Users className="h-4 w-4" aria-hidden="true" />
              {t("customers.exportBtn")}
            </button>
          </div>
        </Reveal>

        {/* ── Summary Stats ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {SUMMARY_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_0_24px_-6px_var(--accent)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-lg bg-[var(--accent)]/10 p-2">
                  {stat.icon === "users" && (
                    <Users className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  )}
                  {stat.icon === "trending" && (
                    <TrendingUp className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  )}
                  {stat.icon === "star" && (
                    <Star className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  )}
                  {stat.icon === "dollar" && (
                    <DollarSign className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  )}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                  {stat.delta}
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-[var(--foreground)]/50">
                {stat.label}
              </p>
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Acquisition Chart ── */}
        <Reveal>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">
                  {t("customers.chartTitle")}
                </h2>
                <p className="text-xs text-[var(--foreground)]/50">
                  {t("customers.chartSubtitle")}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs text-[var(--foreground)]/60">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {t("customers.chartRange")}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={ACQUISITION_DATA}
                margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS.series1}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS.series1}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="gradReturning" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS.series2}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS.series2}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
                  formatter={(value) => (
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>
                      {value}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="newCustomers"
                  name="New Customers"
                  stroke={CHART_COLORS.series1}
                  strokeWidth={2}
                  fill="url(#gradNew)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="returning"
                  name="Returning Customers"
                  stroke={CHART_COLORS.series2}
                  strokeWidth={2}
                  fill="url(#gradReturning)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        {/* ── Filters & Search ── */}
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Segment Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter className="h-4 w-4 shrink-0 text-[var(--foreground)]/40" aria-hidden="true" />
              {SEGMENTS.map((seg) => (
                <button
                  key={seg}
                  onClick={() => setActiveSegment(seg)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    activeSegment === seg
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-[var(--border)] bg-transparent text-[var(--foreground)]/60 hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
                  )}
                >
                  {seg}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground)]/40"
                aria-hidden="true"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("customers.searchPlaceholder")}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-9 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 focus:border-[var(--accent)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
              />
            </div>
          </div>
        </Reveal>

        {/* ── Customers Table ── */}
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
            {/* Table header */}
            <div className="border-b border-[var(--border)] px-6 py-4">
              <p className="text-sm text-[var(--foreground)]/50">
                {t("customers.tableCount", { count: filtered.length })}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    {[
                      { label: t("customers.colCustomer"), field: "name" as keyof Customer },
                      { label: t("customers.colEmail"), field: "email" as keyof Customer },
                      { label: t("customers.colAcquired"), field: "acquiredDate" as keyof Customer },
                      { label: t("customers.colSegment"), field: "segment" as keyof Customer },
                      { label: t("customers.colOrders"), field: "orders" as keyof Customer },
                      { label: t("customers.colLTV"), field: "ltv" as keyof Customer },
                    ].map((col) => (
                      <th
                        key={col.field}
                        className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/40"
                      >
                        <button
                          onClick={() => handleSort(col.field)}
                          className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)]/80 transition-colors"
                        >
                          {col.label}
                          <SortIcon field={col.field} />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-16 text-center text-sm text-[var(--foreground)]/40"
                      >
                        {t("customers.emptyState")}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((customer, i) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="group border-b border-[var(--border)]/60 transition-colors hover:bg-[var(--accent)]/5 last:border-0"
                      >
                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                                getAvatarColor(customer.id)
                              )}
                              aria-hidden="true"
                            >
                              {customer.initials}
                            </div>
                            <div>
                              <p className="font-medium text-[var(--foreground)]">
                                {customer.name}
                              </p>
                              <p className="text-xs text-[var(--foreground)]/40">
                                {customer.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* Email */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-[var(--foreground)]/60">
                            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span className="truncate max-w-[180px]">
                              {customer.email}
                            </span>
                          </div>
                        </td>
                        {/* Acquired */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-[var(--foreground)]/60">
                            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            {new Date(customer.acquiredDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </td>
                        {/* Segment */}
                        <td className="px-5 py-4">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                              SEGMENT_CONFIG[customer.segment]?.classes
                            )}
                          >
                            {customer.segment === "VIP" && (
                              <Star className="mr-1 h-3 w-3" aria-hidden="true" />
                            )}
                            {customer.segment}
                          </span>
                        </td>
                        {/* Orders */}
                        <td className="px-5 py-4 text-[var(--foreground)]/80">
                          {customer.orders}
                        </td>
                        {/* LTV */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-[var(--foreground)]">
                            ${customer.ltv.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-3">
              <p className="text-xs text-[var(--foreground)]/40">
                {t("customers.tableFooter", { shown: filtered.length, total: CUSTOMERS.length })}
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={cn(
                      "h-7 w-7 rounded-lg text-xs font-medium transition-colors",
                      page === 1
                        ? "bg-[var(--accent)] text-black"
                        : "text-[var(--foreground)]/50 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}