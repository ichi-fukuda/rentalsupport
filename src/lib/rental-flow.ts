import type { Host } from "@/generated/prisma/client";

type HostStepConfig = Pick<Host, "requireLicensePhoto" | "requireDamagePhotos">;

/**
 * Given the status a session just reached, returns the path of the next
 * applicable step. `requiresPassport` is derived from the customer's
 * nationality (see src/lib/nationality.ts) at the call site.
 */
export function nextStepPath(
  host: HostStepConfig,
  sessionId: string,
  reachedStatus: string,
  requiresPassport: boolean,
): string {
  const base = `/r/session/${sessionId}`;
  switch (reachedStatus) {
    case "STARTED":
      return `${base}/agreement`;
    case "AGREED":
      if (requiresPassport) return `${base}/passport`;
      return nextStepPath(host, sessionId, "PASSPORT_SUBMITTED", requiresPassport);
    case "PASSPORT_SUBMITTED":
      if (host.requireLicensePhoto) return `${base}/license`;
      return nextStepPath(host, sessionId, "LICENSE_SUBMITTED", requiresPassport);
    case "LICENSE_SUBMITTED":
      if (host.requireDamagePhotos) return `${base}/damage`;
      return nextStepPath(host, sessionId, "DAMAGE_CHECKED", requiresPassport);
    case "DAMAGE_CHECKED":
    case "READY_FOR_KEY":
    default:
      return `${base}/done`;
  }
}
