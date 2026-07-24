export interface NavLink {
  label: string;
  href: string;
  key: string;
  icon?: string;
}

export interface KPIData {
  label: string;
  value: string;
  unit?: string;
  percentageChange: number;
  isPositive: boolean;
  icon: string;
}

export interface Product {
  rank: number;
  name: string;
  sku: string;
  revenue: number;
  units: number;
  rating: number;
  trend: "up" | "down" | "stable";
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  amount: number;
  payment: string;
  channel: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  segment: "VIP" | "Repeat Buyer" | "New" | "At-Risk" | "Churned";
  channel: string;
  signupDate: string;
  orders: number;
  ltv: number;
  aov: number;
  lastOrder: string;
  status: "Active" | "Inactive" | "Churned";
}

export const APP_NAME = "DaticsAI";
export const APP_TAGLINE = "E-commerce & Sales Intelligence";
export const APP_DESCRIPTION =
  "Your real-time e-commerce intelligence hub. Monitor revenue, orders, and customer growth — all in one place.";

export const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/", key: "dashboard" },
  { label: "Analytics", href: "/analytics", key: "analytics" },
  { label: "Orders", href: "/orders", key: "orders" },
  { label: "Products", href: "/products", key: "products" },
  { label: "Customers", href: "/customers", key: "customers" },
  { label: "Settings", href: "/settings", key: "settings" },
];

export const CHART_COLORS = {
  primary: "#6C47FF",
  accent: "#00D4AA",
  amber: "#F59E0B",
  red: "#EF4444",
  blue: "#3B82F6",
  slate: "#64748B",
} as const;

export const STATUS_COLORS: Record<string, string> = {
  Pending: "amber",
  Processing: "blue",
  Shipped: "violet",
  Delivered: "teal",
  Cancelled: "red",
  Refunded: "slate",
};