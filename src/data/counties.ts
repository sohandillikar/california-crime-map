export const YEAR = 2024;

// Load all dataset CSV files using Vite's import.meta.glob
const datasetModules = import.meta.glob('/src/data/counties/*/dataset.csv', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Create a map of county slug to dataset content
const datasetMap = new Map<string, string>();
Object.entries(datasetModules).forEach(([path, content]) => {
  const pathParts = path.split('/');
  const countySlug = pathParts[pathParts.length - 2]; // Get folder name (second-to-last part)
  const textContent = typeof content === 'string' ? content : (content as any)?.default || '';
  if (countySlug && textContent) {
    datasetMap.set(countySlug, textContent);
  }
});

// Helper function to parse CSV line, handling quoted values
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
}

// Helper function to extract crime stats from dataset content
function getCrimeStatsFromDataset(datasetContent: string): { felonies: number; misdemeanors: number } {
  try {
    const lines = datasetContent.split('\n').filter(line => line.trim());
    
    // Find the year column index (2024 is at index 11: 0=County name, 1=2015, ..., 11=2024)
    if (lines.length === 0) return { felonies: 0, misdemeanors: 0 };
    
    const headerLine = parseCSVLine(lines[0]);
    const yearIndex = headerLine.findIndex(col => col === YEAR.toString());
    if (yearIndex === -1) return { felonies: 0, misdemeanors: 0 };
    
    // Find row 10: "Total Felonies per 1000 population" (0-indexed: row 9)
    const feloniesRow = lines.find(line => line.startsWith('Total Felonies per 1000 population'));
    let felonies = 0;
    if (feloniesRow) {
      const feloniesColumns = parseCSVLine(feloniesRow);
      if (feloniesColumns.length > yearIndex) {
        const value = feloniesColumns[yearIndex].replace(/"/g, '').replace(/,/g, '');
        felonies = parseFloat(value) || 0;
      }
    }
    
    // Find row 16: "Misdemeanors per 1000 population" (0-indexed: row 15)
    const misdemeanorsRow = lines.find(line => line.startsWith('Misdemeanors per 1000 population'));
    let misdemeanors = 0;
    if (misdemeanorsRow) {
      const misdemeanorsColumns = parseCSVLine(misdemeanorsRow);
      if (misdemeanorsColumns.length > yearIndex) {
        const value = misdemeanorsColumns[yearIndex].replace(/"/g, '').replace(/,/g, '');
        misdemeanors = parseFloat(value) || 0;
      }
    }
    
    return { felonies, misdemeanors };
  } catch {
    return { felonies: 0, misdemeanors: 0 };
  }
}

export interface County {
  name: string;
  slug: string;
  felonies_per_1k_pop: number;
  misdeamors_per_1k_pop: number;
  year: number;
  population: number;
}

// Base county data (without crime stats)
const baseCounties = [
  { name: "Alameda County", slug: "alameda", population: 1649060 },
  { name: "Alpine County", slug: "alpine", population: 1099 },
  { name: "Amador County", slug: "amador", population: 42026 },
  { name: "Butte County", slug: "butte", population: 208334 },
  { name: "Calaveras County", slug: "calaveras", population: 46505 },
  { name: "Colusa County", slug: "colusa", population: 22074 },
  { name: "Contra Costa County", slug: "contra-costa", population: 1172607 },
  { name: "Del Norte County", slug: "del-norte", population: 27009 },
  { name: "El Dorado County", slug: "el-dorado", population: 192823 },
  { name: "Fresno County", slug: "fresno", population: 1024125 },
  { name: "Glenn County", slug: "glenn", population: 28304 },
  { name: "Humboldt County", slug: "humboldt", population: 132380 },
  { name: "Imperial County", slug: "imperial", population: 181724 },
  { name: "Inyo County", slug: "inyo", population: 18485 },
  { name: "Kern County", slug: "kern", population: 922529 },
  { name: "Kings County", slug: "kings", population: 154913 },
  { name: "Lake County", slug: "lake", population: 67764 },
  { name: "Lassen County", slug: "lassen", population: 28340 },
  { name: "Los Angeles County", slug: "los-angeles", population: 9757179 },
  { name: "Madera County", slug: "madera", population: 165432 },
  { name: "Marin County", slug: "marin", population: 256400 },
  { name: "Mariposa County", slug: "mariposa", population: 17048 },
  { name: "Mendocino County", slug: "mendocino", population: 89175 },
  { name: "Merced County", slug: "merced", population: 296774 },
  { name: "Modoc County", slug: "modoc", population: 8491 },
  { name: "Mono County", slug: "mono", population: 12991 },
  { name: "Monterey County", slug: "monterey", population: 436251 },
  { name: "Napa County", slug: "napa", population: 132727 },
  { name: "Nevada County", slug: "nevada", population: 102195 },
  { name: "Orange County", slug: "orange", population: 3170435 },
  { name: "Placer County", slug: "placer", population: 433822 },
  { name: "Plumas County", slug: "plumas", population: 18834 },
  { name: "Riverside County", slug: "riverside", population: 2529933 },
  { name: "Sacramento County", slug: "sacramento", population: 1611231 },
  { name: "San Benito County", slug: "san-benito", population: 69159 },
  { name: "San Bernardino County", slug: "san-bernardino", population: 2214281 },
  { name: "San Diego County", slug: "san-diego", population: 3298799 },
  { name: "San Francisco County", slug: "san-francisco", population: 827526 },
  { name: "San Joaquin County", slug: "san-joaquin", population: 816108 },
  { name: "San Luis Obispo County", slug: "san-luis-obispo", population: 281843 },
  { name: "San Mateo County", slug: "san-mateo", population: 742893 },
  { name: "Santa Barbara County", slug: "santa-barbara", population: 444500 },
  { name: "Santa Clara County", slug: "santa-clara", population: 1926325 },
  { name: "Santa Cruz County", slug: "santa-cruz", population: 262406 },
  { name: "Shasta County", slug: "shasta", population: 181121 },
  { name: "Sierra County", slug: "sierra", population: 3113 },
  { name: "Siskiyou County", slug: "siskiyou", population: 42498 },
  { name: "Solano County", slug: "solano", population: 455101 },
  { name: "Sonoma County", slug: "sonoma", population: 485375 },
  { name: "Stanislaus County", slug: "stanislaus", population: 556972 },
  { name: "Sutter County", slug: "sutter", population: 98545 },
  { name: "Tehama County", slug: "tehama", population: 64451 },
  { name: "Trinity County", slug: "trinity", population: 15642 },
  { name: "Tulare County", slug: "tulare", population: 483546 },
  { name: "Tuolumne County", slug: "tuolumne", population: 53893 },
  { name: "Ventura County", slug: "ventura", population: 835427 },
  { name: "Yolo County", slug: "yolo", population: 225251 },
  { name: "Yuba County", slug: "yuba", population: 87469 },
];

// Build counties array with crime stats loaded from datasets
export const counties: County[] = baseCounties.map((baseCounty) => {
  const datasetContent = datasetMap.get(baseCounty.slug);
  const stats = datasetContent ? getCrimeStatsFromDataset(datasetContent) : { felonies: 0, misdemeanors: 0 };
  
  return {
    name: baseCounty.name,
    slug: baseCounty.slug,
    felonies_per_1k_pop: stats.felonies,
    misdeamors_per_1k_pop: stats.misdemeanors,
    year: YEAR,
    population: baseCounty.population,
  };
});

export const getCountyByName = (name: string): County | undefined => {
  return counties.find(county => county.name.toLowerCase() === name.toLowerCase());
};

export const slugToCounty = (slug: string): County | undefined => {
  return counties.find(county => county.slug === slug);
};

