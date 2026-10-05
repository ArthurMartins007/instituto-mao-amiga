import { Doacao } from '../types/Doacao';
import { Ponto } from '../types/Ponto';

export type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: { ponto: Ponto };
  NovaDoacao: { doacao?: Doacao } | undefined;
  MinhasDoacoes: undefined;
  DetalheDoacao: { doacao: Doacao };
};
