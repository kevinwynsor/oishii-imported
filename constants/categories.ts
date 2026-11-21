export type MenuItem = {
  name: string;
  price: string;
  /** Short line under the name, e.g. "3 pcs" */
  note?: string;
  /** Rendered as chips under the name */
  flavors?: string[];
  /** First photo is the thumbnail; all photos show in the viewer */
  photos: string[];
};

export type Category = {
  kanji: string;
  title: string;
  /** Spine color: the brand red or ink black */
  tone: "red" | "ink";
  items: MenuItem[];
};

export const categories: Category[] = [
  {
    kanji: "麺",
    title: "NOODLES",
    tone: "red",
    items: [
      {
        name: "Ichiran Ramen 5-pack",
        price: "₱1,200",
        note: "Straight or Curly noodles",
        photos: ["/ichiran_5.png", "/ichiran_curly.png"],
      },
      {
        name: "Ichiran Ramen 2-pack",
        price: "₱700",
        note: "Straight noodles",
        photos: ["/ichiran_2.png"],
      },
      { name: "Nissin Seafood", price: "₱115", photos: ["/nissin.png"] },
    ],
  },
  {
    kanji: "菓",
    title: "CHOCOLATES",
    tone: "ink",
    items: [
      {
        name: "KitKat",
        price: "₱215",
        flavors: ["Dark", "Choco Matcha", "Original", "Strawberry"],
        photos: ["/kitkat-full.png"],
      },
      {
        name: "Pepero",
        price: "₱45",
        flavors: ["Almond", "Original", "Strawberry", "White Cookie"],
        photos: ["/pepero-full.png"],
      },
    ],
  },
  {
    kanji: "肴",
    title: "SNACKS",
    tone: "red",
    items: [
      {
        name: "Lotte OK Luncheon Meat",
        price: "₱110",
        note: "Original",
        photos: ["/lotte_ok.png"],
      },
      {
        name: "Namkwang Seaweed",
        price: "₱55",
        note: "3 pcs",
        photos: ["/namkwang_seaweed.png"],
      },
      { name: "Lion King Sungsung Peanuts", price: "₱190", photos: ["/peanut.png"] },
    ],
  },
];
