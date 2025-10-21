import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rgdsuhvocfgotshixxyj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZHN1aHZvY2Znb3RzaGl4eHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNjk5MzksImV4cCI6MjA3NTc0NTkzOX0._qH0GklUa0PoS3XEUu6U9147_G6nz8RzXzdXk2552aw';

// Cria uma única instância do cliente supabase para interagir com o banco de dados
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
