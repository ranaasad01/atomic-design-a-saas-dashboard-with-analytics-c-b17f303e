"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Package, TrendingUp, TrendingDown, Star, ArrowUpDown, ChevronDown } from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  revenue: number;
  unitsSold: number;
  stock: number;
  rating: number;
  returnRate: number;
  trend: "up" | "down" | "flat";
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "AirPods Pro Max",
    category: "Electronics",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a5b712917e444c31943de58d44e7dd14.webp",
    revenue: 128400,
    unitsSold: 856,
    stock: 142,
    rating: 4.8,
    returnRate: 2.1,
    trend: "up",
  },
  {
    id: "p2",
    name: "Merino Wool Sweater",
    category: "Apparel",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e9664d2eab164b13967de8fd8fe9cb78.jpg",
    revenue: 94200,
    unitsSold: 1570,
    stock: 38,
    rating: 4.6,
    returnRate: 5.4,
    trend: "up",
  },
  {
    id: "p3",
    name: "Ergonomic Desk Chair",
    category: "Furniture",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/69ff721104a6426690287f5972c53c99.jpg",
    revenue: 87600,
    unitsSold: 292,
    stock: 0,
    rating: 4.7,
    returnRate: 3.2,
    trend: "flat",
  },
  {
    id: "p4",
    name: "Vitamin D3 + K2 Complex",
    category: "Health",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/68d4174767e64f02a0e9c3aa8699da77.jpg",
    revenue: 76800,
    unitsSold: 3840,
    stock: 512,
    rating: 4.5,
    returnRate: 1.8,
    trend: "up",
  },
  {
    id: "p5",
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d7ad1bfeb40546be9c043b58e8ed1867.jpg",
    revenue: 62100,
    unitsSold: 2070,
    stock: 204,
    rating: 4.4,
    returnRate: 4.1,
    trend: "down",
  },
  {
    id: "p6",
    name: "Mechanical Keyboard TKL",
    category: "Electronics",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/905e47fe90c647039fafa797b7c80c00.png",
    revenue: 58900,
    unitsSold: 589,
    stock: 77,
    rating: 4.9,
    returnRate: 1.5,
    trend: "up",
  },
  {
    id: "p7",
    name: "Yoga Mat Pro",
    category: "Fitness",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/444f48e4ea5a46a885d2d15aeda51b56.jpg",
    revenue: 44300,
    unitsSold: 1477,
    stock: 320,
    rating: 4.3,
    returnRate: 6.2,
    trend: "down",
  },
  {
    id: "p8",
    name: "Leather Bifold Wallet",
    category: "Apparel",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bc9ae8196518454a8b3060db8a011c98.png",
    revenue: 38700,
    unitsSold: 1290,
    stock: 15,
    rating: 4.6,
    returnRate: 2.9,
    trend: "flat",
  },
  {
    id: "p9",
    name: "Smart LED Desk Lamp",
    category: "Electronics",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/33a02d66dd0c4710ba13c69dfa14980f.jpg",
    revenue: 31200,
    unitsSold: 780,
    stock: 93,
    rating: 4.2,
    returnRate: 3.7,
    trend: "up",
  },
  {
    id: "p10",
    name: "Bamboo Cutting Board Set",
    category: "Kitchen",
    thumbnail: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fef4df5fee3d41a9bbc32564db3d9777.jpg",
    revenue: 27500,
    unitsSold: 917,
    stock: 0,
    rating: 4.5,
    returnRate: 2.3,
    trend: "down",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))] as const;

// Radar chart data for top 5 products
const radarDimensions = ["Revenue", "Units", "Rating", "Low Returns", "Stock Health"];

function normalise(value: number, min: number, max: number) {
  return Math.round(((value - min) / (max - min)) * 100);
}

const revenueVals = PRODUCTS.map((p) => p.revenue);
const unitsVals = PRODUCTS.map((p) => p.unitsSold);
const minRev = Math.min(...revenueVals);
const maxRev = Math.max(...revenueVals);
const minUnits = Math.min(...unitsVals);
const maxUnits = Math.max(...unitsVals);

const TOP_5 = PRODUCTS.slice(0, 5);

const radarData = radarDimensions.map((dim) => {
  const entry: Record<string, string | number> = { dimension: dim };
  TOP_5.forEach((p) => {
    let val = 0;
    if (dim === "Revenue") val = normalise(p.revenue, minRev, maxRev);
    else if (dim === "Units") val = normalise(p.unitsSold, minUnits, maxUnits);
    else if (dim === "Rating") val = Math.round((p.rating / 5) * 100);
    else if (dim === "Low Returns") val = Math.round(((10 - p.returnRate) / 10) * 100);
    else if (dim === "Stock Health") val = p.stock === 0 ? 0 : Math.min(100, Math.round((p.stock / 200) * 100));
    entry[p.name] = val;
  });
  return entry;
});

const RADAR_COLORS = [
  CHART_COLORS.series1,
  CHART_COLORS.series2,
  CHART_COLORS.series3,
  CHART_COLORS.series4,
  CHART_COLORS.series5,
];

type SortKey = "revenue" | "unitsSold" | "stock" | "rating" | "returnRate";
type SortDir = "asc" | "desc";

// ─── Sub-components ──────────────────────────────────────────────────────────

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-medium text-red-400 ring-1 ring-red-500/20">
        Out of Stock
      </span>
    );
  }
  if (stock < 50) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/20">
        Low · {stock}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
      In Stock · {stock}
    </span>
  );
}

function TrendIcon({ trend }: { trend: Product["trend"] }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-400" aria-hidden="true" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-400" aria-hidden="true" />;
  return <span className="h-4 w-4 text-white/30 text-xs flex items-center justify-center">—</span>;
}

function SortButton({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  direction: SortDir;
  onSort: (k: SortKey) => void;
}) {
  const active = currentKey === sortKey;
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={cn(
        "flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors",
        active ? "text-[var(--accent)]" : "text-white/40 hover:text-white/70"
      )}
      aria-label={`Sort by ${label}`}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
      {active && (
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", direction === "asc" && "rotate-180")}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "desc" ? bv - av : av - bv;
    });
    return list;
  }, [search, activeCategory, sortKey, sortDir]);

  const totalRevenue = useMemo(() => filtered.reduce((s, p) => s + p.revenue, 0), [filtered]);
  const totalUnits = useMemo(() => filtered.reduce((s, p) => s + p.unitsSold, 0), [filtered]);
  const outOfStock = useMemo(() => filtered.filter((p) => p.stock === 0).length, [filtered]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ── Header ── */}
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)] ring-1 ring-[var(--accent)]/20">
                  <Package className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("products.badge")}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                {t("products.heading")}
              </h1>
              <p className="mt-1.5 text-sm text-white/50">{t("products.subheading")}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>{filtered.length} {t("products.resultCount")}</span>
            </div>
          </div>
        </Reveal>

        {/* ── Summary stat strip ── */}
        <Reveal delay={0.05}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              {
                label: t("products.stats.totalRevenue"),
                value: `$${(totalRevenue / 1000).toFixed(1)}k`,
                color: "text-[var(--accent)]",
              },
              {
                label: t("products.stats.unitsSold"),
                value: totalUnits.toLocaleString("en-US"),
                color: "text-[var(--accent)]",
              },
              {
                label: t("products.stats.products"),
                value: filtered.length.toString(),
                color: "text-[var(--accent)]",
              },
              {
                label: t("products.stats.outOfStock"),
                value: outOfStock.toString(),
                color: outOfStock > 0 ? "text-red-400" : "text-emerald-400",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.18)]"
              >
                <div className={cn("text-2xl font-bold tabular-nums", s.color)}>{s.value}</div>
                <div className="mt-1 text-xs text-white/45">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ── Search + Category filters ── */}
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("products.searchPlaceholder")}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-200",
                    activeCategory === cat
                      ? "border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent)]"
                      : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Products Table ── */}
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.22)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-white/40">
                      {t("products.table.product")}
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-white/40">
                      {t("products.table.category")}
                    </th>
                    <th className="px-5 py-3.5 text-right">
                      <SortButton
                        label={t("products.table.revenue")}
                        sortKey="revenue"
                        currentKey={sortKey}
                        direction={sortDir}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-5 py-3.5 text-right">
                      <SortButton
                        label={t("products.table.units")}
                        sortKey="unitsSold"
                        currentKey={sortKey}
                        direction={sortDir}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-5 py-3.5 text-center">
                      {t("products.table.stock")}
                    </th>
                    <th className="px-5 py-3.5 text-right">
                      <SortButton
                        label={t("products.table.rating")}
                        sortKey="rating"
                        currentKey={sortKey}
                        direction={sortDir}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-white/40">
                      {t("products.table.trend")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-white/30">
                        {t("products.noResults")}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((product, idx) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
                        className="group border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.03]"
                      >
                        {/* Product */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.05]">
                              <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23ffffff08'/%3E%3C/svg%3E";
                                }}
                              />
                            </div>
                            <span className="font-medium text-white/90 group-hover:text-white transition-colors">
                              {product.name}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-white/55">
                            {product.category}
                          </span>
                        </td>

                        {/* Revenue */}
                        <td className="px-5 py-4 text-right font-semibold tabular-nums text-white/85">
                          ${product.revenue.toLocaleString("en-US")}
                        </td>

                        {/* Units */}
                        <td className="px-5 py-4 text-right tabular-nums text-white/65">
                          {product.unitsSold.toLocaleString("en-US")}
                        </td>

                        {/* Stock */}
                        <td className="px-5 py-4 text-center">
                          <StockBadge stock={product.stock} />
                        </td>

                        {/* Rating */}
                        <td className="px-5 py-4 text-right">
                          <span className="inline-flex items-center gap-1 text-white/75">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                            {product.rating.toFixed(1)}
                          </span>
                        </td>

                        {/* Trend */}
                        <td className="px-5 py-4">
                          <div className="flex justify-center">
                            <TrendIcon trend={product.trend} />
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* ── Radar Chart ── */}
        <Reveal delay={0.12}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.22)]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white/90">
                {t("products.radar.heading")}
              </h2>
              <p className="mt-1 text-sm text-white/40">{t("products.radar.subheading")}</p>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
                    tickCount={4}
                  />
                  {TOP_5.map((product, i) => (
                    <Radar
                      key={product.id}
                      name={product.name}
                      dataKey={product.name}
                      stroke={RADAR_COLORS[i]}
                      fill={RADAR_COLORS[i]}
                      fillOpacity={0.08}
                      strokeWidth={2}
                      dot={{ r: 3, fill: RADAR_COLORS[i] }}
                    />
                  ))}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,15,20,0.92)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "12px",
                      backdropFilter: "blur(12px)",
                    }}
                    formatter={(value: number) => [`${value}/100`, ""]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", paddingTop: "16px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend note */}
            <p className="mt-4 text-center text-xs text-white/25">
              {t("products.radar.note")}
            </p>
          </div>
        </Reveal>

      </div>
    </main>
  );
}