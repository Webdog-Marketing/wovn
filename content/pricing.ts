// Indicative guide prices, per garment, by order quantity.
// Tiers marked estimate: true have not been confirmed by a real factory quote yet.
export const TIERS = ["20-49", "50-99", "100-199", "200+"] as const;

export type PriceRow = {
  spec: string;
  detail: string;
  prices: (number | null)[]; // null = not offered at that quantity
};

export const PRICE_GUIDE: PriceRow[] = [
  {
    spec: "Fully sublimated",
    detail: "All over printed design, any colours, any pattern.",
    prices: [22, 21, 19, 18],
  },
  {
    spec: "Sublimated with printed badge",
    detail: "All over design plus a screen printed badge or crest.",
    prices: [23, 22, 20, 19],
  },
  {
    spec: "Rubberised badge and logo",
    detail: "Raised, rubberised badge and logo for a premium finish.",
    prices: [null, 31, 26, 23],
  },
];

export const DESIGN_FEES = [
  { label: "Template based design", value: "from £150" },
  { label: "Fully bespoke design", value: "from £300" },
  { label: "On orders of 100 or more", value: "design fee waived" },
];

export const RETAIL_GUIDE = "£34.99 to £39.99";
