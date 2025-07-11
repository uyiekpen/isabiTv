"use server";

import { getSupabaseClient } from "@/lib/supabase";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export interface ContactFormResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(
  prevState: ContactFormResult | null,
  formData: FormData
): Promise<ContactFormResult> {
  try {
    const supabase = getSupabaseClient();

    // Extract form data
    const contactData: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      inquiryType: formData.get("inquiryType") as string,
    };

    // Validate required fields
    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.subject ||
      !contactData.message
    ) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    // Insert into database
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        inquiry_type: contactData.inquiryType,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Database error:", error);
      return {
        success: false,
        error: "Failed to submit your message. Please try again.",
      };
    }

    return {
      success: true,
      message:
        "Thank you for your message! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
