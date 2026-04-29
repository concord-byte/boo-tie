import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.LEADS_WEBHOOK_SECRET;
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const LEADS_DIR = path.join(process.cwd(), "data", "leads");

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, 2000);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lead = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      source: sanitize(body.source) || "website",
      audienceType: sanitize(body.audienceType) || sanitize(body.role) || "",
      firstName: sanitize(body.firstName),
      lastName: sanitize(body.lastName),
      name: `${sanitize(body.firstName)} ${sanitize(body.lastName)}`.trim(),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      organization: sanitize(body.company),
      role: sanitize(body.role),
      message: sanitize(body.message),
      partnerId: sanitize(body.partnerId),
      pagePath: sanitize(body.pagePath),
      userAgent: request.headers.get("user-agent")?.slice(0, 500) || "",
      status: "new",
    };

    const errors: string[] = [];
    if (!lead.firstName) errors.push("firstName is required");
    if (!lead.lastName) errors.push("lastName is required");
    if (!lead.email) errors.push("email is required");
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      errors.push("email format is invalid");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    if (WEBHOOK_URL) {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (WEBHOOK_SECRET) {
        headers["X-Webhook-Secret"] = WEBHOOK_SECRET;
      }

      const payload = JSON.stringify(lead);

      // Google Apps Script executes doPost on the initial request, then returns
      // a 302 redirect to deliver the response. Follow the redirect (as GET)
      // to read the response body — the script has already run.
      const webhookRes = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers,
        body: payload,
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
      });

      if (!webhookRes.ok) {
        console.error(
          `Webhook failed: ${webhookRes.status} ${webhookRes.statusText}`,
        );
        return NextResponse.json(
          { error: "We couldn't save your information right now. Please try again in a moment." },
          { status: 502 },
        );
      }
    } else if (IS_PRODUCTION) {
      console.error(
        "LEADS_WEBHOOK_URL is not configured. Lead lost:",
        lead.email,
      );
      return NextResponse.json(
        { error: "We couldn't save your information right now. Please try again in a moment." },
        { status: 503 },
      );
    } else {
      await fs.mkdir(LEADS_DIR, { recursive: true });
      const filename = `${lead.timestamp.replace(/[:.]/g, "-")}_${lead.id.slice(0, 8)}.json`;
      await fs.writeFile(
        path.join(LEADS_DIR, filename),
        JSON.stringify(lead, null, 2),
      );
    }

    return NextResponse.json(
      { id: lead.id, status: "new", createdAt: lead.timestamp },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
