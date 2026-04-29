# Admin CMS Setup Guide

## Architecture

The admin CMS is a separate Next.js deployment that shares a Neon PostgreSQL database with the public BowTie website.

- **Public site:** `main` branch → www.bowtienetwork.com
- **Admin CMS:** `admin-cms` branch → default Amplify URL (e.g., `admin-cms.d1mg7jcbnf4s6c.amplifyapp.com`)
- **Database:** Shared Neon PostgreSQL (free tier)
- **Public site** reads vendors/testimonials from DB with static fallback
- **Admin CMS** writes vendors/testimonials to DB via protected CRUD

The admin CMS has no custom domain. Kylene bookmarks the Amplify-generated URL.

---

## 1. Create Neon Free Database

1. Go to https://neon.tech and create a free account
2. Create a new project (name: "bowtie" or similar)
3. Region: US East (closest to Amplify us-east-1)
4. Copy the two connection strings:
   - **Pooled connection** (for app runtime): starts with `postgresql://...` and includes `-pooler` in the hostname
   - **Direct connection** (for migrations): same but without `-pooler`

## 2. Set Local Environment Variables

Create `.env` in the project root (not committed):

```
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
ADMIN_JWT_SECRET="generate-a-random-64-char-string"
ADMIN_EMAIL="kylene@bowtienetwork.com"
ADMIN_SEED_PASSWORD="choose-a-strong-password"
```

Generate a JWT secret: `openssl rand -hex 32`

## 3. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

This creates the Vendor, Testimonial, and AdminUser tables in Neon.

## 4. Run Seed

```bash
npm run db:seed
```

This seeds:
- 10 vendors from the current public site data
- 6 testimonials from the current public site data
- 1 admin user (if ADMIN_SEED_PASSWORD is set)

The seed avoids duplicates — safe to run multiple times.

## 5. Set Amplify Environment Variables

### For the admin-cms branch:

Using the AWS CLI or Amplify Console, set these env vars for the `admin-cms` branch:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_URL` | Neon direct connection string |
| `ADMIN_JWT_SECRET` | Random 256-bit hex string |

### For the main branch (public site):

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Same Neon pooled connection string |
| `LEADS_WEBHOOK_URL` | Already set (Google Apps Script URL) |

The public site only needs `DATABASE_URL` to read from the DB. It falls back to static data if the var is missing.

## 6. Deploy admin-cms Branch in Amplify

1. In AWS Amplify Console, go to the existing app (d1mg7jcbnf4s6c)
2. Go to **Hosting > Branches**
3. Click **Connect branch**
4. Select `admin-cms` from the repo branches
5. Amplify auto-assigns a URL like `admin-cms.d1mg7jcbnf4s6c.amplifyapp.com`
6. Set the branch-level environment variables (step 5 above)
7. Deploy

Do NOT attach any custom domain to this branch.

## 7. How Kylene Logs In

1. Open the admin URL in a browser (bookmark it)
2. Enter email and password
3. After login, the dashboard shows vendor and testimonial counts
4. Use the sidebar to navigate to Vendors or Testimonials

## 8. How to Edit Vendors

- **Vendors** page lists all vendors with active/hidden toggles
- Click **+ Add Vendor** to create a new one
- Click **Edit** on any row to modify
- Toggle **Active** to show/hide on the public site
- Set **Sort Order** to control display order (lower = first)
- Set **Coming Soon** for vendors without full details yet

## 9. How to Edit Testimonials

- **Testimonials** page lists all testimonials
- Click **+ Add Testimonial** to create a new one
- Click **Edit** to modify
- Toggle **Featured** to show on the homepage
- Toggle **Active** to show/hide on the testimonials page

## 10. Logo URL Field

In the MVP, logos are managed by URL:
- Enter a path like `/images/partner-luxedo.png` for local images
- Or paste a full URL like `https://example.com/logo.png`
- The form shows a preview of the logo

File upload is not available yet — see Future Work below.

## 11. Future Work

- **File upload:** S3 or Cloudinary integration for logo images
- **Image manager:** Browse/select uploaded images
- **Site settings:** Edit homepage text, hero content
- **Multi-user roles:** Multiple admin accounts with different permissions
- **Hosting transfer:** Move Amplify and Neon into Kylene-owned AWS/Neon accounts
- **Password recovery:** Self-service password reset
