# Admin CMS — Separated Architecture

**Date:** 2026-04-29
**Status:** Phase 1 complete (public cleanup + content layer). Phase 2 pending (admin app).

---

## Architecture

The admin CMS is completely separate from the public BowTie website.

### Public site (main branch)
- **Domain:** www.bowtienetwork.com
- **Amplify app:** d1mg7jcbnf4s6c (us-east-1)
- **What it does:** Marketing site with lead capture
- **Database:** Reads vendors/testimonials from Neon PostgreSQL when available, falls back to static data
- **Admin footprint:** None — no /admin routes, no login page, no admin links, no admin components

### Admin CMS (admin-cms branch — Phase 2)
- **Domain:** Default Amplify branch URL only (no custom domain)
- **What it does:** Login-protected CRUD for vendors and testimonials
- **Database:** Reads and writes to the same shared Neon PostgreSQL
- **Security:** JWT auth, noindex/robots blocking, no public marketing pages

### Shared database
- **Provider:** Neon Free PostgreSQL
- **Models:** Vendor, Testimonial, AdminUser
- **Public site:** SELECT only (read active vendors/testimonials)
- **Admin app:** Full CRUD (manage vendors, testimonials, admin users)

---

## Phase 1 — Completed

Public admin footprint removed from main branch:
- Deleted `src/app/admin/` (layout, dashboard, leads, partners pages)
- Deleted `src/app/api/admin/leads/route.ts`
- Deleted `src/app/api/leads/[id]/route.ts`
- Deleted `src/components/AdminSidebar.tsx`
- Added content data layer (`src/lib/content.ts`) with DB-first + static fallback
- Added static testimonials file (`src/lib/testimonials-static.ts`)
- Updated Prisma schema with Vendor, Testimonial, AdminUser models
- Updated public pages (homepage, testimonials, partner detail) to use content layer
- Updated `.env.example` with DATABASE_URL, DIRECT_URL, admin placeholders

The public site renders identically — static fallback kicks in when DATABASE_URL is not set.

## Phase 2 — Pending

Create admin-cms branch with:
- Login page, dashboard, vendor CRUD, testimonial CRUD
- Admin API routes with JWT auth
- robots.txt Disallow: /
- noindex metadata
- Seed script for initial data
- Amplify branch deployment setup

## What is NOT changing
- Lead capture (Google Sheets webhook) — untouched
- GoDaddy DNS — untouched
- Google Workspace email DNS — untouched
- Public site visual design — identical
- Production domain — www.bowtienetwork.com
