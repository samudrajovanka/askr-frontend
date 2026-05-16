import type { BumpType } from "@/types/release";

export const bumpVersion = (
  currentVersion: string | null,
  type: BumpType,
): string => {
  if (!currentVersion) return "1.0.0";
  const parts = currentVersion.split(".").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return "1.0.0";
  let [major, minor, patch] = parts;
  if (type === "major") {
    major++;
    minor = 0;
    patch = 0;
  } else if (type === "minor") {
    minor++;
    patch = 0;
  } else {
    patch++;
  }
  return `${major}.${minor}.${patch}`;
};
