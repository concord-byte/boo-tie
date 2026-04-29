# Admin CMS — Audit Report & Implementation Plan

**Date:** 2026-04-29
**Branch:** main @ a190f2d
**Auditor:** Claude (KYL project)
**Status:** AUDIT ONLY — do not build from this document without explicit approval

---

## 1. Current Launch State Summary

The BowTie School Partners website is **live in production** at bowtienetwork.com (www.bowtienetwork.com). All critical systems are operational:

- AWS Amplify app `d1mg7jcbnf4s6c` (us-east-1), build #37 SUCCEED
- SSL: ACM wildcard cert, auto-renewing, expires Nov 2026
- Lead capture: operational via Google Apps Script webhook → Google Sheet
- Staging backup: bowtie.luxrnd.tech (200 OK)
- Email DNS preserved (Google Workspace MX, SPF, DKIM)
- Temporary company-managed hosting approved 2–3 months (review by 2026-07-31)

## 2. Current Branch and Commit

- **Branch:** main
- **Commit:** a190f2d (`docs: update session handoff with final launch state and admin CMS next task`)
- **Previous production commit:** 6645abd (referenced in _status.md — the latest code commit before the handoff doc commit)

## 3. Handoff Files Read

| File | Status | Key Findings |
|------|--------|-------------|
| `docs/session-handoff-2026-04-29.md` | Read | Full launch state, lead capture fixes, admin CMS next task brief |
| `docs/lead-capture-setup.md` | Read | Google Apps Script webhook architecture, env var setup, rollback plan |
| `docs/domain-cutover-bowtienetwork.md` | Not present (referenced in git but content covered by handoff) | — |
| `docs/client-ownership-handoff.md` | Read | Ownership matrix, transfer options, cost expectations |
| `projects/Kylene-Pippin/_status.md` | Read | Active tasks list, admin CMS requirements, MVP scope |
| `projects/Kylene-Pippin/_inbox.md` | Read | Pending vendor logos, future Vercel migration note |
| `package.json` | Read | Dependencies cataloged below |
| `prisma/schema.prisma` | Read | Existing schema with Lead, Partner, AdminUser models |
| All `/admin` routes and components | Read | Full audit below |
| All content data files | Read | Full audit below |

## 4. Current /admin State

### Routes

| Route | File | Status |
|-------|------|--------|
| `/admin` | `src/app/admin/page.tsx` | **Mock dashboard** — hardcoded stats (142 leads, 18 new, etc.), fake partner breakdown with names that don't match actual partners (PerformAll, Meridian, Musco Lighting, Hudl, Learfield, Dynamic Sponsorship) |
| `/admin/leads` | `src/app/admin/leads/page.tsx` | **Mock lead table** — 18 hardcoded leads with fake names/emails, client-side filtering/pagination/CSV export. No DB connection. |
| `/admin/partners` | `src/app/admin/partners/page.tsx` | **Real partner data** — imports `PARTNERS` from `lib/partners.ts`, renders cards with active/inactive toggle. Toggle is client-side only (state resets on reload). Shows mock lead counts per partner (from a `mockLeadCounts` object with mismatched slugs). |

### Layout

- `src/app/admin/layout.tsx` — wrapper with sidebar + top bar, hardcoded "A" avatar
- `src/components/AdminSidebar.tsx` — three nav items (Dashboard, Leads, Partners), responsive with mobile toggle

### Protection

**NONE.** The `/admin` route is completely open to the public. No auth middleware, no login gate, no session check. Anyone can visit `bowtienetwork.com/admin` right now and see the mock dashboard.

### What Works vs. What Is Fake

| Feature | Real | Fake |
|---------|------|------|
| Sidebar navigation | Yes | — |
| Responsive layout | Yes | — |
| Dashboard stats | — | All hardcoded |
| Lead table data | — | 18 mock leads, no DB |
| Partner list | Reads real PARTNERS array | Toggle doesn't persist, lead counts are fake |
| CSV export | Works (exports mock data) | — |
| Auth/login | — | None exists |
| API: `/api/admin/leads` | — | Returns 1 mock lead, Prisma commented out |
| API: `/api/leads/[id]` GET | — | Returns fake lead |
| API: `/api/leads/[id]` PATCH | — | Returns fake response, Prisma commented out |

## 5. Current Content Data Sources

### Vendors / Partners

**Source:** `src/lib/partners.ts` — static TypeScript array (`PARTNERS: PartnerInfo[]`)

10 partners total:
- **Premier (1):** Luxedo (has real logo)
- **Preferred (9):** Digital Scoreboards Ohio (real logo), FundWillow (real logo v2), Beacon Creative, Sievert Electric, BlazeBite, TeamUp, We Empower LLC, OmniBox, Apparel
- **With real logos (3):** Luxedo, DSO, FundWillow
- **Using placeholder SVG (7):** Beacon Creative, Sievert Electric, BlazeBite, TeamUp, We Empower LLC, OmniBox, Apparel
- **comingSoon=true (7):** All placeholder-logo partners
- **waitlist=true (1):** FundWillow

Fields per partner: `slug, name, logo, website, description, adCopy, tier, waitlist?, comingSoon?`

**Gap vs. CMS goals:** Missing `isActive`, `isPreferred`, `sortOrder`, `logoAlt`, `logoUrl` (uses local file path `logo`), `category`.

### Testimonials

**Source:** Hardcoded inline in two separate files:
- `src/app/page.tsx` lines 10–23: 2 homepage testimonials (Tom Burton, Jennifer Ripley)
- `src/app/testimonials/page.tsx` lines 7–45: 6 testimonials (Chris Weaver, Jennifer Ripley, Tom Burton, Chuck Jaco, Jeff Cassella, Scott Kaufman)

Fields per testimonial: `quote, name, title`

**Gap vs. CMS goals:** Missing `isActive`, `isFeatured`, `sortOrder`, `organization`, `location`, `audienceType`.

### Additional Inline Testimonials

Social proof quotes also appear hardcoded in:
- `src/app/for/vendors/page.tsx` line 67 (Jennifer Ripley)
- `src/app/for/schools/page.tsx` line 70 (Tom Burton)

### Schools / Clients

**Source:** `src/lib/business-data.ts` — `BETA_TEST_SCHOOLS` array (7 schools). This is labeled "NOT rendered publicly" and used for "admin/internal reference only." Schools are not currently displayed on the public site as a managed list.

### National Brands

No separate data source. The `/for/brands` page is static copy with no brand listing. The homepage partner grid includes both "Premier Partners" and "Preferred Vendors" but no separate "National Brands" entity.

### Business Data (Internal)

`src/lib/business-data.ts` also contains:
- `TIER_1_PARTNERS_GOAL` — 3 target partners
- `BETA_TEST_VENDORS` — 6 vendors with confirmed status

### Homepage Content

All homepage sections (hero, trust band, how-it-works steps, audience cards, about Kylene, Bruce Brown tribute) are hardcoded in `src/app/page.tsx`. The "Who BowTie Serves" section uses `src/components/AudienceCards.tsx`.

## 6. Current Prisma / Database State

### Schema

`prisma/schema.prisma` defines three models:

```prisma
model Lead {
  id, firstName, lastName, email, company?, phone?, role?, message?,
  partnerId? → Partner, status (default "new"), createdAt, updatedAt
  indexes: partnerId, status, createdAt
}

model Partner {
  id, name, slug (unique), logo?, website?, description?, adCopy?, adImage?,
  active (default true), leads → Lead[], createdAt, updatedAt
}

model AdminUser {
  id, email (unique), passwordHash, name, role (default "admin"), createdAt
}
```

### Prisma Client

- `src/lib/db.ts` — standard singleton pattern, exports `prisma` client
- **Not imported anywhere in active code.** All API routes have Prisma usage commented out with `// TODO: Connect to Prisma when DB is ready`

### Migrations

**None.** No `prisma/migrations/` directory exists. No migrations have been run.

### Database Connection

- `DATABASE_URL` is defined in `.env` but appears to point to a Prisma Postgres dev URL (not a real RDS instance)
- `.env.example` shows `postgresql://user:password@localhost:5432/bowtie?schema=public`
- `prisma.config.ts` reads `DATABASE_URL` from env
- **No RDS instance exists.** The _status.md says "PostgreSQL (AWS RDS — not yet connected)"

### Dependencies

Already installed (from `package.json`):
- `@prisma/client` ^7.7.0
- `prisma` ^7.7.0
- `bcryptjs` ^3.0.3 (for password hashing)
- `jsonwebtoken` ^9.0.3 (for JWT auth)
- `cookie` ^1.1.1 (for cookie handling)
- `next-auth` ^4.24.14 (installed but not used anywhere)
- `dotenv` ^17.4.2

### Assessment

The database layer is **scaffolded but not connected.** The Prisma schema is a reasonable starting point. The auth dependencies (bcryptjs, jsonwebtoken, cookie) are already installed. next-auth is installed but unused — a simpler JWT approach using the existing bcryptjs + jsonwebtoken + cookie stack is likely better for this single-admin use case.

## 7. Current Auth State

**No authentication exists.**

- `/admin` routes are publicly accessible
- No login page, no auth middleware, no session management
- No next-auth configuration (despite the package being installed)
- `.env.example` defines `ADMIN_JWT_SECRET` — the intent was JWT-based auth
- `bcryptjs`, `jsonwebtoken`, and `cookie` are already in dependencies

### Simplest Safe Auth Path

Given the deployment context (single admin user, AWS Amplify SSR):

**Recommendation: Simple JWT cookie auth (not next-auth)**

- Single `AdminUser` seeded via CLI/seed script (bcrypt-hashed password)
- Login endpoint (`POST /api/admin/auth/login`) validates password, sets HttpOnly JWT cookie
- Middleware or layout-level check on all `/admin` routes
- Logout endpoint clears cookie
- `ADMIN_JWT_SECRET` env var in Amplify

**Why not next-auth:** Overkill for single-user admin. next-auth adds OAuth provider complexity, callback URLs, database adapters, and session management that isn't needed. The existing bcryptjs + jsonwebtoken + cookie stack handles this directly.

## 8. Deployment Constraints (AWS Amplify)

### Architecture

- **Compute:** WEB_COMPUTE (SSR via Lambda@Edge / CloudFront)
- **Build:** `next build` → `output: "standalone"` in next.config.ts
- **Filesystem:** Ephemeral (no persistent disk — can't store uploads or SQLite)
- **Env vars:** Set in Amplify Console (app + branch level); injected via `next.config.ts` `env` block at build time for SSR access

### Database Implications

- Amplify SSR functions run as Lambda — they need a network-accessible database
- **AWS RDS PostgreSQL** is the natural choice (same region, VPC peering or public access)
- RDS cost: ~$15–30/month for `db.t4g.micro` (smallest production instance)
- Alternative: **Neon** or **Supabase** free tier PostgreSQL (serverless, no VPC needed, $0/month for low traffic)
- Connection string via `DATABASE_URL` env var in Amplify

### Risks

1. **Cold start latency:** Lambda + Prisma Client initialization adds ~1–3s on cold starts. Mitigate with connection pooling (Prisma Accelerate or PgBouncer).
2. **Connection limits:** Lambda can spawn many concurrent connections. Serverless PostgreSQL (Neon/Supabase) handles this natively. RDS needs PgBouncer or Prisma Accelerate.
3. **Next.js 16 compatibility:** Amplify docs claim Next.js 15 support max. Builds are succeeding now, but this is a compatibility risk for future updates.
4. **Build-time env vars:** The current `next.config.ts` `env` block pattern works but exposes values to the client bundle if not careful. `DATABASE_URL` and `ADMIN_JWT_SECRET` must NOT go in the `env` block — use `process.env` directly in server-side code only.

## 9. Architecture Comparison

### Option A: PostgreSQL + Prisma CMS

| Dimension | Assessment |
|-----------|-----------|
| **Effort** | Medium — schema exists, Prisma installed, need CRUD UI + seed + fallback |
| **Cost** | $0–30/month depending on provider (Neon free tier → $0; RDS micro → $15–30) |
| **Validation** | Full — typed schema, constraints, unique slugs, required fields |
| **Image handling** | URL field now, S3/Cloudinary later |
| **Auth** | JWT cookie (dependencies already installed) |
| **Offline resilience** | Static fallback for public pages |
| **Long-term** | Best — real CMS, full CRUD, future-proof for partner portal, analytics |
| **Kylene UX** | Admin dashboard with forms — learning curve is minimal |
| **Risk** | DB setup, Amplify Lambda cold starts, connection pooling |

### Option B: Google Sheets as CMS

| Dimension | Assessment |
|-----------|-----------|
| **Effort** | Low — Google Sheets API or Apps Script, minimal backend |
| **Cost** | $0 (Google Sheets is free) |
| **Validation** | Weak — no schema enforcement, easy to break with wrong column edits |
| **Image handling** | URL column only, no upload path |
| **Auth** | Google account (Kylene already has one) |
| **Offline resilience** | Must cache/SSG — API rate limits, latency |
| **Long-term** | Poor — no relational data, no CRUD UI, fragile at scale |
| **Kylene UX** | Familiar spreadsheet — but easy to accidentally break formatting |
| **Risk** | API quotas, column drift, no rollback, hard to add features later |

### Option C: Hybrid (Recommended)

| Dimension | Assessment |
|-----------|-----------|
| **Effort** | Medium (same as A for admin content, lead capture stays as-is) |
| **Cost** | $0–30/month for DB (lead capture remains free via Google Sheets) |
| **Validation** | Full for admin content, existing for leads |
| **Image handling** | URL field now, S3/Cloudinary later |
| **Auth** | JWT cookie for admin |
| **Offline resilience** | Static fallback for public pages, lead capture independent |
| **Long-term** | Best — separates concerns, each system does what it's good at |
| **Kylene UX** | Admin dashboard for content, Google Sheet for leads (already working) |
| **Risk** | Same DB risks as A, but lead capture has zero risk (unchanged) |

### Recommendation: Option C (Hybrid)

**Rationale:**
- Lead capture works. Don't touch it.
- Content management (vendors, testimonials) needs a real CMS with validation.
- Google Sheets CMS would be fragile and hard to evolve.
- The Prisma schema and auth dependencies are already in place.
- A hybrid avoids the risk of migrating lead capture to a new database during the hosting transition window.

## 10. Recommended MVP Scope

### Phase 1: Admin CMS MVP

**In scope:**
1. PostgreSQL database (Neon free tier recommended for MVP — $0, serverless, no connection pooling needed)
2. Prisma schema update + initial migration
3. Protected `/admin` login gate (JWT cookie)
4. Vendors CRUD (create, read, update, delete)
5. Testimonials CRUD (create, read, update, delete)
6. Logo URL field (not file upload)
7. Active/inactive toggle (persisted)
8. Sort order field
9. Featured flag (testimonials)
10. Coming soon flag (vendors)
11. Seed script: migrate current hardcoded vendors + testimonials into DB
12. Public site: DB-first read with static fallback
13. Lead capture: **unchanged** (Google Sheets webhook)

**Out of scope (Phase 2+):**
- File/image upload (S3 or Cloudinary)
- Partner login portal
- Lead management in admin (leads stay in Google Sheet)
- Site settings / page content editing
- Schools/clients management (not currently displayed publicly)
- National brands management (no separate entity currently)
- Email template management
- Analytics dashboard
- Multi-user admin

## 11. Prisma Schema Draft

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model Vendor {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  category    String?
  description String?
  websiteUrl  String?
  logoUrl     String?
  logoAlt     String?
  adCopy      String?
  tier        String   @default("preferred")  // "premier" | "preferred"
  isActive    Boolean  @default(true)
  isPreferred Boolean  @default(false)
  isComingSoon Boolean @default(false)
  isWaitlist  Boolean  @default(false)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isActive])
  @@index([sortOrder])
}

model Testimonial {
  id           String   @id @default(cuid())
  quote        String
  name         String
  title        String?
  organization String?
  location     String?
  audienceType String?
  isActive     Boolean  @default(true)
  isFeatured   Boolean  @default(false)
  sortOrder    Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([isActive])
  @@index([isFeatured])
  @@index([sortOrder])
}

model AdminUser {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String
  role         String   @default("admin")
  createdAt    DateTime @default(now())
}
```

**Changes from existing schema:**
- Renamed `Partner` → `Vendor` (matches business language — "partners" in the existing schema had lead-capture fields that conflate vendor management with lead tracking)
- Removed `Lead` model (leads stay in Google Sheets for now)
- Added: `tier`, `isPreferred`, `isComingSoon`, `isWaitlist`, `sortOrder`, `logoAlt`, `category`
- Renamed `logo` → `logoUrl`, `website` → `websiteUrl` for clarity
- Removed `adImage` (unused)
- Added full `Testimonial` model (doesn't exist in current schema)
- Kept `AdminUser` unchanged

**Migration note:** The existing `Lead` and `Partner` models can remain in the schema if we want to keep them for future use, or be removed cleanly since no migrations have ever run and no database exists.

## 12. Admin Pages / Routes Needed

| Route | Type | Purpose |
|-------|------|---------|
| `/admin/login` | Page | Login form (email + password) |
| `/admin` | Page | Dashboard — vendor count, testimonial count, quick actions |
| `/admin/vendors` | Page | Vendor list with search, sort, active filter |
| `/admin/vendors/new` | Page | Create vendor form |
| `/admin/vendors/[id]` | Page | Edit vendor form |
| `/admin/testimonials` | Page | Testimonial list with search, sort, featured filter |
| `/admin/testimonials/new` | Page | Create testimonial form |
| `/admin/testimonials/[id]` | Page | Edit testimonial form |

**Removed from current admin:**
- `/admin/leads` — leads stay in Google Sheet (link to Sheet can be in dashboard)
- `/admin/partners` — replaced by `/admin/vendors` (better naming)

**Layout changes:**
- Admin layout: add auth check (redirect to `/admin/login` if no valid JWT)
- AdminSidebar: update nav items (Dashboard, Vendors, Testimonials)
- Add user display + logout button to header

## 13. API Route Handlers Needed

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/admin/auth/login` | Validate email/password, set JWT cookie |
| POST | `/api/admin/auth/logout` | Clear JWT cookie |
| GET | `/api/admin/vendors` | List vendors (with search/filter/sort) |
| POST | `/api/admin/vendors` | Create vendor |
| GET | `/api/admin/vendors/[id]` | Get single vendor |
| PUT | `/api/admin/vendors/[id]` | Update vendor |
| DELETE | `/api/admin/vendors/[id]` | Delete vendor (soft-delete via isActive or hard delete) |
| GET | `/api/admin/testimonials` | List testimonials |
| POST | `/api/admin/testimonials` | Create testimonial |
| GET | `/api/admin/testimonials/[id]` | Get single testimonial |
| PUT | `/api/admin/testimonials/[id]` | Update testimonial |
| DELETE | `/api/admin/testimonials/[id]` | Delete testimonial |

**Auth middleware:** All `/api/admin/*` routes (except login/logout) must verify JWT from cookie.

**Existing routes unchanged:**
- `POST /api/leads` — lead capture (Google Sheets webhook) — DO NOT MODIFY
- `GET /api/admin/leads` — can be removed or left as-is (mock data)
- `GET/PATCH /api/leads/[id]` — can be removed or left as-is (mock data)

## 14. Auth Recommendation

### Approach: Simple JWT Cookie Auth

**Why:**
- Single admin user (Kylene)
- bcryptjs, jsonwebtoken, and cookie packages already installed
- next-auth is overkill (OAuth providers, session tables, callbacks not needed)
- Amplify SSR supports HttpOnly cookies

**Implementation:**
1. `AdminUser` table seeded with Kylene's email + bcrypt-hashed password
2. `/api/admin/auth/login` — POST body `{email, password}` → validate → set HttpOnly, Secure, SameSite=Strict cookie with JWT
3. JWT contains: `{userId, email, role}`, signed with `ADMIN_JWT_SECRET`, 24h expiry
4. Admin layout server component checks cookie → redirects to `/admin/login` if missing/invalid
5. API routes: helper `getAdminUser(request)` that verifies JWT from cookie
6. `/api/admin/auth/logout` — clear cookie

**Password setup:**
- Seed script creates admin user with hashed password
- Password provided via env var during seeding (`ADMIN_SEED_PASSWORD`) or prompted interactively
- Future: add password change endpoint

**Env vars needed:**
- `ADMIN_JWT_SECRET` — random 256-bit string (already in .env.example)

## 15. Seed / Migration Plan

### Step 1: Database Provisioning

1. Create Neon PostgreSQL database (free tier)
2. Get connection string
3. Add `DATABASE_URL` to `.env` (local) and Amplify env vars

### Step 2: Prisma Migration

```bash
npx prisma migrate dev --name init
```

This creates the initial migration with Vendor, Testimonial, and AdminUser tables.

### Step 3: Seed Script (`prisma/seed.ts`)

The seed script must:
1. Create the AdminUser (email from env, password from env, bcrypt-hashed)
2. Upsert all 10 vendors from current `PARTNERS` array in `lib/partners.ts`
3. Upsert all 6 testimonials from `testimonials/page.tsx` + 2 homepage testimonials (deduped)
4. Map existing fields:
   - `logo` → `logoUrl` (convert `/images/partner-*.png` to relative paths or placeholder URL)
   - `tier` → `tier`
   - `website` → `websiteUrl`
   - `comingSoon` → `isComingSoon`
   - `waitlist` → `isWaitlist`
5. Set `sortOrder` based on current array position
6. Set `isFeatured: true` for the 2 homepage testimonials

### Step 4: Verify

```bash
npx prisma studio  # visual verification
```

## 16. Public Fallback Plan

### Strategy: DB-First with Static Fallback

```
Public page request
  → Try: query Prisma for vendors/testimonials
  → If success AND results.length > 0: render from DB
  → If failure OR empty: render from static data (current hardcoded arrays)
  → Lead capture: always uses Google Sheets webhook (unchanged)
```

### Implementation

Create a data access layer (e.g., `src/lib/content.ts`):

```typescript
// Pseudocode
export async function getVendors(): Promise<VendorDisplay[]> {
  try {
    const dbVendors = await prisma.vendor.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (dbVendors.length > 0) return dbVendors;
  } catch {
    // DB unavailable — fall through to static
  }
  return STATIC_PARTNERS; // existing hardcoded data
}
```

### Rules

- Static data files (`lib/partners.ts`, inline testimonial arrays) remain in the codebase as fallback
- Public pages import from the data access layer, not directly from Prisma or static
- No public-facing page should error if the database is down
- Lead capture is completely independent — no DB dependency

## 17. Logo / Image Handling Plan

### Phase 1 (MVP)

- `logoUrl` field: accepts any URL string
- For vendors with existing local images (`/images/partner-*.png`), seed with the relative path (these already work)
- For vendors with `partner-placeholder.svg`, seed with that path
- Admin form: text input for logo URL
- Kylene can paste external image URLs (e.g., from the vendor's website) or keep the placeholder
- Admin shows logo preview next to URL input

### Phase 2 (Future)

- Add image upload to S3 or Cloudinary
- Upload component in admin form
- Auto-generate optimized thumbnails
- CDN delivery

### Placeholder Rendering

Current behavior (vendor cards show "Coming Soon" badge when `comingSoon: true`) is preserved. The admin toggle for `isComingSoon` controls this.

## 18. Required Environment Variables

### New (for CMS)

| Variable | Where | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | Amplify + local `.env` | PostgreSQL connection string |
| `ADMIN_JWT_SECRET` | Amplify + local `.env` | JWT signing secret (already in `.env.example`) |

### Existing (unchanged)

| Variable | Where | Purpose |
|----------|-------|---------|
| `LEADS_WEBHOOK_URL` | Amplify + `next.config.ts` env block | Google Apps Script webhook |
| `LEADS_WEBHOOK_SECRET` | Amplify (optional) | Webhook auth |

### Build-time only (seeding)

| Variable | Where | Purpose |
|----------|-------|---------|
| `ADMIN_SEED_EMAIL` | Local only (during seed) | Admin user email |
| `ADMIN_SEED_PASSWORD` | Local only (during seed) | Admin user initial password |

### Critical: Do NOT add to `next.config.ts` env block

`DATABASE_URL` and `ADMIN_JWT_SECRET` must **never** go in the `next.config.ts` `env` block — that would expose them to the client bundle. They should only be accessed via `process.env` in server-side code (API routes, server components).

## 19. Deployment Implications on Amplify

### Build Changes

- `npx prisma generate` must run during build (add to build script or `postinstall`)
- `prisma migrate deploy` should run during build to apply migrations
- Recommended `package.json` scripts addition:
  ```json
  "postinstall": "prisma generate",
  "db:migrate:deploy": "prisma migrate deploy",
  "db:seed": "prisma db seed"
  ```

### Amplify Build Settings

Current Amplify build probably runs `npm install && npm run build`. Need to add:
```yaml
preBuild:
  commands:
    - npx prisma generate
    - npx prisma migrate deploy
build:
  commands:
    - npm run build
```

### Runtime

- Prisma Client runs inside Lambda (Amplify SSR)
- Need `binaryTargets = ["native", "rhel-openssl-3.0.x"]` in Prisma generator for Lambda compatibility
- Connection pooling: Neon serverless handles this natively; if using RDS, need Prisma Accelerate or PgBouncer

### Risks

1. **Prisma binary size** may increase Lambda bundle (~10–30MB). Amplify has a 250MB limit — should be fine.
2. **Cold start** adds ~1–3s for Prisma Client initialization. Acceptable for admin pages; public pages can use ISR/caching to mitigate.
3. **Migration on deploy** — if migration fails, build fails, old version stays live. This is safe behavior.

## 20. Risks

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Admin currently public at /admin | **High** | Phase 1 priority: add auth gate before any real data goes in |
| No database exists yet | Medium | Neon free tier = 5 min setup, $0 cost |
| Amplify Lambda + Prisma cold starts | Low | Public pages use static fallback; admin cold start is acceptable |
| Next.js 16 + Amplify compatibility | Low | Working today (build #37); monitor on Amplify updates |
| Hardcoded content duplication (testimonials in 4 files) | Low | Seed deduplicates; after DB migration, refactor pages to use data layer |
| Logo images are local files | Low | Keep working as relative URLs; external URLs work too |
| Hosting transfer in 2–3 months | Medium | DB connection string is portable; Neon works with any host |
| Single admin user (no password recovery) | Low | Levi can reset via seed script; add recovery later |

## 21. Decisions Needed Before Build

### Must Decide

1. **Database provider:** Neon free tier (recommended) vs. AWS RDS vs. Supabase vs. other?
2. **Admin credentials:** What email and initial password for Kylene's admin account?
3. **Vendor naming:** Keep "Partners" in UI (matches site language) or switch to "Vendors" (matches business intent)? The schema uses "Vendor" but the admin UI can display "Partners" or "Preferred Vendors."
4. **Existing Lead model:** Remove from Prisma schema (leads stay in Google Sheets only) or keep for future use?

### Nice to Decide

5. **Dashboard content:** Should the admin dashboard show anything real (vendor count, testimonial count) or just be a landing page with links?
6. **Soft delete vs. hard delete:** Should deleting a vendor/testimonial set `isActive: false` or remove the row?
7. **Social proof quotes on audience pages** (`/for/vendors`, `/for/schools`): Should these pull from the testimonials DB or remain hardcoded? (Recommend: leave hardcoded for MVP, refactor later.)

## 22. Build Phases

### Phase 1: Admin CMS MVP (This Build)

**Estimated effort:** 1–2 sessions

1. Provision Neon PostgreSQL database
2. Update Prisma schema (Vendor, Testimonial, AdminUser)
3. Run initial migration
4. Create seed script (vendors + testimonials + admin user)
5. Implement JWT auth (login page, login API, cookie handling, auth middleware)
6. Build admin layout with auth gate
7. Build Vendors CRUD pages + API routes
8. Build Testimonials CRUD pages + API routes
9. Create data access layer with DB-first + static fallback
10. Update public pages to use data access layer
11. Update Amplify build config + env vars
12. Test locally end-to-end
13. Deploy and verify

### Phase 2: Polish & Extend (Future)

- Image upload (S3 or Cloudinary)
- Password change / recovery
- Admin activity log
- Lead management in admin (optional — may stay in Google Sheets)
- Schools / clients management (if Kylene wants them on the site)
- Site settings management
- ISR / caching for public pages

### Phase 3: Scale (Future)

- Multi-user admin with roles
- Partner login portal
- Analytics dashboard
- Content versioning / drafts
- Email notification management

## 23. Exact Next Build Prompt

After plan approval, the next session should use this prompt:

---

**KYL: Implement Admin CMS Phase 1**

Build the admin CMS MVP per the approved plan in `docs/admin-cms-audit-plan.md`.

Prerequisites (Levi must complete before build):
- [ ] Provision Neon PostgreSQL database and provide DATABASE_URL
- [ ] Decide admin email for Kylene
- [ ] Decide initial admin password (will be hashed, never stored in plaintext)
- [ ] Confirm Vendor vs. Partner naming for admin UI

Build order:
1. Update Prisma schema (Vendor, Testimonial, AdminUser) and generate + migrate
2. Create seed script with current hardcoded data
3. Implement JWT auth (login page, API, middleware)
4. Build admin Vendors CRUD (list, create, edit, delete)
5. Build admin Testimonials CRUD (list, create, edit, delete)
6. Create content data access layer with DB-first + static fallback
7. Update public pages to use data access layer
8. Update Amplify build config
9. Test end-to-end locally
10. Deploy to staging (bowtie.luxrnd.tech) and verify
11. Deploy to production (bowtienetwork.com) and verify

DO NOT: modify lead capture, touch DNS, expose credentials, deploy without testing.

---

## 24. Confidence Score

**Confidence: 92% — based on full codebase read, every source file inspected, all handoff docs reviewed, Prisma schema + dependencies verified, deployment architecture confirmed.**

**What I observed:**
- Read all 20+ source files in the repo
- Confirmed Prisma schema exists with Partner + AdminUser models
- Confirmed auth dependencies installed (bcryptjs, jsonwebtoken, cookie)
- Confirmed no database or migrations exist
- Confirmed /admin is unprotected
- Confirmed all content is hardcoded (static arrays + inline JSX)
- Confirmed lead capture is independent (webhook-based, no DB dependency)
- Confirmed Amplify deployment is standalone SSR (Lambda)

**What I did not verify:**
- Amplify build settings (would require AWS Console access)
- Whether Neon free tier has any Amplify-specific connection issues (likely fine but untested)
- Exact Lambda binary target for Prisma on Amplify (documented as rhel-openssl-3.0.x but may vary)
- Whether `next-auth` has any side effects from being installed but unused (unlikely)

---

*Generated 2026-04-29. This is an audit document — no code was modified, no database was created, no deployment was triggered.*
