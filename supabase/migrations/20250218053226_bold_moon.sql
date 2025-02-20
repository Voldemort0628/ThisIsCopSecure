/*
  # Add INSERT policy for profiles table

  1. Changes
    - Add policy to allow the trigger function to insert new profiles
    - This is required for the handle_new_user() trigger to work properly

  2. Security
    - Policy allows system-level inserts for new user registration
    - Maintains existing RLS policies for user access
*/

-- Add INSERT policy for the trigger function
CREATE POLICY "System can create user profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add INSERT policy for public access during signup
CREATE POLICY "Public profiles are insertable"
  ON profiles
  FOR INSERT
  TO anon
  WITH CHECK (true);