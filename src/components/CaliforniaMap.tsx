import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import type { GeoJsonObject } from 'geojson';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { counties, countyToSlug } from '../data/counties';

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
    if (counties.includes(name)) {
      return name;
    }
    
    // Try with "County" suffix
    const withCounty = name.includes('County') ? name : `${name} County`;
    if (counties.includes(withCounty)) {
      return withCounty;
    }
    
    // Try without "County" suffix
    const withoutCounty = name.replace(/\s*County\s*$/i, '');
    const normalized = `${withoutCounty} County`;
    if (counties.includes(normalized)) {
      return normalized;
    }
    
    return null;
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
        const slug = countyToSlug(normalizedName);
        navigate(`/${slug}`);
      }
    }
  };

  const getCountyStyle = (_feature?: any) => {
    return {
      fillColor: '#8d6e63', // brown-400
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
    
    layer.bindTooltip(normalizedName, {
      permanent: false,
      direction: 'center',
      className: 'county-tooltip',
    });

    layer.on({
      click: handleCountyClick,
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          fillColor: '#6d4c41', // brown-600
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

  return (
    <div className="w-full h-[600px] relative rounded-lg overflow-hidden border border-brown-300 shadow-lg">
      <MapContainer
        center={[36.7783, -119.4179]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <MapController center={[36.7783, -119.4179]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            style={getCountyStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}

