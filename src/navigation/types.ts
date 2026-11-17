import { Doacao } from '../types/Doacao';

export type RootStackParamList = {
  ListaPontos: undefined;
  FormularioPonto: { id?: string } | undefined;
  DetalhePonto: { id: string };
  MeusPontos: undefined;
  NovaDoacao: { id?: string } | undefined;
  MinhasDoacoes: undefined;
  DetalheDoacao: { id: string };
};
