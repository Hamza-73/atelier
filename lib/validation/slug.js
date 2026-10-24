// Short, URL-safe id appended to a design's name to make its public slug
// unique without needing to show the user an ugly collision counter.
export function slugify(name) {
  return (
    (name || "site")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "site"
  );
}

export function randomSuffix() {
  return Math.random().toString(36).slice(2, 7);
}
