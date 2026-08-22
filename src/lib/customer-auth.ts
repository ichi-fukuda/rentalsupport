import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "customer_verify";
const MAX_AGE_SECONDS = 60 * 30; // 30 minutes — only needs to bridge the login -> vehicle-select step

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set. Add it to .env.");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function buildToken(customerId: string, hostId: string): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${customerId}.${hostId}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string, hostId: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [customerId, tokenHostId, expiresStr, signature] = parts;
  if (tokenHostId !== hostId) return null;

  const payload = `${customerId}.${tokenHostId}.${expiresStr}`;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;

  return customerId;
}

/** Call after a customer's email matches a host-registered Customer record. */
export async function setVerifiedCustomer(customerId: string, hostId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, buildToken(customerId, hostId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

/** Returns the verified customerId for this host, or null if not verified/expired. */
export async function getVerifiedCustomerId(hostId: string): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token, hostId);
}

export async function clearVerifiedCustomer(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
