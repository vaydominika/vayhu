const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@vay.hu";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);
  const website = clean(payload.website);

  if (website) {
    return Response.json({ ok: true });
  }

  if (name.length < 2 || name.length > 80) {
    return Response.json({ error: "Please add your name." }, { status: 400 });
  }

  if (!emailPattern.test(email) || email.length > 120) {
    return Response.json({ error: "Please add a valid email address." }, { status: 400 });
  }

  if (message.length < 10 || message.length > 3000) {
    return Response.json({ error: "Please write a message between 10 and 3000 characters." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "Email sending is not configured yet." }, { status: 500 });
  }

  const subject = `New portfolio note from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2d2926;">
      <h2 style="margin: 0 0 16px;">New portfolio note</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "Could not send your note right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
