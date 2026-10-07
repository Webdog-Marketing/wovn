export type Story = {
  slug: string;
  photoFolder: string; // folder inside public/images
  name: string;
  kicker: string;
  summary: string; // one line, shown on cards
  brief: string;
  made: string;
  outcome: string;
  facts: { label: string; value: string }[];
  shopSlug?: string; // links to the matching club shop, if one exists
};

// Edit the copy here. Photos come from public/images/<photoFolder>/ (01.jpg is the hero).
export const STORIES: Story[] = [
  {
    slug: "marshall-islands",
    photoFolder: "marshall-islands",
    name: "Marshall Islands Soccer Federation",
    kicker: "National federation",
    summary: "A small island nation, a kit that carries a message much bigger than football.",
    brief:
      "The Marshall Islands sit among the countries most exposed to rising seas. The federation wanted kits that played on the pitch and spoke well beyond it.",
    made:
      "Two kits with a story stitched into them, including a 2030 away shirt that looks ahead to what climate change could do to the nation. Detail runs through the whole design: rubberised badge, individual numbering and sponsor print.",
    outcome:
      "The shirts have raised more than £100,000 for the federation, were named among Panenka Magazine's Top 150 Most Iconic Kits, and the 2030 away kit is on display at the National Maritime Museum in London. The project also won the Forever Green Initiative of the Year award from Real Betis.",
    facts: [
      { label: "Client", value: "National federation" },
      { label: "Spec", value: "Rubberised badge, numbering, sponsor print" },
      { label: "Edition", value: "212 limited edition shirts" },
    ],
  },
  {
    slug: "kiribati",
    photoFolder: "kiribati",
    name: "Kiribati Islands Football Federation",
    kicker: "National federation",
    summary: "Home and away kits for a Pacific federation playing bigger than its size.",
    brief:
      "The Kiribati Islands Football Federation needed a kit identity of its own, not an off the shelf template.",
    made:
      "Home and away kits designed in partnership with the federation.",
    outcome:
      "A kit identity the federation can call its own.",
    facts: [
      { label: "Client", value: "National federation" },
      { label: "Kits", value: "Home and away" },
    ],
  },
  {
    slug: "david-follett",
    photoFolder: "david-follett",
    name: "David Follett Parabadminton",
    kicker: "Para athlete",
    summary: "A self funded international para-badminton player, kitted out in his own colours.",
    brief:
      "David is a self funded international para-badminton player. He wanted a shirt that looked as serious as his ambitions.",
    made:
      "A fully sublimated design with a screen printed flag badge, produced in a small run and sold directly to supporters.",
    outcome:
      "A shirt that looks the part, sold directly to his supporters. His shop is live now.",
    facts: [
      { label: "Client", value: "Individual athlete" },
      { label: "Spec", value: "Sublimated, printed flag badge" },
      { label: "Run", value: "22 shirts" },
    ],
    shopSlug: "david-follett-parabadminton",
  },
  {
    slug: "edukid",
    photoFolder: "edukid",
    name: "Edukid",
    kicker: "Charity collaboration",
    summary: "A streetwear jersey made to help drive donations.",
    brief:
      "Edukid is an international charity that wanted supporters to be able to carry the cause with them.",
    made:
      "A streetwear style jersey, fully sublimated, designed as a collaboration with the charity rather than a logo dropped on a blank.",
    outcome:
      "A product people want to wear, designed to help drive donations to the charity.",
    facts: [
      { label: "Client", value: "International charity" },
      { label: "Spec", value: "Fully sublimated" },
      { label: "Run", value: "50 shirts" },
    ],
    shopSlug: "edukid",
  },
];

export function getStory(slug: string) {
  return STORIES.find((s) => s.slug === slug);
}
