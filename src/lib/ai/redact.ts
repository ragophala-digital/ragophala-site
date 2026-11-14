/** Removes obvious personal identifiers before text is sent to the AI provider. */
export function redact(text: string): string {
  return text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email removed]")
    .replace(/(?<!\d)(?:\+?27|0)[\s()-]*\d(?:[\s()-]*\d){7,9}(?!\d)/g, "[phone removed]")
    .replace(/\b\d{13}\b/g, "[id removed]");
}
