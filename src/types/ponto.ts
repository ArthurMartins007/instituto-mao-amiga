export type TipoPonto = 'coleta' | 'distribuição';

export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  bairro: string;
  horario: string;
  tipo: TipoPonto;
  latitude: number | null;
  longitude: number | null;
};

export type Pagina<T> = {
  content: T[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};

export type PontoRequest = Omit<Ponto, 'id' | 'latitude' | 'longitude'>;
