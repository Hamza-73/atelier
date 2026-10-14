"use client";

import { useEditor } from "@/lib/store";
import { PALETTES, FONT_PAIRINGS, paletteById } from "@/data/themes";
import { SECTION_VARIANTS, SECTION_LABELS } from "@/data/templates";
import { cn } from "@/lib/utils";
import ImagePicker from "./ImagePicker";
import ColorSwatchPicker from "./ColorSwatchPicker";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.15em] text-ink/50">{label}</span>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, ...props }) {
  return (
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-warmgrey bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-terracotta"
      {...props}
    />
  );
}

function TextArea({ value, onChange, rows = 3 }) {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full resize-none border border-warmgrey bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-terracotta"
    />
  );
}

function SegmentedControl({ options, value, onChange, labels }) {
  return (
    <div className="flex border border-warmgrey">
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "flex-1 py-1.5 text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
            value === opt ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5",
            i > 0 && "border-l border-warmgrey"
          )}
        >
          {labels?.[opt] || opt}
        </button>
      ))}
    </div>
  );
}

export default function PropertiesPanel() {
  const { state } = useEditor();
  const section = state.design.sections.find((s) => s.id === state.selectedId);

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-5">
      {section ? <ContentTab key={section.id} section={section} /> : <ThemeTab />}
    </div>
  );
}

function ThemeTab() {
  const { state, dispatch } = useEditor();
  const { design } = state;
  const palette = paletteById(design.paletteId);

  return (
    <>
      <div>
        <h3 className="mb-1 text-[11px] uppercase tracking-[0.2em] text-olive">Theme</h3>
        <p className="text-xs text-ink/40">Nothing selected. Editing site-wide styles.</p>
      </div>

      <Field label="Palette">
        <div className="grid grid-cols-1 gap-2">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => dispatch({ type: "SET_PALETTE", paletteId: p.id })}
              className={cn(
                "flex items-center gap-3 border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                design.paletteId === p.id ? "border-ink" : "border-warmgrey hover:border-ink/50"
              )}
            >
              <span className="flex shrink-0 -space-x-1.5">
                {[p.bg, p.accent, p.text].map((c, i) => (
                  <span key={i} className="h-5 w-5 rounded-full border border-paper" style={{ background: c }} />
                ))}
              </span>
              <span className="text-sm text-ink">{p.name}</span>
            </button>
          ))}
        </div>
      </Field>

      <Field label="Typography">
        <div className="flex flex-col gap-2">
          {FONT_PAIRINGS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => dispatch({ type: "SET_FONT", fontId: f.id })}
              className={cn(
                "border px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                design.fontId === f.id ? "border-ink bg-ink/5 text-ink" : "border-warmgrey text-ink/70 hover:border-ink/50"
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Color overrides">
        <div className="flex flex-col gap-3">
          {["bg", "accent", "text"].map((key) => {
            const current = design.colorOverrides[key] || palette[key];
            const overridden = Boolean(design.colorOverrides[key]);
            return (
              <div key={key} className="flex items-center justify-between gap-3">
                <span className="text-sm capitalize text-ink/70">{key === "bg" ? "Background" : key}</span>
                <div className="flex items-center gap-2">
                  <ColorSwatchPicker
                    value={current}
                    onChange={(hex) => dispatch({ type: "SET_COLOR_OVERRIDE", key, value: hex })}
                  />
                  {overridden && (
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "SET_COLOR_OVERRIDE", key, value: null })}
                      className="text-[10px] uppercase tracking-wider text-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Field>
    </>
  );
}

function ContentTab({ section }) {
  const { dispatch } = useEditor();
  const patch = (p) => dispatch({ type: "UPDATE_PROPS", id: section.id, patch: p });
  const variants = SECTION_VARIANTS[section.type] || [];

  return (
    <>
      <div>
        <h3 className="mb-1 text-[11px] uppercase tracking-[0.2em] text-olive">{SECTION_LABELS[section.type]}</h3>
        <p className="text-xs text-ink/40">Editing this section.</p>
      </div>

      {variants.length > 1 && (
        <Field label="Layout">
          <div className="flex flex-wrap gap-1.5">
            {variants.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={section.variant === v}
                onClick={() => dispatch({ type: "SET_VARIANT", id: section.id, variant: v })}
                className={cn(
                  "rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                  section.variant === v ? "border-ink bg-ink text-paper" : "border-warmgrey text-ink/60 hover:border-ink"
                )}
              >
                {v.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </Field>
      )}

      <Field label="Spacing">
        <SegmentedControl
          options={["S", "M", "L"]}
          value={section.spacing}
          onChange={(v) => dispatch({ type: "SET_SPACING", id: section.id, spacing: v })}
        />
      </Field>

      {section.align !== undefined && (
        <Field label="Alignment">
          <SegmentedControl
            options={["left", "center"]}
            value={section.align}
            labels={{ left: "Left", center: "Center" }}
            onChange={(v) => dispatch({ type: "SET_ALIGN", id: section.id, align: v })}
          />
        </Field>
      )}

      <TypeFields section={section} patch={patch} dispatch={dispatch} />
    </>
  );
}

function TypeFields({ section, patch, dispatch }) {
  const { props } = section;
  const setImage = (imageId, focal) => dispatch({ type: "SET_IMAGE", id: section.id, imageId, focal });
  const setArrayImage = (index, imageId, focal) =>
    dispatch({ type: "SET_IMAGE", id: section.id, imageId, focal, index });
  const setItemImage = (itemIndex, imageId, focal) =>
    dispatch({ type: "SET_IMAGE", id: section.id, imageId, focal, itemIndex });
  const updateItem = (i, field, value) => {
    const items = props.items.slice();
    items[i] = { ...items[i], [field]: value };
    patch({ items });
  };
  const updateLink = (i, value) => {
    const links = props.links.slice();
    links[i] = { ...links[i], label: value };
    patch({ links });
  };

  switch (section.type) {
    case "nav":
    case "footer":
      return (
        <>
          <Field label="Logo text">
            <TextInput value={props.logo} onChange={(v) => patch({ logo: v })} />
          </Field>
          <Field label="Nav labels">
            <div className="flex flex-col gap-2">
              {props.links.map((link, i) => (
                <TextInput key={i} value={link.label} onChange={(v) => updateLink(i, v)} />
              ))}
            </div>
          </Field>
          {section.type === "footer" && (
            <Field label="Footer note">
              <TextInput value={props.note} onChange={(v) => patch({ note: v })} />
            </Field>
          )}
        </>
      );

    case "hero":
      return (
        <>
          <Field label="Heading">
            <TextInput value={props.heading} onChange={(v) => patch({ heading: v })} />
          </Field>
          <Field label="Subtext">
            <TextArea value={props.subtext} onChange={(v) => patch({ subtext: v })} />
          </Field>
          <Field label="Button label">
            <TextInput value={props.buttonLabel} onChange={(v) => patch({ buttonLabel: v })} />
          </Field>
          <Field label="Image">
            <ImagePicker imageId={props.imageId} focal={props.focal} onChange={({ imageId, focal }) => setImage(imageId, focal)} />
          </Field>
        </>
      );

    case "about":
      return (
        <>
          <Field label="Heading">
            <TextInput value={props.heading} onChange={(v) => patch({ heading: v })} />
          </Field>
          <Field label="Body">
            <TextArea rows={5} value={props.body} onChange={(v) => patch({ body: v })} />
          </Field>
          <Field label="Image">
            <ImagePicker imageId={props.imageId} focal={props.focal} onChange={({ imageId, focal }) => setImage(imageId, focal)} />
          </Field>
        </>
      );

    case "gallery":
      return (
        <>
          <Field label="Heading">
            <TextInput value={props.heading} onChange={(v) => patch({ heading: v })} />
          </Field>
          <Field label="Images">
            <div className="flex flex-col gap-4">
              {props.images.map((img, i) => (
                <ImagePicker
                  key={i}
                  imageId={img.imageId}
                  focal={img.focal}
                  onChange={({ imageId, focal }) => setArrayImage(i, imageId, focal)}
                />
              ))}
            </div>
          </Field>
        </>
      );

    case "services":
      return (
        <Field label="Services">
          <div className="flex flex-col gap-4">
            {props.items.map((item, i) => (
              <div key={i} className="flex flex-col gap-2 border-t border-warmgrey pt-3 first:border-t-0 first:pt-0">
                <TextInput value={item.title} onChange={(v) => updateItem(i, "title", v)} />
                <TextArea rows={2} value={item.description} onChange={(v) => updateItem(i, "description", v)} />
              </div>
            ))}
          </div>
        </Field>
      );

    case "projects":
      return (
        <>
          <Field label="Heading">
            <TextInput value={props.heading} onChange={(v) => patch({ heading: v })} />
          </Field>
          <Field label="Projects">
            <div className="flex flex-col gap-4">
              {props.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 border-t border-warmgrey pt-3 first:border-t-0 first:pt-0">
                  <TextInput value={item.title} onChange={(v) => updateItem(i, "title", v)} />
                  <TextInput value={item.category} onChange={(v) => updateItem(i, "category", v)} />
                  <ImagePicker
                    imageId={item.imageId}
                    focal={item.focal}
                    onChange={({ imageId, focal }) => setItemImage(i, imageId, focal)}
                  />
                </div>
              ))}
            </div>
          </Field>
        </>
      );

    case "testimonials":
      return (
        <>
          <Field label="Heading">
            <TextInput value={props.heading} onChange={(v) => patch({ heading: v })} />
          </Field>
          <Field label="Quotes">
            <div className="flex flex-col gap-4">
              {props.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 border-t border-warmgrey pt-3 first:border-t-0 first:pt-0">
                  <TextArea rows={3} value={item.quote} onChange={(v) => updateItem(i, "quote", v)} />
                  <TextInput value={item.author} onChange={(v) => updateItem(i, "author", v)} />
                  <TextInput value={item.role} onChange={(v) => updateItem(i, "role", v)} />
                </div>
              ))}
            </div>
          </Field>
        </>
      );

    case "contact":
      return (
        <>
          <Field label="Heading">
            <TextInput value={props.heading} onChange={(v) => patch({ heading: v })} />
          </Field>
          <Field label="Subtext">
            <TextArea value={props.subtext} onChange={(v) => patch({ subtext: v })} />
          </Field>
          <Field label="Button label">
            <TextInput value={props.buttonLabel} onChange={(v) => patch({ buttonLabel: v })} />
          </Field>
          <Field label="Email">
            <TextInput value={props.email} onChange={(v) => patch({ email: v })} />
          </Field>
        </>
      );

    default:
      return null;
  }
}
