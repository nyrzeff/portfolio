import http from "http";
import { Resend } from "resend";

interface Body {
  name: string;
  email: string;
  message: string;
}

export default async function handler(req: http.IncomingMessage) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", async () => {
    const body = JSON.parse(data);
    await sendEmail(body);
  });

  return new Response("Message received!", { status: 200 });
}

async function sendEmail(body: Body) {
  const { name, email, message } = body;
  const key = process.env.RESEND_API_KEY;
  const resend = new Resend(key);

  (async function () {
    const { data, error } = await resend.emails.send({
      from: `${name} <${email}>`,
      to: "nyghzef@keemail.me",
      subject: "Test",
      html: `${message}`,
    });

    if(error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
}
