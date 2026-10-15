// Starter templates. Opening one deep-clones this into editor state; never mutate these.

import { IMAGES } from "./images";

const residence = {
  id: "residence",
  name: "Residence",
  category: "Residential",
  description: "Full-bleed interiors and warm neutrals for a luxury residential studio.",
  cover: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  paletteId: "ivory-olive",
  fontId: "editorial-serif",
  sections: [
    {
      id: "nav-1", type: "nav", visible: true, variant: "split", spacing: "M",
      props: { logo: "Residence", links: [{ label: "Projects" }, { label: "Studio" }, { label: "Journal" }, { label: "Contact" }] },
    },
    {
      id: "hero-1", type: "hero", visible: true, variant: "full-bleed", spacing: "L", align: "left",
      props: {
        heading: "Spaces that hold the light.",
        subtext: "A residential design studio crafting interiors defined by material honesty and quiet proportion.",
        buttonLabel: "View Projects",
        imageId: "img-01", focal: "center",
      },
    },
    {
      id: "about-1", type: "about", visible: true, variant: "image-right", spacing: "L", align: "left",
      props: {
        heading: "A practice built on restraint.",
        body: "Founded in 2011, Residence works with a small number of clients each year to develop homes that feel inevitable rather than designed, rooted in site, light, and the textures of daily life.",
        imageId: "img-02", focal: "center",
      },
    },
    {
      id: "gallery-1", type: "gallery", visible: true, variant: "masonry", spacing: "L",
      props: {
        heading: "Selected Interiors",
        images: [
          { imageId: "img-03", focal: "center" },
          { imageId: "img-04", focal: "center" },
          { imageId: "img-05", focal: "center" },
          { imageId: "img-06", focal: "center" },
        ],
      },
    },
    {
      id: "testimonials-1", type: "testimonials", visible: true, variant: "single-quote", spacing: "L",
      props: {
        heading: "Clients",
        items: [
          { quote: "They understood the house before we did. Every room feels considered, never decorated.", author: "Elena Marsh", role: "Private Client, Big Sur" },
        ],
      },
    },
    {
      id: "contact-1", type: "contact", visible: true, variant: "centered", spacing: "L",
      props: {
        heading: "Begin a project.",
        subtext: "We take on a limited number of residential commissions each year.",
        buttonLabel: "Enquire",
        email: "studio@residence.design",
      },
    },
    {
      id: "footer-1", type: "footer", visible: true, variant: "columns", spacing: "M",
      props: {
        logo: "Residence",
        links: [{ label: "Projects" }, { label: "Studio" }, { label: "Journal" }, { label: "Contact" }],
        note: "© Residence Studio. All rights reserved.",
      },
    },
  ],
};

const formStudio = {
  id: "form-studio",
  name: "Form Studio",
  category: "Architecture",
  description: "A minimal architecture portfolio on a strict grid, monochrome and precise.",
  cover: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80",
  paletteId: "monochrome",
  fontId: "minimal-architectural",
  sections: [
    {
      id: "nav-2", type: "nav", visible: true, variant: "centered-stack", spacing: "M",
      props: { logo: "FORM STUDIO", links: [{ label: "Work" }, { label: "Practice" }, { label: "Services" }, { label: "Contact" }] },
    },
    {
      id: "hero-2", type: "hero", visible: true, variant: "stacked-text", spacing: "L", align: "left",
      props: {
        heading: "Architecture, reduced to its essentials.",
        subtext: "FORM STUDIO designs buildings and spaces where structure, light, and material are the only ornament.",
        buttonLabel: "See the Work",
        imageId: "img-09", focal: "center",
      },
    },
    {
      id: "projects-2", type: "projects", visible: true, variant: "editorial", spacing: "L",
      props: {
        heading: "Selected Work",
        items: [
          { title: "Concrete House", category: "Private Residence, 2023", imageId: "img-10", focal: "center" },
          { title: "Atrium Office", category: "Commercial, 2022", imageId: "img-11", focal: "center" },
          { title: "Courtyard Pavilion", category: "Cultural, 2021", imageId: "img-12", focal: "center" },
        ],
      },
    },
    {
      id: "services-2", type: "services", visible: true, variant: "numbered", spacing: "L",
      props: {
        heading: "Services",
        items: [
          { title: "Architecture", description: "Full architectural services from concept through construction administration." },
          { title: "Interiors", description: "Interior architecture developed alongside the building, not after it." },
          { title: "Masterplanning", description: "Site and landscape strategy for larger, phased developments." },
        ],
      },
    },
    {
      id: "about-2", type: "about", visible: true, variant: "image-left", spacing: "L", align: "left",
      props: {
        heading: "Precision as a design value.",
        body: "FORM STUDIO is a twelve-person practice based between two cities, working on cultural, residential, and commercial projects that share a single discipline: nothing extraneous.",
        imageId: "img-17", focal: "center",
      },
    },
    {
      id: "contact-2", type: "contact", visible: true, variant: "split", spacing: "L",
      props: {
        heading: "Start a conversation.",
        subtext: "Tell us about your site, your timeline, and your ambitions.",
        buttonLabel: "Get in Touch",
        email: "hello@formstudio.arch",
      },
    },
    {
      id: "footer-2", type: "footer", visible: true, variant: "minimal", spacing: "M",
      props: {
        logo: "FORM STUDIO",
        links: [{ label: "Work" }, { label: "Practice" }, { label: "Contact" }],
        note: "© Form Studio Architecture.",
      },
    },
  ],
};

const objectsCo = {
  id: "objects-co",
  name: "Objects & Co.",
  category: "Product",
  description: "A furniture and product studio site with warm backgrounds and product-first imagery.",
  cover: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
  paletteId: "terracotta",
  fontId: "contemporary-sans",
  sections: [
    {
      id: "nav-3", type: "nav", visible: true, variant: "split", spacing: "M",
      props: { logo: "Objects & Co.", links: [{ label: "Shop" }, { label: "Collections" }, { label: "Studio" }, { label: "Contact" }] },
    },
    {
      id: "hero-3", type: "hero", visible: true, variant: "split-image", spacing: "L", align: "left",
      props: {
        heading: "Objects made to be used.",
        subtext: "Furniture and homeware designed and produced in small batches, built to outlast trend cycles.",
        buttonLabel: "Shop the Collection",
        imageId: "img-13", focal: "center",
      },
    },
    {
      id: "gallery-3", type: "gallery", visible: true, variant: "grid", spacing: "L",
      props: {
        heading: "The Collection",
        images: [
          { imageId: "img-14", focal: "center" },
          { imageId: "img-15", focal: "center" },
          { imageId: "img-16", focal: "center" },
        ],
      },
    },
    {
      id: "projects-3", type: "projects", visible: true, variant: "grid", spacing: "L",
      props: {
        heading: "Featured Pieces",
        items: [
          { title: "Arlo Lounge Chair", category: "Seating", imageId: "img-16", focal: "center" },
          { title: "Mesa Dining Table", category: "Tables", imageId: "img-14", focal: "center" },
          { title: "Nub Vessel Set", category: "Objects", imageId: "img-15", focal: "center" },
        ],
      },
    },
    {
      id: "services-3", type: "services", visible: true, variant: "columns", spacing: "L",
      props: {
        heading: "What We Offer",
        items: [
          { title: "Custom Pieces", description: "Bespoke furniture built to your dimensions and materials." },
          { title: "Trade Program", description: "Preferred pricing and support for designers and architects." },
          { title: "Repair & Care", description: "Lifetime material guidance and restoration services." },
        ],
      },
    },
    {
      id: "contact-3", type: "contact", visible: true, variant: "centered", spacing: "L",
      props: {
        heading: "Visit the showroom.",
        subtext: "Open Tuesday through Saturday, by appointment.",
        buttonLabel: "Book a Visit",
        email: "studio@objectsandco.com",
      },
    },
    {
      id: "footer-3", type: "footer", visible: true, variant: "columns", spacing: "M",
      props: {
        logo: "Objects & Co.",
        links: [{ label: "Shop" }, { label: "Collections" }, { label: "Studio" }, { label: "Contact" }],
        note: "© Objects & Co. Studio.",
      },
    },
  ],
};

const maison = {
  id: "maison",
  name: "Maison",
  category: "Editorial",
  description: "An interior design journal with editorial pacing and olive accents.",
  cover: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  paletteId: "forest",
  fontId: "refined-classic",
  sections: [
    {
      id: "nav-4", type: "nav", visible: true, variant: "centered-stack", spacing: "M",
      props: { logo: "Maison", links: [{ label: "Journal" }, { label: "Interiors" }, { label: "About" }, { label: "Contact" }] },
    },
    {
      id: "hero-4", type: "hero", visible: true, variant: "full-bleed", spacing: "L", align: "left",
      props: {
        heading: "Notes on living well.",
        subtext: "Maison is a journal of interiors, objects, and the quiet decisions that shape a home.",
        buttonLabel: "Read the Journal",
        imageId: "img-20", focal: "center",
      },
    },
    {
      id: "about-4", type: "about", visible: true, variant: "text-only", spacing: "L", align: "center",
      props: {
        heading: "Why we write about rooms.",
        body: "Maison began as a shared notebook between two interior designers who wanted a record of the houses that moved them, and has grown into a journal read by a small, considered audience.",
        imageId: "img-18", focal: "center",
      },
    },
    {
      id: "gallery-4", type: "gallery", visible: true, variant: "filmstrip", spacing: "L",
      props: {
        heading: "From the Archive",
        images: [
          { imageId: "img-01", focal: "center" },
          { imageId: "img-06", focal: "center" },
          { imageId: "img-07", focal: "center" },
          { imageId: "img-19", focal: "center" },
        ],
      },
    },
    {
      id: "testimonials-4", type: "testimonials", visible: true, variant: "grid", spacing: "L",
      props: {
        heading: "Readers Write In",
        items: [
          { quote: "The only design journal I read cover to cover.", author: "Priya Nair", role: "Subscriber since 2019" },
          { quote: "Maison taught me to slow down my own renovation.", author: "Tomás Rivera", role: "Reader" },
        ],
      },
    },
    {
      id: "contact-4", type: "contact", visible: true, variant: "split", spacing: "L",
      props: {
        heading: "Subscribe to Maison.",
        subtext: "A new issue, twice a month, straight to your inbox.",
        buttonLabel: "Subscribe",
        email: "hello@maisonjournal.com",
      },
    },
    {
      id: "footer-4", type: "footer", visible: true, variant: "minimal", spacing: "M",
      props: {
        logo: "Maison",
        links: [{ label: "Journal" }, { label: "About" }, { label: "Contact" }],
        note: "© Maison Journal.",
      },
    },
  ],
};

// --- Additional templates, built from a shared factory to stay concise. ---

function coverUrl(imageId) {
  return IMAGES.find((img) => img.id === imageId)?.url || IMAGES[0].url;
}

let extraIdSeed = 100;
function nextId(type) {
  extraIdSeed += 1;
  return `${type}-${extraIdSeed}`;
}

function buildTemplate({
  id,
  name,
  category,
  description,
  coverImageId,
  paletteId,
  fontId,
  navLabels,
  navVariant = "split",
  hero,
  heroVariant,
  about,
  aboutVariant,
  gallery,
  galleryVariant,
  services,
  servicesVariant,
  projects,
  projectsVariant,
  testimonials,
  testimonialsVariant,
  contact,
  contactVariant = "centered",
  footerNote,
  footerVariant = "columns",
}) {
  const sections = [
    {
      id: nextId("nav"),
      type: "nav",
      visible: true,
      variant: navVariant,
      spacing: "M",
      props: { logo: name, links: navLabels.map((label) => ({ label })) },
    },
    {
      id: nextId("hero"),
      type: "hero",
      visible: true,
      variant: heroVariant,
      spacing: "L",
      align: hero.align || "left",
      props: {
        heading: hero.heading,
        subtext: hero.subtext,
        buttonLabel: hero.buttonLabel,
        imageId: hero.imageId,
        focal: hero.focal || "center",
      },
    },
  ];

  if (about) {
    sections.push({
      id: nextId("about"),
      type: "about",
      visible: true,
      variant: aboutVariant,
      spacing: "L",
      align: about.align || "left",
      props: { heading: about.heading, body: about.body, imageId: about.imageId, focal: about.focal || "center" },
    });
  }
  if (gallery) {
    sections.push({
      id: nextId("gallery"),
      type: "gallery",
      visible: true,
      variant: galleryVariant,
      spacing: "L",
      props: { heading: gallery.heading, images: gallery.images },
    });
  }
  if (services) {
    sections.push({
      id: nextId("services"),
      type: "services",
      visible: true,
      variant: servicesVariant,
      spacing: "L",
      props: { heading: services.heading, items: services.items },
    });
  }
  if (projects) {
    sections.push({
      id: nextId("projects"),
      type: "projects",
      visible: true,
      variant: projectsVariant,
      spacing: "L",
      props: { heading: projects.heading, items: projects.items },
    });
  }
  if (testimonials) {
    sections.push({
      id: nextId("testimonials"),
      type: "testimonials",
      visible: true,
      variant: testimonialsVariant,
      spacing: "L",
      props: { heading: testimonials.heading, items: testimonials.items },
    });
  }

  sections.push({
    id: nextId("contact"),
    type: "contact",
    visible: true,
    variant: contactVariant,
    spacing: "L",
    props: {
      heading: contact.heading,
      subtext: contact.subtext,
      buttonLabel: contact.buttonLabel,
      email: contact.email,
    },
  });
  sections.push({
    id: nextId("footer"),
    type: "footer",
    visible: true,
    variant: footerVariant,
    spacing: "M",
    props: { logo: name, links: navLabels.slice(0, 3).map((label) => ({ label })), note: footerNote },
  });

  return { id, name, category, description, cover: coverUrl(coverImageId), paletteId, fontId, sections };
}

const atrium = buildTemplate({
  id: "atrium",
  name: "Atrium",
  category: "Architecture",
  description: "A monochrome portfolio for a practice built around light, structure, and negative space.",
  coverImageId: "img-11",
  paletteId: "monochrome",
  fontId: "minimal-architectural",
  navLabels: ["Work", "Practice", "Contact"],
  navVariant: "split",
  hero: {
    heading: "Light finds its own path.",
    subtext: "Atrium designs buildings around the way daylight moves through a space across a day.",
    buttonLabel: "View Work",
    imageId: "img-11",
  },
  heroVariant: "full-bleed",
  projects: {
    heading: "Recent Work",
    items: [
      { title: "Glass Facade House", category: "Residential, 2024", imageId: "img-09" },
      { title: "Civic Atrium", category: "Public, 2023", imageId: "img-10" },
      { title: "Courtyard Offices", category: "Commercial, 2022", imageId: "img-12" },
    ],
  },
  projectsVariant: "editorial",
  services: {
    heading: "Services",
    items: [
      { title: "Architecture", description: "Concept through construction, led by one principal per project." },
      { title: "Daylighting", description: "Light studies and massing strategy from the earliest sketches." },
    ],
  },
  servicesVariant: "numbered",
  contact: {
    heading: "Discuss a site.",
    subtext: "We take on a small number of projects each year.",
    buttonLabel: "Enquire",
    email: "studio@atrium.arch",
  },
  contactVariant: "split",
  footerNote: "© Atrium Architecture.",
  footerVariant: "minimal",
});

const theGardenRoom = buildTemplate({
  id: "the-garden-room",
  name: "The Garden Room",
  category: "Residential",
  description: "A residential studio for homes that blur the line between interior and landscape.",
  coverImageId: "img-01",
  paletteId: "forest",
  fontId: "editorial-serif",
  navLabels: ["Projects", "Studio", "Journal", "Contact"],
  navVariant: "centered-stack",
  hero: {
    heading: "A room that grows.",
    subtext: "The Garden Room designs houses where the garden is never far from view.",
    buttonLabel: "View Projects",
    imageId: "img-01",
  },
  heroVariant: "split-image",
  about: {
    heading: "Design that follows the seasons.",
    body: "We work closely with landscape architects from the first sketch, so each house is planned around how light and planting change through the year.",
    imageId: "img-07",
  },
  aboutVariant: "image-left",
  gallery: {
    heading: "Recent Interiors",
    images: [
      { imageId: "img-03", focal: "center" },
      { imageId: "img-04", focal: "center" },
      { imageId: "img-05", focal: "center" },
      { imageId: "img-06", focal: "center" },
    ],
  },
  galleryVariant: "masonry",
  testimonials: {
    heading: "Clients",
    items: [{ quote: "Every window frames something alive. It changed how we live in the house.", author: "Dana Okafor", role: "Homeowner, Portland" }],
  },
  testimonialsVariant: "single-quote",
  contact: {
    heading: "Start a project.",
    subtext: "New commissions open twice a year.",
    buttonLabel: "Enquire",
    email: "hello@thegardenroom.studio",
  },
  footerNote: "© The Garden Room.",
});

const concreteAndCo = buildTemplate({
  id: "concrete-and-co",
  name: "Concrete & Co.",
  category: "Architecture",
  description: "A brutalist-leaning studio portfolio built on a strict grid and raw material photography.",
  coverImageId: "img-12",
  paletteId: "monochrome",
  fontId: "minimal-architectural",
  navLabels: ["Projects", "Materials", "Contact"],
  hero: {
    heading: "Honest about the material.",
    subtext: "Concrete & Co. designs structures that don't hide what they're made of.",
    buttonLabel: "See Projects",
    imageId: "img-12",
  },
  heroVariant: "stacked-text",
  services: {
    heading: "Approach",
    items: [
      { title: "Material First", description: "Every project begins with what the site can offer, not a style." },
      { title: "Structural Honesty", description: "Load paths and joinery are left visible wherever possible." },
      { title: "Long Horizon", description: "Buildings designed to age for decades, not a single season." },
    ],
  },
  servicesVariant: "columns",
  projects: {
    heading: "Projects",
    items: [
      { title: "Bunker House", category: "Residential, 2023", imageId: "img-09" },
      { title: "Civic Hall", category: "Public, 2022", imageId: "img-10" },
      { title: "Studio Annex", category: "Commercial, 2021", imageId: "img-11" },
    ],
  },
  projectsVariant: "grid",
  contact: {
    heading: "Talk through a brief.",
    subtext: "We respond to every enquiry within a week.",
    buttonLabel: "Get in Touch",
    email: "studio@concreteandco.build",
  },
  footerNote: "© Concrete & Co.",
});

const norrland = buildTemplate({
  id: "norrland",
  name: "Norrland",
  category: "Residential",
  description: "A Scandinavian-leaning residential studio site, warm and unornamented.",
  coverImageId: "img-04",
  paletteId: "warm-minimal",
  fontId: "contemporary-sans",
  navLabels: ["Homes", "Studio", "Contact"],
  hero: {
    heading: "Warmth, without clutter.",
    subtext: "Norrland designs homes around natural material and restrained detail.",
    buttonLabel: "See Our Homes",
    imageId: "img-04",
  },
  heroVariant: "split-image",
  about: {
    heading: "A small studio, a careful process.",
    body: "Norrland is three architects working on a handful of houses at a time, each one visited weekly through construction.",
    imageId: "img-06",
  },
  aboutVariant: "image-right",
  testimonials: {
    heading: "What Clients Say",
    items: [
      { quote: "They understood restraint better than we did.", author: "Mikael Lindqvist", role: "Homeowner" },
      { quote: "The house feels like it was always there.", author: "Freja Holm", role: "Homeowner" },
    ],
  },
  testimonialsVariant: "grid",
  contact: {
    heading: "Plan a home.",
    subtext: "Consultations begin with a site visit.",
    buttonLabel: "Book a Visit",
    email: "studio@norrland.house",
  },
  contactVariant: "split",
  footerNote: "© Norrland Studio.",
});

const lumenStudio = buildTemplate({
  id: "lumen-studio",
  name: "Lumen Studio",
  category: "Architecture",
  description: "A lighting and architecture studio site built around atmosphere and shadow.",
  coverImageId: "img-20",
  paletteId: "terracotta",
  fontId: "refined-classic",
  navLabels: ["Work", "Studio", "Contact"],
  hero: {
    heading: "Design the shadow, not just the light.",
    subtext: "Lumen Studio shapes how architecture feels after dark.",
    buttonLabel: "View Work",
    imageId: "img-20",
  },
  heroVariant: "full-bleed",
  services: {
    heading: "Services",
    items: [
      { title: "Lighting Design", description: "Full lighting schemes for residential and hospitality projects." },
      { title: "Architectural Consulting", description: "Daylighting and massing advice during early design." },
    ],
  },
  servicesVariant: "list",
  gallery: {
    heading: "Recent Installations",
    images: [
      { imageId: "img-09", focal: "center" },
      { imageId: "img-11", focal: "center" },
      { imageId: "img-12", focal: "center" },
    ],
  },
  galleryVariant: "grid",
  contact: {
    heading: "Light a space.",
    subtext: "We collaborate with architects from schematic design onward.",
    buttonLabel: "Enquire",
    email: "studio@lumen.design",
  },
  footerNote: "© Lumen Studio.",
});

const terra = buildTemplate({
  id: "terra",
  name: "Terra",
  category: "Product",
  description: "A ceramics studio site with warm, tactile product photography.",
  coverImageId: "img-15",
  paletteId: "terracotta",
  fontId: "contemporary-sans",
  navLabels: ["Shop", "Studio", "Contact"],
  hero: {
    heading: "Made from the ground up.",
    subtext: "Terra throws, glazes, and fires every piece by hand in small batches.",
    buttonLabel: "Shop the Collection",
    imageId: "img-15",
  },
  heroVariant: "split-image",
  projects: {
    heading: "Featured Pieces",
    items: [
      { title: "Dune Vessel", category: "Vases", imageId: "img-15" },
      { title: "Field Bowl Set", category: "Tableware", imageId: "img-13" },
      { title: "Hearth Jug", category: "Objects", imageId: "img-16" },
    ],
  },
  projectsVariant: "grid",
  services: {
    heading: "What We Offer",
    items: [
      { title: "Studio Pieces", description: "Limited runs, released monthly." },
      { title: "Commissions", description: "Custom glazes and dimensions for restaurants and homes." },
      { title: "Workshops", description: "Half-day throwing classes at the studio." },
    ],
  },
  servicesVariant: "columns",
  contact: {
    heading: "Visit the studio.",
    subtext: "Open Thursday through Sunday.",
    buttonLabel: "Book a Visit",
    email: "hello@terraceramics.studio",
  },
  footerNote: "© Terra Ceramics.",
});

const theLoftEdit = buildTemplate({
  id: "the-loft-edit",
  name: "The Loft Edit",
  category: "Editorial",
  description: "An urban interiors journal covering loft living and adaptive reuse.",
  coverImageId: "img-06",
  paletteId: "forest",
  fontId: "editorial-serif",
  navLabels: ["Journal", "Spaces", "About", "Contact"],
  navVariant: "centered-stack",
  hero: {
    heading: "Old buildings, new lives.",
    subtext: "The Loft Edit covers the conversions, renovations, and lofts reshaping how cities live.",
    buttonLabel: "Read the Journal",
    imageId: "img-06",
  },
  heroVariant: "stacked-text",
  about: {
    heading: "Why we cover conversions.",
    body: "Every issue follows one building, from its industrial past to the people living in it now.",
    imageId: "img-19",
  },
  aboutVariant: "text-only",
  gallery: {
    heading: "From the Archive",
    images: [
      { imageId: "img-01", focal: "center" },
      { imageId: "img-07", focal: "center" },
      { imageId: "img-19", focal: "center" },
      { imageId: "img-17", focal: "center" },
    ],
  },
  galleryVariant: "filmstrip",
  testimonials: {
    heading: "Readers Write In",
    items: [
      { quote: "The only shelter magazine that photographs the wiring too.", author: "Jonas Weiss", role: "Reader" },
      { quote: "Changed how I see my own apartment.", author: "Clare Dunmore", role: "Subscriber" },
    ],
  },
  testimonialsVariant: "grid",
  contact: {
    heading: "Subscribe to The Loft Edit.",
    subtext: "A new issue on the first of every month.",
    buttonLabel: "Subscribe",
    email: "hello@theloftedit.com",
  },
  contactVariant: "split",
  footerNote: "© The Loft Edit.",
  footerVariant: "minimal",
});

const marbleAndOak = buildTemplate({
  id: "marble-and-oak",
  name: "Marble & Oak",
  category: "Product",
  description: "A furniture studio site built around close-up material detail.",
  coverImageId: "img-14",
  paletteId: "warm-minimal",
  fontId: "refined-classic",
  navLabels: ["Collection", "Studio", "Contact"],
  hero: {
    heading: "Furniture that shows its grain.",
    subtext: "Marble & Oak builds tables and casework from single, chosen slabs.",
    buttonLabel: "View the Collection",
    imageId: "img-14",
  },
  heroVariant: "split-image",
  projects: {
    heading: "Pieces",
    items: [
      { title: "Monolith Table", category: "Tables", imageId: "img-14" },
      { title: "Quarry Console", category: "Casework", imageId: "img-13" },
      { title: "Grain Bench", category: "Seating", imageId: "img-16" },
    ],
  },
  projectsVariant: "list-featured",
  services: {
    heading: "Process",
    items: [
      { title: "Material Selection", description: "Clients choose the exact slab their piece will come from." },
      { title: "Build & Finish", description: "Every piece is built and finished in our workshop by hand." },
    ],
  },
  servicesVariant: "list",
  contact: {
    heading: "Commission a piece.",
    subtext: "Lead times run eight to twelve weeks.",
    buttonLabel: "Start a Commission",
    email: "studio@marbleandoak.com",
  },
  footerNote: "© Marble & Oak.",
});

const pavilion = buildTemplate({
  id: "pavilion",
  name: "Pavilion",
  category: "Architecture",
  description: "A landscape architecture studio site centered on outdoor structures and gardens.",
  coverImageId: "img-18",
  paletteId: "ivory-olive",
  fontId: "editorial-serif",
  navLabels: ["Work", "Studio", "Contact"],
  hero: {
    heading: "Structures for being outside.",
    subtext: "Pavilion designs gardens, courtyards, and the small buildings that sit inside them.",
    buttonLabel: "View Work",
    imageId: "img-12",
  },
  heroVariant: "full-bleed",
  about: {
    heading: "Landscape first, structure second.",
    body: "We start every project by walking the site through a full season before drawing a single line.",
    imageId: "img-09",
  },
  aboutVariant: "image-left",
  services: {
    heading: "Services",
    items: [
      { title: "Landscape Architecture", description: "Master planning for gardens, courtyards, and grounds." },
      { title: "Garden Pavilions", description: "Small outdoor structures designed alongside the planting." },
    ],
  },
  servicesVariant: "numbered",
  contact: {
    heading: "Walk the site with us.",
    subtext: "New projects begin with an on-site consultation.",
    buttonLabel: "Enquire",
    email: "studio@pavilion.land",
  },
  footerNote: "© Pavilion Landscape Architecture.",
});

const stillLife = buildTemplate({
  id: "still-life",
  name: "Still Life",
  category: "Product",
  description: "A home goods studio site built around quiet, considered product photography.",
  coverImageId: "img-16",
  paletteId: "monochrome",
  fontId: "minimal-architectural",
  navLabels: ["Shop", "Studio", "Contact"],
  hero: {
    heading: "Objects worth sitting with.",
    subtext: "Still Life designs small-batch homeware meant to be used daily.",
    buttonLabel: "Shop Now",
    imageId: "img-16",
  },
  heroVariant: "split-image",
  gallery: {
    heading: "The Collection",
    images: [
      { imageId: "img-13", focal: "center" },
      { imageId: "img-14", focal: "center" },
      { imageId: "img-15", focal: "center" },
      { imageId: "img-16", focal: "center" },
    ],
  },
  galleryVariant: "grid",
  services: {
    heading: "What We Offer",
    items: [
      { title: "Studio Collection", description: "Released in small seasonal drops." },
      { title: "Wholesale", description: "Stockist program for independent shops." },
      { title: "Gifting", description: "Curated sets for weddings and openings." },
    ],
  },
  servicesVariant: "columns",
  contact: {
    heading: "Stay in touch.",
    subtext: "New drops are announced by email first.",
    buttonLabel: "Join the List",
    email: "hello@stilllifegoods.com",
  },
  contactVariant: "split",
  footerNote: "© Still Life.",
});

const theQuarry = buildTemplate({
  id: "the-quarry",
  name: "The Quarry",
  category: "Architecture",
  description: "A material-led studio site built around stone, concrete, and texture.",
  coverImageId: "img-09",
  paletteId: "terracotta",
  fontId: "minimal-architectural",
  navLabels: ["Projects", "Materials", "Contact"],
  hero: {
    heading: "Begin with the material.",
    subtext: "The Quarry designs buildings outward from the stone and concrete that make them.",
    buttonLabel: "See Projects",
    imageId: "img-09",
  },
  heroVariant: "stacked-text",
  projects: {
    heading: "Projects",
    items: [
      { title: "Stone House", category: "Residential, 2024", imageId: "img-10" },
      { title: "Material Library", category: "Cultural, 2023", imageId: "img-11" },
      { title: "Quarry Pavilion", category: "Public, 2022", imageId: "img-12" },
    ],
  },
  projectsVariant: "editorial",
  services: {
    heading: "Approach",
    items: [
      { title: "Material Research", description: "Every project starts with samples, not sketches." },
      { title: "Local Sourcing", description: "We work almost exclusively with regional quarries and mills." },
    ],
  },
  servicesVariant: "list",
  contact: {
    heading: "Bring us a site.",
    subtext: "We respond to every brief within two weeks.",
    buttonLabel: "Get in Touch",
    email: "studio@thequarry.build",
  },
  footerNote: "© The Quarry.",
});

const hearth = buildTemplate({
  id: "hearth",
  name: "Hearth",
  category: "Residential",
  description: "A warm residential interiors studio built around gathering spaces.",
  coverImageId: "img-05",
  paletteId: "ivory-olive",
  fontId: "editorial-serif",
  navLabels: ["Projects", "Studio", "Journal", "Contact"],
  navVariant: "split",
  hero: {
    heading: "Rooms built for gathering.",
    subtext: "Hearth designs homes around the table, the fire, and the people who return to them.",
    buttonLabel: "View Projects",
    imageId: "img-05",
  },
  heroVariant: "full-bleed",
  about: {
    heading: "Design for how a family actually lives.",
    body: "We spend the first weeks of every project simply watching how a household moves through its current home.",
    imageId: "img-02",
  },
  aboutVariant: "image-right",
  gallery: {
    heading: "Recent Homes",
    images: [
      { imageId: "img-01", focal: "center" },
      { imageId: "img-03", focal: "center" },
      { imageId: "img-06", focal: "center" },
      { imageId: "img-07", focal: "center" },
    ],
  },
  galleryVariant: "masonry",
  testimonials: {
    heading: "Clients",
    items: [{ quote: "They designed the kitchen around how our family actually cooks together.", author: "The Alvarez Family", role: "Homeowners" }],
  },
  testimonialsVariant: "single-quote",
  contact: {
    heading: "Begin a project.",
    subtext: "We take on a handful of homes each year.",
    buttonLabel: "Enquire",
    email: "studio@hearth.design",
  },
  footerNote: "© Hearth Studio.",
});

const linea = buildTemplate({
  id: "linea",
  name: "Linea",
  category: "Architecture",
  description: "A structural-minimalist studio site built on strict lines and negative space.",
  coverImageId: "img-11",
  paletteId: "monochrome",
  fontId: "minimal-architectural",
  navLabels: ["Work", "Studio", "Contact"],
  hero: {
    heading: "Everything on the line.",
    subtext: "Linea designs structures where every element sits on a single, visible grid.",
    buttonLabel: "View Work",
    imageId: "img-11",
  },
  heroVariant: "split-image",
  services: {
    heading: "Approach",
    items: [
      { title: "Grid-First Design", description: "Every project is set on a structural grid before a single room is drawn." },
      { title: "Minimal Palette", description: "A small, consistent material set across every project." },
      { title: "Precision Detailing", description: "Junctions and reveals drawn to the millimeter." },
    ],
  },
  servicesVariant: "columns",
  projects: {
    heading: "Selected Projects",
    items: [
      { title: "Grid House", category: "Residential, 2024", imageId: "img-09" },
      { title: "Linea Offices", category: "Commercial, 2023", imageId: "img-12" },
      { title: "Threshold Pavilion", category: "Cultural, 2022", imageId: "img-20" },
    ],
  },
  projectsVariant: "grid",
  contact: {
    heading: "Start with a grid.",
    subtext: "Send us your site survey to begin.",
    buttonLabel: "Get in Touch",
    email: "studio@linea.arch",
  },
  contactVariant: "split",
  footerNote: "© Linea Architecture.",
  footerVariant: "minimal",
});

const theReadingRoom = buildTemplate({
  id: "the-reading-room",
  name: "The Reading Room",
  category: "Editorial",
  description: "A design journal covering studios, process, and the objects on their desks.",
  coverImageId: "img-19",
  paletteId: "warm-minimal",
  fontId: "refined-classic",
  navLabels: ["Journal", "Studios", "About", "Contact"],
  navVariant: "centered-stack",
  hero: {
    heading: "Inside the studios that shape how we live.",
    subtext: "The Reading Room profiles the architects, makers, and editors behind the work.",
    buttonLabel: "Start Reading",
    imageId: "img-19",
  },
  heroVariant: "stacked-text",
  about: {
    heading: "A quarterly, read slowly.",
    body: "Each issue is built around a single long profile, photographed over several visits to one studio.",
    imageId: "img-17",
  },
  aboutVariant: "text-only",
  gallery: {
    heading: "From Recent Issues",
    images: [
      { imageId: "img-17", focal: "center" },
      { imageId: "img-18", focal: "center" },
      { imageId: "img-19", focal: "center" },
      { imageId: "img-06", focal: "center" },
    ],
  },
  galleryVariant: "filmstrip",
  testimonials: {
    heading: "Readers",
    items: [
      { quote: "The only quarterly I still read cover to cover.", author: "Noor Haddad", role: "Subscriber" },
      { quote: "Slower, and better for it.", author: "Pieter Vos", role: "Reader" },
    ],
  },
  testimonialsVariant: "grid",
  contact: {
    heading: "Subscribe.",
    subtext: "Four issues a year, delivered quarterly.",
    buttonLabel: "Subscribe",
    email: "hello@thereadingroom.press",
  },
  contactVariant: "split",
  footerNote: "© The Reading Room.",
  footerVariant: "minimal",
});

const verdant = buildTemplate({
  id: "verdant",
  name: "Verdant",
  category: "Residential",
  description: "A biophilic interiors studio built around plant-forward, light-filled homes.",
  coverImageId: "img-02",
  paletteId: "forest",
  fontId: "contemporary-sans",
  navLabels: ["Projects", "Studio", "Contact"],
  hero: {
    heading: "Homes that breathe.",
    subtext: "Verdant designs interiors where planting is structural, not decorative.",
    buttonLabel: "View Projects",
    imageId: "img-02",
  },
  heroVariant: "full-bleed",
  about: {
    heading: "Planting as a design discipline.",
    body: "We work with a horticulturist on every project, so plant choices are as considered as the furniture.",
    imageId: "img-03",
  },
  aboutVariant: "image-left",
  gallery: {
    heading: "Recent Interiors",
    images: [
      { imageId: "img-01", focal: "center" },
      { imageId: "img-05", focal: "center" },
      { imageId: "img-07", focal: "center" },
    ],
  },
  galleryVariant: "grid",
  testimonials: {
    heading: "Clients",
    items: [{ quote: "The apartment feels alive in a way it never did before.", author: "Sofia Berg", role: "Homeowner" }],
  },
  testimonialsVariant: "single-quote",
  contact: {
    heading: "Bring light into your home.",
    subtext: "Consultations start with a walkthrough of your space.",
    buttonLabel: "Book a Consultation",
    email: "studio@verdant.interiors",
  },
  footerNote: "© Verdant Interiors.",
});

export const TEMPLATES = [
  residence,
  formStudio,
  objectsCo,
  maison,
  atrium,
  theGardenRoom,
  concreteAndCo,
  norrland,
  lumenStudio,
  terra,
  theLoftEdit,
  marbleAndOak,
  pavilion,
  stillLife,
  theQuarry,
  hearth,
  linea,
  theReadingRoom,
  verdant,
];

export function templateById(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}

export const CATEGORIES = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.category)))];

// All possible section types, in canonical document order.
export const SECTION_ORDER = ["nav", "hero", "gallery", "about", "services", "projects", "testimonials", "contact", "footer"];
export const FIXED_SECTION_TYPES = ["nav", "footer"];

export const SECTION_LABELS = {
  nav: "Navigation",
  hero: "Hero",
  gallery: "Gallery",
  about: "About",
  services: "Services",
  projects: "Projects",
  testimonials: "Testimonials",
  contact: "Contact",
  footer: "Footer",
};

export const SECTION_DESCRIPTIONS = {
  hero: "An opening statement with a heading, supporting line, and image.",
  gallery: "A set of images presented as a grid, masonry wall, or filmstrip.",
  about: "A studio or practice statement paired with an image.",
  services: "A list of offerings or capabilities.",
  projects: "Featured work or product pieces with imagery.",
  testimonials: "Quotes from clients or readers.",
  contact: "A closing call to action with contact details.",
};

export const SECTION_VARIANTS = {
  nav: ["split", "centered-stack"],
  hero: ["full-bleed", "split-image", "stacked-text"],
  gallery: ["grid", "masonry", "filmstrip"],
  about: ["image-left", "image-right", "text-only"],
  services: ["list", "columns", "numbered"],
  projects: ["grid", "list-featured", "editorial"],
  testimonials: ["single-quote", "grid"],
  contact: ["split", "centered"],
  footer: ["columns", "minimal"],
};

// Default content used when a section type is added via the Add Section panel.
export function defaultSectionProps(type) {
  switch (type) {
    case "hero":
      return { heading: "A new idea, stated plainly.", subtext: "Add a line that frames what this site is for.", buttonLabel: "Learn More", imageId: "img-01", focal: "center" };
    case "gallery":
      return { heading: "Gallery", images: [{ imageId: "img-02", focal: "center" }, { imageId: "img-09", focal: "center" }, { imageId: "img-13", focal: "center" }] };
    case "about":
      return { heading: "About the studio", body: "Write a short statement about who you are and how you work.", imageId: "img-17", focal: "center" };
    case "services":
      return { heading: "Services", items: [{ title: "Service One", description: "Describe the first offering." }, { title: "Service Two", description: "Describe the second offering." }] };
    case "projects":
      return { heading: "Projects", items: [{ title: "Project Name", category: "Category, Year", imageId: "img-10", focal: "center" }] };
    case "testimonials":
      return { heading: "Testimonials", items: [{ quote: "A short quote from a client.", author: "Client Name", role: "Role" }] };
    case "contact":
      return { heading: "Get in touch.", subtext: "Add a short invitation to contact you.", buttonLabel: "Contact", email: "hello@yourstudio.com" };
    default:
      return {};
  }
}

export function defaultVariant(type) {
  return SECTION_VARIANTS[type]?.[0] || "default";
}
