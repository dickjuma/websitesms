import React from 'react';

const testimonials = [
  {
    quote: "SMA Systems transformed our retail operations across 3 Nairobi locations. Their POS system increased our efficiency by 40%.",
    author: "Sarah Wanjiku",
    position: "Operations Manager",
    company: "Nairobi Supermarkets Ltd",
    county: "Nairobi",
  },
  {
    quote: "The ERP system helped us manage inventory across our Mombasa warehouses seamlessly. Excellent local support!",
    author: "Ahmed Hassan",
    position: "CEO",
    company: "Coastal Trading Co.",
    county: "Mombasa",
  },
  {
    quote: "From Kisumu to the rest of Nyanza, their HR system streamlined our payroll for 200+ employees.",
    author: "Grace Achieng",
    position: "HR Director",
    company: "Lake Basin Industries",
    county: "Kisumu",
  },
  {
    quote: "Custom web platform and CRM system boosted our leads by 60% in Nakuru and surrounding areas.",
    author: "David Kiprop",
    position: "Marketing Manager",
    company: "Rift Valley Tech Solutions",
    county: "Nakuru",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Success Stories from Across Kenya
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real businesses in real counties achieving real results with our systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.position}</div>
                  <div className="text-gray-600 text-sm">{testimonial.company}</div>
                  <div className="text-blue-600 text-sm font-medium">{testimonial.county} County</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;