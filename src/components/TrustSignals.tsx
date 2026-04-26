"use client";

import { Star, Award, Users, TrendingUp, Shield, CheckCircle } from 'lucide-react';

export function TrustSignals() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Kenyan Businesses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join 400+ successful projects across Kenya's leading companies
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">400+</div>
            <div className="text-sm text-gray-600">Projects Delivered</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.8/5</div>
            <div className="text-sm text-gray-600">Client Satisfaction</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">8+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-sm text-gray-600">On-Time Delivery</div>
          </div>
        </div>

        {/* Client Logos/Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-gray-700 mb-4">
              "SMAS Systems transformed our retail operations with their POS system. Excellent support and reliable software."
            </blockquote>
            <cite className="text-sm text-gray-600">
              - Sarah Wanjiku, Retail Manager, Nairobi
            </cite>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-gray-700 mb-4">
              "Their ERP system streamlined our manufacturing processes. Professional team and great results."
            </blockquote>
            <cite className="text-sm text-gray-600">
              - David Kiprop, Operations Director, Nakuru
            </cite>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-gray-700 mb-4">
              "Custom software solution exceeded our expectations. Delivered on time and within budget."
            </blockquote>
            <cite className="text-sm text-gray-600">
              - Grace Achieng, CEO, Kisumu
            </cite>
          </div>
        </div>

        {/* Certifications/Security */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Certified & Secure Development
            </h3>
            <p className="text-gray-600">
              We maintain the highest standards in software development and data security
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">SSL Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">Licensed Developers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mini trust signals for location pages
export function MiniTrustSignals({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-700">400+ Projects Delivered</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-gray-700">4.8/5 Client Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700">Licensed & Certified</span>
        </div>
      </div>
    </div>
  );
}