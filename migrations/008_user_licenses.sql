-- Maps authenticated users (from Mocha OAuth) to their Stripe sessions.
-- The Rust backend creates license_keys; this table links them to a user_id
-- so the website dashboard can show each user's licenses.
--
-- Run this in your Supabase SQL Editor (same DB as the Rust backend).

CREATE TABLE IF NOT EXISTS user_licenses (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             TEXT        NOT NULL,
    stripe_session_id   TEXT        NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_licenses_session UNIQUE(stripe_session_id)
);

CREATE INDEX IF NOT EXISTS idx_user_licenses_user_id    ON user_licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_licenses_session_id ON user_licenses(stripe_session_id);
