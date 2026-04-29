# Client Ownership Handoff — BowTie School Partners

## A. Domain Ownership

| Item | Owner | Details |
|------|-------|---------|
| bowtienetwork.com | **Kylene (client)** | Registered at GoDaddy. Kylene controls DNS. |
| DNS provider | **GoDaddy** | ns03.domaincontrol.com / ns04.domaincontrol.com |
| Email | **Kylene** | Google Workspace — 6 MX records, SPF, DKIM, site verification. All preserved. |
| SSL certificate | **AWS (Amplify-managed)** | ACM auto-renewing cert, tied to the Amplify app. |

DNS currently points to the Amplify-hosted site. Kylene retains full control of the domain and can re-point it at any time.

## B. Hosting Ownership

| Item | Current State |
|------|--------------|
| Hosting platform | AWS Amplify (serverless, us-east-1) |
| Amplify app ID | d1mg7jcbnf4s6c |
| AWS account | 135090718869 (managed by Levi / Luxedo) |
| Production branch | main (auto-deploys on push) |
| Staging URL | https://bowtie.luxrnd.tech |
| Production URL | https://bowtienetwork.com |
| Monthly cost | Minimal (~$0-5/month at current traffic) |

**Kylene does not currently own the AWS account.** The site is hosted under Levi's AWS account as part of the development engagement.

## C. Code / Repo Ownership

| Item | Current State |
|------|--------------|
| GitHub repo | github.com/concord-byte/boo-tie |
| GitHub org | concord-byte (managed by Levi) |
| Repo visibility | Private |

## D. Migration Options (When Ready)

### Option 1: Keep Current Setup (Recommended Short-Term)
- Levi continues managing hosting under the current AWS account.
- Kylene owns the domain and controls DNS.
- Low cost, zero migration risk.

### Option 2: Transfer to Kylene's AWS Account
1. Kylene creates an AWS account.
2. Fork or transfer the GitHub repo to her account.
3. Create a new Amplify app in her account, connect the repo.
4. Re-add bowtienetwork.com as custom domain in her Amplify app.
5. Update DNS records to point to the new Amplify CloudFront distribution.
6. Migrate environment variables (LEADS_WEBHOOK_URL).

### Option 3: Migrate to Vercel
1. Kylene creates a Vercel account.
2. Import the GitHub repo (or a fork) into Vercel.
3. Configure environment variables.
4. Update DNS to point to Vercel.
5. Faster builds (~30s vs ~3min on Amplify).

### Option 4: Transfer GitHub Repo + Admin Access
1. Transfer repo ownership to Kylene's GitHub account.
2. Keep Amplify connected via Kylene's repo.
3. She gains full code control; hosting can stay or move.

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
