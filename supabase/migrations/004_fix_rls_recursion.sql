-- Fix infinite recursion in RLS policies
-- Drop the problematic admin policies that cause circular references

-- Drop existing admin policies that cause recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins have full access to expenses" ON public.despesas;

-- Create a function to check if user is admin using auth.jwt()
-- This avoids querying the profiles table from within its own policies
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if the user has admin role in their JWT claims
    -- This requires setting up custom claims in Supabase Auth
    RETURN COALESCE(
        (auth.jwt() ->> 'user_role')::text = 'admin',
        false
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Alternative approach: Create admin policies that don't reference profiles table
-- Instead, we'll use a more direct approach with auth metadata

-- For profiles: Allow users to see their own profile always
-- Admins will need to be handled at the application level or through service role

-- For despesas: Keep the existing user policies, remove admin policy
-- Admin access should be handled through service role or application logic

-- Grant usage on the function
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Add a comment explaining the approach
COMMENT ON FUNCTION public.is_admin() IS 'Function to check admin status without causing RLS recursion. Requires custom JWT claims setup.';