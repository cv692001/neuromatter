/**
 * Google Sheet integration for email collection (footer + Get in Touch flow).
 * Sheet: https://docs.google.com/spreadsheets/d/10ZyVjdd_h8CoCczAOsZ1pi24_PPksNWgikZNKw3x4mM/edit?usp=drivesdk
 * Override with VITE_GOOGLE_SHEET_SCRIPT_URL in .env if needed.
 */
const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzOA9q5EiV3sW_4rWud_Y2XhFpMSOmlel34rY1hHI8aS5B9WbfzJWwZw-qpjL7SSB1hDQ/exec";

export const GOOGLE_SHEET_SCRIPT_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_GOOGLE_SHEET_SCRIPT_URL
    ? (import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL as string)
    : DEFAULT_SCRIPT_URL;
