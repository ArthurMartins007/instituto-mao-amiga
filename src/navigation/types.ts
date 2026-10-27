import { Doacao } from '../types/Doacao';
import { Ponto } from '../types/ponto';

export type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: { id: number };
  NovaDoacao: { doacao?: Doacao } | undefined;
  MinhasDoacoes: undefined;
  DetalheDoacao: { doacao: Doacao };
};
