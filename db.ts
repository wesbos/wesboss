// @deno-types="https://esm.sh/@planetscale/database/dist/index.d.ts"
const db = await Deno.openKv();
const VIEW_KEY = "views";

export async function getCount() {
  // also Update + query via Deno KV
  await db.atomic().sum([VIEW_KEY], 1n).commit(); // Increment KV by 1
  const res = await db.get<Deno.KvU64>([VIEW_KEY]);
  const denoKVCount = res.value?.value || 0n;

  return {
    denoKVCount,
  };
}
