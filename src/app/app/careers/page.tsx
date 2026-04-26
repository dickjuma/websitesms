import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from '../components/hero-section';

export const metadata: Metadata = {
  title: 'Careers | SMA Systems',
  description: 'Join SMA Systems - careers in software development, web design, ERP implementation, and more. Work with East Africa\'s leading tech company.',
};

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: 'Build modern, responsive web applications using React, Next.js, and TypeScript.',
  },
  {
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: 'Develop robust APIs and server-side systems using Node.js, Python, and cloud technologies.',
  },
  {
    title: 'ERP Implementation Specialist',
    department: 'Consulting',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: 'Implement and customize ERP solutions for clients across various industries.',
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote / Nairobi',
    type: 'Full-time',
    description: 'Create intuitive, beautiful user interfaces for web and mobile applications.',
  },
];

export default function CareersPage() {
  return (
    <main>
      <HeroSection 
        title="Join Our Team"
        subtitle="Build your career with East Africa's leading software company. We offer competitive benefits, growth opportunities, and a great work environment."
      />

      {/* Benefits */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Why Work With Us</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Competitive Salary', desc: 'Market-leading compensation' },
              { title: 'Health Insurance', desc: 'Comprehensive medical cover' },
              { title: 'Learning Budget', desc: 'Training and certifications' },
              { title: 'Flexible Work', desc: 'Remote and hybrid options' },
            ].map((benefit, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Open Positions</h2>
            <p className="mt-4 text-lg text-slate-600">
              Find your next role and join us in transforming businesses across East Africa.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl space-y-4">
            {jobOpenings.map((job, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{job.department} • {job.location} • {job.type}</p>
                    <p className="text-sm text-slate-600 mt-2">{job.description}</p>
                  </div>
                  <a href="/contact" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800">
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
