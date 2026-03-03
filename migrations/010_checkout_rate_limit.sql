-- Track checkout session attempts per user for rate limiting.
-- Max 3 attempts per hour per user enforced in the website API.
-- Old rows can be pruned freely (they are only needed for the 1-hour window).
CREATE TABLE IF NOT EXISTS checkout_attempts (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      TEXT        NOT NULL,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checkout_attempts_user_time
    ON checkout_attempts(user_id, attempted_at);
