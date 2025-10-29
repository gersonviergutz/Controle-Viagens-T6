/**
 * Definições de Tipos Globais
 *
 * Este arquivo contém as definições de tipos TypeScript usadas em toda a aplicação
 * para garantir type safety e melhorar a documentação do código.
 */

/**
 * Enum para os possíveis status de uma viagem
 *
 * @enum {string}
 * @property {string} Pendente - Viagem planejada, mas ainda não comprada
 * @property {string} Comprado - Viagem já adquirida/confirmada
 */
export enum TripStatus {
  Pendente = 'Pendente',
  Comprado = 'Comprado',
}

/**
 * Interface representando uma viagem/despesa
 *
 * Corresponde à tabela 'despesas' no banco de dados Supabase
 *
 * @interface Trip
 * @property {number} id - Identificador único da viagem (chave primária)
 * @property {string} [created_at] - Data/hora de criação do registro
 * @property {string | null} origem - Cidade/aeroporto de origem
 * @property {string | null} destino - Cidade/aeroporto de destino
 * @property {string | null} data_ida - Data de partida (formato ISO)
 * @property {string | null} data_volta - Data de retorno (formato ISO)
 * @property {string | null} companhia - Nome da companhia aérea
 * @property {number | null} valor - Valor da viagem em BRL (Real Brasileiro)
 * @property {TripStatus | null} status - Status atual da viagem (Pendente ou Comprado)
 * @property {string | null} observacao - Observações ou notas adicionais
 * @property {string} [user_id] - ID do usuário proprietário (UUID do auth.users)
 *
 * @example
 * const trip: Trip = {
 *   id: 1,
 *   origem: 'São Paulo',
 *   destino: 'Rio de Janeiro',
 *   data_ida: '2025-11-01',
 *   data_volta: '2025-11-05',
 *   companhia: 'LATAM',
 *   valor: 1200.00,
 *   status: TripStatus.Pendente,
 *   observacao: 'Preferência por voo matutino',
 *   user_id: 'abc-123-def-456'
 * };
 */
export interface Trip {
  id: number;
  created_at?: string;
  origem: string | null;
  destino: string | null;
  data_ida: string | null;
  data_volta: string | null;
  companhia: string | null;
  valor: number | null;
  status: TripStatus | null;
  observacao: string | null;
  user_id?: string;
}
