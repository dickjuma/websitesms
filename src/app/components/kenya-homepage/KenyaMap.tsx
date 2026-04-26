import React from 'react';
import Link from 'next/link';

const KenyaMap: React.FC = () => {
  // Major county positions with accurate placements
  const countyPositions = [
    { name: 'Nairobi', slug: 'nairobi', x: 48, y: 62, size: 4 },
    { name: 'Mombasa', slug: 'mombasa', x: 68, y: 78, size: 3.5 },
    { name: 'Kisumu', slug: 'kisumu', x: 35, y: 52, size: 3 },
    { name: 'Nakuru', slug: 'nakuru', x: 42, y: 56, size: 3 },
    { name: 'Eldoret', slug: 'eldoret', x: 32, y: 42, size: 3 },
    { name: 'Meru', slug: 'meru', x: 52, y: 45, size: 2.5 },
    { name: 'Garissa', slug: 'garissa', x: 75, y: 32, size: 2.5 },
    { name: 'Kakamega', slug: 'kakamega', x: 28, y: 48, size: 2.5 },
    { name: 'Bungoma', slug: 'bungoma', x: 25, y: 38, size: 2.5 },
    { name: 'Machakos', slug: 'machakos', x: 50, y: 67, size: 2.5 },
    { name: 'Kiambu', slug: 'kiambu', x: 45, y: 58, size: 2.5 },
    { name: 'Murang\'a', slug: 'muranga', x: 47, y: 55, size: 2 },
    { name: 'Nyeri', slug: 'nyeri', x: 50, y: 52, size: 2 },
    { name: 'Kericho', slug: 'kericho', x: 38, y: 50, size: 2 },
    { name: 'Kajiado', slug: 'kajiado', x: 45, y: 70, size: 2 },
    { name: 'Narok', slug: 'narok', x: 42, y: 65, size: 2 },
    { name: 'Laikipia', slug: 'laikipia', x: 45, y: 45, size: 2 },
    { name: 'Trans-Nzoia', slug: 'trans-nzoia', x: 30, y: 35, size: 2 },
    { name: 'Uasin Gishu', slug: 'uasin-gishu', x: 35, y: 38, size: 2 },
    { name: 'Nandi', slug: 'nandi', x: 35, y: 45, size: 2 },
  ];

  return (
    <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-3xl p-8 shadow-2xl border border-red-100">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-black text-gray-900 mb-2 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          🗺️ Interactive Kenya Business Map
        </h3>
        <p className="text-gray-600 font-medium">
          Red markers show all active business software hubs
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 shadow-inner border border-gray-200">
        {/* Kenya Map SVG with enhanced styling */}
        <svg viewBox="0 0 100 100" className="w-full h-80 md:h-96 drop-shadow-lg">
          {/* Kenya outline with gradient */}
          <defs>
            <linearGradient id="kenyaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#dc2626', stopOpacity: 0.8}} />
              <stop offset="50%" style={{stopColor: '#2563eb', stopOpacity: 0.6}} />
              <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 0.8}} />
            </linearGradient>
          </defs>

          {/* Enhanced Kenya shape */}
          <path
            d="M25 15 L78 15 L82 22 L85 32 L82 42 L77 52 L72 62 L67 72 L62 77 L52 79 L42 77 L32 72 L27 62 L22 52 L17 42 L12 32 L15 22 Z"
            fill="url(#kenyaGradient)"
            stroke="#dc2626"
            strokeWidth="1.5"
            opacity="0.9"
          />

          {/* County boundary lines */}
          <path d="M35 55 L45 52 L50 57 L40 60 Z" fill="none" stroke="#dc2626" strokeWidth="0.5" opacity="0.6" />
          <path d="M30 45 L40 42 L42 47 L32 50 Z" fill="none" stroke="#dc2626" strokeWidth="0.5" opacity="0.6" />
          <path d="M45 35 L55 32 L57 37 L47 40 Z" fill="none" stroke="#dc2626" strokeWidth="0.5" opacity="0.6" />

          {/* Red county markers with pulsing effect */}
          {countyPositions.map((county, index) => (
            <Link key={index} href={`/kenya/${county.slug}`}>
              <g className="hover:scale-125 transition-transform duration-300 cursor-pointer">
                {/* Outer glow ring */}
                <circle
                  cx={county.x}
                  cy={county.y}
                  r={county.size + 2}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="0.5"
                  opacity="0.3"
                  className="animate-ping"
                />
                {/* Main marker */}
                <circle
                  cx={county.x}
                  cy={county.y}
                  r={county.size}
                  fill="#dc2626"
                  className="hover:fill-red-700 transition-colors duration-300 drop-shadow-lg"
                  title={`${county.name} - Click to explore business systems`}
                />
                {/* White center dot */}
                <circle
                  cx={county.x}
                  cy={county.y}
                  r={county.size - 1}
                  fill="#ffffff"
                  opacity="0.9"
                />
                {/* County label */}
                <text
                  x={county.x}
                  y={county.y - county.size - 1}
                  textAnchor="middle"
                  fontSize="2.5"
                  fill="#dc2626"
                  fontWeight="bold"
                  className="pointer-events-none select-none"
                >
                  {county.name.length > 8 ? county.name.substring(0, 6) + '...' : county.name}
                </text>
              </g>
            </Link>
          ))}

          {/* Service type indicators */}
          <g transform="translate(5, 85)">
            <circle cx="3" cy="3" r="1.5" fill="#dc2626" />
            <text x="8" y="5" fontSize="2.5" fill="#dc2626" fontWeight="bold">POS Systems</text>
          </g>
          <g transform="translate(25, 85)">
            <circle cx="3" cy="3" r="1.5" fill="#2563eb" />
            <text x="8" y="5" fontSize="2.5" fill="#2563eb" fontWeight="bold">ERP Software</text>
          </g>
          <g transform="translate(45, 85)">
            <circle cx="3" cy="3" r="1.5" fill="#059669" />
            <text x="8" y="5" fontSize="2.5" fill="#059669" fontWeight="bold">HR Systems</text>
          </g>
        </svg>

        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-4 font-medium">
            🔥 Click any red marker to explore business software solutions in that county
          </p>
          <div className="flex justify-center flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-red-50 px-3 py-2 rounded-full border border-red-200">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-red-700 font-medium">Active County Hubs</span>
            </div>
            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-blue-700 font-medium">47 Counties Total</span>
            </div>
            <div className="flex items-center bg-green-50 px-3 py-2 rounded-full border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-700 font-medium">All Services Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KenyaMap;