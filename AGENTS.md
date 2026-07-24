# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Design a SaaS dashboard with analytics charts

Additional details provided by the user:
- What type of SaaS product is this dashboard for?: E-commerce & Sales
- What is the product or brand name?: DaticsAI
- Preferred color scheme?: Both with toggle

## Goal
Build DaticsAI — a glass-futuristic SaaS analytics dashboard for e-commerce and sales with light/dark mode, interactive Recharts charts, KPI cards, and full multi-page navigation.

## Project type
dashboard

## Design system — match this exactly
- Color tokens: `--background: #F8F9FC`, `--foreground: #0F0E1A`, `--muted: #6B7280`, `--primary: #6C47FF`, `--primary-hover: #5835e8`, `--accent: #00D4AA`, `--border: #E4E6EF`, `--dark-background: #0F0E1A`, `--dark-border: #2A2A3E`, `--dark-muted: #9CA3AF`, `--brand-primary: #6366F1`, `--brand-secondary: #818CF8`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`analytics`, `analyticsPreview`, `cta`, `customers`, `dashboardOverview`, `features`, `hero`, `nav`, `orders`, `pricing`, `products`, `settings`, `testimonials`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
