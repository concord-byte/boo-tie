import jwt from "jsonwebtoken";

const COOKIE_NAME = "bowtie_admin_token";
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "";

interface AdminPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: AdminPayload): string {
  if (!JWT_SECRET) throw new Error("ADMIN_JWT_SECRET is not configured");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): AdminPayload | null {
  if (!JWT_SECRET) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export function getAdminFromRequest(request: Request): AdminPayload | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return null;
  return verifyToken(match[1]);
}

export { COOKIE_NAME };
export type { AdminPayload };
