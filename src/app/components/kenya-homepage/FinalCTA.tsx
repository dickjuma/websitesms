import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
      <div className="absolute inset-0 bg-black/20" />


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Automating Your Business Today
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join hundreds of Kenyan businesses that have transformed their operations with our comprehensive software solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              Get Free Demo
            </button>

            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              Talk on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;