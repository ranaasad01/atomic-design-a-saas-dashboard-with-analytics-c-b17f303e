"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { fadeInUp } from "@/lib/motion";

export default function Footer() {
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const pathname = usePathname();

  const footerSections = [
    {
      title: "Platform",
      links: navLinks,
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/settings", key: "docs" },
        { label: "API Reference", href: "/analytics", key: "api" },
        { label: "Changelog", href: "/analytics", key: "changelog" },
        { label: "Status", href: "/settings", key: "status" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/settings", key: "about" },
        { label: "Blog", href: "/analytics", key: "blog" },
        { label: "Careers", href: "/settings", key: "careers" },
        { label: "Contact", href: "/settings", key: "contact" },
      ],
    },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 py-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg w-fit"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]">
                <Activity className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-display text-lg font-bold text-[var(--foreground)] tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
              {APP_TAGLINE}. Real-time insights for modern e-commerce teams.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {/* Nav Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
                    >
                      {section.title === "Platform"
                        ? (navT[link.key] ?? link.label)
                        : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted)]">
            &copy; 2025 {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="/settings"
                  className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}