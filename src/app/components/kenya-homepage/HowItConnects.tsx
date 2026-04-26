import React from 'react';

const HowItConnects: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            One System. Every Business. Every County in Kenya.
          </h2>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {/* Flow items */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center min-w-[200px]">
              <div className="text-2xl mb-2">🛒</div>
              <h3 className="font-semibold text-gray-900">POS / ERP / HR / Web Development</h3>
            </div>

            <div className="text-4xl text-blue-600 hidden md:block">↓</div>
            <div className="text-4xl text-blue-600 md:hidden">→</div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="bg-green-50 rounded-xl p-6 text-center min-w-[200px]">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900">County Hub</h3>
              <p className="text-sm text-gray-600">(Nairobi, Bungoma, Eldoret)</p>
            </div>

            <div className="text-4xl text-blue-600 hidden md:block">↓</div>
            <div className="text-4xl text-blue-600 md:hidden">→</div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="bg-purple-50 rounded-xl p-6 text-center min-w-[200px]">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="font-semibold text-gray-900">Service + Location Pages</h3>
            </div>

            <div className="text-4xl text-blue-600 hidden md:block">↓</div>
            <div className="text-4xl text-blue-600 md:hidden">→</div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 text-center min-w-[200px]">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Business Growth & Automation</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItConnects;