import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PontoItem } from '../components/PontoItem';
import { ApiError } from '../services/api';
import { RootStackParamList } from '../navigation/types';
import { carregarFavoritos, salvarFavoritos } from '../services/favoritosStorage';
import { buscarPontoPorId } from '../services/pontosService';
import { Ponto } from '../types/ponto';

type Props = NativeStackScreenProps<RootStackParamList, 'MeusPontos'>;

export function MeusPontosScreen({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Busca os dados atualizados na API usando os IDs guardados no aparelho.
  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const ids = await carregarFavoritos();
      const resultados = await Promise.all(ids.map(async (id) => {
        try {
          return { id, ponto: await buscarPontoPorId(id), removido: false };
        } catch (falha) {
          if (falha instanceof ApiError && falha.status === 404) {
            return { id, ponto: null, removido: true };
          }
          throw falha;
        }
      }));
      const existentes = resultados
        .map((resultado) => resultado.ponto)
        .filter((ponto): ponto is Ponto => ponto !== null);
      setPontos(existentes);

      // Remove só IDs que a API confirmou que foram excluídos.
      const idsRemovidos = new Set(resultados.filter((resultado) => resultado.removido).map((resultado) => resultado.id));
      await salvarFavoritos(ids.filter((id) => !idsRemovidos.has(id)));
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar seus pontos favoritos.');
      setPontos([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    void carregar();
  }, [carregar]));

  // Desmarca o favorito na tela e persiste a nova lista de IDs.
  async function removerFavorito(id: string) {
    const ids = await carregarFavoritos();
    const novos = ids.filter((item) => item !== id);
    setPontos((atuais) => atuais.filter((ponto) => ponto.id !== id));
    try {
      await salvarFavoritos(novos);
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
      void carregar();
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pontos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            favorito
            onPress={() => navigation.navigate('DetalhePonto', { id: item.id })}
            onToggleFavorito={() => void removerFavorito(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.estado}>
            {carregando ? <ActivityIndicator size="large" color="#1B5E20" /> : <Text style={styles.vazio}>Você ainda não favoritou nenhum ponto.</Text>}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  lista: { padding: 20, flexGrow: 1 },
  estado: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  vazio: { color: '#555', textAlign: 'center', lineHeight: 22 },
});
