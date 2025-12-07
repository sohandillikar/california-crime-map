import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import type { GeoJsonObject } from 'geojson';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { counties, getCountyByName, type County } from '../data/counties';

// Number of color bins for crime rate visualization
const NUM_BINS = 5;

// Color palette (brown scale from light to dark)
const COLOR_PALETTE = [
  '#EFEBE9', // brown-100
  '#D7CCC8', // brown-200
  '#BCAAA4', // brown-300
  '#A1887F', // brown-400
  '#8D6E63', // brown-500
  '#6D4C41', // brown-600
  '#5D4037', // brown-700
  '#4E342E', // brown-800
];

// Get color index for a given bin index (maps bins to evenly spaced colors)
const getColorIndexForBin = (binIndex: number): number => {
  if (binIndex < 0) return 0;
  if (binIndex >= NUM_BINS) return COLOR_PALETTE.length - 1;
  
  // Map bin indices to evenly spaced color indices across the palette
  if (binIndex === 0) return 0; // Lightest
  if (binIndex === NUM_BINS - 1) return COLOR_PALETTE.length - 1; // Darkest
  
  // For bins in between, evenly distribute across the palette
  const colorStep = (COLOR_PALETTE.length - 1) / (NUM_BINS - 1);
  return Math.round(binIndex * colorStep);
};

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 6);
  }, [map, center]);
  return null;
}

function CrimeLegend() {
  const crimeStats = useMemo(() => {
    const totalCrimes = counties.map(c => c.felonies_per_1k_pop + c.misdeamors_per_1k_pop);
    const min = Math.min(...totalCrimes);
    const max = Math.max(...totalCrimes);
    return { min, max };
  }, []);

  // Create bins
  const bins = useMemo(() => {
    const { min, max } = crimeStats;
    const range = max - min;
    const binSize = range / NUM_BINS;
    
    const bins = [];
    for (let i = 0; i < NUM_BINS; i++) {
      const binMin = min + (binSize * i);
      const binMax = i === NUM_BINS - 1 ? max : min + (binSize * (i + 1));
      const binMid = (binMin + binMax) / 2;
      const binIndex = Math.min(Math.floor((binMid - min) / binSize), NUM_BINS - 1);
      const colorIndex = getColorIndexForBin(binIndex);
      bins.push({
        min: binMin,
        max: binMax,
        color: COLOR_PALETTE[colorIndex],
      });
    }
    
    return bins;
  }, [crimeStats]);

  return (
    <div className="mt-4 bg-white rounded-lg border border-brown-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-brown-900 mb-3">Crime Rate Legend</h3>
      <div className="flex flex-wrap gap-3">
        {bins.map((bin, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-brown-300"
              style={{ backgroundColor: bin.color }}
            />
            <span className="text-sm text-brown-700">
              {bin.min.toFixed(1)} - {bin.max.toFixed(1)} crimes per 1k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CaliforniaMap() {
  const navigate = useNavigate();
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/california-counties.geojson')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load GeoJSON data');
        }
        return res.json();
      })
      .then((data) => {
        setGeoJsonData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading GeoJSON:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const normalizeCountyName = (name: string): string | null => {
    if (!name) return null;
    
    // Try exact match first
    const county = getCountyByName(name);
    if (county) {
      return county.name;
    }
    
    // Try with "County" suffix
    const withCounty = name.includes('County') ? name : `${name} County`;
    const countyWithSuffix = getCountyByName(withCounty);
    if (countyWithSuffix) {
      return countyWithSuffix.name;
    }
    
    // Try without "County" suffix
    const withoutCounty = name.replace(/\s*County\s*$/i, '');
    const normalized = `${withoutCounty} County`;
    const normalizedCounty = getCountyByName(normalized);
    if (normalizedCounty) {
      return normalizedCounty.name;
    }
    
    return null;
  };

  const getCountyData = (name: string): County | undefined => {
    const normalizedName = normalizeCountyName(name);
    if (normalizedName) {
      return getCountyByName(normalizedName);
    }
    return undefined;
  };

  const handleCountyClick = (event: any) => {
    const layer = event.target;
    const feature = layer.feature;
    if (!feature || !feature.properties) return;
    
    // Try common property names for county names
    const countyName = 
      feature.properties.NAME || 
      feature.properties.name || 
      feature.properties.NAME_1 ||
      feature.properties.COUNTY ||
      feature.properties.County;
    
    if (countyName) {
      const normalizedName = normalizeCountyName(countyName);
      if (normalizedName) {
        const county = getCountyByName(normalizedName);
        if (county) {
          navigate(`/${county.slug}`);
        }
      }
    }
  };

  // Calculate min and max total crimes for color binning
  const crimeStats = useMemo(() => {
    const totalCrimes = counties.map(c => c.felonies_per_1k_pop + c.misdeamors_per_1k_pop);
    const min = Math.min(...totalCrimes);
    const max = Math.max(...totalCrimes);
    return { min, max };
  }, []);

  // Get color based on total crimes (discrete bins)
  const getColorForTotalCrimes = (totalCrimes: number): string => {
    const { min, max } = crimeStats;
    const range = max - min;
    const binSize = range / NUM_BINS;
    const binIndex = Math.min(Math.floor((totalCrimes - min) / binSize), NUM_BINS - 1);
    const colorIndex = getColorIndexForBin(binIndex);
    return COLOR_PALETTE[colorIndex];
  };

  const getCountyStyle = (feature?: any) => {
    let fillColor = '#A1887F'; // default brown-400
    const countyName = 
      feature?.properties?.NAME || 
      feature?.properties?.name || 
      feature?.properties?.NAME_1 ||
      feature?.properties?.COUNTY ||
      feature?.properties?.County;
    
    if (countyName) {
      const countyData = getCountyData(countyName);
      if (countyData) {
        const totalCrimes = countyData.felonies_per_1k_pop + countyData.misdeamors_per_1k_pop;
        fillColor = getColorForTotalCrimes(totalCrimes);
      }
    }

    return {
      fillColor,
      weight: 2,
      opacity: 1,
      color: '#ffffff',
      dashArray: '',
      fillOpacity: 0.5,
    };
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const countyName = 
      feature?.properties?.NAME || 
      feature?.properties?.name || 
      feature?.properties?.NAME_1 ||
      feature?.properties?.COUNTY ||
      feature?.properties?.County;
    
    const normalizedName = normalizeCountyName(countyName || '') || countyName;
    const countyData = getCountyData(countyName || '');
    
    // Create tooltip content with crime data
    let tooltipContent = normalizedName;
    if (countyData) {
      tooltipContent = `
        <div style="text-align: center; line-height: 1.4;">
          <strong>${countyData.name}</strong><br/>
          Population: ${countyData.population.toLocaleString()}<br/>
          Felonies: ${countyData.felonies_per_1k_pop.toFixed(2)} per 1k<br/>
          Misdemeanors: ${countyData.misdeamors_per_1k_pop.toFixed(2)} per 1k<br/>
          Year: ${countyData.year}
        </div>
      `;
    }
    
    layer.bindTooltip(tooltipContent, {
      permanent: false,
      sticky: true, // Makes tooltip follow the mouse
      direction: 'top',
      offset: L.point(0, -15), // Position 15px above cursor
      className: 'county-tooltip',
    });

    layer.on({
      click: handleCountyClick,
      mouseover: (e: any) => {
        const layer = e.target;
        const currentStyle = getCountyStyle(feature);
        // Darken the color on hover
        layer.setStyle({
          ...currentStyle,
          fillOpacity: 0.8,
          weight: 3,
        });
      },
      mouseout: (e: any) => {
        const layer = e.target;
        const style = getCountyStyle(feature);
        layer.setStyle(style);
      },
    });
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-brown-100 rounded-lg">
        <p className="text-brown-700">Loading map data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-red-50 rounded-lg border border-red-200">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading map</p>
          <p className="text-red-500 text-sm">{error}</p>
          <p className="text-brown-600 text-sm mt-2">Please ensure california-counties.geojson is in the public folder</p>
        </div>
      </div>
    );
  }

  // California bounding box: Southwest [32.5, -124.5] to Northeast [42.0, -114.0]
  const californiaBounds: [[number, number], [number, number]] = [
    [32.5, -124.5], // Southwest
    [42.0, -114.0], // Northeast
  ];

  return (
    <div className="w-full">
      <div className="w-full h-[600px] relative rounded-lg overflow-hidden border border-brown-300">
        <MapContainer
          center={[36.7783, -119.4179]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          maxBounds={californiaBounds}
          maxBoundsViscosity={1.0}
          className="z-0"
        >
          <MapController center={[36.7783, -119.4179]} />
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              style={getCountyStyle}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>
      <CrimeLegend />
    </div>
  );
}

