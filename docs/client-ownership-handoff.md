# Client Ownership Handoff — BowTie School Partners

## Temporary Managed Hosting Agreement

> **Effective:** 2026-04-29 (launch)
> **Duration:** 2–3 months from launch date
> **Review by:** 2026-07-31

The company (Luxedo / Levi) is paying for AWS Amplify hosting temporarily for 2–3 months to enable a timely production launch. This is **not a permanent arrangement**. Kylene should plan to assume hosting ownership or establish a continued hosting agreement before the review date.

### What the company manages temporarily
- AWS Amplify hosting and deployments
- SSL certificate (auto-managed by AWS ACM)
- Amplify environment variables (e.g., lead webhook URL)
- Code repository (github.com/concord-byte/boo-tie)

### What Kylene owns now
- **Domain:** bowtienetwork.com (GoDaddy — full control)
- **DNS:** GoDaddy DNS management (can repoint at any time)
- **Email:** Google Workspace (independent of hosting)
- **Lead data:** Google Sheet destination (she owns the spreadsheet)

### Cost expectations
AWS Amplify is pay-as-you-go. For a small-traffic marketing site:
- **Build minutes:** ~3 min/build × infrequent deploys = minimal
- **Hosting:** pennies/month for static + SSR at low traffic
- **Estimated total:** $0–5/month at current traffic levels
- **Risk:** costs scale with traffic; must be monitored if traffic spikes (viral content, ad campaigns)

### Compatibility watch
The project uses Next.js 16. AWS Amplify documentation currently states support through Next.js 15 for SSR. Builds are succeeding as of 2026-04-29 (build #33 SUCCEED), so this is **not a launch blocker**. However, if a future Amplify platform update causes build failures, this should be investigated first.

---

## A. Domain Ownership

| Item | Owner | Details |
|------|-------|---------|
| bowtienetwork.com | **Kylene (client)** | Registered at GoDaddy. Kylene controls DNS. |
| DNS provider | **GoDaddy** | ns03.domaincontrol.com / ns04.domaincontrol.com |
| Email | **Kylene** | Google Workspace — 6 MX records, SPF, DKIM, site verification. All preserved. |
| SSL certificate | **AWS (Amplify-managed)** | ACM auto-renewing cert, tied to the Amplify app. |

DNS points to the Amplify-hosted site. Kylene retains full control of the domain and can re-point it at any time.

## B. Hosting Ownership (Temporary — Company-Managed)

| Item | Current State |
|------|--------------|
| Hosting platform | AWS Amplify (serverless, us-east-1) |
| Amplify app ID | d1mg7jcbnf4s6c |
| AWS account | 135090718869 (**company-managed, temporary**) |
| Production branch | main (auto-deploys on push) |
| Staging URL | https://bowtie.luxrnd.tech |
| Production URL | https://bowtienetwork.com |
| Monthly cost | Estimated $0–5/month at current traffic |
| Billing | **Company-paid for 2–3 months from launch** |

**Kylene does not currently own the AWS account.** Hosting is provided temporarily by the company as part of the development engagement. Transfer options are documented below.

## C. Code / Repo Ownership

| Item | Current State |
|------|--------------|
| GitHub repo | github.com/concord-byte/boo-tie |
| GitHub org | concord-byte (managed by Levi) |
| Repo visibility | Private |

## D. Hosting Transfer Options (Review by 2026-07-31)

Before the temporary hosting period ends, one of these paths should be chosen:

### Option A: Transfer to Kylene-Owned AWS Account
- **Effort:** Medium (1–2 hours)
- **Cost to Kylene:** ~$0–5/month (same as current)
- **Steps:**
  1. Kylene creates an AWS account.
  2. Fork or transfer the GitHub repo to her account.
  3. Create a new Amplify app in her account, connect the repo.
  4. Re-add bowtienetwork.com as custom domain in her Amplify app.
  5. Update GoDaddy DNS to point to the new CloudFront distribution.
  6. Migrate environment variables (LEADS_WEBHOOK_URL).
- **Downtime:** Brief (~5–30 min during DNS switch)

### Option B: Migrate to Kylene-Owned Vercel or Netlify
- **Effort:** Medium (1–2 hours)
- **Cost to Kylene:** Free tier likely sufficient; ~$0–20/month if exceeded
- **Steps:**
  1. Kylene creates a Vercel or Netlify account.
  2. Import the GitHub repo (or a fork).
  3. Configure environment variables.
  4. Update GoDaddy DNS to point to Vercel/Netlify.
- **Benefit:** Faster builds (~30s vs ~3min on Amplify), simpler dashboard
- **Downtime:** Brief (~5–30 min during DNS switch)

### Option C: Continued Company-Managed Hosting
- **Effort:** None (status quo)
- **Cost to Kylene:** Negotiated hosting fee or included in service agreement
- **Steps:** Formalize ongoing hosting arrangement with billing terms
- **Downtime:** None

## E. What Kylene Controls Today
- Domain (bowtienetwork.com) — full ownership via GoDaddy
- DNS records — can repoint at any time
- Email — Google Workspace, independent of hosting
- Lead data — Google Sheet (she owns the spreadsheet)
- Content requests — communicated to dev team for implementation

## F. What Requires Developer Access Today
- Code changes (features, styling, content updates)
- Amplify environment variables
- AWS infrastructure changes
- Deployment triggers (automatic on push to main)
