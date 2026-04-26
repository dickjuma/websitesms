"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  MoreVertical,
  ChevronDown,
  X
} from "lucide-react";
// import { saveJob, updateJob, getJobs, deleteJob, Job as DBJob } from "@/lib/database";

interface Job {
  _id?: string;
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string;
  status: "active" | "draft" | "closed";
  createdAt: string;
  postedAt?: string;
}

function JobSkeleton() {
  return (
    <div className="animate-pulse p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 border-b border-slate-100 py-4">
          <div className="h-10 w-10 rounded-lg bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="h-3 w-56 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function JobCard({ job, onEdit, onDelete }: { job: Job; onEdit: (j: Job) => void; onDelete: (id: string) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  
  const statusStyles: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    draft: "bg-slate-100 text-slate-700",
    closed: "bg-red-100 text-red-700",
  };
  
  const typeColors: Record<string, string> = {
    "full-time": "bg-blue-50 text-blue-700",
    "part-time": "bg-purple-50 text-purple-700",
    contract: "bg-amber-50 text-amber-700",
    remote: "bg-cyan-50 text-cyan-700",
  };

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{job.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[job.type] || "bg-slate-100 text-slate-700"}`}>
                {job.type}
              </span>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[job.status] || statusStyles.draft}`}>
                {job.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => { onEdit(job); setShowMenu(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => { onDelete(job.id); setShowMenu(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <p className="mt-3 text-sm text-slate-600 line-clamp-2">{job.description}</p>
      
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Posted {job.postedAt || job.createdAt}
        </span>
      </div>
    </div>
  );
}

function JobModal({ 
  job, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  job: Job | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (j: Partial<Job>) => void;
}) {
  const [formData, setFormData] = useState<Partial<Job>>({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    requirements: "",
    status: "draft",
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "full-time",
        salary: "",
        description: "",
        requirements: "",
        status: "draft",
      });
    }
  }, [job, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {job ? "Edit Job" : "Add New Job"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                placeholder="Engineering"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                placeholder="Nairobi, Kenya"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Job Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Salary Range</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                placeholder="$80,000 - $120,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "draft" | "closed" })}
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="Job description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Requirements</label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="Job requirements..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {job ? "Save Changes" : "Add Job"}
          </button>
        </div>
      </div>
    </div>
  );
}


export default function JobsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setMounted(true);
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      // const result = await getJobs({ status: 'all' });
      // const formattedJobs: Job[] = result.jobs.map(dbJob => ({
      //   _id: dbJob._id,
      //   id: dbJob.id,
      //   title: dbJob.title,
      //   department: dbJob.department,
      //   location: dbJob.location,
      //   type: dbJob.type,
      //   salary: dbJob.salary,
      //   description: dbJob.description,
      //   requirements: dbJob.requirements,
      //   status: dbJob.status,
      //   createdAt: dbJob.createdAt.toISOString(),
      //   postedAt: dbJob.postedAt?.toISOString(),
      // }));
      // setJobs(formattedJobs);
      setJobs([]);
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (job: Partial<Job>) => {
    try {
      // await saveJob({
      //   id: `job-${Date.now()}`,
      //   title: job.title || "",
      //   department: job.department || "",
      //   location: job.location || "",
      //   type: job.type || "full-time",
      //   salary: job.salary,
      //   description: job.description || "",
      //   requirements: job.requirements || "",
      //   status: job.status || "draft",
      // });
      // await loadJobs();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const handleEditJob = async (job: Partial<Job>) => {
    if (!editingJob) return;
    try {
      // const dbJob = jobs.find(j => j.id === editingJob.id);
      // if (dbJob && dbJob._id) {
      //   await updateJob(dbJob._id, {
      //     ...job,
      //     postedAt: job.status === "active" && dbJob.status !== "active" ? new Date() : dbJob.postedAt ? new Date(dbJob.postedAt) : undefined,
      //   });
      //   await loadJobs();
      // }
      setEditingJob(null);
    } catch (error) {
      console.error("Failed to edit job:", error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    try {
      // const job = jobs.find(j => j.id === id);
      // if (job && job._id) {
      //   await deleteJob(job._id);
      //   await loadJobs();
      // }
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const filteredJobs = useMemo(() => {
    if (!filter) return jobs;
    const search = filter.toLowerCase();
    return jobs.filter(
      (j) =>
        j.title?.toLowerCase().includes(search) ||
        j.department?.toLowerCase().includes(search) ||
        j.location?.toLowerCase().includes(search)
    );
  }, [jobs, filter]);

  const stats = useMemo(() => ({
    total: jobs.length,
    active: jobs.filter(j => j.status === "active").length,
    draft: jobs.filter(j => j.status === "draft").length,
  }), [jobs]);

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Briefcase className="h-3 w-3" />
              Careers
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Job Openings
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Manage job postings and career opportunities.
            </p>
          </div>
          <button
            onClick={() => { setEditingJob(null); setShowModal(true); }}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Job
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Jobs</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{stats.active}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Drafts</p>
          <p className="mt-2 text-3xl font-bold text-slate-600">{stats.draft}</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {loading ? (
          <JobSkeleton />
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">No jobs found.</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Add your first job
            </button>
          </div>
        ) : (
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={(j) => setEditingJob(j)}
                onDelete={handleDeleteJob}
              />
            ))}
          </div>
        )}
      </section>

      <JobModal
        job={editingJob}
        isOpen={showModal || !!editingJob}
        onClose={() => { setShowModal(false); setEditingJob(null); }}
        onSave={editingJob ? handleEditJob : handleAddJob}
      />
    </main>
  );
}
