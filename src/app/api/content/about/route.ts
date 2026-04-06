import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const about = await db.collection('about_page').findOne({});
    
    if (!about) {
      const defaultAbout = {
        hero: {
          eyebrow: "About SMA Technologies",
          title: "We build technology that empowers businesses to grow.",
          description: "Founded in Nairobi, SMA Technologies delivers end‑to‑end IT and software solutions. From custom applications and mobile apps to ERP, CRM, cloud infrastructure, and cybersecurity – we help companies digitise, automate, and scale with confidence."
        },
        stats: [
          { value: "50+", label: "Projects Delivered", icon: "Code" },
          { value: "98%", label: "Client Retention", icon: "Heart" },
          { value: "24/7", label: "Support Available", icon: "Clock" },
          { value: "10+", label: "Years Combined Experience", icon: "Award" }
        ],
        mission: "To empower Kenyan and African businesses with secure, scalable, and affordable technology solutions that drive efficiency, growth, and innovation.",
        vision: "To be the most trusted technology partner for businesses across Africa – known for quality, transparency, and lasting impact.",
        values: [
          { title: "Integrity First", description: "We believe in honest communication, transparent pricing, and doing the right thing – always.", icon: "Shield" },
          { title: "Technical Excellence", description: "We never compromise on quality. Our solutions are secure, scalable, and built to last.", icon: "Zap" },
          { title: "Client Partnership", description: "We don't just build software; we become your long‑term technology partner.", icon: "Users" },
          { title: "Continuous Innovation", description: "We stay ahead of the curve, bringing modern tools and practices to every project.", icon: "Rocket" }
        ],
        services: [
          { title: "Custom Software Development", description: "Tailored web and desktop applications for your unique workflows." },
          { title: "Mobile App Development", description: "Native iOS, Android, and cross‑platform apps." },
          { title: "ERP & CRM Systems", description: "Streamline operations, sales, and customer relationships." },
          { title: "Cloud & DevOps", description: "Scalable infrastructure, CI/CD, and cloud migration." },
          { title: "Cybersecurity", description: "Risk assessments, compliance, and 24/7 monitoring." },
          { title: "IT Consulting", description: "Strategic technology advice and digital transformation." }
        ],
        whyChooseUs: [
          { title: "Local Expertise, Global Standards", description: "Based in Nairobi, we understand the local market while applying international best practices." },
          { title: "End‑to‑End Delivery", description: "From strategy and design to development, deployment, and ongoing support – we've got you covered." },
          { title: "Transparent & Collaborative", description: "We communicate openly, involve you at every stage, and never surprise you with hidden costs." }
        ],
        cta: {
          title: "Ready to transform your business with technology?",
          description: "Let's talk about your goals and how we can help you achieve them."
        },
        updatedAt: new Date()
      };
      
      await db.collection('about_page').insertOne(defaultAbout);
      return NextResponse.json({ success: true, data: defaultAbout });
    }
    
    return NextResponse.json({ success: true, data: about });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { db } = await connectToDatabase();
    
    await db.collection('about_page').updateOne(
      {},
      { $set: { ...body, updatedAt: new Date() } },
      { upsert: true }
    );
    
    const updated = await db.collection('about_page').findOne({});
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}