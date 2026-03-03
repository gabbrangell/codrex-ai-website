-- RLS for user_licenses: only the website API (service_role) can read/write.
-- Prevents direct anon-key queries from exposing user → Stripe session mappings.
-- Run this in the Supabase SQL Editor (same DB as the Rust backend).

CREATE SCHEMA IF NOT EXISTS auth;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'auth' AND p.proname = 'role') THEN
    EXECUTE 'CREATE FUNCTION auth.role() RETURNS text LANGUAGE sql AS $f$ SELECT ''service_role''::text $f$';
  END IF;
END $$;

ALTER TABLE user_licenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Backend only" ON user_licenses;
CREATE POLICY "Backend only" ON user_licenses
  FOR ALL USING (auth.role() = 'service_role' OR current_user = 'postgres');
