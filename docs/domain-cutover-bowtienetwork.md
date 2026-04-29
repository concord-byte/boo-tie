# Domain Cutover: bowtienetwork.com

## Current State

| Item | Value |
|------|-------|
| Current site URL | https://bowtie.luxrnd.tech |
| Current DNS | CNAME → d1gbar00vl270u.cloudfront.net (Amplify/CloudFront) |
| Target domain | bowtienetwork.com + www.bowtienetwork.com |
| Amplify App ID | d1mg7jcbnf4s6c |
| Amplify Region | us-east-1 |
| Domain Registrar | GoDaddy (ns03.domaincontrol.com, ns04.domaincontrol.com) |
| Email Provider | Google Workspace (MX records active) |

## Amplify Custom Domain Status

**CONFIGURED** — Domain association created 2026-04-29. Status: PENDING_VERIFICATION.
Awaiting DNS record creation in GoDaddy to validate the ACM certificate.

### Step 1: Add custom domain in Amplify — DONE

Domain association created via CLI. Both apex and www subdomains mapped to `main` branch.
CloudFront distribution: `d18s19lkgjaczb.cloudfront.net`

### Step 2: DNS Records to Create in GoDaddy

Log into GoDaddy DNS management for bowtienetwork.com and add these records:

#### SSL Certificate Validation (ACM) — ADD THIS FIRST
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `_56f7fd18987d4d5b47bdc4def1c793a8` | `_9b9f1d017ae548050a017f5a652e9604.jkddzztszm.acm-validations.aws.` | 600 |

This validates the SSL certificate. Wait 5-30 minutes after adding for Amplify to verify.

#### www Subdomain
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `d18s19lkgjaczb.cloudfront.net` | 600 |

#### Apex Domain (bowtienetwork.com)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `@` | `d18s19lkgjaczb.cloudfront.net` | 600 |

**Note on GoDaddy apex CNAME:** GoDaddy supports CNAME-flattening for root domains.
If GoDaddy rejects a CNAME on `@`, use one of these alternatives:
1. Use GoDaddy's "Forwarding" to redirect apex → www, then CNAME www
2. Transfer DNS to Route 53 for native ALIAS support

### Step 3: Records to PRESERVE (DO NOT MODIFY)

These records support Google Workspace email and must remain intact:

| Type | Name | Value |
|------|------|-------|
| MX | @ | 1 aspmx.l.google.com |
| MX | @ | 1 smtp.google.com |
| MX | @ | 5 alt1.aspmx.l.google.com |
| MX | @ | 5 alt2.aspmx.l.google.com |
| MX | @ | 10 alt3.aspmx.l.google.com |
| MX | @ | 10 alt4.aspmx.l.google.com |
| TXT | @ | v=spf1 include:dc-aa8e722993._spfm.bowtienetwork.com ~all |
| TXT | @ | google-site-verification=UwCG-_ZhQCYfYpixLWUxd6GFlk-ne7f5ZpCTYx6wiis |

**Any DKIM records (e.g., google._domainkey) must also be preserved.**

## Rollback Plan

1. Remove CNAME/A records pointing to Amplify in GoDaddy
2. Restore original A record (185.230.63.107) if it was the previous site
3. Site continues to be accessible at bowtie.luxrnd.tech regardless

## Verification Commands

```bash
# Check certificate validation
dig _56f7fd18987d4d5b47bdc4def1c793a8.bowtienetwork.com CNAME +short

# Check apex resolution
dig bowtienetwork.com A +short

# Check www resolution
dig www.bowtienetwork.com CNAME +short

# Verify email still works
dig bowtienetwork.com MX +short

# Verify SPF
dig bowtienetwork.com TXT +short

# Check Amplify domain status
aws amplify get-domain-association \
  --app-id d1mg7jcbnf4s6c \
  --domain-name bowtienetwork.com \
  --region us-east-1
```

## Smoke Test Checklist

- [ ] https://bowtienetwork.com loads the BowTie homepage
- [ ] https://www.bowtienetwork.com loads (or redirects to apex)
- [ ] SSL certificate is valid (green lock)
- [ ] https://bowtie.luxrnd.tech still works (parallel access)
- [ ] Email delivery to @bowtienetwork.com addresses still works
- [ ] All internal links and forms work on the new domain
- [ ] Contact form submissions are captured
- [ ] Partner pages load correctly
- [ ] Mobile layout is intact

## Next Steps

1. ~~Authenticate AWS CLI~~ — DONE (vault wrapper)
2. ~~Create Amplify domain association~~ — DONE (2026-04-29)
3. ~~Push code to main~~ — DONE (commit 61b2dbb, build running)
4. Set LEADS_WEBHOOK_URL env var in Amplify (after Apps Script deploy)
5. Log into GoDaddy DNS management for bowtienetwork.com
6. Add the ACM validation CNAME (see Step 2 above)
7. Wait for certificate validation (usually 5-30 minutes)
8. Add the www CNAME and apex CNAME/forwarding records
9. Wait for DNS propagation (up to 48 hours, usually <1 hour)
10. Run the smoke test checklist
