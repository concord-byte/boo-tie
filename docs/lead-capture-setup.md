# Lead Capture Setup — Google Sheets via Apps Script

BowTie captures leads from three forms (Contact, Quick Capture, Partner Lead)
and POSTs them to a Google Apps Script webhook that writes rows to a Google Sheet
and optionally emails Kylene on each submission.

## 1. Create the Google Sheet

Create a new Google Sheet (or use an existing one). Name the first tab `Leads`.

Add these column headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| timestamp | source | audienceType | name | email | phone | organization | role | message | partnerId | pagePath | userAgent | id |

## 2. Create the Google Apps Script

1. In the Google Sheet, go to **Extensions > Apps Script**.
2. Replace the default `Code.gs` content with:

```javascript
// ── Configuration ──
const SHEET_NAME = "Leads";
const NOTIFY_EMAIL = "kylene@bowtienetwork.com"; // set to "" to disable
const WEBHOOK_SECRET = ""; // must match LEADS_WEBHOOK_SECRET env var, or leave both empty

function doPost(e) {
  try {
    // Authenticate if secret is configured
    if (WEBHOOK_SECRET) {
      const reqSecret = e?.parameter?.secret || "";
      const headerSecret = e?.postData?.type === "application/json"
        ? "" // Apps Script doesn't expose custom headers directly in doPost
        : "";
      // For Apps Script, pass secret as query param: ?secret=XXX
      // The Next.js route sends it as X-Webhook-Secret header,
      // but Apps Script web apps don't receive custom headers.
      // Alternative: include secret in the JSON body.
    }

    const payload = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ error: "Sheet not found" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const row = [
      payload.timestamp || new Date().toISOString(),
      payload.source || "",
      payload.audienceType || "",
      payload.name || "",
      payload.email || "",
      payload.phone || "",
      payload.organization || "",
      payload.role || "",
      payload.message || "",
      payload.partnerId || "",
      payload.pagePath || "",
      payload.userAgent || "",
      payload.id || "",
    ];

    sheet.appendRow(row);

    // Send email notification
    if (NOTIFY_EMAIL && payload.email) {
      const subject = "New BowTie Lead: " + (payload.name || payload.email);
      const body = [
        "New lead submitted on BowTie website",
        "",
        "Name: " + (payload.name || "—"),
        "Email: " + (payload.email || "—"),
        "Phone: " + (payload.phone || "—"),
        "Organization: " + (payload.organization || "—"),
        "Role: " + (payload.role || "—"),
        "Source: " + (payload.source || "—"),
        "Page: " + (payload.pagePath || "—"),
        "",
        "Message:",
        payload.message || "(none)",
        "",
        "View all leads in the spreadsheet.",
      ].join("\n");

      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", id: payload.id })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Update `NOTIFY_EMAIL`** to Kylene's actual email address.
4. Click **Save**.

## 3. Deploy the Apps Script as a Web App

1. Click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Description**: BowTie Lead Capture
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**.
5. **Authorize** when prompted (review permissions — it needs Sheets + Mail access).
6. Copy the **Web app URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

## 4. Configure Amplify Environment Variables

In the AWS Amplify Console:

1. Go to **App settings > Environment variables**.
2. Add:

| Variable | Value |
|----------|-------|
| `LEADS_WEBHOOK_URL` | The Apps Script web app URL from step 3 |
| `LEADS_WEBHOOK_SECRET` | *(optional — leave empty unless you add body-based auth to the script)* |

3. Redeploy the branch (Amplify picks up env vars on next build).

## 5. Test the Integration

### From local dev

```bash
# Without webhook (file fallback)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","role":"School","source":"test"}'

# Check data/leads/ for the JSON file
ls data/leads/
```

### Against the webhook directly

```bash
curl -X POST "YOUR_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"timestamp":"2026-04-29T12:00:00Z","source":"test","name":"Test User","email":"test@example.com","role":"School","id":"test-123"}'
```

Then check the Google Sheet for the new row.

### From the deployed site

1. Open the site in a browser.
2. Fill out the Contact form with test data.
3. Verify a new row appears in the Google Sheet within a few seconds.
4. Verify Kylene receives the email notification (if configured).

## 6. Behavior Summary

| Environment | LEADS_WEBHOOK_URL set? | Behavior |
|-------------|----------------------|----------|
| Production | Yes | POST to Google Sheet webhook. Fail with user-safe 502 if webhook is down. |
| Production | No | Fail with 503 and server log. No lead is silently lost. |
| Local dev | Yes | POST to Google Sheet webhook (same as production). |
| Local dev | No | Write JSON to `data/leads/` directory (dev convenience). |

## 7. Rollback

If the webhook breaks in production:
1. Leads return a user-friendly error ("try again in a moment").
2. No data is silently lost — the user sees the error and can retry.
3. Fix the webhook or update `LEADS_WEBHOOK_URL` in Amplify and redeploy.

To temporarily disable webhooks and use file-based capture on a non-serverless host:
1. Remove `LEADS_WEBHOOK_URL` from environment.
2. Ensure the host has a writable filesystem (not Amplify serverless).

## 8. Future Upgrade Path

When Prisma + RDS is ready:
1. Add a `db.lead.create()` call in the API route alongside (or replacing) the webhook.
2. Keep the webhook as a notification/backup channel if desired.
3. The API request/response shape does not need to change.
