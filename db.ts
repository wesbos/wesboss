import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Database } from "./supabase/types/database.types.ts";

import { config } from "https://deno.land/std@0.166.0/dotenv/mod.ts";

const env = await config();

const supabase = createClient<Database>(
  env.SUPABASE_URL ?? "http://localhost:54321",
  env.SUPABASE_SERVICE_ROLE_SECRET ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
);

export async function getCount(): Promise<number> {
  const { data, error } = await supabase
    .rpc("increment", {
      row_id: "wesboss",
    })
    .single();
  if (error) throw error;
  return data;
}
