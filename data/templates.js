// Starter templates. Opening one deep-clones this into editor state; never mutate these.

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

export const TEMPLATES = [residence, formStudio, objectsCo, maison];

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
