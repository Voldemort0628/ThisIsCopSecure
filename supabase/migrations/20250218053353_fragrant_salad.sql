/*
  # Fix profile creation process

  1. Changes
    - Remove the automatic trigger for profile creation
    - Keep manual profile creation in signUp function
    - Clean up any existing triggers

  2. Security
    - Maintains existing RLS policies
    - Keeps INSERT policies for manual profile creation
*/

-- Drop the trigger and function for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();