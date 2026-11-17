import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Trending Minds Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:12px;">
          <h2 style="color:#00ff87;font-size:24px;margin:0 0 24px;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;width:120px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #222;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;">Email</td><td style="padding:10px 0;border-bottom:1px solid #222;"><a href="mailto:${email}" style="color:#00ff87;">${email}</a></td></tr>
            ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;">Service</td><td style="padding:10px 0;border-bottom:1px solid #222;">${service}</td></tr>` : ""}
            <tr><td style="padding:10px 0;color:#888;vertical-align:top;">Message</td><td style="padding:10px 0;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td></tr>
          </table>
          <p style="margin-top:32px;color:#444;font-size:12px;">Sent from trendingminds.video contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
