// Alternative: Interactive Leaflet Map Component
// To use this, you'll need to install: npm install leaflet react-leaflet @types/leaflet

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface InteractiveKenyaMapProps {
  serviceSlug: string;
}

export function InteractiveKenyaMap({ serviceSlug }: InteractiveKenyaMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Kenya county coordinates (approximate)
  const locations = [
    { name: "Nairobi", slug: "nairobi", lat: -1.2864, lng: 36.8172 },
    { name: "Mombasa", slug: "mombasa", lat: -4.0435, lng: 39.6682 },
    { name: "Kisumu", slug: "kisumu", lat: -0.0917, lng: 34.7679 },
    { name: "Nakuru", slug: "nakuru", lat: -0.3031, lng: 36.0800 },
    { name: "Eldoret", slug: "eldoret", lat: 0.5143, lng: 35.2698 },
    { name: "Thika", slug: "thika", lat: -1.0388, lng: 37.0834 },
    { name: "Nyeri", slug: "nyeri", lat: -0.4167, lng: 36.9500 },
    { name: "Kakamega", slug: "kakamega", lat: 0.2827, lng: 34.7519 },
    { name: "Meru", slug: "meru", lat: 0.0471, lng: 37.6456 },
    { name: "Machakos", slug: "machakos", lat: -1.5167, lng: 37.2667 },
  ];

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[-0.0236, 37.9062]} // Center of Kenya
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker key={location.slug} position={[location.lat, location.lng]}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold">{location.name}</h3>
                <Link
                  href={`/kenya/${location.slug}/services/${serviceSlug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View {serviceSlug.replace('-', ' ')} services →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}