"use server";

import { saveEnquiry } from "@/lib/db";

export interface EnquiryState {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function sendEnquiry(
  prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const website = formData.get("website")?.toString().trim();
  // Honeypot check: Bots fill hidden website field
  if (website) {
    return { ok: true };
  }

  const name = formData.get("name")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const area = formData.get("area")?.toString().trim() || "";
  const puppyId = formData.get("puppyId")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please write your name (at least 2 letters).";
  }

  if (!phone || phone.length < 7) {
    errors.phone = "Please provide a valid phone or WhatsApp number.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please check the highlighted blanks in your letter.",
      errors,
    };
  }

  try {
    saveEnquiry({
      name,
      phone,
      email: email || undefined,
      area: area || undefined,
      puppyId: puppyId || undefined,
      message: message || undefined,
    });

    return {
      ok: true,
      message: "Your letter has been posted! We'll reply shortly.",
    };
  } catch (error) {
    console.error("Enquiry submission failed:", error);
    return {
      ok: false,
      message: "Something went wrong while sealing your letter. Please WhatsApp us directly.",
    };
  }
}
