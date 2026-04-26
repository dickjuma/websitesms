import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Complete Business Software Solutions for Companies Across Kenya
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              POS, ERP, HR systems, web development, and custom software built for Kenyan businesses with county-based digital infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 inline-block text-center"
              >
                Get Free Demo
              </Link>

              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 inline-block text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <Image
                src="/hero-section.jpg"
                alt="SMA Systems Dashboard - Business Software Solutions for Kenya"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;