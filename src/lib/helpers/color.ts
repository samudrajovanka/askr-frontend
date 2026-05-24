import type { RgbaColor } from "@/types/color";

export type ColorFormat = "hex" | "rgba" | "hsl";

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

export const hexToRgba = (hex: string): RgbaColor => {
  let h = hex.replace(/^#/, "");

  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  } else if (h.length === 4) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
  }

  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;

  if (h.length === 6) {
    r = parseInt(h.substring(0, 2), 16);
    g = parseInt(h.substring(2, 4), 16);
    b = parseInt(h.substring(4, 6), 16);
  } else if (h.length === 8) {
    r = parseInt(h.substring(0, 2), 16);
    g = parseInt(h.substring(2, 4), 16);
    b = parseInt(h.substring(4, 6), 16);
    a = Math.round((parseInt(h.substring(6, 8), 16) / 255) * 100) / 100;
  }

  return { r, g, b, a };
};

export const hexColorConverterPreview = (
  hex: string | null,
  format: ColorFormat,
): string => {
  if (!hex) throw new Error("Invalid color hex");

  if (format === "hex") return hex.toUpperCase();

  const { r, g, b, a } = hexToRgba(hex);

  if (format === "rgba") return `rgba(${r}, ${g}, ${b}, ${a})`;

  const [h, s, lv] = rgbToHsl(r, g, b);
  return `hsl(${h}, ${s}%, ${lv}%)`;
};

export const rgbaToHex = ({ r, g, b, a }: RgbaColor): string => {
  const toHexVal = (val: number) => {
    const hex = Math.round(val).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  let alphaHex = toHexVal(a * 255);
  if (alphaHex.toLowerCase() === "ff") alphaHex = "";

  return `#${toHexVal(r)}${toHexVal(g)}${toHexVal(b)}${alphaHex}`.toLowerCase();
};
