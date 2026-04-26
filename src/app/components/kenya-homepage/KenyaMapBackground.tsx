import React from 'react';

const KenyaMapBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg viewBox="0 0 400 500" className="w-full h-full">
        {/* Kenya Outline */}
        <path
          d="M150 80 L180 75 L200 85 L220 90 L240 100 L260 110 L280 120 L290 140 L285 160 L270 180 L250 200 L230 220 L210 240 L190 250 L170 240 L150 230 L130 220 L120 200 L110 180 L100 160 L90 140 L80 120 L70 100 L80 80 L100 70 L120 65 L140 70 Z"
          fill="#2563eb"
          stroke="#dc2626"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* County markers - Red dots */}
        {/* Nairobi */}
        <circle cx="175" cy="195" r="3" fill="#dc2626" opacity="0.9" />
        <text x="175" y="190" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">NBO</text>

        {/* Mombasa */}
        <circle cx="220" cy="240" r="3" fill="#dc2626" opacity="0.9" />
        <text x="220" y="235" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">MSA</text>

        {/* Kisumu */}
        <circle cx="140" cy="180" r="3" fill="#dc2626" opacity="0.9" />
        <text x="140" y="175" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">KSM</text>

        {/* Nakuru */}
        <circle cx="160" cy="170" r="3" fill="#dc2626" opacity="0.9" />
        <text x="160" y="165" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">NKR</text>

        {/* Eldoret */}
        <circle cx="120" cy="140" r="3" fill="#dc2626" opacity="0.9" />
        <text x="120" y="135" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">EDO</text>

        {/* Meru */}
        <circle cx="190" cy="140" r="3" fill="#dc2626" opacity="0.9" />
        <text x="190" y="135" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">MER</text>

        {/* Garissa */}
        <circle cx="280" cy="120" r="3" fill="#dc2626" opacity="0.9" />
        <text x="280" y="115" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">GAR</text>

        {/* Kakamega */}
        <circle cx="110" cy="160" r="3" fill="#dc2626" opacity="0.9" />
        <text x="110" y="155" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">KKG</text>

        {/* Other counties - smaller dots */}
        <circle cx="200" cy="200" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="180" cy="210" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="160" cy="200" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="140" cy="190" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="130" cy="170" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="150" cy="150" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="170" cy="130" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="200" cy="120" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="230" cy="130" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="250" cy="150" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="270" cy="170" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="290" cy="190" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="100" cy="180" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="90" cy="160" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="95" cy="140" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="105" cy="120" r="2" fill="#dc2626" opacity="0.7" />

        {/* County boundaries - simplified */}
        <path d="M150 190 L170 185 L180 195 L160 200 Z" fill="none" stroke="#dc2626" strokeWidth="0.5" opacity="0.5" />
        <path d="M140 175 L160 170 L170 180 L150 185 Z" fill="none" stroke="#dc2626" strokeWidth="0.5" opacity="0.5" />
        <path d="M160 165 L180 160 L185 170 L165 175 Z" fill="none" stroke="#dc2626" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
};

export default KenyaMapBackground;