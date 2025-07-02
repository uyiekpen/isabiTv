-- Update Supabase auth settings to disable email confirmation
-- Note: This should be run in your Supabase SQL editor or dashboard

-- Disable email confirmation requirement
UPDATE auth.config 
SET email_confirm_required = false 
WHERE id = 1;

-- Alternative: You can also disable this in the Supabase Dashboard:
-- Go to Authentication > Settings > Email Auth
-- Turn off "Enable email confirmations"
