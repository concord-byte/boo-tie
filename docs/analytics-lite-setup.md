# Analytics Lite Setup

Optional traffic analytics for the BowTie public site. No analytics scripts load unless the corresponding env vars are configured.

## What Was Added

### Public site (main branch)
- **Google Analytics 4** script tag — loads only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- **Microsoft Clarity** script tag — loads only if `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set
- **Event tracking helpers** — nav clicks, CTA clicks, form submissions (GA4 events only)

### Admin CMS (admin-cms branch)
- **Content health dashboard** — vendor/testimonial stats from Neon DB
- **Content warnings** — missing logos, missing URLs, no featured testimonials
- **Quick links panel** — configurable links to public site, Google Sheet, GA dashboard, Clarity dashboard

## Environment Variables

### Public site (main branch in Amplify)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 Measurement ID (e.g., `G-XXXXXXXXXX`). If unset, no GA script loads. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | No | Clarity Project ID. If unset, no Clarity script loads. |

### Admin CMS (admin-cms branch in Amplify)

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_GOOGLE_SHEET_URL` | No | Link to the leads Google Sheet. Shows in quick links if set. |
| `ADMIN_GA_DASHBOARD_URL` | No | Link to GA4 property dashboard. Shows in quick links if set. |
| `ADMIN_CLARITY_DASHBOARD_URL` | No | Link to Clarity project dashboard. Shows in quick links if set. |

## Setup Instructions

### Google Analytics 4

1. Go to https://analytics.google.com
2. Create a new GA4 property for bowtienetwork.com
3. Get the Measurement ID (starts with `G-`)
4. In Amplify Console, add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the **main** branch env vars
5. Redeploy main (or wait for next push)
6. Optionally add the GA dashboard URL to the **admin-cms** branch as `ADMIN_GA_DASHBOARD_URL`

### Microsoft Clarity

1. Go to https://clarity.microsoft.com
2. Create a new project for bowtienetwork.com
3. Get the Project ID
4. In Amplify Console, add `NEXT_PUBLIC_CLARITY_PROJECT_ID` to the **main** branch env vars
5. Redeploy main
6. Optionally add the Clarity dashboard URL to **admin-cms** as `ADMIN_CLARITY_DASHBOARD_URL`

### Privacy Note for Clarity

Microsoft Clarity records user sessions (mouse movements, clicks, scrolls) and generates heatmaps. Before enabling:

- BowTie's primary audience is school administrators, athletic directors, and vendors — adults.
- If the site could be accessed by students under 18, Clarity's session recording may raise COPPA or school privacy concerns.
- Clarity has a "mask sensitive content" setting — enable it if collecting any form data.
- Kylene should review Clarity's data handling and confirm she's comfortable before enabling.
- GA4 is generally lower-risk than session recording tools.

**Recommendation:** Enable GA4 first. Add Clarity only if Kylene specifically wants heatmaps/recordings and confirms the audience is adults only.

## What the Admin Dashboard Shows

The admin dashboard uses **Neon database data only** — not analytics data. It shows:

- How many vendors/testimonials exist
- Which ones are active, featured, coming soon
- Content warnings (missing logos, missing website URLs)
- Quick links to external tools

**The admin does not pull GA4 or Clarity reports.** To see traffic analytics, Kylene visits the GA4 or Clarity dashboards directly (linked from the quick links panel if configured).

## Events Tracked (GA4)

| Event | When |
|-------|------|
| `nav_click` | User clicks a navigation link (Schools, Vendors, etc.) |
| `cta_click` | User clicks "Connect with Ky" in the navbar |
| `form_success` | Contact form submitted successfully |

Events only fire when GA4 is configured. No events fire to Clarity (Clarity auto-captures clicks/scrolls).

## What This Does NOT Include

- No analytics dashboard inside the admin CMS
- No lead tracking in the database (leads stay in Google Sheets)
- No server-side analytics
- No paid analytics tools
- No custom reporting
