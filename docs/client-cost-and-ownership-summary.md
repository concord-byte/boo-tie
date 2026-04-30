# BowTie — Client Cost & Ownership Summary

Prepared for a conversation between Levi and Kylene about what's running, what it costs, and what happens after the temporary managed hosting period.

---

## Current Arrangement (2026-04-29 through ~2026-07-31)

The company is covering hosting and infrastructure during the initial 2–3 month managed period. Kylene pays nothing for hosting during this window.

| Service | Who Pays Now | Who Owns It |
|---------|-------------|-------------|
| AWS Amplify hosting | Company (temporary) | Company account |
| Neon database | Company (free tier, $0) | Company account |
| Domain (bowtienetwork.com) | Kylene | Kylene (GoDaddy) |
| Email (Google Workspace) | Kylene | Kylene |
| Lead data (Google Sheet) | Kylene | Kylene |
| Code repository (GitHub) | Company | Company account |

---

## Estimated Monthly Cost If Moved to Kylene's Account

These are the costs Kylene would see if she takes over hosting after the managed period:

### 1. AWS Amplify Hosting: ~$5–$15/month

AWS Amplify is pay-as-you-go. For a small-traffic marketing site:

| Component | Rate | Estimated |
|-----------|------|-----------|
| Build minutes | $0.01/min | ~$0.30/month (3-min builds, ~10 deploys) |
| Hosting (GB served) | $0.15/GB | ~$0.50–$2/month |
| SSR requests | $0.20 per 1M | ~$0.10/month |
| **Total** | | **~$1–$3/month at current traffic** |

AWS provides a worked example: 300 daily active users with frequent content updates costs approximately $8.08/month. BowTie's traffic is likely below this, but costs scale with traffic (viral content or ad campaigns could push higher).

### 2. Neon Database: $0/month (Free Tier)

Neon's free plan includes:
- 0.5 GB storage
- 191 compute hours/month
- 1 project

BowTie's admin CMS uses a tiny fraction of this. Upgrade would only be needed if storage exceeds 0.5 GB or a second database project is needed.

### 3. Google Sheet / Lead Capture: $0 additional

The lead capture webhook uses Google Apps Script, which runs within Kylene's existing Google Workspace account. No separate software subscription is needed.

### 4. GoDaddy Domain: Already Kylene's

Normal domain renewal (~$15–$20/year). No change from current arrangement.

### 5. Google Workspace Email: Already Kylene's

No change. Email is completely independent of the website hosting.

### Bottom Line

| Item | Monthly Cost |
|------|-------------|
| AWS Amplify | ~$5–$15 |
| Neon database | $0 |
| Lead capture | $0 |
| Domain (annual) | ~$1.50/month prorated |
| Email | Existing subscription |
| **Estimated total** | **~$5–$17/month** |

### Alternative Hosting Options (if Kylene prefers simpler)

| Platform | Approx. Monthly Cost | Notes |
|----------|---------------------|-------|
| Vercel Pro | ~$20/month | Faster builds (~30s vs ~10min), simpler dashboard |
| Netlify Pro | ~$19/month | Similar to Vercel |
| Keep AWS Amplify | ~$5–$15/month | Cheapest, already configured |

Migration to Vercel or Netlify would take 1–2 hours and ~5–30 min of downtime during DNS switch.

---

## What Kylene Can Edit Herself (via Admin CMS)

- Add, edit, or remove vendors (name, description, logo URL, website URL, active/inactive, coming soon)
- Add, edit, or remove testimonials (quote, name, title, active/featured)
- Change her admin password

## What Requires Developer Help

- Code changes (new pages, new features, design changes)
- Homepage text or layout changes (hardcoded, not in CMS yet)
- Email template or notification changes
- Hosting infrastructure changes
- Analytics setup (GA4, Clarity)
- Image upload feature (not built yet — logos are URL-only)
