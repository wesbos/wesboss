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