// @deno-types="https://esm.sh/@planetscale/database/dist/index.d.ts"
import { connect } from 'https://esm.sh/@planetscale/database';
// Not working on deno.land
// import { connect } from 'npm:@planetscale/database';
import { config } from "https://deno.land/std@0.166.0/dotenv/mod.ts";

const env = await config();

// DB connection
const deets = {
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
}

const conn = connect(deets)

// DB Query
interface Counts {
  id: number;
  count: number;
}

export async function getCount(): Promise<number> {
  // update
  await conn.execute(`UPDATE counts SET count = count + 1 WHERE id = 1`);

  // get new value. Can/should this be done in one query?
  const response = await conn.execute(`SELECT * FROM counts WHERE id = 1`);

  const [visits] = response.rows as Counts[];
  return visits.count;
}
