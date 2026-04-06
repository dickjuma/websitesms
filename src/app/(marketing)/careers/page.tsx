import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck, Cpu, Mail, FileText } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Careers | SMA Technologies",
  description: "Join SMA Technologies and work on meaningful systems. We're building a high-standard engineering and product team focused on secure, automated, and AI-driven platforms.",
};

const openRoles = [
 
  {
    id: "sec-eng-01",
    title: "Attachment ",
    department: " IT, Engineering  & Finance",
    type: "Full-time",
    location: "Nairobi, Kenya (On-site)",
    description: "Implement security best practices across applications and cloud infrastructure. Conduct threat modelling, manage IAM, and respond to incidents.",
    requirements: "Academic transcripts in the related fields ",
  }
];

export default function CareersPage() {
  return (
    <SiteShell>
      <div className="bg-slate-50 font-sans">
      {/* Hero Section - White background, blue text */}
      <section className="bg-white py-24 px-6 md:px-12 lg:px-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="text-blue-700 font-bold tracking-widest uppercase text-xs mb-4 block">
              Careers at SMA Technologies
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-slate-900">
              Build systems that <br />
              <span className="text-blue-700">
                scale and secure.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
              We engineer robust, high-performance applications. We are looking for forward-thinking engineers, designers, and operators to help us push the boundaries of system automation and web architecture.
            </p>
            <a 
              href="#open-roles"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-md"
            >
              View Open Roles <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Engineering Culture / Capabilities */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">How We Build</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We don't just write code; we design resilient systems. Joining our team means taking ownership of complex problems and delivering high-impact solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Code2 className="text-blue-700" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Modern Architecture</h3>
            <p className="text-slate-600 leading-relaxed">
              We leverage the full power of the MERN stack and modern React frameworks to create fast, scalable, and highly interactive user experiences.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-blue-700" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Security by Design</h3>
            <p className="text-slate-600 leading-relaxed">
              Security is foundational. We prioritize strict authentication protocols, rock-solid endpoints, and robust fraud prevention in every deployment.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="text-blue-700" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">AI & Automation</h3>
            <p className="text-slate-600 leading-relaxed">
              We actively integrate lightweight LLMs and automated logic to streamline financial dispatches, platform escrow, and operational workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Open Positions</h2>
            <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-semibold">
              {openRoles.length} Roles
            </span>
          </div>

          <div className="space-y-6">
            {openRoles.map((role) => (
              <div key={role.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 hover:text-blue-700 transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                      <span className="font-medium">{role.department}</span>
                      <span>•</span>
                      <span>{role.type}</span>
                      <span>•</span>
                      <span>{role.location}</span>
                    </div>
                    <p className="mt-4 text-slate-700">{role.description}</p>
                    <div className="mt-4">
                      <h4 className="font-semibold text-slate-900">Requirements:</h4>
                      <p className="text-slate-600 text-sm mt-1">{role.requirements}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={`mailto:careers@smasystems.com?subject=Application for ${role.title} (${role.id})&body=Dear SMA Team,%0D%0A%0D%0AI am applying for the position of ${role.title}. Please find my CV and cover letter attached.%0D%0A%0D%0ABest regards`}
                      className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition"
                    >
                      Apply Now <Mail size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Instructions & Policy */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-blue-700" size={28} />
            <h2 className="text-2xl font-bold text-slate-800">How to Apply</h2>
          </div>
          <div className="space-y-4 text-slate-700">
            <p>
              Send your <strong>CV</strong> and a <strong>cover letter</strong> to <br />
              <a href="mailto:careers@smasystems.com" className="text-blue-700 font-semibold hover:underline">
                careers@smasystems.com
              </a>
            </p>
            <p>
              Use the subject line: <strong>Application for [Job Title] – [Your Name]</strong>
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="font-semibold text-blue-800"> Important – Attachment & Probation Period</p>
              <p className="text-sm mt-1 text-slate-700">
                We offer a <strong>3‑month attachment/probation period</strong> for candidates in both <strong>finance and tech fields</strong>. 
                During this time, you will receive hands‑on mentorship, work on live projects, and be evaluated for a permanent role.
                This applies to all full‑time positions.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </SiteShell>
  );
}