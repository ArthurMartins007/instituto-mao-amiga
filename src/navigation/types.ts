import { Ponto } from '../types/Ponto';

export type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: {
    ponto: Ponto;
  };
  NovaDoacao: undefined;
};
