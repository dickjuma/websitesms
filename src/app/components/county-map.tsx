'use client';

interface CountyMapProps {
  countySlug: string;
  countyName: string;
}

const countyCoordinates: Record<string, { lat: number; lng: number; zoom: number }> = {
  mombasa: { lat: -4.0435, lng: 39.6682, zoom: 11 },
  nairobi: { lat: -1.2921, lng: 36.8219, zoom: 11 },
  kisumu: { lat: -0.1022, lng: 34.7617, zoom: 11 },
  nakuru: { lat: -0.3031, lng: 36.0800, zoom: 11 },
  eldoret: { lat: 0.5143, lng: 35.2698, zoom: 11 },
  machakos: { lat: -1.5177, lng: 37.2634, zoom: 11 },
  meru: { lat: 0.0500, lng: 37.6500, zoom: 11 },
  kitui: { lat: -1.3667, lng: 38.0167, zoom: 10 },
  garissa: { lat: -0.4536, lng: 39.6401, zoom: 10 },
  malindi: { lat: -3.2138, lng: 40.1169, zoom: 11 },
  kakamega: { lat: 0.2827, lng: 34.7519, zoom: 11 },
  kericho: { lat: -0.3689, lng: 35.2863, zoom: 11 },
  thika: { lat: -1.0334, lng: 37.0692, zoom: 12 },
 yeri: { lat: -0.4197, lng: 36.9554, zoom: 11 },
  kisii: { lat: -0.6817, lng: 34.7660, zoom: 11 },
  migori: { lat: -1.1464, lng: 34.3819, zoom: 10 },
  bungoma: { lat: 0.5635, lng: 34.5606, zoom: 11 },
  busia: { lat: 0.3341, lng: 34.2094, zoom: 10 },
  kajiado: { lat: -1.8519, lng: 36.7832, zoom: 10 },
  kiambu: { lat: -1.1714, lng: 36.6565, zoom: 11 },
  laikipia: { lat: 0.3586, lng: 36.7643, zoom: 10 },
  isiolo: { lat: 0.3522, lng: 38.4872, zoom: 10 },
  marsabit: { lat: 2.3344, lng: 37.9878, zoom: 10 },
  turkana: { lat: 3.1205, lng: 35.5971, zoom: 8 },
  samburu: { lat: 1.0064, lng: 36.7882, zoom: 9 },
  nyandarua: { lat: -0.7802, lng: 36.4318, zoom: 10 },
  kirinyaga: { lat: -0.8091, lng: 37.2804, zoom: 11 },
  muranga: { lat: -0.6840, lng: 36.9634, zoom: 11 },
  embu: { lat: -0.5389, lng: 37.4583, zoom: 11 },
  makueni: { lat: -2.0628, lng: 37.5011, zoom: 9 },
  'taita-taveta': { lat: -3.3967, lng: 38.4000, zoom: 9 },
  kilifi: { lat: -3.6305, lng: 39.8599, zoom: 10 },
  kwale: { lat: -4.1746, lng: 39.6047, zoom: 9 },
  lamu: { lat: -2.2686, lng: 40.9020, zoom: 10 },
  'tana-river': { lat: -1.5153, lng: 39.9345, zoom: 8 },
  mandera: { lat: 3.9376, lng: 41.8567, zoom: 9 },
  wajir: { lat: 1.7500, lng: 40.0500, zoom: 8 },
  'west-pokot': { lat: 1.1500, lng: 35.0500, zoom: 9 },
  'trans-nzoia': { lat: 1.0154, lng: 35.0063, zoom: 9 },
  'uasin-gishu': { lat: 0.5143, lng: 35.2698, zoom: 9 },
  'elgeyo-marakwet': { lat: 0.7000, lng: 35.4500, zoom: 9 },
  nandi: { lat: 0.3000, lng: 35.0833, zoom: 9 },
  baringo: { lat: 0.9000, lng: 36.0500, zoom: 9 },
  narok: { lat: -1.0789, lng: 35.8604, zoom: 9 },
  bomet: { lat: -0.7870, lng: 35.1289, zoom: 9 },
  vihiga: { lat: 0.1500, lng: 34.7333, zoom: 10 },
  siaya: { lat: 0.2600, lng: 34.4500, zoom: 10 },
  'homa-bay': { lat: -0.6000, lng: 34.4500, zoom: 10 },
  nyamira: { lat: -0.7000, lng: 34.8000, zoom: 10 },
};

export function CountyMap({ countySlug, countyName }: CountyMapProps) {
  const data = countyCoordinates[countySlug];
  const lat = data?.lat ?? -0.0236;
  const lng = data?.lng ?? 37.9062;
  const zoom = data?.zoom ?? 10;

  const bboxPadding = 0.05;
  const minLat = lat - bboxPadding;
  const maxLat = lat + bboxPadding;
  const minLng = lng - bboxPadding;
  const maxLng = lng + bboxPadding;

  return (
    <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg border border-stone-200">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${countyName}, Kenya`}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`}
      />
    </div>
  );
}