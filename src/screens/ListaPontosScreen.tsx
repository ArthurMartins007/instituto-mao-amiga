import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PontoItem } from '../components/PontoItem';
import { RootStackParamList } from '../navigation/types';
import { carregarFavoritos, salvarFavoritos } from '../services/favoritosStorage';
import { listarPontos } from '../services/pontosService';
import { Ponto } from '../types/ponto';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPontos'>;

export function ListaPontosScreen({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroApi, setErroApi] = useState('');

  const carregarPontos = useCallback(async () => {
    setCarregando(true);
    setErroApi('');
    try {
      setPontos(await listarPontos());
    } catch {
      setPontos([]);
      setErroApi('Não foi possível carregar os pontos. Verifique se a API está ligada e se o endereço em src/services/api.ts está correto.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregarPontos();
  }, [carregarPontos]);

  useEffect(() => {
    carregarFavoritos()
      .then(setFavoritos)
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar os favoritos.'));
  }, []);

  async function alternarFavorito(id: string) {
    const novo = favoritos.includes(id) ? favoritos.filter((x) => x !== id) : [...favoritos, id];
    setFavoritos(novo);
    try {
      await salvarFavoritos(novo);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o favorito.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Instituto Mão Amiga</Text>
        <Text style={styles.descricao}>Encontre pontos de coleta e distribuição de doações.</Text>
        <Pressable style={styles.primario} onPress={() => navigation.navigate('NovaDoacao')}>
          <Text style={styles.textoPrimario}>Nova doação</Text>
        </Pressable>
        <Pressable style={styles.secundario} onPress={() => navigation.navigate('MinhasDoacoes')}>
          <Text style={styles.textoSecundario}>Minhas doações</Text>
        </Pressable>
      </View>
      <FlatList
        data={pontos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            favorito={favoritos.includes(String(item.id))}
            onPress={() => navigation.navigate('DetalhePonto', { id: item.id })}
            onToggleFavorito={() => alternarFavorito(String(item.id))}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.vazio}>
            {carregando ? (
              <Text style={styles.mensagem}>Carregando pontos...</Text>
            ) : erroApi ? (
              <>
                <Text style={styles.mensagemErro}>{erroApi}</Text>
                <Pressable style={styles.primario} onPress={() => void carregarPontos()}>
                  <Text style={styles.textoPrimario}>Tentar novamente</Text>
                </Pressable>
              </>
            ) : (
              <Text style={styles.mensagem}>Nenhum ponto cadastrado.</Text>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  cabecalho: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  titulo: { fontSize: 27, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },
  descricao: { fontSize: 16, color: '#555', lineHeight: 22, marginBottom: 16 },
  primario: { backgroundColor: '#1B5E20', borderRadius: 10, minHeight: 44, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12 },
  textoPrimario: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' },
  secundario: { borderRadius: 10, borderWidth: 1, borderColor: '#1B5E20', minHeight: 44, marginTop: 10, justifyContent: 'center', alignItems: 'center' },
  textoSecundario: { color: '#1B5E20', fontWeight: 'bold' },
  lista: { padding: 20, paddingTop: 12, paddingBottom: 30, flexGrow: 1 },
  vazio: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  mensagem: { color: '#555', fontSize: 15, textAlign: 'center' },
  mensagemErro: { color: '#C62828', fontSize: 15, lineHeight: 22, textAlign: 'center', marginBottom: 16 },
});
