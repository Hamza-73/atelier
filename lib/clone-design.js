// Deep-clones a starter template into a fresh, unsaved design. Exported so
// /editor/new (app/editor/new/page.js) can build the initial design before
// handing it to EditorProvider — never mutates the template itself.
export function cloneDesignFromTemplate(template) {
  const design = JSON.parse(JSON.stringify(template));
  design.templateId = template.id;
  design.colorOverrides = {};
  design.savedId = null;
  delete design.category;
  delete design.description;
  delete design.cover;
  return design;
}