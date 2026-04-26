'use client';

import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";

interface KenyaMapProps {
  serviceSlug: string;
  highlightedCounties?: string[];
}

export function KenyaMap({ serviceSlug, highlightedCounties = [] }: KenyaMapProps) {
  const counties = [
    { name: "Nairobi", slug: "nairobi", region: "Central", x: 45, y: 55 },
    { name: "Mombasa", slug: "mombasa", region: "Coast", x: 15, y: 75 },
    { name: "Kisumu", slug: "kisumu", region: "Western", x: 35, y: 45 },
    { name: "Nakuru", slug: "nakuru", region: "Rift Valley", x: 40, y: 50 },
    { name: "Eldoret", slug: "eldoret", region: "Rift Valley", x: 35, y: 35 },
    { name: "Thika", slug: "thika", region: "Central", x: 42, y: 52 },
    { name: "Nyeri", slug: "nyeri", region: "Central", x: 47, y: 48 },
    { name: "Kakamega", slug: "kakamega", region: "Western", x: 32, y: 40 },
    { name: "Meru", slug: "meru", region: "Eastern", x: 52, y: 42 },
    { name: "Machakos", slug: "machakos", region: "Eastern", x: 45, y: 58 },
    { name: "Garissa", slug: "garissa", region: "North Eastern", x: 65, y: 35 },
    { name: "Malindi", slug: "malindi", region: "Coast", x: 20, y: 70 },
    { name: "Kericho", slug: "kericho", region: "Rift Valley", x: 38, y: 42 },
    { name: "Kisii", slug: "kisii", region: "Western", x: 40, y: 45 },
    { name: "Migori", slug: "migori", region: "Western", x: 42, y: 48 },
    { name: "Bungoma", slug: "bungoma", region: "Western", x: 30, y: 38 },
    { name: "Busia", slug: "busia", region: "Western", x: 28, y: 42 },
    { name: "Kajiado", slug: "kajiado", region: "Rift Valley", x: 50, y: 60 },
    { name: "Kiambu", slug: "kiambu", region: "Central", x: 44, y: 54 },
    { name: "Laikipia", slug: "laikipia", region: "Rift Valley", x: 48, y: 40 },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Kenya Map SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto border rounded-lg shadow-lg bg-gradient-to-br from-green-50 to-blue-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Kenya Outline (Simplified) */}
        <path
          d="M25 20 L30 15 L45 10 L55 15 L65 20 L70 30 L75 45 L70 60 L60 70 L45 75 L30 70 L20 60 L15 45 L20 30 Z"
          fill="#e8f5e8"
          stroke="#2d5a2d"
          strokeWidth="0.5"
          opacity="0.8"
        />

        {/* County boundaries (simplified lines) */}
        <path d="M35 25 L35 55" stroke="#4a5568" strokeWidth="0.2" opacity="0.5" />
        <path d="M45 20 L45 65" stroke="#4a5568" strokeWidth="0.2" opacity="0.5" />
        <path d="M25 35 L60 35" stroke="#4a5568" strokeWidth="0.2" opacity="0.5" />
        <path d="M25 50 L60 50" stroke="#4a5568" strokeWidth="0.2" opacity="0.5" />

        {/* Location Markers */}
        {counties.map((county) => (
          <Link
            key={county.slug}
            href={`/kenya/${county.slug}/services/${serviceSlug}`}
            className="group"
          >
            <circle
              cx={county.x}
              cy={county.y}
              r="1.5"
              fill={highlightedCounties.includes(county.slug) ? "#ef4444" : "#3b82f6"}
              className="hover:r-2 transition-all duration-200 cursor-pointer"
            />
            {/* Tooltip */}
            <text
              x={county.x}
              y={county.y - 3}
              textAnchor="middle"
              className="text-xs fill-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ fontSize: '2px' }}
            >
              {county.name}
            </text>
          </Link>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Available Locations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Highlighted Areas</span>
        </div>
      </div>

      {/* Popular Locations Quick Links */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {counties.slice(0, 8).map((county) => (
          <Link
            key={county.slug}
            href={`/kenya/${county.slug}/services/${serviceSlug}`}
            className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow group"
          >
            <MapPin className="h-4 w-4 text-blue-500 group-hover:text-blue-600" />
            <div>
              <div className="font-medium text-gray-900 group-hover:text-blue-600">
                {county.name}
              </div>
              <div className="text-xs text-gray-500">{county.region}</div>
            </div>
            <ExternalLink className="h-3 w-3 text-gray-400 ml-auto group-hover:text-blue-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}