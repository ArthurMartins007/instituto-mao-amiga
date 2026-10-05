import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@instituto_mao_amiga:favoritos';

export async function carregarFavoritos(): Promise<string[]> {
  const salvo = await AsyncStorage.getItem(CHAVE_FAVORITOS);

  if (!salvo) {
    return [];
  }

  try {
    const favoritos = JSON.parse(salvo);

    if (!Array.isArray(favoritos)) {
      return [];
    }

    return favoritos.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export async function salvarFavoritos(favoritos: string[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
}
