/**
 * Cliente Supabase
 *
 * Este módulo configura e exporta o cliente Supabase usado em toda a aplicação
 * para interagir com o banco de dados PostgreSQL e serviços de autenticação.
 *
 * Configuração:
 * - supabaseUrl: URL do projeto Supabase
 * - supabaseAnonKey: Chave pública anônima para autenticação client-side
 *
 * Uso:
 * ```typescript
 * import { supabase } from './services/supabaseClient';
 *
 * // Consultar dados
 * const { data, error } = await supabase.from('despesas').select('*');
 *
 * // Autenticação
 * const { user, error } = await supabase.auth.signIn({ email, password });
 * ```
 *
 * Segurança:
 * - A chave anônima é segura para uso client-side
 * - Row Level Security (RLS) protege os dados no servidor
 * - Usuários só podem acessar seus próprios dados
 */

import { createClient } from '@supabase/supabase-js';

// URL do projeto Supabase
const supabaseUrl = 'https://rgdsuhvocfgotshixxyj.supabase.co';

// Chave pública anônima (segura para uso client-side)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZHN1aHZvY2Znb3RzaGl4eHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNjk5MzksImV4cCI6MjA3NTc0NTkzOX0._qH0GklUa0PoS3XEUu6U9147_G6nz8RzXzdXk2552aw';

/**
 * Instância única do cliente Supabase
 * Usado em toda a aplicação para operações de banco de dados e autenticação
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
