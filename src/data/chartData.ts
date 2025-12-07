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

export interface ChartDataPoint {
  year: number;
  felonies: number;
  misdemeanors: number;
}

/**
 * Get chart data for a county showing crime trends from 2015-2030
 * @param countySlug - The county slug (e.g., 'alameda', 'los-angeles')
 * @returns Array of data points with year, felonies, and misdemeanors, or empty array if not found
 */
export function getCountyChartData(countySlug: string | undefined): ChartDataPoint[] {
  if (!countySlug) return [];
  
  const datasetContent = datasetMap.get(countySlug);
  if (!datasetContent) return [];
  
  try {
    const lines = datasetContent.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    // Parse header to get year columns (2015-2030)
    const headerLine = parseCSVLine(lines[0]);
    const years: number[] = [];
    for (let i = 1; i < headerLine.length; i++) {
      const yearStr = headerLine[i].trim();
      const year = parseInt(yearStr, 10);
      if (!isNaN(year) && year >= 2015 && year <= 2030) {
        years.push(year);
      }
    }
    
    // Find row 10: "Total Felonies per 1000 population" (0-indexed: row 9)
    const feloniesRow = lines.find(line => line.startsWith('Total Felonies per 1000 population'));
    if (!feloniesRow) return [];
    
    // Find row 16: "Misdemeanors per 1000 population" (0-indexed: row 15)
    const misdemeanorsRow = lines.find(line => line.startsWith('Misdemeanors per 1000 population'));
    if (!misdemeanorsRow) return [];
    
    const feloniesColumns = parseCSVLine(feloniesRow);
    const misdemeanorsColumns = parseCSVLine(misdemeanorsRow);
    
    // Extract data for each year (columns 1-16 correspond to years 2015-2030)
    const dataPoints: ChartDataPoint[] = [];
    
    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      const colIndex = i + 1; // Column index (skip county name column)
      
      // Parse felonies value
      let felonies = 0;
      if (colIndex < feloniesColumns.length) {
        const value = feloniesColumns[colIndex].replace(/"/g, '').replace(/,/g, '');
        felonies = parseFloat(value) || 0;
      }
      
      // Parse misdemeanors value
      let misdemeanors = 0;
      if (colIndex < misdemeanorsColumns.length) {
        const value = misdemeanorsColumns[colIndex].replace(/"/g, '').replace(/,/g, '');
        misdemeanors = parseFloat(value) || 0;
      }
      
      dataPoints.push({
        year,
        felonies,
        misdemeanors,
      });
    }
    
    return dataPoints;
  } catch (error) {
    console.error(`Error parsing chart data for ${countySlug}:`, error);
    return [];
  }
}

