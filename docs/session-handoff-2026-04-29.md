# KYL Session Handoff — 2026-04-29

## Final Launch State (End of Day)

**Status:** PUBLIC LAUNCH READY — POST-LAUNCH ADMIN CMS NEXT

### Code / Deploy — COMPLETE
- Repo: github.com/concord-byte/boo-tie
- Branch: main @ 6645abd
- Amplify build #37: SUCCEED
- Amplify app: d1mg7jcbnf4s6c (us-east-1, WEB_COMPUTE)
- Staging: bowtie.luxrnd.tech — live, 200 OK
- Temporary company-managed hosting approved 2–3 months, review by 2026-07-31
- Estimated cost: ~$0–5/month at current traffic, company-paid short term
- Kylene owns: domain, DNS, email, lead data
- Transfer options documented in docs/client-ownership-handoff.md

### Production Domain / DNS — COMPLETE
- Production domain: bowtienetwork.com
- Primary URL: www.bowtienetwork.com
- GoDaddy DNS updated manually by Levi
- SSL validation CNAME added
- www CNAME → d18s19lkgjaczb.cloudfront.net
- Root/apex forwarding: bowtienetwork.com → https://www.bowtienetwork.com (permanent 301, masking off)
- Amplify domain status: AVAILABLE
- www: verified=true
- Apex: verified=false (propagating, automatic, non-blocking)
- SSL: Amplify-managed ACM wildcard cert, auto-renewing, expires Nov 2026
- Local DNS cache may temporarily show old Wix records — non-blocking

### Email DNS — PRESERVED (DO NOT MODIFY)
- 6 Google Workspace MX records intact
- SPF TXT intact: `v=spf1 include:dc-aa8e722993._spfm.bowtienetwork.com ~all`
- Google site-verification TXT intact
- DKIM records preserved

### Lead Capture — OPERATIONAL
- Google Sheet: "BowTie Leads" (owned by Kylene)
- Sheet tab: "Leads" with 13 headers:
  timestamp | source | audienceType | name | email | phone | organization | role | message | partnerId | pagePath | userAgent | id
- Apps Script: deployed as Version 1, 2026-04-29 16:09
- LEADS_WEBHOOK_URL: set in Amplify (app + branch level)
- /api/leads: returns 201 Created on staging and production
- Test rows confirmed in Google Sheet:
  - integration-test (id: 0a2a55b7-9a5a-45b6-b040-1410eed682c1)
  - domain-verification (id: 135e3eb1-42ec-4789-a36e-5ddb70dad062)
- Email notification: configured for kylene@bowtienetwork.com, delivery UNVERIFIED
- Safe-to-delete test rows: direct-webhook-test, integration-test, domain-verification

### Implementation Fixes (This Session)
1. **Env var injection:** Amplify WEB_COMPUTE did not pass console env vars to SSR runtime. Fix: build-time injection via `env` block in next.config.ts.
2. **Apps Script 302 redirect:** Google Apps Script returns 302 after doPost execution. Fix: API fetch uses `redirect: "follow"` to follow redirect as GET and read the response.

### Client-Facing Content — COMPLETE
- Schools, Vendors, National Brands top nav links
- Navy "Trusted By Schools and Partners Nationwide" section
- "Who BowTie Serves" cards: light green/black text
- Homepage testimonial cards: gold style
- Testimonials page: alternating background colors
- New testimonials: Chuck Jaco, Jeff Cassella, Scott Kaufman
- Removed: Jennifer Ripley "Go get 'em girl"
- Bruce Brown honor section: larger script-style blue text, subtitle
- Preferred vendors: Beacon Creative, Sievert Electric, BlazeBite, TeamUp, We Empower LLC, OmniBox, Apparel
- Some vendors still have missing logos/placeholders (non-blocking — admin CMS will fix)

## NEXT TASK — Admin CMS Audit and Implementation Plan

**Do not build in the first session. Audit and plan only.**

Kylene needs an admin backend to edit website content without code changes:
- Preferred vendors (name, logo URL, link, description, active/inactive, sort order)
- Testimonials (author, quote, role, featured flag)
- Schools/clients/national brands if displayed

Next Worker should audit:
1. Existing /admin route implementation
2. Current vendor/testimonial/partner data sources
3. Prisma schema and DB connection status
4. Auth status
5. Amplify deployment constraints
6. Static fallback strategy
7. Smallest safe Admin CMS MVP

Recommended MVP: protected /admin login, Vendors CRUD, Testimonials CRUD, logo URL field (no upload), seed hardcoded data into DB, public site reads DB with static fallback.
