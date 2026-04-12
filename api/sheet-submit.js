/**
 * Vercel serverless proxy for Google Apps Script (contact form to sheet).
 * Avoids CORS when the frontend on Vercel calls this same-origin API.
 */
const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzOA9q5EiV3sW_4rWud_Y2XhFpMSOmlel34rY1hHI8aS5B9WbfzJWwZw-qpjL7SSB1hDQ/exec";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const scriptUrl = process.env.GOOGLE_SHEET_SCRIPT_URL || DEFAULT_SCRIPT_URL;
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  const name = body.name && String(body.name).trim();
  const email = body.email && String(body.email).trim();
  const phone = body.phone && String(body.phone).trim();

  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required." });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name || "", email, phone: phone || "" }),
    });
    const data = await response.json().catch(() => ({}));
    res.status(response.ok ? 200 : response.status).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message || "Failed to submit to sheet.",
    });
  }
}
