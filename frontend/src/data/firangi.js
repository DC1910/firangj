// FIRANGI — centralized mock dataset (frontend-only prototype)
// All data is static/mock. No backend.

const U = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=srgb&fm=jpg&w=${w}&q=80`;

export const formatINR = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

// ----------------------------------------------------------------------------
// EDITORIAL / HERO IMAGERY
// ----------------------------------------------------------------------------
export const editorialImages = {
  heroPrimary: U("1603697513241-9712a5bd0e9a", 1800),
  heroSecondary: U("1706425458851-bee8e78d8316", 1200),
  studio: U("1772191530787-b9546da02fbc", 1400),
  neutralProps: U("1762541539540-51495afbb955", 1400),
  flatlayA: U("1546177461-668e7784915e", 1200),
  flatlayB: U("1617611313649-fbddfaa37b52", 1200),
};

// ----------------------------------------------------------------------------
// CATEGORIES
// ----------------------------------------------------------------------------
export const categories = [
  { slug: "bags", name: "Bags", description: "Structured leather, chain shoulder bags & clutches.", image: U("1605733513597-a8f8341084e6", 900) },
  { slug: "jewellery", name: "Jewellery", description: "Pearl, gold and statement pieces for close-ups.", image: U("1640083239745-9bbd77a2097f", 900) },
  { slug: "flowers", name: "Flowers & Botanicals", description: "Fresh arrangements, dried stems & sculptural stems.", image: U("1593624212548-d1aaa54d8057", 900) },
  { slug: "sunglasses", name: "Sunglasses", description: "Classic, tortoiseshell & sculptural eyewear.", image: U("1611222777277-61319d63ca94", 900) },
  { slug: "shoes", name: "Shoes", description: "Heels and sculptural footwear for editorials.", image: U("1535043934128-cf0b28d52f95", 900) },
  { slug: "books", name: "Books & Stationery", description: "Vintage hardcovers and coffee-table stacks.", image: U("1595123336219-5eedd543bc4a", 900) },
  { slug: "tableware", name: "Tableware", description: "Ceramic dinner sets, glassware & flatware.", image: U("1740478949628-ff562c3c3923", 900) },
  { slug: "furniture", name: "Furniture", description: "Accent chairs, side tables & stools.", image: U("1581539250439-c96689b516dd", 900) },
  { slug: "vases", name: "Vases", description: "Ribbed glass, sculptural ceramic & stoneware.", image: U("1631125915902-d8abe9225ff2", 900) },
  { slug: "mirrors", name: "Mirrors", description: "Antique gold and round decorative mirrors.", image: U("1612392549386-b6969764af6f", 900) },
  { slug: "trays", name: "Trays", description: "Marble, brass and lacquer styling trays.", image: U("1634731206404-2a4b1e1120d9", 900) },
  { slug: "decor", name: "Decorative Objects", description: "Candlesticks, sculptures & lifestyle pieces.", image: U("1556893289-5ccc75ebd2bf", 900) },
];

export const categoryName = (slug) =>
  categories.find((c) => c.slug === slug)?.name || slug;

const SHOOT = {
  fashion: "Fashion Campaign",
  product: "Product Photography",
  editorial: "Editorial",
  lifestyle: "Lifestyle",
  film: "Film & Motion",
  social: "Social Media",
  ad: "Advertising",
  interior: "Interior / Set",
};

// ----------------------------------------------------------------------------
// PROPS (32)
// ----------------------------------------------------------------------------
export const props = [
  {
    id: "fr-001", slug: "vintage-tan-leather-handbag", name: "Vintage Tan Leather Handbag",
    category: "bags",
    description: "A softly patinated tan leather handbag with brushed brass hardware and a structured silhouette. Its warm honey tone reads beautifully against ivory and stone sets.",
    pricePerDay: 850, images: [U("1605733513597-a8f8341084e6"), U("1705909237050-7a7625b47fac")],
    color: "Tan", material: "Full-grain leather", dimensions: "32 × 24 × 14 cm", condition: "Excellent",
    style: "Vintage", shootTypes: [SHOOT.fashion, SHOOT.editorial, SHOOT.product],
    availability: "available", rentalCount: 46, featured: true, tags: ["leather", "warm", "hero"],
  },
  {
    id: "fr-002", slug: "gold-chain-shoulder-bag", name: "Gold Chain Shoulder Bag",
    category: "bags",
    description: "A compact quilted shoulder bag finished with a delicate gold chain strap. A refined accent piece for hands and campaign flat-lays.",
    pricePerDay: 950, images: [U("1705909237050-7a7625b47fac"), U("1605733513597-a8f8341084e6")],
    color: "Ivory / Gold", material: "Quilted leather", dimensions: "22 × 15 × 7 cm", condition: "Like new",
    style: "Contemporary", shootTypes: [SHOOT.fashion, SHOOT.social, SHOOT.editorial],
    availability: "available", rentalCount: 38, featured: true, tags: ["gold", "chain"],
  },
  {
    id: "fr-003", slug: "pearl-statement-necklace", name: "Pearl Statement Necklace",
    category: "jewellery",
    description: "An oversized baroque pearl necklace strung on a fine gold clasp. Catches soft light for luminous jewellery close-ups.",
    pricePerDay: 650, images: [U("1640083239745-9bbd77a2097f"), U("1654699991520-aaaf4dd2608b")],
    color: "Pearl white", material: "Baroque pearl, gold-plate", dimensions: "45 cm strand", condition: "Excellent",
    style: "Classic", shootTypes: [SHOOT.editorial, SHOOT.product, SHOOT.fashion],
    availability: "available", rentalCount: 61, featured: true, tags: ["pearl", "luminous"],
  },
  {
    id: "fr-004", slug: "layered-gold-chain-set", name: "Layered Gold Chain Set",
    category: "jewellery",
    description: "A curated trio of fine gold chains in graduated lengths, ideal for layered neckline styling and detail shots.",
    pricePerDay: 550, images: [U("1633934542430-0905ccb5f050"), U("1602173574767-37ac01994b2a")],
    color: "Gold", material: "Gold-plated brass", dimensions: "40–55 cm", condition: "Like new",
    style: "Contemporary", shootTypes: [SHOOT.fashion, SHOOT.social, SHOOT.editorial],
    availability: "reserved", availableFrom: "2026-02-18", rentalCount: 29, featured: false, tags: ["gold", "layered"],
  },
  {
    id: "fr-005", slug: "pearl-drop-earrings", name: "Pearl Drop Earrings",
    category: "jewellery",
    description: "Elegant freshwater pearl drops on slender gold hooks. A delicate finishing accent for beauty and portrait work.",
    pricePerDay: 450, images: [U("1654699991520-aaaf4dd2608b"), U("1515562141207-7a88fb7ce338")],
    color: "Pearl / Gold", material: "Freshwater pearl", dimensions: "4 cm drop", condition: "Excellent",
    style: "Classic", shootTypes: [SHOOT.editorial, SHOOT.product],
    availability: "available", rentalCount: 33, featured: false, tags: ["pearl", "earrings"],
  },
  {
    id: "fr-006", slug: "gold-cuff-bracelet", name: "Sculptural Gold Cuff",
    category: "jewellery",
    description: "A weighty, hand-finished gold cuff with an organic sculptural curve. Reads as a hero accessory in monochrome sets.",
    pricePerDay: 600, images: [U("1602173574767-37ac01994b2a"), U("1633934542430-0905ccb5f050")],
    color: "Gold", material: "Brushed brass", dimensions: "6 cm wide", condition: "Excellent",
    style: "Modern", shootTypes: [SHOOT.fashion, SHOOT.editorial, SHOOT.ad],
    availability: "available", rentalCount: 21, featured: false, tags: ["gold", "cuff"],
  },
  {
    id: "fr-007", slug: "white-hydrangea-arrangement", name: "White Hydrangea Arrangement",
    category: "flowers",
    description: "A full, cloud-like arrangement of white hydrangea in a clear glass vessel. Refreshed per booking for lush lifestyle scenes.",
    pricePerDay: 1200, images: [U("1593624212548-d1aaa54d8057"), U("1560256608-43f0b6f7588e")],
    color: "White", material: "Fresh florals, glass", dimensions: "40 × 35 cm", condition: "Fresh per booking",
    style: "Romantic", shootTypes: [SHOOT.lifestyle, SHOOT.editorial, SHOOT.ad, SHOOT.interior],
    availability: "available", rentalCount: 52, featured: true, tags: ["florals", "fresh", "hero"],
  },
  {
    id: "fr-008", slug: "dried-pampas-bouquet", name: "Dried Pampas Grass Bouquet",
    category: "flowers",
    description: "Tall, feathery pampas plumes in a warm wheat tone. Long-lasting texture for neutral and boho-editorial styling.",
    pricePerDay: 700, images: [U("1570451488142-71d08e1511e3"), U("1550711147-019468d5350a")],
    color: "Wheat", material: "Dried pampas", dimensions: "90 cm stems", condition: "Excellent",
    style: "Organic", shootTypes: [SHOOT.lifestyle, SHOOT.interior, SHOOT.social],
    availability: "available", rentalCount: 40, featured: false, tags: ["dried", "texture"],
  },
  {
    id: "fr-009", slug: "fresh-peony-vase", name: "Blush Peony Arrangement",
    category: "flowers",
    description: "Soft blush peonies arranged loosely in a clear glass vase. A romantic hero for beauty and bridal campaigns.",
    pricePerDay: 1500, images: [U("1575178114667-c8a832c61f45"), U("1575178094668-132dc931ad35")],
    color: "Blush pink", material: "Fresh florals, glass", dimensions: "38 × 30 cm", condition: "Fresh per booking",
    style: "Romantic", shootTypes: [SHOOT.editorial, SHOOT.ad, SHOOT.lifestyle],
    availability: "rented", availableFrom: "2026-02-22", rentalCount: 44, featured: false, tags: ["peony", "fresh"],
  },
  {
    id: "fr-010", slug: "dried-botanical-still-life", name: "Dried Botanical Cluster",
    category: "flowers",
    description: "A muted cluster of dried stems and seed heads in dusty lavender and taupe. Adds quiet texture to flat-lays.",
    pricePerDay: 500, images: [U("1586244897859-2cd81e1cad1f"), U("1706641248702-6ff0a3d2812d")],
    color: "Dusty lavender", material: "Dried botanicals", dimensions: "45 cm", condition: "Excellent",
    style: "Organic", shootTypes: [SHOOT.product, SHOOT.editorial, SHOOT.social],
    availability: "available", rentalCount: 18, featured: false, tags: ["dried", "muted"],
  },
  {
    id: "fr-011", slug: "classic-black-sunglasses", name: "Classic Black Sunglasses",
    category: "sunglasses",
    description: "Timeless black acetate frames with a subtle keyhole bridge. A clean, graphic accent for portrait and fashion work.",
    pricePerDay: 450, images: [U("1611222777277-61319d63ca94"), U("1608539733292-190446b22b83")],
    color: "Black", material: "Acetate", dimensions: "14 cm width", condition: "Like new",
    style: "Classic", shootTypes: [SHOOT.fashion, SHOOT.social, SHOOT.product],
    availability: "available", rentalCount: 57, featured: true, tags: ["eyewear", "graphic"],
  },
  {
    id: "fr-012", slug: "tortoiseshell-sunglasses", name: "Tortoiseshell Sunglasses",
    category: "sunglasses",
    description: "Warm tortoiseshell frames with amber lenses. Pairs beautifully with tan and cream palettes.",
    pricePerDay: 500, images: [U("1608539733292-190446b22b83"), U("1559070081-648fb00b2ed1")],
    color: "Tortoiseshell", material: "Acetate", dimensions: "14.5 cm width", condition: "Excellent",
    style: "Retro", shootTypes: [SHOOT.fashion, SHOOT.editorial, SHOOT.lifestyle],
    availability: "available", rentalCount: 31, featured: false, tags: ["eyewear", "amber"],
  },
  {
    id: "fr-013", slug: "sculptural-frame-sunglasses", name: "Sculptural Frame Sunglasses",
    category: "sunglasses",
    description: "Architectural angular frames in a smoky hue. A statement piece for avant-garde editorial styling.",
    pricePerDay: 650, images: [U("1559070081-648fb00b2ed1"), U("1611222777277-61319d63ca94")],
    color: "Smoke", material: "Acetate", dimensions: "15 cm width", condition: "Like new",
    style: "Avant-garde", shootTypes: [SHOOT.editorial, SHOOT.fashion, SHOOT.ad],
    availability: "reserved", availableFrom: "2026-02-16", rentalCount: 14, featured: false, tags: ["eyewear", "statement"],
  },
  {
    id: "fr-014", slug: "ivory-strap-heels", name: "Ivory Strappy Heels",
    category: "shoes",
    description: "Delicate ivory strappy heels with a sculpted stiletto. Elegant lines for bridal and fashion campaigns.",
    pricePerDay: 850, images: [U("1535043934128-cf0b28d52f95"), U("1581101767113-1677fc2beaa8")],
    color: "Ivory", material: "Satin & leather", dimensions: "Size 38 EU", condition: "Excellent",
    style: "Elegant", shootTypes: [SHOOT.fashion, SHOOT.editorial, SHOOT.ad],
    availability: "available", rentalCount: 27, featured: true, tags: ["heels", "bridal"],
  },
  {
    id: "fr-015", slug: "sculptural-block-heels", name: "Sculptural Block Heels",
    category: "shoes",
    description: "Modern block-heel mules with a sculptural silhouette in warm nude. A contemporary accent for still life.",
    pricePerDay: 750, images: [U("1581101767113-1677fc2beaa8"), U("1535043934128-cf0b28d52f95")],
    color: "Nude", material: "Leather", dimensions: "Size 37 EU", condition: "Like new",
    style: "Modern", shootTypes: [SHOOT.product, SHOOT.fashion, SHOOT.social],
    availability: "available", rentalCount: 19, featured: false, tags: ["heels", "nude"],
  },
  {
    id: "fr-016", slug: "vintage-hardcover-book-set", name: "Vintage Hardcover Book Set",
    category: "books",
    description: "A stack of cloth-bound vintage hardcovers in muted spines. Perfect for adding height, texture and character to a set.",
    pricePerDay: 550, images: [U("1595123336219-5eedd543bc4a"), U("1546177461-668e7784915e")],
    color: "Mixed neutrals", material: "Cloth-bound paper", dimensions: "Set of 6", condition: "Good, characterful",
    style: "Vintage", shootTypes: [SHOOT.interior, SHOOT.lifestyle, SHOOT.product],
    availability: "available", rentalCount: 35, featured: false, tags: ["books", "texture"],
  },
  {
    id: "fr-017", slug: "coffee-table-book-stack", name: "Coffee-Table Book Stack",
    category: "books",
    description: "A curated stack of large-format art and fashion books with clean neutral covers. A staple styling riser.",
    pricePerDay: 600, images: [U("1546177461-668e7784915e"), U("1595123336219-5eedd543bc4a")],
    color: "Cream / Charcoal", material: "Hardcover", dimensions: "Set of 4", condition: "Excellent",
    style: "Contemporary", shootTypes: [SHOOT.interior, SHOOT.lifestyle, SHOOT.social],
    availability: "available", rentalCount: 42, featured: false, tags: ["books", "riser"],
  },
  {
    id: "fr-018", slug: "ceramic-dinner-set", name: "Handglazed Ceramic Dinner Set",
    category: "tableware",
    description: "A speckled stoneware dinner set in warm oatmeal with a reactive glaze. Beautiful for food and lifestyle tablescapes.",
    pricePerDay: 900, images: [U("1740478949628-ff562c3c3923"), U("1610128361323-6e941c97f023")],
    color: "Oatmeal", material: "Glazed stoneware", dimensions: "Service for 4", condition: "Excellent",
    style: "Artisanal", shootTypes: [SHOOT.product, SHOOT.lifestyle, SHOOT.ad],
    availability: "available", rentalCount: 48, featured: true, tags: ["ceramic", "tablescape"],
  },
  {
    id: "fr-019", slug: "stoneware-serving-bowls", name: "Stoneware Serving Bowls",
    category: "tableware",
    description: "A pair of hand-thrown serving bowls with soft matte glaze. Adds organic warmth to culinary shoots.",
    pricePerDay: 650, images: [U("1610128361323-6e941c97f023"), U("1740478949628-ff562c3c3923")],
    color: "Sand", material: "Stoneware", dimensions: "26 cm diameter", condition: "Like new",
    style: "Artisanal", shootTypes: [SHOOT.product, SHOOT.lifestyle],
    availability: "available", rentalCount: 22, featured: false, tags: ["ceramic", "bowls"],
  },
  {
    id: "fr-020", slug: "vintage-accent-chair", name: "Vintage Accent Chair",
    category: "furniture",
    description: "A sculptural single-seat accent chair with a slim frame. A striking anchor piece for portrait and interior sets.",
    pricePerDay: 1500, images: [U("1581539250439-c96689b516dd"), U("1772191530787-b9546da02fbc")],
    color: "Charcoal", material: "Wood & upholstery", dimensions: "78 × 60 × 55 cm", condition: "Excellent",
    style: "Mid-century", shootTypes: [SHOOT.interior, SHOOT.editorial, SHOOT.film],
    availability: "available", rentalCount: 30, featured: true, tags: ["furniture", "anchor"],
  },
  {
    id: "fr-021", slug: "cane-side-table", name: "Cane Rattan Side Table",
    category: "furniture",
    description: "A woven cane side table in natural rattan. Lends warm, tactile character as a styling surface.",
    pricePerDay: 950, images: [U("1762541539540-51495afbb955"), U("1581539250439-c96689b516dd")],
    color: "Natural cane", material: "Rattan & wood", dimensions: "55 × 45 cm", condition: "Excellent",
    style: "Organic", shootTypes: [SHOOT.interior, SHOOT.lifestyle, SHOOT.ad],
    availability: "reserved", availableFrom: "2026-02-20", rentalCount: 17, featured: false, tags: ["furniture", "cane"],
  },
  {
    id: "fr-022", slug: "sculptural-ceramic-vase", name: "Sculptural Ceramic Vase",
    category: "vases",
    description: "An organically curved ceramic vase in warm bisque. A quiet sculptural hero for minimal still life.",
    pricePerDay: 700, images: [U("1631125915902-d8abe9225ff2"), U("1597696929736-6d13bed8e6a8")],
    color: "Bisque", material: "Ceramic", dimensions: "34 cm tall", condition: "Excellent",
    style: "Sculptural", shootTypes: [SHOOT.product, SHOOT.editorial, SHOOT.interior],
    availability: "available", rentalCount: 39, featured: true, tags: ["vase", "sculptural"],
  },
  {
    id: "fr-023", slug: "ribbed-glass-vase", name: "Ribbed Glass Vase",
    category: "vases",
    description: "A fluted, ribbed glass vase that refracts light into soft lines. Elegant with single stems or botanicals.",
    pricePerDay: 550, images: [U("1597696929736-6d13bed8e6a8"), U("1631125915902-d8abe9225ff2")],
    color: "Clear", material: "Ribbed glass", dimensions: "28 cm tall", condition: "Like new",
    style: "Contemporary", shootTypes: [SHOOT.product, SHOOT.lifestyle, SHOOT.social],
    availability: "available", rentalCount: 25, featured: false, tags: ["vase", "glass"],
  },
  {
    id: "fr-024", slug: "stoneware-bud-vase-trio", name: "Stoneware Bud Vase Trio",
    category: "vases",
    description: "A set of three petite bud vases in tonal earth glazes. Charming grouped accents for tablescapes.",
    pricePerDay: 500, images: [U("1631125915902-d8abe9225ff2"), U("1740478949628-ff562c3c3923")],
    color: "Earth tones", material: "Stoneware", dimensions: "12–16 cm", condition: "Excellent",
    style: "Artisanal", shootTypes: [SHOOT.product, SHOOT.social, SHOOT.lifestyle],
    availability: "available", rentalCount: 20, featured: false, tags: ["vase", "trio"],
  },
  {
    id: "fr-025", slug: "antique-gold-mirror", name: "Antique Gold Mirror",
    category: "mirrors",
    description: "An ornate antique gold-framed mirror with a gently aged finish. Adds depth, reflection and old-world glamour to sets.",
    pricePerDay: 1200, images: [U("1612392549386-b6969764af6f"), U("1585033120874-0300a04ded70")],
    color: "Antique gold", material: "Gilt frame, glass", dimensions: "90 × 60 cm", condition: "Good, characterful",
    style: "Antique", shootTypes: [SHOOT.editorial, SHOOT.interior, SHOOT.film],
    availability: "available", rentalCount: 34, featured: true, tags: ["mirror", "gilt"],
  },
  {
    id: "fr-026", slug: "round-decorative-mirror", name: "Round Decorative Mirror",
    category: "mirrors",
    description: "A slim-framed round mirror in warm brass. Clean and modern for reflective product and portrait compositions.",
    pricePerDay: 800, images: [U("1585033120874-0300a04ded70"), U("1612392549386-b6969764af6f")],
    color: "Brass", material: "Metal frame, glass", dimensions: "70 cm diameter", condition: "Excellent",
    style: "Modern", shootTypes: [SHOOT.product, SHOOT.interior, SHOOT.social],
    availability: "available", rentalCount: 23, featured: false, tags: ["mirror", "round"],
  },
  {
    id: "fr-027", slug: "marble-jewellery-tray", name: "Marble Jewellery Tray",
    category: "trays",
    description: "A polished marble tray with soft grey veining. An elegant surface for jewellery, fragrance and product close-ups.",
    pricePerDay: 600, images: [U("1634731206404-2a4b1e1120d9"), U("1625746735133-66dccc334545")],
    color: "White marble", material: "Carrara marble", dimensions: "30 × 20 cm", condition: "Excellent",
    style: "Luxe", shootTypes: [SHOOT.product, SHOOT.editorial, SHOOT.ad],
    availability: "available", rentalCount: 51, featured: true, tags: ["tray", "marble"],
  },
  {
    id: "fr-028", slug: "brass-serving-tray", name: "Brass Serving Tray",
    category: "trays",
    description: "A hammered brass tray with a warm, reflective finish. Grounds flat-lays with a rich metallic tone.",
    pricePerDay: 650, images: [U("1772459125358-e587337c4a92"), U("1747571855541-394b53b3b7e8")],
    color: "Brass", material: "Hammered brass", dimensions: "40 × 28 cm", condition: "Like new",
    style: "Classic", shootTypes: [SHOOT.product, SHOOT.lifestyle, SHOOT.ad],
    availability: "available", rentalCount: 28, featured: false, tags: ["tray", "brass"],
  },
  {
    id: "fr-029", slug: "lacquer-styling-tray", name: "Taupe Lacquer Styling Tray",
    category: "trays",
    description: "A minimal rectangular lacquer tray in soft taupe. A clean neutral base for building product vignettes.",
    pricePerDay: 500, images: [U("1747571855541-394b53b3b7e8"), U("1772459125358-e587337c4a92")],
    color: "Taupe", material: "Lacquered wood", dimensions: "36 × 24 cm", condition: "Excellent",
    style: "Minimal", shootTypes: [SHOOT.product, SHOOT.social],
    availability: "available", rentalCount: 16, featured: false, tags: ["tray", "minimal"],
  },
  {
    id: "fr-030", slug: "silk-scarf-drape", name: "Hand-Rolled Silk Scarf",
    category: "decor",
    description: "A fluid hand-rolled silk scarf in warm ecru. Beautiful as a draped textile accent or soft styling layer.",
    pricePerDay: 450, images: [U("1606259458027-54d2a728b6ab"), U("1617611313649-fbddfaa37b52")],
    color: "Ecru", material: "Mulberry silk", dimensions: "90 × 90 cm", condition: "Like new",
    style: "Elegant", shootTypes: [SHOOT.product, SHOOT.editorial, SHOOT.fashion],
    availability: "available", rentalCount: 24, featured: false, tags: ["textile", "silk"],
  },
  {
    id: "fr-031", slug: "woven-decor-object", name: "Sculptural Woven Object",
    category: "decor",
    description: "A tactile woven decorative object in natural fibre. Adds organic form and shadow play to minimal compositions.",
    pricePerDay: 500, images: [U("1556893289-5ccc75ebd2bf"), U("1550711147-019468d5350a")],
    color: "Natural", material: "Woven fibre", dimensions: "28 × 22 cm", condition: "Excellent",
    style: "Organic", shootTypes: [SHOOT.product, SHOOT.interior, SHOOT.social],
    availability: "available", rentalCount: 15, featured: false, tags: ["decor", "woven"],
  },
  {
    id: "fr-032", slug: "editorial-still-life-set", name: "Neutral Still-Life Prop Set",
    category: "decor",
    description: "A curated grouping of tonal objects — sculptural forms, a small vessel and a stone — for instant editorial styling.",
    pricePerDay: 1100, images: [U("1762541539540-51495afbb955"), U("1546177461-668e7784915e")],
    color: "Tonal neutrals", material: "Mixed media", dimensions: "Curated set", condition: "Excellent",
    style: "Editorial", shootTypes: [SHOOT.editorial, SHOOT.product, SHOOT.ad],
    availability: "available", rentalCount: 37, featured: true, tags: ["set", "curated", "hero"],
  },
];

export const getPropById = (id) => props.find((p) => p.id === id);
export const getPropBySlug = (slug) => props.find((p) => p.slug === slug);
export const getPropsByCategory = (slug) => props.filter((p) => p.category === slug);
export const getFeaturedProps = () => props.filter((p) => p.featured);
export const getRelatedProps = (prop, count = 4) =>
  props.filter((p) => p.category === prop.category && p.id !== prop.id).slice(0, count);

export const priceRange = {
  min: Math.min(...props.map((p) => p.pricePerDay)),
  max: Math.max(...props.map((p) => p.pricePerDay)),
};

export const allStyles = [...new Set(props.map((p) => p.style))].sort();
export const allShootTypes = [...new Set(props.flatMap((p) => p.shootTypes))].sort();
export const allMaterials = [...new Set(props.map((p) => p.material))].sort();

// ----------------------------------------------------------------------------
// NORMALISED CATALOGUE + FILTER OPTIONS (for the Explore page)
// ----------------------------------------------------------------------------
const CAT_MAP = {
  bags: "Bags", jewellery: "Jewellery", flowers: "Flowers",
  sunglasses: "Fashion Accessories", shoes: "Shoes", tableware: "Tabletop",
  books: "Books", furniture: "Furniture", vases: "Decorative Objects",
  mirrors: "Decorative Objects", trays: "Decorative Objects", decor: "Decorative Objects",
};

const STYLE_MAP = {
  Vintage: "Vintage", Antique: "Vintage", "Mid-century": "Vintage",
  Luxe: "Luxury", Editorial: "Editorial", "Avant-garde": "Editorial",
  Organic: "Rustic", Artisanal: "Rustic",
  Contemporary: "Contemporary", Modern: "Contemporary",
  Classic: "Classic", Elegant: "Classic", Romantic: "Classic", Retro: "Classic",
  Minimal: "Minimal", Sculptural: "Minimal",
};

const SHOOT_MAP = {
  "Fashion Campaign": "Fashion", "Product Photography": "Product", Editorial: "Editorial",
  Lifestyle: "Lifestyle", "Film & Motion": "Film", "Social Media": "Lifestyle",
  Advertising: "Advertising", "Interior / Set": "Lifestyle",
};

const deriveColours = (str) => {
  const s = (str || "").toLowerCase();
  const tags = new Set();
  if (/black|charcoal|smoke/.test(s)) tags.add("Black");
  if (/white|ivory|pearl|clear|bisque/.test(s)) tags.add("White");
  if (/tan|brown|wheat|oatmeal|cane|ecru|natural|tortoise|amber/.test(s)) tags.add("Brown");
  if (/gold|brass/.test(s)) tags.add("Gold");
  if (/silver|marble|grey|gray/.test(s)) tags.add("Silver");
  if (/green|sage|olive/.test(s)) tags.add("Green");
  if (/pink|blush|rose/.test(s)) tags.add("Pink");
  if (/blue|navy|teal/.test(s)) tags.add("Blue");
  if (/neutral|taupe|nude|earth|dusty|tonal|mixed|sand|stone/.test(s)) tags.add("Neutral");
  if (!tags.size) tags.add("Neutral");
  return [...tags];
};

// Enriched, filter-ready dataset (all customer pages can use this too).
export const catalogue = props.map((p) => {
  const primary = CAT_MAP[p.category] || "Decorative Objects";
  const filterCategories = [primary];
  if (["Books", "Flowers", "Furniture", "Decorative Objects"].includes(primary) && p.shootTypes.includes("Lifestyle")) {
    filterCategories.push("Lifestyle");
  }
  const shootTags = new Set(p.shootTypes.map((s) => SHOOT_MAP[s]).filter(Boolean));
  if (["Tabletop", "Flowers"].includes(primary)) shootTags.add("Food");
  return {
    ...p,
    filterCategories,
    styleTag: STYLE_MAP[p.style] || "Contemporary",
    shootTags: [...shootTags],
    colourTags: deriveColours(p.color),
    availabilityGroup: p.availability === "available" ? "Available" : "Currently Rented",
    addedOrder: parseInt(p.id.replace(/\D/g, ""), 10) || 0,
  };
});

export const filterCategoriesList = [
  "Bags", "Jewellery", "Flowers", "Fashion Accessories", "Shoes",
  "Tabletop", "Books", "Furniture", "Decorative Objects", "Lifestyle",
];

export const priceBands = [
  { id: "u500", label: "Under \u20B9500 / day", min: 0, max: 499 },
  { id: "500-1000", label: "\u20B9500 \u2013 \u20B91,000 / day", min: 500, max: 1000 },
  { id: "1000-2000", label: "\u20B91,000 \u2013 \u20B92,000 / day", min: 1001, max: 2000 },
  { id: "2000+", label: "\u20B92,000+ / day", min: 2001, max: Infinity },
];

export const colourOptions = ["Black", "White", "Brown", "Gold", "Silver", "Green", "Pink", "Blue", "Neutral"];
export const colourSwatch = {
  Black: "#1e1b18", White: "#f4f1ea", Brown: "#8a6f52", Gold: "#c2a24a",
  Silver: "#bfbcb6", Green: "#6f7d5f", Pink: "#e3c1c1", Blue: "#8195a6", Neutral: "#d8cec0",
};

export const styleOptions = ["Minimal", "Vintage", "Luxury", "Editorial", "Rustic", "Contemporary", "Classic"];
export const shootTypeOptions = ["Fashion", "Product", "Food", "Editorial", "Film", "Advertising", "Lifestyle"];
export const availabilityOptions = ["Available", "Currently Rented"];

export const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "popular", label: "Most Popular" },
];

// Map a raw dataset slug (used in category links) to a display filter category.
export const slugToFilterCategory = (slug) => CAT_MAP[slug] || null;

// ----------------------------------------------------------------------------
// ADMIN MOCK DATA — rental requests, customers, analytics
// ----------------------------------------------------------------------------
export const rentalRequests = [
  { id: "REQ-2041", customer: "Aarav Mehta", company: "Studio Noir", email: "aarav@studionoir.in", items: 4, propNames: ["Vintage Tan Leather Handbag", "Pearl Statement Necklace"], startDate: "2026-02-18", endDate: "2026-02-20", total: 5200, status: "pending", shootType: "Fashion Campaign", createdAt: "2026-02-10" },
  { id: "REQ-2040", customer: "Isha Kapoor", company: "Bloom & Co.", email: "isha@bloomco.in", items: 3, propNames: ["White Hydrangea Arrangement", "Ribbed Glass Vase"], startDate: "2026-02-16", endDate: "2026-02-17", total: 3450, status: "confirmed", shootType: "Advertising", createdAt: "2026-02-09" },
  { id: "REQ-2039", customer: "Rohan Verma", company: "Frame 24 Films", email: "rohan@frame24.in", items: 6, propNames: ["Vintage Accent Chair", "Antique Gold Mirror"], startDate: "2026-02-14", endDate: "2026-02-19", total: 12800, status: "active", shootType: "Film & Motion", createdAt: "2026-02-06" },
  { id: "REQ-2038", customer: "Neha Sharma", company: "The Edit Studio", email: "neha@theedit.in", items: 2, propNames: ["Marble Jewellery Tray", "Layered Gold Chain Set"], startDate: "2026-02-12", endDate: "2026-02-13", total: 2300, status: "completed", shootType: "Product Photography", createdAt: "2026-02-03" },
  { id: "REQ-2037", customer: "Kabir Singh", company: "Freelance", email: "kabir.shoots@gmail.com", items: 5, propNames: ["Handglazed Ceramic Dinner Set", "Brass Serving Tray"], startDate: "2026-02-11", endDate: "2026-02-12", total: 4100, status: "completed", shootType: "Lifestyle", createdAt: "2026-02-02" },
  { id: "REQ-2036", customer: "Ananya Rao", company: "Maison Rao", email: "ananya@maisonrao.in", items: 3, propNames: ["Blush Peony Arrangement", "Ivory Strappy Heels"], startDate: "2026-02-22", endDate: "2026-02-24", total: 6800, status: "pending", shootType: "Editorial", createdAt: "2026-02-11" },
  { id: "REQ-2035", customer: "Dev Patel", company: "Northlight Media", email: "dev@northlight.in", items: 7, propNames: ["Cane Rattan Side Table", "Sculptural Ceramic Vase"], startDate: "2026-02-20", endDate: "2026-02-23", total: 9600, status: "confirmed", shootType: "Interior / Set", createdAt: "2026-02-08" },
  { id: "REQ-2034", customer: "Meera Nair", company: "Petal Press", email: "meera@petalpress.in", items: 2, propNames: ["Classic Black Sunglasses", "Hand-Rolled Silk Scarf"], startDate: "2026-02-15", endDate: "2026-02-16", total: 1800, status: "cancelled", shootType: "Social Media", createdAt: "2026-02-05" },
];

export const customers = [
  { id: "CUS-118", name: "Aarav Mehta", company: "Studio Noir", email: "aarav@studionoir.in", phone: "+91 98200 11223", city: "Mumbai", rentals: 14, totalSpend: 68400, tier: "Studio", joined: "2024-06-11" },
  { id: "CUS-117", name: "Isha Kapoor", company: "Bloom & Co.", email: "isha@bloomco.in", phone: "+91 99300 44556", city: "Delhi", rentals: 9, totalSpend: 41200, tier: "Agency", joined: "2024-09-02" },
  { id: "CUS-116", name: "Rohan Verma", company: "Frame 24 Films", email: "rohan@frame24.in", phone: "+91 98111 77889", city: "Mumbai", rentals: 21, totalSpend: 132500, tier: "Production", joined: "2023-11-19" },
  { id: "CUS-115", name: "Neha Sharma", company: "The Edit Studio", email: "neha@theedit.in", phone: "+91 90040 22110", city: "Bengaluru", rentals: 7, totalSpend: 28900, tier: "Studio", joined: "2025-01-08" },
  { id: "CUS-114", name: "Kabir Singh", company: "Freelance", email: "kabir.shoots@gmail.com", phone: "+91 97400 55667", city: "Pune", rentals: 5, totalSpend: 15600, tier: "Creator", joined: "2025-03-21" },
  { id: "CUS-113", name: "Ananya Rao", company: "Maison Rao", email: "ananya@maisonrao.in", phone: "+91 98860 33445", city: "Hyderabad", rentals: 12, totalSpend: 58700, tier: "Agency", joined: "2024-07-30" },
  { id: "CUS-112", name: "Dev Patel", company: "Northlight Media", email: "dev@northlight.in", phone: "+91 99870 66778", city: "Ahmedabad", rentals: 18, totalSpend: 96300, tier: "Production", joined: "2024-02-14" },
];

export const analytics = {
  stats: [
    { label: "Total Revenue", value: "₹8,42,600", delta: "+12.4%", trend: "up", sub: "vs last quarter" },
    { label: "Active Rentals", value: "26", delta: "+4", trend: "up", sub: "out this week" },
    { label: "Catalogue Size", value: "312", delta: "+18", trend: "up", sub: "props available" },
    { label: "Utilisation Rate", value: "74%", delta: "-3.1%", trend: "down", sub: "avg. this month" },
  ],
  revenueByMonth: [
    { month: "Sep", revenue: 182000 },
    { month: "Oct", revenue: 214000 },
    { month: "Nov", revenue: 236000 },
    { month: "Dec", revenue: 305000 },
    { month: "Jan", revenue: 268000 },
    { month: "Feb", revenue: 342600 },
  ],
  categoryDemand: [
    { name: "Vases", value: 22 },
    { name: "Jewellery", value: 19 },
    { name: "Flowers", value: 17 },
    { name: "Trays", value: 14 },
    { name: "Bags", value: 12 },
    { name: "Furniture", value: 16 },
  ],
  topProps: [
    { name: "Pearl Statement Necklace", rentals: 61 },
    { name: "Classic Black Sunglasses", rentals: 57 },
    { name: "White Hydrangea Arrangement", rentals: 52 },
    { name: "Marble Jewellery Tray", rentals: 51 },
    { name: "Handglazed Ceramic Dinner Set", rentals: 48 },
  ],
};

export const statusMeta = {
  pending: { label: "Pending", tone: "muted" },
  confirmed: { label: "Confirmed", tone: "accent" },
  active: { label: "Active", tone: "gold" },
  completed: { label: "Completed", tone: "success" },
  cancelled: { label: "Cancelled", tone: "destructive" },
};
