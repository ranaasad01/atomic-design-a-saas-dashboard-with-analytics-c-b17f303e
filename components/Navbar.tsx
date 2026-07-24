"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, ChevronDown, Activity, Bell, User } from 'lucide-react';
import { navLinks, APP_NAME } from "@/lib/data";
import { navbarVariants } from "@/lib/motion";

export default function Navbar() {
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl"
      style={{ boxShadow: "var(--shadow-primary)" }}
    >
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]">
            <Activity className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-700 text-[var(--foreground)] tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                  active
                    ? "text-[var(--primary)] bg-[var(--primary)]/8"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50"
                }`}
              >
                {navT[link.key] ?? link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[var(--primary)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Refresh Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-xs font-medium text-[var(--accent)]">Live</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--primary)] border-2 border-[var(--surface)]" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              aria-label="User menu"
              aria-expanded={userMenuOpen}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-semibold">
                AR
              </div>
              <span className="hidden sm:block text-sm font-medium text-[var(--foreground)]">
                Alex Rivera
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[var(--muted)] transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg overflow-hidden"
                  style={{ boxShadow: "var(--shadow-primary)" }}
                >
                  <div className="px-3 py-2 border-b border-[var(--border)]">
                    <p className="text-sm font-medium text-[var(--foreground)]">Alex Rivera</p>
                    <p className="text-xs text-[var(--muted)]">alex@daticsai.com</p>
                  </div>
                  {[
                    { label: "Profile", icon: User },
                    { label: "Billing", icon: Activity },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--border)]/50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 text-[var(--muted)]" aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                  <div className="border-t border-[var(--border)]">
                    <button
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-[var(--primary)] bg-[var(--primary)]/8"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50"
                    }`}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}