import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { getCount } from "./db.ts";


const template = await Deno.readTextFile('./template.html');

async function handler(req: Request): Promise<Response> {
  const count = await getCount();
  const formatted = template.replace('{% JABRONIS %}', count.toString());
  const body = `
    ${formatted}
  `;
  return new Response(body, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}


serve(handler)
