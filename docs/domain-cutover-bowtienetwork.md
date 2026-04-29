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

**Not yet configured** — AWS CLI was not authenticated at time of preparation. The domain must be added via Amplify Console or CLI before DNS records can be created.

### Step 1: Add custom domain in Amplify

```bash
aws amplify create-domain-association \
  --app-id d1mg7jcbnf4s6c \
  --domain-name bowtienetwork.com \
  --sub-domain-settings \
    '[{"prefix":"","branchName":"main"},{"prefix":"www","branchName":"main"}]' \
  --region us-east-1
```

Or via AWS Console: Amplify → App → Hosting → Custom domains → Add domain.

Amplify will provision an ACM certificate and provide DNS validation records.

### Step 2: DNS Records to Create in GoDaddy

After Amplify provides the certificate validation records, add these in GoDaddy DNS:

#### SSL Certificate Validation (ACM)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | _[hash].bowtienetwork.com | _[hash].acm-validations.aws | 600 |

*(Exact values provided by Amplify after domain association is created)*

#### Apex Domain (bowtienetwork.com)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| ANAME/ALIAS or A | @ | *(Amplify-provided CloudFront distribution)* | 600 |

**Note:** GoDaddy does not support ALIAS/ANAME records natively. Options:
1. Use GoDaddy's "Forwarding" to redirect apex → www, then CNAME www
2. Use Amplify's provided A records if available
3. Consider transferring DNS to Route 53 for native ALIAS support

#### www Subdomain
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | *(Amplify-provided CloudFront domain)* | 600 |

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
dig _[hash].bowtienetwork.com CNAME +short

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

1. Authenticate AWS CLI: `aws configure` or `aws sso login`
2. Run the Amplify domain association command above
3. Copy the ACM validation CNAME from Amplify output
4. Log into GoDaddy DNS management for bowtienetwork.com
5. Add the ACM validation CNAME
6. Wait for certificate validation (usually 5-30 minutes)
7. Add the apex A/ALIAS and www CNAME records
8. Wait for DNS propagation (up to 48 hours, usually <1 hour)
9. Run the smoke test checklist
