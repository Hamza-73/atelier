"use client";

import { themeToCssVars } from "@/data/themes";
import SectionWrapper from "./SectionWrapper";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Gallery from "./sections/Gallery";
import About from "./sections/About";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const REGISTRY = {
  nav: Nav,
  hero: Hero,
  gallery: Gallery,
  about: About,
  services: Services,
  projects: Projects,
  testimonials: Testimonials,
  contact: Contact,
  footer: Footer,
};

export default function Site({ design, editable = false, selectedId, onSelect }) {
  const vars = themeToCssVars(design.paletteId, design.fontId, design.colorOverrides);
  const sections = design.sections;

  return (
    <div
      className="@container w-full min-w-0 overflow-x-clip"
      style={{ ...vars, background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-body)" }}
    >
      {sections.map((section, i) => {
        const Component = REGISTRY[section.type];
        if (!Component) return null;

        if (!editable) {
          if (!section.visible) return null;
          return <Component key={section.id} section={section} editable={false} />;
        }

        return (
          <SectionWrapper
            key={section.id}
            section={section}
            index={i}
            total={sections.length}
            selected={selectedId === section.id}
            onSelect={onSelect}
          >
            <Component section={section} editable />
          </SectionWrapper>
        );
      })}
    </div>
  );
}
