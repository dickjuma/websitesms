import React from 'react';

const stats = [
  {
    number: '47',
    label: 'Counties Covered',
    description: 'Complete Kenya coverage',
  },
  {
    number: '400+',
    label: 'Businesses Served',
    description: 'Across all industries',
  },
  {
    number: '15',
    label: 'System Types',
    description: 'POS, ERP, HR, Web & more',
  },
  {
    number: '99.9%',
    label: 'Uptime',
    description: 'Reliable cloud systems',
  },
  {
    number: '24/7',
    label: 'Support',
    description: 'Local Kenyan support',
  },
  {
    number: '10,000+',
    label: 'Pages Indexed',
    description: 'SEO optimized content',
  },
];

const CountyStats: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 via-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(255,255,255,0.2) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-ping opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold mb-6">
            📊 LIVE STATISTICS
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl">
            Kenya Business Systems
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-red-300 bg-clip-text text-transparent">
              by the Numbers
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Powering businesses across all 47 counties with enterprise-grade digital solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/20">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 drop-shadow-lg group-hover:text-yellow-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/90 font-bold mb-1 uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="text-xs text-white/70 font-medium">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional visual elements */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-8 text-white/80">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">Nationwide Coverage</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">Growing Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountyStats;