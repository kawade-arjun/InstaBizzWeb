import React from "react";
import type { Metadata } from "next";
import { getAllEnquiries } from "@/lib/db";
import { AdminEnquiriesClient } from "./AdminEnquiriesClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | TeddyPups U.A.E.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const enquiries = getAllEnquiries();

  return (
    <div className="gutter mx-auto max-w-[110rem] py-12 md:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cocoa/10 pb-6">
        <div>
          <span className="font-scrawl text-toffee text-sm font-bold">confidential concierge portal</span>
          <h1 className="font-plush text-3xl sm:text-4xl text-cocoa font-bold mt-1">
            Inquiries &amp; Customer Letters
          </h1>
          <p className="text-cocoa-soft text-sm mt-1">
            Manage customer reservation letters, contact requests, and follow-ups.
          </p>
        </div>
      </div>

      {/* Interactive Client Table & Tools */}
      <AdminEnquiriesClient initialEnquiries={enquiries} />
    </div>
  );
}
