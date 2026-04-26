import { Metadata } from "next";
import AdminClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: 'Admin Dashboard - SMAS Systems',
  description: 'Manage your blog content, leads, contacts, and site settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}