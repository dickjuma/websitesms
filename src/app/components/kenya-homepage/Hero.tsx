import React from 'react';
import KenyaMapBackground from './KenyaMapBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Kenya Map Background with Red Markers */}
      <KenyaMapBackground />

      {/* Animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 animate-pulse"></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/20 border border-red-400/30 text-red-300 text-sm font-medium mb-8 backdrop-blur-sm">
            🇰🇪 Covering All 47 Counties in Kenya
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight">
            <span className="bg-gradient-to-r from-red-400 via-white to-blue-400 bg-clip-text text-transparent">
              Kenya's
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">
              Business Software
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              Revolution
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Complete digital transformation for businesses across all 47 counties.
            <span className="text-red-400 font-semibold"> POS systems • ERP platforms • HR management • Web development • Custom solutions</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10">🚀 Get Free Demo</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            <button className="group relative bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-white/10 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10">💬 WhatsApp Consultation</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-red-400 mb-2">47</div>
              <div className="text-sm md:text-base text-gray-300 font-medium">Counties Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">400+</div>
              <div className="text-sm md:text-base text-gray-300 font-medium">Businesses Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">15</div>
              <div className="text-sm md:text-base text-gray-300 font-medium">System Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-purple-400 mb-2">99.9%</div>
              <div className="text-sm md:text-base text-gray-300 font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-3 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-red-400/30 rounded-tl-3xl"></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-blue-400/30 rounded-tr-3xl"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-blue-400/30 rounded-bl-3xl"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-red-400/30 rounded-br-3xl"></div>
    </section>
  );
};

export default Hero;