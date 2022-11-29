## Who's the Boss?

Sourcecode for wesboss.com

- Runs on Deno
- Hosted on Deno.land
- DB planetscale

### Run locally

```bash
supabase start
deno run --allow-net --allow-read --allow-env tony-danza.ts
```

### Deploy

#### With Supabase CLI

```bash
supabase db push
```

#### With Supabase Dashboard

In your [Supabase SQL Editor](https://app.supabase.com/project/_/sql) run the following SQL statement:

```sql
--
-- Create views table
--
DROP TABLE IF EXISTS views;
CREATE TABLE views (
    id text NOT NULL PRIMARY KEY,
    count bigint DEFAULT '0'::bigint
);
ALTER TABLE views ENABLE ROW LEVEL SECURITY;

--
-- Create increment function.
--
DROP FUNCTION IF EXISTS increment;
CREATE FUNCTION increment("row_id" "text") RETURNS bigint
    LANGUAGE "sql"
    AS $$
  update views
  set count = count + 1
  where id = row_id
  returning count;
$$;

--
-- Seed data
--
INSERT INTO public.views (id)
VALUES
  ('wesboss');
```

Hit "Run"

Set up your env var values. You can find them in the [API setting](https://app.supabase.com/project/hekzvrcsvqmujfuaiylx/settings/api).

That's it, you're project is ready to scale to millions!
