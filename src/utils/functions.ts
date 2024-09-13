export function formatName(title: string): string {
  return title
    .trim()
    .replace(/\n/g, ' ')
    .replace(/\s\s+/g, ' ')
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
}
