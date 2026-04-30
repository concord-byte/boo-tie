# BowTie School Partners — Project Completion Handoff

**Date:** 2026-04-29
**Status:** COMPLETE FOR NOW — LIVE, ADMIN CMS OPERATIONAL

---

## What Is Live

### Public Website
- **URL:** https://www.bowtienetwork.com
- **Backup/staging:** https://bowtie.luxrnd.tech
- Kylene confirmed she can see the site from another state
- Homepage, vendor pages, testimonials, school/vendor/brand audience pages all working
- Lead capture form submits to Google Sheet via webhook
- SSL certificate auto-renewing (expires Nov 2026)
- Email DNS preserved (Google Workspace MX, SPF, DKIM intact)

### Admin CMS
- **URL:** https://admin-cms.d1mg7jcbnf4s6c.amplifyapp.com
- Separate from the public website (no /admin on bowtienetwork.com)
- Login-protected with JWT auth
- Kylene can manage:
  - Vendors (add, edit, delete, toggle active/inactive, set coming soon, logo URL, website URL, sort order)
  - Testimonials (add, edit, delete, toggle active/featured, sort order)
  - Password (change via Account page)
- Dashboard shows content health at a glance (totals, warnings, quick links)
- Blocked from search engines (noindex, robots.txt Disallow)

### Database
- Neon PostgreSQL (free tier, us-east-1)
- 10 vendors seeded from current site content
- 6 testimonials seeded
- 1 admin user (kylene@bowtienetwork.com)
- Public site reads from DB; falls back to static data if DB is unavailable

---

## What Kylene Owns Now
- Domain: bowtienetwork.com (GoDaddy — full control)
- DNS: GoDaddy (can repoint at any time)
- Email: Google Workspace (independent of hosting)
- Lead data: Google Sheet (she owns the spreadsheet)

## What the Company Temporarily Manages
- AWS Amplify hosting (both public site and admin CMS)
- Neon PostgreSQL database
- Code repository (github.com/concord-byte/boo-tie)
- Amplify environment variables

## Hosting Agreement
- Company-managed for 2–3 months from launch (2026-04-29)
- Review by 2026-07-31
- Transfer options documented in docs/client-ownership-handoff.md

---

## Remaining Non-Blocking Follow-Ups

### Kylene should do:
1. Receive admin URL + credentials via secure channel from Levi
2. Log in and change password immediately
3. Review vendor list — update logos, descriptions, website URLs as needed
4. Review testimonials — mark favorites as "Featured" for homepage

### Optional future improvements:
- Configure Google Analytics 4 (env var ready, just needs GA4 property created)
- Configure Microsoft Clarity after privacy review (session recording concerns for school-adjacent sites)
- Add image upload for vendor logos (currently URL-only)
- Add ISR/revalidation so homepage reflects CMS edits without a rebuild
- Transfer hosting/database to Kylene-owned accounts when ready

### Verify:
- Email notification delivery to Kylene on new leads (configured but delivery unverified)
- Clean up test rows from Google Sheet (integration-test, domain-verification, direct-webhook-test)
