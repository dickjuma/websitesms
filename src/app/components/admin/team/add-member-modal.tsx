"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Loader2, User } from "lucide-react";
import { useUIStore } from "@/lib/admin-store";
import { uploadTeamMemberImage } from "@/components/admin/team/upload-team-member-image";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: {
    name: string;
    email: string;
    role: string;
    bio?: string;
    department?: string;
    linkedin?: string;
    photoUrl?: string;
  }) => Promise<void>;
}

export function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [department, setDepartment] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const addToast = useUIStore((s) => s.addToast);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and close on Escape
  useEffect(() => {
    if (isOpen) {
      nameInputRef.current?.focus();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle click outside (optional)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      addToast("Please select an image file", "error");
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadTeamMemberImage(file);
      setPhotoUrl(imageUrl);
      addToast("Image uploaded", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to upload image", "error");
    } finally {
      setUploading(false);
      e.target.value = ""; // clear input
    }
  }, [addToast]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) {
      addToast("Name and email are required", "error");
      return;
    }

    setSaving(true);
    try {
      await onAdd({
        name: trimmedName,
        email: trimmedEmail,
        role: role.trim(),
        bio: bio.trim() || undefined,
        department: department.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
        photoUrl: photoUrl || undefined,
      });
      // Reset form
      setName("");
      setEmail("");
      setRole("");
      setBio("");
      setDepartment("");
      setLinkedin("");
      setPhotoUrl("");
      onClose();
      addToast("Team member added", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to add team member", "error");
    } finally {
      setSaving(false);
    }
  }, [name, email, role, bio, department, linkedin, photoUrl, onAdd, onClose, addToast]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <h2 id="modal-title" className="text-base font-semibold text-slate-900">
            Add Team Member
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Photo upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                {photoUrl ? (
                  <img src={photoUrl} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-slate-400" aria-hidden="true" />
                )}
              </div>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
            </div>
            <div className="mt-2">
              <label
                htmlFor="photo-upload"
                className="cursor-pointer text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
              >
                {photoUrl ? "Change photo" : "Upload photo"}
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="member-name" className="block text-sm font-medium text-slate-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="member-name"
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={saving}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="member-email" className="block text-sm font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="member-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={saving}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50"
              placeholder="john@example.com"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="member-role" className="block text-sm font-medium text-slate-700">
              Role
            </label>
            <input
              id="member-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={saving}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50"
              placeholder="e.g. Lead Developer"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="member-dept" className="block text-sm font-medium text-slate-700">
              Department
            </label>
            <select
              id="member-dept"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={saving}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50"
            >
              <option value="">Select department</option>
              <option value="Leadership">Leadership</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Operations">Operations</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="member-bio" className="block text-sm font-medium text-slate-700">
              Bio
            </label>
            <textarea
              id="member-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              disabled={saving}
              className="mt-1 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50"
              placeholder="Short bio..."
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label htmlFor="member-linkedin" className="block text-sm font-medium text-slate-700">
              LinkedIn (URL)
            </label>
            <input
              id="member-linkedin"
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              disabled={saving}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim() || !email.trim()}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Adding...
                </span>
              ) : (
                "Add Member"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
