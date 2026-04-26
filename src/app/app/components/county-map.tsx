'use client';

import { useEffect, useRef, useState } from 'react';

interface CountyMapProps {
  countySlug: string;
  countyName: string;
  center?: [number, number];
  zoom?: number;
}

const countyCoordinates: Record<string, { lat: number; lng: number; zoom: number }> = {
  mombasa: { lat: -4.0435, lng: 39.6682, zoom: 12 },
  nairobi: { lat: -1.2921, lng: 36.8219, zoom: 11 },
  kisumu: { lat: -0.1022, lng: 34.7617, zoom: 12 },
  nakuru: { lat: -0.3031, lng: 36.0800, zoom: 12 },
  eldoret: { lat: 0.5143, lng: 35.2698, zoom: 12 },
  machakos: { lat: -1.5177, lng: 37.2634, zoom: 12 },
  meru: { lat: 0.0500, lng: 37.6500, zoom: 12 },
  kitui: { lat: -1.3667, lng: 38.0167, zoom: 11 },
  garissa: { lat: -0.4536, lng: 39.6401, zoom: 11 },
  malindi: { lat: -3.2138, lng: 40.1169, zoom: 12 },
  kakamega: { lat: 0.2827, lng: 34.7519, zoom: 12 },
  kericho: { lat: -0.3689, lng: 35.2863, zoom: 12 },
  thika: { lat: -1.0334, lng: 37.0692, zoom: 13 },
  nyeri: { lat: -0.4197, lng: 36.9554, zoom: 12 },
  kisii: { lat: -0.6817, lng: 34.7660, zoom: 12 },
  migori: { lat: -1.1464, lng: 34.3819, zoom: 11 },
  bungoma: { lat: 0.5635, lng: 34.5606, zoom: 12 },
  busia: { lat: 0.3341, lng: 34.2094, zoom: 11 },
  kajiado: { lat: -1.8519, lng: 36.7832, zoom: 10 },
  kiambu: { lat: -1.1714, lng: 36.6565, zoom: 11 },
  laikipia: { lat: 0.3586, lng: 36.7643, zoom: 10 },
  isiolo: { lat: 0.3522, lng: 38.4872, zoom: 11 },
  marsabit: { lat: 2.3344, lng: 37.9878, zoom: 10 },
  turkana: { lat: 3.1205, lng: 35.5971, zoom: 9 },
  samburu: { lat: 1.0064, lng: 36.7882, zoom: 10 },
  nyandarua: { lat: -0.7802, lng: 36.4318, zoom: 10 },
  kirinyaga: { lat: -0.8091, lng: 37.2804, zoom: 11 },
  muranga: { lat: -0.6840, lng: 36.9634, zoom: 11 },
  embu: { lat: -0.5389, lng: 37.4583, zoom: 11 },
  makueni: { lat: -2.0628, lng: 37.5011, zoom: 10 },
  'taita-taveta': { lat: -3.3967, lng: 38.4000, zoom: 10 },
  kilifi: { lat: -3.6305, lng: 39.8599, zoom: 11 },
  kwale: { lat: -4.1746, lng: 39.6047, zoom: 10 },
  lamu: { lat: -2.2686, lng: 40.9020, zoom: 11 },
  'tana-river': { lat: -1.5153, lng: 39.9345, zoom: 9 },
  mandera: { lat: 3.9376, lng: 41.8567, zoom: 10 },
  wajir: { lat: 1.7500, lng: 40.0500, zoom: 9 },
  'west-pokot': { lat: 1.1500, lng: 35.0500, zoom: 10 },
  'trans-nzoia': { lat: 1.0154, lng: 35.0063, zoom: 10 },
  'uasin-gishu': { lat: 0.5143, lng: 35.2698, zoom: 10 },
  'elgeyo-marakwet': { lat: 0.7000, lng: 35.4500, zoom: 10 },
  nandi: { lat: 0.3000, lng: 35.0833, zoom: 10 },
  baringo: { lat: 0.9000, lng: 36.0500, zoom: 9 },
  narok: { lat: -1.0789, lng: 35.8604, zoom: 10 },
  bomet: { lat: -0.7870, lng: 35.1289, zoom: 10 },
  vihiga: { lat: 0.1500, lng: 34.7333, zoom: 11 },
  siaya: { lat: 0.2600, lng: 34.4500, zoom: 10 },
  'homa-bay': { lat: -0.6000, lng: 34.4500, zoom: 10 },
  nyamira: { lat: -0.7000, lng: 34.8000, zoom: 10 },
};

export function CountyMap({ countySlug, countyName, center, zoom }: CountyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const countyData = countyCoordinates[countySlug];
  const mapCenter: [number, number] = center 
    ? center 
    : countyData 
      ? [countyData.lat, countyData.lng] 
      : [-0.0236, 37.9062];
  const mapZoom = zoom 
    ? zoom 
    : countyData 
      ? countyData.zoom 
      : 6;

  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return;

    async function initMap() {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      mapInstanceRef.current = L.map(mapRef.current!, {
        center: mapCenter,
        zoom: mapZoom,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      if (countyData) {
        const marker = L.marker([countyData.lat, countyData.lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div style="background:#2563eb;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          }),
        }).addTo(mapInstanceRef.current);

        marker.bindPopup(`
          <div style="font-family:system-ui,sans-serif;padding:4px;">
            <strong style="font-size:14px;">${countyName}</strong><br/>
            <span style="font-size:12px;color:#666;">Kenya</span>
          </div>
        `);
      }
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, countySlug, countyName, mapCenter, mapZoom, countyData]);

  if (!isClient) {
    return (
      <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center">
        <span className="text-slate-400">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg border border-slate-200">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}