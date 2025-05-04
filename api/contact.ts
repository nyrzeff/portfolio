export default async function handler(request, response) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json();
  const { name, email, message } = body;

  console.table({ name, email, message });

  return new Response("Message received!", { status: 200 });
}
