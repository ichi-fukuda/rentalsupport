import type { Host } from "@/generated/prisma/client";

type HostStepConfig = Pick<Host, "requireLicensePhoto" | "requireDamagePhotos">;

/** Given the status a session just reached, returns the path of the next applicable step. */
export function nextStepPath(
  host: HostStepConfig,
  sessionId: string,
  reachedStatus: string,
): string {
  const base = `/r/session/${sessionId}`;
  switch (reachedStatus) {
    case "STARTED":
      return `${base}/agreement`;
    case "AGREED":
      if (host.requireLicensePhoto) return `${base}/license`;
      return nextStepPath(host, sessionId, "LICENSE_SUBMITTED");
    case "LICENSE_SUBMITTED":
      if (host.requireDamagePhotos) return `${base}/damage`;
      return nextStepPath(host, sessionId, "DAMAGE_CHECKED");
    case "DAMAGE_CHECKED":
    case "READY_FOR_KEY":
    default:
      return `${base}/done`;
  }
}
