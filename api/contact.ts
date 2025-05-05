import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import type { FormData } from "@/types/contact";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    req.body;
  } catch (err) {
    return res.status(400).json({ err: "Request is malformed" });
  }

  await sendEmail(req.body);

  return res.status(200).send("Email sent!");
}

async function sendEmail(body: FormData) {
  const { name, email, message } = body;
  const key = process.env.RESEND_API_KEY;
  const resend = new Resend(key);

  const { data, error } = await resend.emails.send({
    from: "Contact <contact@nyrzeff.dev>",
    to: "nyrghzef@keemail.me",
    subject: `New message from ${name}`,
    html: `
      Name: ${name} <br />
      Email: ${email} <br />
      Message: ${message}
    `,
  });

  if(error) {
    return console.error({ error });
  }

  console.log({ data });
}
