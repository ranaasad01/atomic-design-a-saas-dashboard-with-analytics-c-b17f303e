"use client";

import { useState, useMemo, useCallback, Fragment } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp, X, Eye, Download, RefreshCw, Package, Truck, CheckCircle, XCircle, Clock, AlertCircle, ArrowUpDown, ChevronLeft, ChevronRight, Calendar, User, MapPin, CreditCard, FileText } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
type dateRangeOptions = any;
const dateRangeOptions: any = [];
type DateRangeOption = any;
const DateRangeOption: any = [];

// ─── Types ───────────────────────────────────────────────────────────────────

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
type SortField = "id" | "customer" | "date" | "status" | "amount";
type SortDir = "asc" | "desc";

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  qty: number;
  unitPrice: number;
}

interface TimelineEvent {
  status: string;
  label: string;
  timestamp: string;
  done: boolean;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  amount: number;
  items: OrderItem[];
  shipping: string;
  payment: string;
  timeline: TimelineEvent[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "ORD-10042",
    customer: "Sophia Chen",
    email: "sophia.chen@email.com",
    date: "2024-06-12",
    status: "delivered",
    amount: 349.99,
    shipping: "123 Maple St, San Francisco, CA 94102",
    payment: "Visa •••• 4242",
    items: [
      { id: "i1", name: "Wireless Noise-Cancelling Headphones", sku: "WNC-H200", qty: 1, unitPrice: 249.99 },
      { id: "i2", name: "USB-C Charging Cable 2m", sku: "USB-C2M", qty: 2, unitPrice: 24.99 },
      { id: "i3", name: "Carrying Case", sku: "CC-PRO", qty: 1, unitPrice: 49.99 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 12, 2024 · 09:14 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 12, 2024 · 09:16 AM", done: true },
      { status: "shipped", label: "Shipped via FedEx", timestamp: "Jun 13, 2024 · 02:30 PM", done: true },
      { status: "delivered", label: "Delivered", timestamp: "Jun 15, 2024 · 11:05 AM", done: true },
    ],
  },
  {
    id: "ORD-10041",
    customer: "Marcus Webb",
    email: "m.webb@company.io",
    date: "2024-06-12",
    status: "shipped",
    amount: 129.00,
    shipping: "88 Ocean Ave, Miami, FL 33139",
    payment: "Mastercard •••• 8810",
    items: [
      { id: "i4", name: "Mechanical Keyboard TKL", sku: "MK-TKL-BLU", qty: 1, unitPrice: 129.00 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 12, 2024 · 07:55 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 12, 2024 · 07:57 AM", done: true },
      { status: "shipped", label: "Shipped via UPS", timestamp: "Jun 13, 2024 · 10:00 AM", done: true },
      { status: "delivered", label: "Delivered", timestamp: "", done: false },
    ],
  },
  {
    id: "ORD-10040",
    customer: "Priya Nair",
    email: "priya.nair@studio.co",
    date: "2024-06-11",
    status: "processing",
    amount: 874.50,
    shipping: "45 Park Blvd, Austin, TX 78701",
    payment: "Amex •••• 3721",
    items: [
      { id: "i5", name: "4K Webcam Pro", sku: "WC-4K-PRO", qty: 1, unitPrice: 199.50 },
      { id: "i6", name: "LED Ring Light 18\"", sku: "RL-18-WHT", qty: 1, unitPrice: 89.00 },
      { id: "i7", name: "Adjustable Monitor Arm", sku: "MA-DUAL-BLK", qty: 2, unitPrice: 293.00 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 11, 2024 · 03:22 PM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 11, 2024 · 03:25 PM", done: true },
      { status: "shipped", label: "Shipped", timestamp: "", done: false },
      { status: "delivered", label: "Delivered", timestamp: "", done: false },
    ],
  },
  {
    id: "ORD-10039",
    customer: "James Okafor",
    email: "james.o@freelance.net",
    date: "2024-06-11",
    status: "pending",
    amount: 59.99,
    shipping: "7 Elm Court, Chicago, IL 60601",
    payment: "PayPal",
    items: [
      { id: "i8", name: "Ergonomic Mouse Pad XL", sku: "MP-XL-GRY", qty: 1, unitPrice: 59.99 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 11, 2024 · 11:48 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "", done: false },
      { status: "shipped", label: "Shipped", timestamp: "", done: false },
      { status: "delivered", label: "Delivered", timestamp: "", done: false },
    ],
  },
  {
    id: "ORD-10038",
    customer: "Elena Vasquez",
    email: "elena.v@design.agency",
    date: "2024-06-10",
    status: "cancelled",
    amount: 215.00,
    shipping: "22 Sunset Dr, Los Angeles, CA 90028",
    payment: "Visa •••• 1199",
    items: [
      { id: "i9", name: "Drawing Tablet Medium", sku: "DT-MED-BLK", qty: 1, unitPrice: 215.00 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 10, 2024 · 02:10 PM", done: true },
      { status: "cancelled", label: "Cancelled by Customer", timestamp: "Jun 10, 2024 · 04:45 PM", done: true },
    ],
  },
  {
    id: "ORD-10037",
    customer: "Tom Harrington",
    email: "tom.h@startup.com",
    date: "2024-06-10",
    status: "refunded",
    amount: 499.00,
    shipping: "9 Innovation Way, Seattle, WA 98101",
    payment: "Mastercard •••• 5566",
    items: [
      { id: "i10", name: "Portable SSD 2TB", sku: "SSD-2TB-SLV", qty: 1, unitPrice: 499.00 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 10, 2024 · 09:00 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 10, 2024 · 09:02 AM", done: true },
      { status: "shipped", label: "Shipped via DHL", timestamp: "Jun 11, 2024 · 08:00 AM", done: true },
      { status: "refunded", label: "Refund Issued", timestamp: "Jun 13, 2024 · 01:30 PM", done: true },
    ],
  },
  {
    id: "ORD-10036",
    customer: "Aisha Patel",
    email: "aisha.p@ecom.store",
    date: "2024-06-09",
    status: "delivered",
    amount: 1249.95,
    shipping: "55 Commerce St, New York, NY 10013",
    payment: "Amex •••• 9900",
    items: [
      { id: "i11", name: "Ultrawide Monitor 34\"", sku: "MON-34-UW", qty: 1, unitPrice: 899.95 },
      { id: "i12", name: "HDMI 2.1 Cable 3m", sku: "HDMI-3M", qty: 2, unitPrice: 29.99 },
      { id: "i13", name: "Monitor Cleaning Kit", sku: "CLN-KIT", qty: 1, unitPrice: 19.99 },
      { id: "i14", name: "Cable Management Box", sku: "CMB-WHT", qty: 1, unitPrice: 39.99 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 9, 2024 · 10:30 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 9, 2024 · 10:33 AM", done: true },
      { status: "shipped", label: "Shipped via FedEx Freight", timestamp: "Jun 10, 2024 · 03:00 PM", done: true },
      { status: "delivered", label: "Delivered", timestamp: "Jun 12, 2024 · 02:15 PM", done: true },
    ],
  },
  {
    id: "ORD-10035",
    customer: "Luca Moretti",
    email: "luca.m@photo.studio",
    date: "2024-06-09",
    status: "shipped",
    amount: 389.00,
    shipping: "14 Via Roma, Boston, MA 02101",
    payment: "Visa •••• 7733",
    items: [
      { id: "i15", name: "Camera Tripod Carbon Fiber", sku: "TRP-CF-PRO", qty: 1, unitPrice: 389.00 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 9, 2024 · 08:15 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 9, 2024 · 08:18 AM", done: true },
      { status: "shipped", label: "Shipped via USPS Priority", timestamp: "Jun 10, 2024 · 11:45 AM", done: true },
      { status: "delivered", label: "Delivered", timestamp: "", done: false },
    ],
  },
  {
    id: "ORD-10034",
    customer: "Zoe Kim",
    email: "zoe.kim@brand.co",
    date: "2024-06-08",
    status: "delivered",
    amount: 74.97,
    shipping: "301 Brand Ave, Portland, OR 97201",
    payment: "PayPal",
    items: [
      { id: "i16", name: "Notebook Set (3-pack)", sku: "NB-3PK-BLK", qty: 1, unitPrice: 34.99 },
      { id: "i17", name: "Gel Pen Set 12-pack", sku: "GP-12-AST", qty: 1, unitPrice: 19.99 },
      { id: "i18", name: "Desk Organizer", sku: "DO-BLK-SM", qty: 1, unitPrice: 19.99 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 8, 2024 · 04:00 PM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 8, 2024 · 04:02 PM", done: true },
      { status: "shipped", label: "Shipped via USPS", timestamp: "Jun 9, 2024 · 09:30 AM", done: true },
      { status: "delivered", label: "Delivered", timestamp: "Jun 11, 2024 · 12:00 PM", done: true },
    ],
  },
  {
    id: "ORD-10033",
    customer: "Ryan Osei",
    email: "ryan.osei@techco.io",
    date: "2024-06-08",
    status: "processing",
    amount: 2199.00,
    shipping: "88 Tech Park, Denver, CO 80202",
    payment: "Corporate Card •••• 0011",
    items: [
      { id: "i19", name: "Standing Desk Electric 72\"", sku: "SD-72-WHT", qty: 1, unitPrice: 1299.00 },
      { id: "i20", name: "Ergonomic Chair Pro", sku: "EC-PRO-BLK", qty: 1, unitPrice: 899.00 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 8, 2024 · 01:15 PM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 8, 2024 · 01:20 PM", done: true },
      { status: "shipped", label: "Shipped", timestamp: "", done: false },
      { status: "delivered", label: "Delivered", timestamp: "", done: false },
    ],
  },
  {
    id: "ORD-10032",
    customer: "Nina Larsson",
    email: "nina.l@nordic.design",
    date: "2024-06-07",
    status: "delivered",
    amount: 159.90,
    shipping: "5 Nordic Way, Minneapolis, MN 55401",
    payment: "Visa •••• 2288",
    items: [
      { id: "i21", name: "Minimalist Desk Lamp", sku: "DL-MIN-WHT", qty: 1, unitPrice: 89.90 },
      { id: "i22", name: "Wireless Charger Pad", sku: "WC-PAD-BLK", qty: 1, unitPrice: 39.99 },
      { id: "i23", name: "Cable Clips 10-pack", sku: "CC-10PK", qty: 1, unitPrice: 9.99 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 7, 2024 · 11:00 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "Jun 7, 2024 · 11:03 AM", done: true },
      { status: "shipped", label: "Shipped via UPS", timestamp: "Jun 8, 2024 · 02:00 PM", done: true },
      { status: "delivered", label: "Delivered", timestamp: "Jun 10, 2024 · 10:30 AM", done: true },
    ],
  },
  {
    id: "ORD-10031",
    customer: "Carlos Mendez",
    email: "carlos.m@retail.mx",
    date: "2024-06-07",
    status: "pending",
    amount: 44.99,
    shipping: "12 Market St, Phoenix, AZ 85001",
    payment: "Mastercard •••• 3344",
    items: [
      { id: "i24", name: "Screen Cleaning Kit Pro", sku: "SCK-PRO", qty: 1, unitPrice: 24.99 },
      { id: "i25", name: "Microfiber Cloth 5-pack", sku: "MFC-5PK", qty: 1, unitPrice: 19.99 },
    ],
    timeline: [
      { status: "placed", label: "Order Placed", timestamp: "Jun 7, 2024 · 09:45 AM", done: true },
      { status: "processing", label: "Payment Confirmed", timestamp: "", done: false },
      { status: "shipped", label: "Shipped", timestamp: "", done: false },
      { status: "delivered", label: "Delivered", timestamp: "", done: false },
    ],
  },
];

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ReactNode; className: string }> = {
  pending: {
    label: "Pending",
    icon: <Clock className="h-3 w-3" />,
    className: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  },
  processing: {
    label: "Processing",
    icon: <RefreshCw className="h-3 w-3" />,
    className: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  shipped: {
    label: "Shipped",
    icon: <Truck className="h-3 w-3" />,
    className: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  },
  delivered: {
    label: "Delivered",
    icon: <CheckCircle className="h-3 w-3" />,
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle className="h-3 w-3" />,
    className: "bg-red-500/15 text-red-400 border-red-500/25",
  },
  refunded: {
    label: "Refunded",
    icon: <AlertCircle className="h-3 w-3" />,
    className: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  },
};

const ALL_STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];

// ─── Summary Stats ────────────────────────────────────────────────────────────

const SUMMARY_STATS = [
  { label: "Total Orders", value: "12", sub: "this month" },
  { label: "Revenue", value: "$6,245.29", sub: "this month" },
  { label: "Avg. Order Value", value: "$520.44", sub: "last 30 days" },
  { label: "Fulfilment Rate", value: "91.7%", sub: "delivered on time" },
];

// ─── Framer variants ──────────────────────────────────────────────────────────

const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const modalPanel: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        cfg.className,
      )}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (sortField !== field) return <ArrowUpDown className="h-3.5 w-3.5 opacity-30" />;
  return sortDir === "asc" ? (
    <ChevronUp className="h-3.5 w-3.5 text-[var(--accent)]" />
  ) : (
    <ChevronDown className="h-3.5 w-3.5 text-[var(--accent)]" />
  );
}

function TimelineDot({ done }: { done: boolean }) {
  return (
    <div
      className={cn(
        "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
        done
          ? "border-[var(--accent)] bg-[var(--accent)]/20"
          : "border-white/15 bg-white/5",
      )}
    >
      {done && <CheckCircle className="h-3.5 w-3.5 text-[var(--accent)]" />}
    </div>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────

function OrderModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const t = useTranslations();
  const subtotal = order.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const shipping = order.amount - subtotal > 0 ? order.amount - subtotal : 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-stretch justify-end"
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Panel */}
        <motion.aside
          className="relative z-10 flex h-full w-full max-w-lg flex-col overflow-y-auto bg-[var(--surface)] shadow-[0_0_80px_rgba(0,0,0,0.5)]"
          variants={modalPanel}
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("orders.modal.ariaLabel")}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-white/40">
                {t("orders.modal.orderLabel")}
              </p>
              <h2 className="mt-0.5 text-lg font-semibold text-white">{order.id}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label={t("orders.modal.close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6 p-6">
            {/* Status + Date */}
            <div className="flex items-center justify-between">
              <StatusBadge status={order.status} />
              <span className="text-sm text-white/50">{order.date}</span>
            </div>

            {/* Customer Info */}
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {t("orders.modal.customerInfo")}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-sm font-bold text-[var(--accent)]">
                  {order.customer.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{order.customer}</p>
                  <p className="text-xs text-white/50">{order.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/60">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30" />
                <span>{order.shipping}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <CreditCard className="h-3.5 w-3.5 shrink-0 text-white/30" />
                <span>{order.payment}</span>
              </div>
            </div>

            {/* Items */}
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {t("orders.modal.items")}
              </p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                        <Package className="h-3.5 w-3.5 text-white/40" />
                      </div>
                      <div>
                        <p className="text-sm text-white leading-snug">{item.name}</p>
                        <p className="text-xs text-white/40">SKU: {item.sku} · Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-white">
                      ${(item.qty * item.unitPrice).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/8 pt-3 space-y-1.5">
                <div className="flex justify-between text-xs text-white/50">
                  <span>{t("orders.modal.subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-xs text-white/50">
                    <span>{t("orders.modal.shipping")}</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold text-white">
                  <span>{t("orders.modal.total")}</span>
                  <span>${order.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {t("orders.modal.timeline")}
              </p>
              <div className="relative space-y-0">
                {order.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <TimelineDot done={event.done} />
                      {idx < order.timeline.length - 1 && (
                        <div
                          className={cn(
                            "w-0.5 flex-1 my-1",
                            event.done ? "bg-[var(--accent)]/30" : "bg-white/8",
                          )}
                          style={{ minHeight: "24px" }}
                        />
                      )}
                    </div>
                    <div className="pb-4 pt-0.5">
                      <p className={cn("text-sm font-medium", event.done ? "text-white" : "text-white/30")}>
                        {event.label}
                      </p>
                      {event.timestamp && (
                        <p className="text-xs text-white/40">{event.timestamp}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-white/8 px-6 py-4 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
              <FileText className="h-4 w-4" />
              {t("orders.modal.invoice")}
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20">
              <Download className="h-4 w-4" />
              {t("orders.modal.export")}
            </button>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8;

export default function OrdersPage() {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<DateRangeOption>("last30");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDir("desc");
      }
      setPage(1);
    },
    [sortField],
  );

  const filtered = useMemo(() => {
    let result = [...ORDERS];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "id") cmp = a.id.localeCompare(b.id);
      else if (sortField === "customer") cmp = a.customer.localeCompare(b.customer);
      else if (sortField === "date") cmp = a.date.localeCompare(b.date);
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      else if (sortField === "amount") cmp = a.amount - b.amount;
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Header */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t("orders.heading")}
              </h1>
              <p className="mt-1 text-sm text-white/50">{t("orders.subheading")}</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
              <Download className="h-4 w-4" />
              {t("orders.exportBtn")}
            </button>
          </div>
        </Reveal>

        {/* Summary Stats */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SUMMARY_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.18)]"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <p className="text-xs text-white/40">{stat.label}</p>
                <p className="mt-1 text-xl font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs text-white/30">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Filter Toolbar */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.14)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder={t("orders.searchPlaceholder")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--accent)]/50 focus:bg-white/8"
                />
              </div>

              {/* Date Range */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 pointer-events-none" />
                <select
                  value={dateFilter}
                  onChange={(e) => { setDateFilter(e.target.value as DateRangeOption); setPage(1); }}
                  className="appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-8 text-sm text-white outline-none transition-colors focus:border-[var(--accent)]/50 cursor-pointer"
                >
                  {dateRangeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#1a1a2e] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                  showFilters
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8",
                )}
              >
                <Filter className="h-4 w-4" />
                {t("orders.filterBtn")}
              </button>
            </div>

            {/* Status Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-white/8 pt-3">
                    <button
                      onClick={() => { setStatusFilter("all"); setPage(1); }}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        statusFilter === "all"
                          ? "border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent)]"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/8",
                      )}
                    >
                      {t("orders.statusAll")}
                    </button>
                    {ALL_STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setStatusFilter(s); setPage(1); }}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          statusFilter === s
                            ? STATUS_CONFIG[s].className
                            : "border-white/10 bg-white/5 text-white/60 hover:bg-white/8",
                        )}
                      >
                        {STATUS_CONFIG[s].icon}
                        {STATUS_CONFIG[s].label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Orders Table */}
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.14)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    {(
                      [
                        { field: "id" as SortField, label: t("orders.col.id") },
                        { field: "customer" as SortField, label: t("orders.col.customer") },
                        { field: "date" as SortField, label: t("orders.col.date") },
                        { field: "status" as SortField, label: t("orders.col.status") },
                        { field: "amount" as SortField, label: t("orders.col.amount") },
                      ] as { field: SortField; label: string }[]
                    ).map((col) => (
                      <th
                        key={col.field}
                        className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-white/40"
                      >
                        <button
                          onClick={() => handleSort(col.field)}
                          className="inline-flex items-center gap-1.5 hover:text-white/70 transition-colors focus-visible:outline-none"
                        >
                          {col.label}
                          <SortIcon field={col.field} sortField={sortField} sortDir={sortDir} />
                        </button>
                      </th>
                    ))}
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-widest text-white/40">
                      {t("orders.col.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-white/30">
                          {t("orders.empty")}
                        </td>
                      </tr>
                    ) : (
                      paginated.map((order, idx) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04, duration: 0.3 }}
                          className="group border-b border-white/5 transition-colors hover:bg-white/[0.025] last:border-0"
                        >
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                              {order.id}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div>
                              <p className="font-medium text-white">{order.customer}</p>
                              <p className="text-xs text-white/40">{order.email}</p>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-white/60">{order.date}</td>
                          <td className="px-5 py-4">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="px-5 py-4 font-semibold text-white">
                            ${order.amount.toFixed(2)}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              {t("orders.viewBtn")}
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-white/8 px-5 py-3.5">
              <p className="text-xs text-white/40">
                {t("orders.pagination.showing", {
                  from: filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1,
                  to: Math.min(page * PAGE_SIZE, filtered.length),
                  total: filtered.length,
                })}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none"
                  aria-label={t("orders.pagination.prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "h-7 w-7 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none",
                      p === page
                        ? "bg-[var(--accent)] text-black"
                        : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none"
                  aria-label={t("orders.pagination.next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}