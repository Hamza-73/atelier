// Curated, pre-verified Unsplash imagery across architecture / interiors / furniture / studio.
export const IMAGES = [
  { id: "img-01", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Living room, warm light" },
  { id: "img-02", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Minimal living space" },
  { id: "img-03", url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Bedroom, natural tones" },
  { id: "img-04", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Kitchen, stone surfaces" },
  { id: "img-05", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Dining area, soft daylight" },
  { id: "img-06", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Hallway with art" },
  { id: "img-07", url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Reading corner" },
  { id: "img-08", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80", category: "interior", label: "Bathroom, marble" },
  { id: "img-09", url: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=80", category: "architecture", label: "Facade, concrete and glass" },
  { id: "img-10", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80", category: "architecture", label: "Modern house exterior" },
  { id: "img-11", url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1600&q=80", category: "architecture", label: "Stairwell, structural lines" },
  { id: "img-12", url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80", category: "architecture", label: "Courtyard, geometry" },
  { id: "img-13", url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80", category: "furniture", label: "Armchair, textured fabric" },
  { id: "img-14", url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80", category: "furniture", label: "Wooden table, detail" },
  { id: "img-15", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80", category: "furniture", label: "Ceramic vessels" },
  { id: "img-16", url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80", category: "furniture", label: "Lounge chair, studio light" },
  { id: "img-17", url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80", category: "studio", label: "Design studio, desk" },
  { id: "img-18", url: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1600&q=80", category: "studio", label: "Material samples" },
  { id: "img-19", url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80", category: "studio", label: "Sketching at desk" },
  { id: "img-20", url: "https://images.unsplash.com/photo-1449247613801-ab06418e2861?auto=format&fit=crop&w=1600&q=80", category: "architecture", label: "Interior archway" },
];

export function imageById(id) {
  return IMAGES.find((img) => img.id === id) || IMAGES[0];
}

export const FOCAL_POINTS = ["top", "center", "bottom", "left", "right"];

export const focalToObjectPosition = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};
