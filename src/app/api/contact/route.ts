import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { z } from "zod";

const MAX_TOTAL_SIZE_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 8;

const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 60,
    keyPrefix: "contact-form",
});

const contactSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(100)
        .regex(/^[a-zA-Z\s'-]+$/),
    email: z.string().email(),
    phone: z.string().optional(),
    subject: z.string().min(3).max(150),
    message: z.string().min(10).max(2000),
    recaptchaToken: z.string().min(1),
});

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
        try {
            await rateLimiter.consume(ip);
        } catch {
            return NextResponse.json({ error: "Too many requests. Try again in 1 minute." }, { status: 429 });
        }

        const formData = await req.formData();

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string | null;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;
        const recaptchaToken = formData.get("recaptchaToken") as string;

        const parsed = contactSchema.safeParse({ name, email, phone, subject, message, recaptchaToken });
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
        }

        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY!,
                response: recaptchaToken,
            }),
        });

        const recaptchaData = await recaptchaRes.json();
        if (!recaptchaData.success || recaptchaData.score < 0.4) {
            return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
        }

        const files = formData.getAll("files") as File[];

        if (files.length > MAX_FILES) {
            return NextResponse.json({ error: `Maximum ${MAX_FILES} files allowed` }, { status: 400 });
        }

        let totalSize = 0;
        const attachments = await Promise.all(
            files.map(async (file) => {
                totalSize += file.size;
                if (totalSize > MAX_TOTAL_SIZE_BYTES) {
                    throw new Error("Total uploaded size exceeds 20MB limit");
                }
                const buffer = Buffer.from(await file.arrayBuffer());
                return {
                    filename: file.name,
                    content: buffer,
                    contentType: file.type,
                };
            })
        );

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: Number(process.env.EMAIL_PORT) === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const htmlEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact - LUSHAK</title>
  <style>
    body { font-family: system-ui, sans-serif; margin:0; padding:0; background:#f8fafc; color:#1e293b; }
    .container { max-width:600px; margin:32px auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.1); }
    .header { background:linear-gradient(135deg,#1e40af,#3b82f6); color:white; padding:32px 24px; text-align:center; }
    .header h1 { margin:0; font-size:28px; }
    .content { padding:32px 24px; }
    .info { background:#f1f5f9; padding:20px; border-radius:8px; margin:24px 0; }
    .label { font-weight:600; color:#1e40af; display:inline-block; min-width:100px; }
    .message { background:#f8fafc; padding:20px; border-radius:8px; border-left:4px solid #3b82f6; white-space:pre-wrap; line-height:1.6; }
    .files { margin-top:16px; font-size:14px; color:#475569; }
    .footer { background:#f1f5f9; padding:20px; text-align:center; font-size:13px; color:#64748b; border-top:1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Message</h1>
    </div>
    <div class="content">
      <p style="font-size:16px; margin-bottom:24px;">You received a new message:</p>
      
      <div class="info">
        <div><span class="label">From:</span> ${name}</div>
        <div><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>
        ${phone ? `<div><span class="label">Phone:</span> ${phone}</div>` : ""}
        <div><span class="label">Subject:</span> ${subject}</div>
        <div><span class="label">Time:</span> ${new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })}</div>
        ${attachments.length ? `<div><span class="label">Files:</span> ${attachments.length}</div>` : ""}
      </div>

      <div class="message">
        <strong>Message:</strong><br><br>
        ${message.replace(/\n/g, "<br>")}
      </div>

      ${attachments.length ? `
        <div class="files">
          <strong>Attached files:</strong><br>
          ${attachments.map(a => `• ${a.filename}`).join("<br>")}
        </div>
      ` : ""}
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} LUSHAK DATA SYSTEMS<br>
      Sent via website contact form
    </div>
  </div>
</body>
</html>`;

        await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact: ${subject} — ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"} \nSubject: ${subject}\n\n${message}`,
            html: htmlEmail,
            attachments,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: any) {
        console.error("Contact API error:", err);
        const msg = err.message?.includes("exceeds") ? err.message : "Failed to send message.";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}