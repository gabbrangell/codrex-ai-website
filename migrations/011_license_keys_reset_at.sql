-- Track when a user last reset their hardware lock.
-- Used by the website API to enforce a 30-day cooldown between resets.
ALTER TABLE license_keys ADD COLUMN IF NOT EXISTS last_hardware_reset_at TIMESTAMPTZ;
