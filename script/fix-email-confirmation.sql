-- Fix email confirmation for all existing users
-- Run this in your Supabase SQL editor

-- Update all users to be email confirmed
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Ensure the auth config is properly set
UPDATE auth.config 
SET email_confirm_required = false;

-- Alternative: If the above doesn't work, you can also run:
-- UPDATE auth.users SET email_confirmed_at = created_at WHERE email_confirmed_at IS NULL;
