// Load all paragraph files using Vite's import.meta.glob
const paragraphModules = import.meta.glob('/src/data/counties/*/paragraph.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const paragraphMap = new Map<string, string>();

// Process the imported modules and create the map
Object.entries(paragraphModules).forEach(([path, content]) => {
  const pathParts = path.split('/');
  const countySlug = pathParts[pathParts.length - 2];
  const textContent = typeof content === 'string' ? content : (content as any)?.default || '';
  if (countySlug && textContent) {
    paragraphMap.set(countySlug, textContent);
  }
});

/**
 * Get paragraph text for a county by its slug
 * @param countySlug - The county slug (e.g., 'alameda', 'los-angeles')
 * @returns The paragraph text, or null if not found
 */
export function getCountyParagraph(countySlug: string | undefined): string | null {
  if (!countySlug) return null;
  return paragraphMap.get(countySlug) || null;
}

/**
 * Split paragraph text into individual paragraphs (separated by blank lines)
 * @param text - The full paragraph text
 * @returns Array of individual paragraphs
 */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
}

