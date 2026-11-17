import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@instituto_mao_amiga:favoritos';

// Recupera somente os IDs, sem duplicar dados dos pontos no celular.
export async function carregarFavoritos(): Promise<string[]> {
  const salvo = await AsyncStorage.getItem(CHAVE_FAVORITOS);
  if (!salvo) return [];

  try {
    const dados: unknown = JSON.parse(salvo);
    if (!Array.isArray(dados)) return [];
    return [...new Set(dados.filter((id): id is string => typeof id === 'string'))];
  } catch {
    return [];
  }
}

// Persiste a lista de IDs dos favoritos.
export async function salvarFavoritos(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([...new Set(ids)]));
}
