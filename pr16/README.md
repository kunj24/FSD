# Practical 16 — Contact Form (NodeMailer)

This is a small Express app that provides a contact form. On submit it sends an email using NodeMailer.

Features
- Validates name, email and message (server-side using express-validator).
- Sends email using SMTP configured via environment variables. If none are provided, it falls back to Ethereal (dev-only) and prints a preview URL.

Environment variables
- SMTP_HOST — SMTP host (optional, if not set Ethereal will be used)
- SMTP_PORT — SMTP port (default 587)
- SMTP_SECURE — 'true' if using TLS on connect
- SMTP_USER — SMTP username (or to receive mail if CONTACT_EMAIL not set)
- SMTP_PASS — SMTP password
- CONTACT_EMAIL — The address to receive contact messages (optional; defaults to SMTP_USER)

Quick start (PowerShell)
1. Install dependencies:

   npm install

2. Start server:

   npm start

3. Open http://localhost:3000 in your browser.

If you don't provide SMTP settings the app will use Ethereal and show a preview URL after sending (dev only).
