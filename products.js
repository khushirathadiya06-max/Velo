/* ============================================================
   products.js
   All product data lives here, separate from UI logic.
   Replace "images" paths with your real photos in /assets/images/
   Category values used for filtering: flowers, keychains,
   hair-accessories, bouquets, gifts
   "tags" is an extra array used so a product can also show up
   under the "Gifts" filter without changing its main category.
   ============================================================ */

const PRODUCTS = [
  {
    id: "flower-pink-tulip",
    name: "Pink Crochet Tulip",
    category: "flowers",
    price: 150,
    description: "A single handcrafted pink crochet tulip, stitched petal by petal for a soft, realistic finish. Perfect as a standalone gift or paired with others in a bouquet.",
    images: ["assets/images/pink-tulip-1.jpg", "assets/images/pink-tulip-2.jpg"],
    colors: ["Pink", "Baby Pink"],
    featured: true,
    bestseller: true,
    tags: []
  },
  {
    id: "flower-lavender-tulip",
    name: "Lavender Crochet Tulip",
    category: "flowers",
    price: 150,
    description: "A dreamy lavender crochet tulip with a sturdy stem, ideal for a bud vase or as part of a custom bouquet.",
    images: ["assets/images/lavender-tulip-1.jpg"],
    colors: ["Lavender"],
    featured: false,
    bestseller: false,
    tags: []
  },
  {
    id: "flower-white-lily",
    name: "White Crochet Lily",
    category: "flowers",
    price: 170,
    description: "An elegant white crochet lily with delicate detailing, great for occasions that call for something classic and refined.",
    images: ["assets/images/white-lily-1.jpg"],
    colors: ["White", "Ivory"],
    featured: false,
    bestseller: false,
    tags: ["gift"]
  },
  {
    id: "flower-sunflower",
    name: "Crochet Sunflower",
    category: "flowers",
    price: 160,
    description: "A cheerful crochet sunflower with warm yellow petals and a soft brown center — a little burst of sunshine that never wilts.",
    images: ["assets/images/sunflower-1.jpg"],
    colors: ["Yellow"],
    featured: false,
    bestseller: true,
    tags: []
  },
  {
    id: "flower-rose",
    name: "Crochet Rose",
    category: "flowers",
    price: 180,
    description: "A romantic crochet rose with layered petals, handmade to last far longer than the real thing.",
    images: ["assets/images/rose-1.jpg"],
    colors: ["Red", "Pink", "Peach"],
    featured: true,
    bestseller: false,
    tags: ["gift"]
  },
  {
    id: "flower-daisy",
    name: "Crochet Daisy",
    category: "flowers",
    price: 130,
    description: "A simple, sweet crochet daisy — a small everyday delight for a desk, shelf, or bouquet filler.",
    images: ["assets/images/daisy-1.jpg"],
    colors: ["White", "Yellow"],
    featured: false,
    bestseller: false,
    tags: []
  },
  {
    id: "keychain-bow",
    name: "Crochet Bow Keychain",
    category: "keychains",
    price: 90,
    description: "A dainty crochet bow keychain that adds a soft, handmade touch to your keys or bag.",
    images: ["assets/images/bow-keychain-1.jpg"],
    colors: ["Pink", "Cream", "Sage"],
    featured: false,
    bestseller: true,
    tags: ["gift"]
  },
  {
    id: "keychain-bee",
    name: "Crochet Bee Keychain",
    category: "keychains",
    price: 100,
    description: "A tiny, plump crochet bee keychain with hand-stitched stripes — cute enough to make anyone smile.",
    images: ["assets/images/bee-keychain-1.jpg"],
    colors: ["Yellow/Black"],
    featured: false,
    bestseller: false,
    tags: ["gift"]
  },
  {
    id: "keychain-cherry",
    name: "Crochet Cherry Keychain",
    category: "keychains",
    price: 90,
    description: "A pair of plump crochet cherries on a single keyring — a playful, pocket-sized handmade accessory.",
    images: ["assets/images/cherry-keychain-1.jpg"],
    colors: ["Red"],
    featured: false,
    bestseller: false,
    tags: []
  },
  {
    id: "keychain-heart",
    name: "Crochet Heart Keychain",
    category: "keychains",
    price: 90,
    description: "A soft little crochet heart keychain, perfect as a small thoughtful gift for someone you love.",
    images: ["assets/images/heart-keychain-1.jpg"],
    colors: ["Red", "Pink", "Lavender"],
    featured: true,
    bestseller: false,
    tags: ["gift"]
  },
  {
    id: "hair-flower-clip",
    name: "Crochet Flower Hair Clip",
    category: "hair-accessories",
    price: 120,
    description: "A handmade crochet flower hair clip, lightweight and gentle on hair, great for everyday wear or special occasions.",
    images: ["assets/images/hair-clip-1.jpg"],
    colors: ["Pink", "Lavender", "Baby Blue"],
    featured: false,
    bestseller: true,
    tags: ["gift"]
  },
  {
    id: "bouquet-mini",
    name: "Mini Crochet Bouquet",
    category: "bouquets",
    price: 499,
    description: "A small handmade bouquet of assorted crochet flowers wrapped with care — a keepsake gift that lasts forever, unlike fresh flowers.",
    images: ["assets/images/mini-bouquet-1.jpg", "assets/images/mini-bouquet-2.jpg"],
    colors: ["Mixed Pastels"],
    featured: true,
    bestseller: true,
    tags: ["gift"]
  }
];
