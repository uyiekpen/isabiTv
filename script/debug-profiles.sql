-- Debug script to check profiles table and existing users
-- Run this in your Supabase SQL Editor to diagnose issues

-- Check if profiles table exists and its structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check existing profiles
SELECT 
    id,
    email,
    first_name,
    last_name,
    role,
    is_verified,
    created_at
FROM public.profiles
ORDER BY created_at DESC
LIMIT 10;

-- Check auth users without profiles
SELECT 
    au.id,
    au.email,
    au.created_at as auth_created,
    au.email_confirmed_at,
    au.raw_user_meta_data,
    p.id as profile_id
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ORDER BY au.created_at DESC;

-- Check if the trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'profiles';
