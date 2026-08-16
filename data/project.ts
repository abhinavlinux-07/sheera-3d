export interface WalkthroughSection {
  id: string;
  number: string;
  title: string;
  frameCount: number;
  path: string;
  primaryCopy: string;
  secondaryCopy: string;
  metadata: string;
  subPhases?: { minProgress: number; maxProgress: number; text: string }[];
}

export const walkthroughSections: WalkthroughSection[] = [
  {
    id: "arrival",
    number: "01",
    title: "ARRIVAL",
    frameCount: 300,
    path: "/walkthrough/01-arrival",
    primaryCopy: "THE FIRST IMPRESSION",
    secondaryCopy: "Architecture begins before you enter.",
    metadata: "EXTERIOR → MAIN ENTRANCE"
  },
  {
    id: "entry",
    number: "02",
    title: "ENTRY",
    frameCount: 300,
    path: "/walkthrough/02-entry",
    primaryCopy: "STEP INTO THE HOME",
    secondaryCopy: "A considered transition from exterior character to interior warmth.",
    metadata: "MAIN ENTRANCE → LIVING ROOM"
  },
  {
    id: "living",
    number: "03",
    title: "LIVING",
    frameCount: 300,
    path: "/walkthrough/03-living-lounge-bedroom",
    primaryCopy: "SPACES THAT FLOW",
    secondaryCopy: "Living, gathering and retreating are connected through a continuous spatial experience.",
    metadata: "LIVING ROOM → LOUNGE → BEDROOM",
    subPhases: [
      { minProgress: 0, maxProgress: 0.30, text: "A SPACE TO LIVE" },
      { minProgress: 0.30, maxProgress: 0.60, text: "A SPACE TO PAUSE" },
      { minProgress: 0.60, maxProgress: 1.00, text: "A SPACE TO REST" }
    ]
  },
  {
    id: "retreat",
    number: "04",
    title: "RETREAT",
    frameCount: 300,
    path: "/walkthrough/04-bedroom-retreat",
    primaryCopy: "A PRIVATE EXPRESSION",
    secondaryCopy: "Layered textiles, timber and filtered daylight create a quieter sense of luxury.",
    metadata: "FOUR-POSTER BEDROOM → CORAL-CURTAIN BEDROOM"
  },
  {
    id: "detail",
    number: "05",
    title: "DETAIL",
    frameCount: 240,
    path: "/walkthrough/05-retreat-bathroom",
    primaryCopy: "THE DETAILS COMPLETE THE EXPERIENCE",
    secondaryCopy: "Material, light and proportion continue the same design language into the most private spaces.",
    metadata: "CORAL-CURTAIN BEDROOM → BATHROOM"
  }
];

export const designPrinciples = [
  {
    number: "01",
    title: "PURPOSE",
    description: "Every space has a defined role, responding directly to movement, light, and how inhabitants engage with their environment."
  },
  {
    number: "02",
    title: "MATERIAL",
    description: "Wood, tile, stone, textile and metal work as one unified visual and tactile language across all rooms."
  },
  {
    number: "03",
    title: "LIGHT",
    description: "Natural daylight and layered artificial illumination collaborate to sculpt spatial volume and shape mood."
  },
  {
    number: "04",
    title: "LIVING",
    description: "The design supports real daily life, balancing aesthetic elegance with uncompromised functional practicality."
  }
];

export const materialCategories = [
  {
    id: "wood",
    name: "WOOD",
    description: "Warm timber furniture, fluted paneling, and crafted architectural joinery that bring tactile organic depth.",
    image: "/images/details/facade_wood.jpg"
  },
  {
    id: "textile",
    name: "TEXTILE",
    description: "Soft coral curtains, woven rugs, and layered bedding that soften architectural geometry with quiet luxury.",
    image: "/images/details/coral_curtains.jpg"
  },
  {
    id: "tile",
    name: "TILE",
    description: "Textured beige surfaces, patterned floor tiles, and crafted bathroom cladding with understated elegance.",
    image: "/images/details/textured_tiles.jpg"
  },
  {
    id: "light",
    name: "LIGHT",
    description: "Crystal chandeliers, warm fluted pendants, and indirect cove illumination guiding sightlines.",
    image: "/images/details/living_chandelier.jpg"
  },
  {
    id: "greenery",
    name: "GREENERY",
    description: "Carefully placed indoor planters and foliage establishing visual connection with nature.",
    image: "/images/details/lounge_chairs.jpg"
  }
];

export const detailItems = [
  { title: "Crystal Chandelier", category: "Lighting", image: "/images/details/living_chandelier.jpg" },
  { title: "Carved Bedpost", category: "Timber", image: "/images/details/four_poster_bed.jpg" },
  { title: "Cane Furniture Detail", category: "Craftsmanship", image: "/images/details/cane_furniture.jpg" },
  { title: "Layered Coral Drapes", category: "Textiles", image: "/images/details/coral_curtains.jpg" },
  { title: "Patterned Floor Tiles", category: "Material", image: "/images/details/textured_tiles.jpg" },
  { title: "Custom TV Console", category: "Joinery", image: "/images/details/tv_wall_wood.jpg" },
  { title: "Vessel Basin & Stone Counter", category: "Sanitaryware", image: "/images/details/stone_counter.jpg" },
  { title: "Illuminated Wall Niche", category: "Lighting", image: "/images/details/crystal_pendant.jpg" },
  { title: "Wooden Entrance Portico", category: "Architecture", image: "/images/details/entrance_door.jpg" },
  { title: "Roman Blinds", category: "Window Treatment", image: "/images/details/roman_blinds.jpg" }
];
