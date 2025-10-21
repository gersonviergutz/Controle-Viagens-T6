-- Add user_id column to existing despesas table for user isolation
ALTER TABLE public.despesas 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for better performance on user queries
CREATE INDEX idx_despesas_user_id ON public.despesas(user_id);

-- Update existing records to have a default user_id (optional - for existing data)
-- This should be customized based on your needs
-- UPDATE public.despesas SET user_id = (SELECT id FROM auth.users LIMIT 1) WHERE user_id IS NULL;