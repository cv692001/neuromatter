export type SheetSubmitResult = { success: true } | { success: false; error: string };

/** RFC-style email format validation (local@domain.tld). */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && EMAIL_REGEX.test(trimmed);
}

/** Use same-origin API so CORS is avoided: Vite proxy in dev, Vercel serverless in prod. */
function getSheetSubmitUrl(): string {
  return "/api/sheet-submit";
}

/**
 * Submits an email to the Google Sheet via the deployed Apps Script web app.
 * Used by the footer "Stay Updated" form and any Get in Touch → contact flow.
 */
export async function submitEmailToSheet(email: string): Promise<SheetSubmitResult> {
  const url = getSheetSubmitUrl();
  if (!url?.trim()) {
    return { success: false, error: "Sheet integration not configured." };
  }

  const trimmed = email.trim();
  if (!trimmed) return { success: false, error: "Email is required." };
  if (!isValidEmail(trimmed)) return { success: false, error: "Please enter a valid email address." };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed }),
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
