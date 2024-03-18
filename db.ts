// @deno-types="https://esm.sh/@planetscale/database/dist/index.d.ts"
import { connect } from "https://esm.sh/@planetscale/database";
// Not working on deno.land
// import { connect } from 'npm:@planetscale/database';
import { config } from "https://deno.land/std@0.166.0/dotenv/mod.ts";

const db = await Deno.openKv();
const VIEW_KEY = "views";
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

export async function getCount() {
  // await db.delete([VIEW_KEY]); // clear KV store
  // update
  await conn.execute(`UPDATE counts SET count = count + 1 WHERE id = 1`);

  // get new value. Can/should this be done in one query?
  const response = await conn.execute(`SELECT * FROM counts WHERE id = 1`);
  const [visits] = response.rows as Counts[];

  // also Update + query via Deno KV
  await db.atomic().sum([VIEW_KEY], 1n).commit(); // Increment KV by 1
  const res = await db.get<Deno.KvU64>([VIEW_KEY]);
  const denoKVCount = res.value?.value || 0n;

  return {
    count: visits.count,
    denoKVCount,
  };
}
