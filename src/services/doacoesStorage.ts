import AsyncStorage from '@react-native-async-storage/async-storage';
import { Doacao } from '../types/Doacao';

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes';

export async function listarDoacoes(): Promise<Doacao[]> {
  const salvo = await AsyncStorage.getItem(CHAVE_DOACOES);
  if (!salvo) return [];

  try {
    const doacoes = JSON.parse(salvo);
    if (!Array.isArray(doacoes)) return [];

    return doacoes.filter((item): item is Doacao =>
      item &&
      typeof item.id === 'string' &&
      typeof item.tipoItem === 'string' &&
      typeof item.quantidade === 'number' &&
      typeof item.pontoDestino === 'string' &&
      typeof item.criadoEm === 'string',
    );
  } catch {
    return [];
  }
}

export async function salvarDoacao(doacao: Doacao): Promise<void> {
  const atuais = await listarDoacoes();
  await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify([...atuais, doacao]));
}

export async function atualizarDoacao(doacao: Doacao): Promise<void> {
  const atuais = await listarDoacoes();
  const atualizadas = atuais.map((item) => item.id === doacao.id ? doacao : item);
  await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(atualizadas));
}

export async function excluirDoacao(id: string): Promise<void> {
  const atuais = await listarDoacoes();
  const restantes = atuais.filter((item) => item.id !== id);
  await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(restantes));
}

export async function buscarDoacao(id: string): Promise<Doacao | null> {
  const doacoes = await listarDoacoes();
  return doacoes.find((item) => item.id === id) ?? null;
}
