"use client";

import React, { useState, useMemo } from "react";
import { deleteEnquiryAction } from "@/app/actions";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  area: string | null;
  puppy_id: string | null;
  puppy_name: string | null;
  message: string | null;
  created_at: string;
}

export function AdminEnquiriesClient({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const filteredEnquiries = useMemo(() => {
    if (!searchQuery.trim()) return enquiries;
    const q = searchQuery.toLowerCase();
    return enquiries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q) ||
        (e.email && e.email.toLowerCase().includes(q)) ||
        (e.area && e.area.toLowerCase().includes(q)) ||
        (e.puppy_name && e.puppy_name.toLowerCase().includes(q))
    );
  }, [enquiries, searchQuery]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;
    await deleteEnquiryAction(id);
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Area", "Puppy", "Message", "Date"];
    const rows = enquiries.map((e) => [
      e.id,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ""}"`,
      `"${e.area || ""}"`,
      `"${e.puppy_name || ""}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      `"${e.created_at}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `teddypups_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border-2 border-cocoa bg-milk p-6 shadow-sm">
          <p className="font-scrawl text-xs text-cocoa-soft font-bold">Total Inquiries</p>
          <p className="font-plush text-4xl text-toffee font-black mt-1">{enquiries.length}</p>
        </div>
        <div className="rounded-2xl border-2 border-cocoa bg-milk p-6 shadow-sm">
          <p className="font-scrawl text-xs text-cocoa-soft font-bold">Database Status</p>
          <p className="font-plush text-2xl text-emerald-700 font-bold mt-2">Active &amp; Connected</p>
        </div>
        <div className="rounded-2xl border-2 border-cocoa bg-milk p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="font-scrawl text-xs text-cocoa-soft font-bold">Export Customer Records</p>
            <p className="text-xs text-cocoa-soft mt-1">Download complete CSV file</p>
          </div>
          <button
            type="button"
            onClick={handleExportCSV}
            className="btn btn-ghost text-xs px-4 py-2 cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="search"
          placeholder="Search by name, phone, email, puppy…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 rounded-full border border-cocoa/20 bg-milk px-4 py-2.5 text-sm text-cocoa focus:border-toffee focus:outline-none"
        />
        <span className="text-xs font-semibold text-cocoa-soft">
          Showing {filteredEnquiries.length} of {enquiries.length} inquiries
        </span>
      </div>

      {/* Table */}
      <div className="rounded-2xl border-2 border-cocoa bg-milk shadow-md overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead className="border-b border-cocoa/15 bg-honey/15 font-plush text-cocoa font-bold">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Area</th>
              <th className="p-4">Puppy</th>
              <th className="p-4">Note</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cocoa/10">
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((e) => (
                <tr key={e.id} className="hover:bg-honey/5 transition-colors">
                  <td className="p-4 whitespace-nowrap text-cocoa-soft text-xs">
                    {new Date(e.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-4 font-bold text-cocoa whitespace-nowrap">{e.name}</td>
                  <td className="p-4 whitespace-nowrap space-y-1">
                    <a
                      href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline block"
                    >
                      {e.phone} (WhatsApp)
                    </a>
                    {e.email && (
                      <a href={`mailto:${e.email}`} className="text-cocoa-soft hover:underline block text-xs">
                        {e.email}
                      </a>
                    )}
                  </td>
                  <td className="p-4 text-cocoa-soft whitespace-nowrap">{e.area || "—"}</td>
                  <td className="p-4 font-semibold text-toffee whitespace-nowrap">{e.puppy_name || "Any puppy"}</td>
                  <td className="p-4 max-w-xs truncate text-cocoa-soft">
                    {e.message ? (
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(e)}
                        className="text-toffee hover:underline cursor-pointer truncate max-w-[200px] block"
                      >
                        {e.message}
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEnquiry(e)}
                      className="rounded-full bg-honey/20 px-3 py-1 font-bold text-cocoa text-xs hover:bg-honey/40 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(e.id)}
                      className="rounded-full bg-rose-100 text-rose-800 px-3 py-1 font-bold text-xs hover:bg-rose-200 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-cocoa-soft text-sm">
                  No inquiries found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-cocoa/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="w-full max-w-lg rounded-3xl border-3 border-cocoa bg-milk p-6 sm:p-8 shadow-2xl relative">
            <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ "--tape": "#fbe3b4" } as React.CSSProperties} />
            <div className="flex items-center justify-between border-b border-cocoa/10 pb-4">
              <div>
                <span className="font-scrawl text-toffee text-sm font-bold">customer letter</span>
                <h2 className="font-plush text-2xl font-bold text-cocoa">{selectedEnquiry.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="size-8 rounded-full border border-cocoa flex items-center justify-center text-sm font-bold hover:bg-honey-soft cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-scrawl text-xs text-cocoa-soft">Phone / WhatsApp</p>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <p className="font-scrawl text-xs text-cocoa-soft">Email</p>
                  <p className="font-semibold text-cocoa">{selectedEnquiry.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="font-scrawl text-xs text-cocoa-soft">Area / Neighborhood</p>
                  <p className="font-semibold text-cocoa">{selectedEnquiry.area || "Not provided"}</p>
                </div>
                <div>
                  <p className="font-scrawl text-xs text-cocoa-soft">Puppy of Interest</p>
                  <p className="font-bold text-toffee">{selectedEnquiry.puppy_name || "Any puppy"}</p>
                </div>
              </div>

              <div>
                <p className="font-scrawl text-xs text-cocoa-soft">Message / Note</p>
                <div className="mt-1 p-4 rounded-xl border border-cocoa/15 bg-honey/10 font-scrawl text-base text-cocoa leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message || "No custom note provided."}
                </div>
              </div>

              <div className="pt-2 text-right text-xs text-cocoa-soft">
                Submitted on: {new Date(selectedEnquiry.created_at).toLocaleString()}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cocoa/10 flex justify-end gap-3">
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                  selectedEnquiry.name
                )}%2C%20thank%20you%20for%20your%20message%20to%20TeddyPups%20U.A.E.!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp text-xs py-2 px-4"
              >
                Reply on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="btn btn-ghost text-xs py-2 px-4 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
