import { NextRequest, NextResponse } from 'next/server';
import { getJobs } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';

    const result = await getJobs({ status });

    const formattedJobs = result.jobs.map(job => ({
      id: job.id,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      status: job.status,
      createdAt: job.createdAt.toISOString(),
      postedAt: job.postedAt?.toISOString(),
    }));

    return NextResponse.json({ jobs: formattedJobs });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ jobs: [] }, { status: 500 });
  }
}