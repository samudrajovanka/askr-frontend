export type ColorFormat = "hex" | "rgba" | "hsl";

const hexToRgb = (hex: string): [number, number, number] | null => {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return [r, g, b];
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): [number, number, number] => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, Math.round(l * 100)];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;

  switch (max) {
    case rn:
      h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
      break;
    case gn:
      h = ((bn - rn) / d + 2) / 6;
      break;
    default:
      h = ((rn - gn) / d + 4) / 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

export const convertColor = (
  hex: string | null,
  format: ColorFormat,
): string => {
  if (!hex) throw new Error("Invalid color hex");

  if (format === "hex") return hex.toUpperCase();

  const rgb = hexToRgb(hex);
  if (!rgb) throw new Error("Invalid color hex");

  const [r, g, b] = rgb;
  if (format === "rgba") return `rgba(${r}, ${g}, ${b}, 1)`;

  const [h, s, lv] = rgbToHsl(r, g, b);
  return `hsl(${h}, ${s}%, ${lv}%)`;
};
