import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { getCount } from "./db.ts";

const formatter = Intl.NumberFormat();

const template = await Deno.readTextFile("./template.html");
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (url.pathname === '/robots.txt') {
    return new Response("User-agent: *\nDisallow: /", {
      status: 200,
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  const count = await getCount();
  const formattedNumber = formatter.format(count);

  const formatted = template.replace("{% JABRONIS %}", formattedNumber);
  return new Response(formatted, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

serve(handler);
