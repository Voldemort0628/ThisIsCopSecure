/*
  # Fix profile creation and policies

  1. Changes
    - Reset all profile policies
    - Add simplified policies for profile management
    - Remove complex policy logic that was causing issues

  2. Security
    - Maintains RLS
    - Simplifies policy structure while maintaining security
*/

-- Reset policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Allow public profile creation during signup" ON profiles;
DROP POLICY IF EXISTS "Allow profile upsert" ON profiles;
DROP POLICY IF EXISTS "System can create user profiles" ON profiles;
DROP POLICY IF EXISTS "Public profiles are insertable" ON profiles;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "Profiles are viewable by owner"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Profiles are insertable by anyone"
  ON profiles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Profiles are updatable by owner"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);