# KYL Session Handoff — 2026-04-29

## What's Done

### Domain Cutover — COMPLETE
- GoDaddy DNS records saved by Levi (ACM validation CNAME, www CNAME, apex)
- Amplify domain association status: **AVAILABLE**
- ACM SSL certificate: **VALID** (wildcard *.bowtienetwork.com, Amazon RSA, expires Nov 2026)
- www subdomain: **verified: true** in Amplify
- www.bowtienetwork.com serves the correct Next.js site via CloudFront (confirmed via direct IP curl)
- Apex subdomain: **verified: false** — DNS propagated on Google/Cloudflare DNS but Amplify hasn't verified yet (automatic)
- bowtie.luxrnd.tech: still live as staging/backup
- Email DNS (MX, SPF, DKIM, Google verification TXT): all preserved and verified

### Code & Builds — COMPLETE
- Branch: main
- Latest commit: 509ad94
- Amplify builds #31, #32, #33: all SUCCEED
- All client visual/content updates deployed
- Lead capture code deployed (webhook-first, safe 503 when no webhook URL)
- Production metadataBase set to bowtienetwork.com
- docs/client-ownership-handoff.md updated with temporary managed hosting agreement

### Google Sheet — PARTIAL
- "BowTie Leads" spreadsheet created under Kylene's Google account
- "Leads" tab with correct 13-column header row (A1:M1): timestamp, source, audienceType, name, email, phone, organization, role, message, partnerId, pagePath, userAgent, id
- Headers were fixed via Playwright Firefox (automated, no Google auth needed because sheet was shared with edit access)
- Sheet ID: `1ONU2PczA23xMM0fHfajFzKUJQ2bOqIaw8mAqntDvrgk`

## What's NOT Done

### Apps Script — NOT STARTED
- The doPost webhook code has NOT been pasted into Apps Script yet
- Extensions → Apps Script menu opens correctly but the script editor requires Google account auth (owner must do it)
- Code to paste is in `docs/lead-capture-setup.md` (Step 2)
- After pasting: Save → Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone → Deploy → Authorize → Copy URL

### Amplify Webhook Env Var — BLOCKED on Apps Script URL
- `LEADS_WEBHOOK_URL` is NOT set in Amplify (zero env vars configured)
- `/api/leads` returns safe 503
- Once the Apps Script web app URL is available, set it with:
  ```
  bash ~/Documents/Obsidian-AI-OS/scripts/aws.sh amplify update-app \
    --app-id d1mg7jcbnf4s6c \
    --environment-variables LEADS_WEBHOOK_URL=<url> \
    --region us-east-1
  ```
- Then trigger redeploy and test

### DNS Propagation — AUTOMATIC, IN PROGRESS
- www CNAME: propagated on Google DNS, not yet on Cloudflare/local resolvers
- Apex A records: propagated on Google and Cloudflare DNS (AWS Global Accelerator IPs), not yet local
- Amplify apex verified: false (will flip to true once propagation completes)
- No action needed — just time (hours, not days)

## Remaining Steps to Friday Launch

1. **Apps Script deploy** — Levi or Kylene must:
   - Open the BowTie Leads sheet → Extensions → Apps Script
   - Paste the code from `docs/lead-capture-setup.md`
   - Deploy as web app
   - Copy the URL
2. **Set LEADS_WEBHOOK_URL** — Claude sets it in Amplify via scripts/aws.sh
3. **Redeploy + test** — Confirm /api/leads returns 200 and data appears in sheet
4. **Verify DNS propagation** — dig + curl checks
5. **Commit** updated docs to repo

## Key Files
- `docs/domain-cutover-bowtienetwork.md` — DNS cutover plan and records
- `docs/lead-capture-setup.md` — Apps Script code and setup steps
- `docs/client-ownership-handoff.md` — Ownership matrix with temporary hosting agreement
- `~/Documents/Obsidian-AI-OS/scripts/aws.sh` — AWS CLI wrapper with credentials

## Key Commands for Next Session
```bash
# Check Amplify domain status
bash ~/Documents/Obsidian-AI-OS/scripts/aws.sh amplify get-domain-association \
  --app-id d1mg7jcbnf4s6c --domain-name bowtienetwork.com --region us-east-1

# Check DNS
dig www.bowtienetwork.com CNAME +short
dig bowtienetwork.com A +short
dig bowtienetwork.com MX +short

# Set webhook URL (once available)
bash ~/Documents/Obsidian-AI-OS/scripts/aws.sh amplify update-app \
  --app-id d1mg7jcbnf4s6c \
  --environment-variables LEADS_WEBHOOK_URL=<url> \
  --region us-east-1

# Test lead endpoint
curl -s -o /dev/null -w "%{http_code}" -X POST https://bowtie.luxrnd.tech/api/leads \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","source":"test","role":"School"}'
```
