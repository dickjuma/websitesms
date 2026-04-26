import React from 'react';
import Link from 'next/link';

const FinalCta: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Start Automating Your Business Today
        </h2>

        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
          Join hundreds of Kenyan businesses that have transformed their operations with our comprehensive software solutions. Available in all 47 counties.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="#contact"
            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold rounded-lg transition-colors duration-200 inline-block"
          >
            Get Free Demo
          </Link>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-xl font-bold rounded-lg transition-colors duration-200 inline-block"
          >
            WhatsApp Consultation
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-slate-300">Support Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">30 Days</div>
            <div className="text-slate-300">Free Trial</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">No Setup</div>
            <div className="text-slate-300">Fees</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;