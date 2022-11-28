// @deno-types="https://esm.sh/@planetscale/database/dist/index.d.ts"
import { connect } from "https://esm.sh/@planetscale/database";
// Not working on deno.land
// import { connect } from 'npm:@planetscale/database';
import { config } from "https://deno.land/std@0.166.0/dotenv/mod.ts";

const env = await config();

// DB connection
const deets = {
  host: env.DATABASE_HOST || Deno.env.get("DATABASE_HOST"),
  username: env.DATABASE_USERNAME || Deno.env.get("DATABASE_USERNAME"),
  password: env.DATABASE_PASSWORD || Deno.env.get("DATABASE_PASSWORD"),
};

const conn = connect(deets);

// DB Query
interface Counts {
  id: number;
  count: number;
}

export async function getCount(): Promise<number> {
  // update
  const response = await conn.execute(`UPDATE counts SET count = count + 1 WHERE id = 1 RETURNING id, count;`);


  const [visits] = response.rows as Counts[];
  return visits.count;
}
