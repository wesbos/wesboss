import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { getCount } from "./db.ts";


const template = await Deno.readTextFile('./template.html');
const formatter = Intl.NumberFormat()
async function handler(req: Request): Promise<Response> {
  const count = await getCount();
  const formattedNumber = formatter.format(count);

  const formatted = template.replace('{% JABRONIS %}', formattedNumber);
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
