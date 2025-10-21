-- Enable Row Level Security on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile during registration
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Enable Row Level Security on despesas table
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;

-- Policies for despesas table
-- Users can view only their own expenses
CREATE POLICY "Users can view own expenses" ON public.despesas
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own expenses
CREATE POLICY "Users can insert own expenses" ON public.despesas
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own expenses
CREATE POLICY "Users can update own expenses" ON public.despesas
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own expenses
CREATE POLICY "Users can delete own expenses" ON public.despesas
    FOR DELETE USING (auth.uid() = user_id);

-- Admins have full access to all expenses
CREATE POLICY "Admins have full access to expenses" ON public.despesas
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.despesas TO authenticated;

-- Grant read access to anon users for public data (if needed)
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.despesas TO anon;