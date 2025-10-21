export enum TripStatus {
  Pendente = 'Pendente',
  Comprado = 'Comprado',
}

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
}
