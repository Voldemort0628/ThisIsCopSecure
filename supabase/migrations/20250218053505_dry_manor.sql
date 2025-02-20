/*
  # Update profile policies and constraints

  1. Changes
    - Add missing policies for profile management
    - Ensure proper constraints for profile creation
    - Add policies for both authenticated and anonymous users

  2. Security
    - Maintains RLS
    - Adds specific policies for profile operations
*/

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "System can create user profiles" ON profiles;
DROP POLICY IF EXISTS "Public profiles are insertable" ON profiles;

-- Create comprehensive policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow public profile creation during signup"
  ON profiles FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add upsert policy for profile creation/updates
CREATE POLICY "Allow profile upsert"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id OR NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid()
  ));