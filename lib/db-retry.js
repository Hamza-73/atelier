// The Neon HTTP driver opens a fresh connection per query, which
// occasionally hits a transient ETIMEDOUT/fetch-failed error — seen in
// practice, not just theory. None of these are real data errors, so a
// short automatic retry clears them without the user ever seeing one.
function isTransientNetworkError(error) {
  const message = String(error?.cause?.message || error?.message || "");
  const code = error?.cause?.sourceError?.cause?.code || error?.cause?.code;
  return (
    message.includes("fetch failed") ||
    message.includes("ETIMEDOUT") ||
    message.includes("ENETUNREACH") ||
    code === "ETIMEDOUT" ||
    code === "ENETUNREACH"
  );
}

export async function withDbRetry(fn, { attempts = 3, delayMs = 400 } = {}) {
  let lastError;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i === attempts || !isTransientNetworkError(error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs * i));
    }
  }
  throw lastError;
}
