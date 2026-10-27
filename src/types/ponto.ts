export type Ponto = {
  id: number;
  nome: string;
  endereco: string;
  horario: string;
  recebeDistribui: string;
  latitude: number;
  longitude: number;
};

export type PaginaPontos = {
  content: Ponto[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};
