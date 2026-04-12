export type SheetSubmitResult = { success: true } | { success: false; error: string };

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && EMAIL_REGEX.test(trimmed);
}

function getSheetSubmitUrl(): string {
  return "/api/sheet-submit";
}

/**
 * Submits contact info (name, email, phone) to the Google Sheet
 * via the deployed Apps Script web app.
 */
export async function submitContactToSheet(payload: ContactPayload): Promise<SheetSubmitResult> {
  const url = getSheetSubmitUrl();
  if (!url?.trim()) {
    return { success: false, error: "Sheet integration not configured." };
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const phone = payload.phone.trim();

  if (!name) return { success: false, error: "Name is required." };
  if (!email) return { success: false, error: "Email is required." };
  if (!isValidEmail(email)) return { success: false, error: "Please enter a valid email address." };
  if (!phone) return { success: false, error: "Phone number is required." };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    if (!res.ok) {
      return { success: false, error: `Request failed: ${res.status}` };
    }
    const data = await res.json().catch(() => ({}));
    return data?.success === true ? { success: true } : { success: false, error: data?.error ?? "Unknown error" };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to submit.";
    return { success: false, error: message };
  }
}

/** @deprecated Use submitContactToSheet instead */
export async function submitEmailToSheet(email: string): Promise<SheetSubmitResult> {
  return submitContactToSheet({ name: "", email, phone: "" });
}
