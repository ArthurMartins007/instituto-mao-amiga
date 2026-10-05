import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { pontosMock } from '../data/pontosMock';
import { RootStackParamList } from '../navigation/types';
import { carregarFavoritos, salvarFavoritos } from '../services/favoritosStorage';
import { PontoItem } from '../components/PontoItem';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPontos'>;

export function ListaPontosScreen({ navigation }: Props) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  useEffect(() => { carregarFavoritos().then(setFavoritos).catch(() => Alert.alert('Erro', 'Não foi possível carregar os favoritos.')); }, []);
  async function alternarFavorito(id: string) {
    const novo = favoritos.includes(id) ? favoritos.filter((x) => x !== id) : [...favoritos, id];
    setFavoritos(novo);
    try { await salvarFavoritos(novo); } catch { Alert.alert('Erro', 'Não foi possível salvar o favorito.'); }
  }
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Instituto Mão Amiga</Text>
        <Text style={styles.descricao}>Encontre pontos de coleta e distribuição de doações.</Text>
        <Pressable style={styles.primario} onPress={() => navigation.navigate('NovaDoacao')}><Text style={styles.textoPrimario}>Nova doação</Text></Pressable>
        <Pressable style={styles.secundario} onPress={() => navigation.navigate('MinhasDoacoes')}><Text style={styles.textoSecundario}>Minhas doações</Text></Pressable>
      </View>
      <FlatList data={pontosMock} keyExtractor={(item) => item.id} renderItem={({ item }) => <PontoItem ponto={item} favorito={favoritos.includes(item.id)} onPress={() => navigation.navigate('DetalhePonto', { ponto: item })} onToggleFavorito={() => alternarFavorito(item.id)} />} contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  cabecalho: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  titulo: { fontSize: 27, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },
  descricao: { fontSize: 16, color: '#555', lineHeight: 22, marginBottom: 16 },
  primario: { backgroundColor: '#1B5E20', borderRadius: 10, minHeight: 44, justifyContent: 'center', alignItems: 'center' },
  textoPrimario: { color: '#FFF', fontWeight: 'bold' },
  secundario: { borderRadius: 10, borderWidth: 1, borderColor: '#1B5E20', minHeight: 44, marginTop: 10, justifyContent: 'center', alignItems: 'center' },
  textoSecundario: { color: '#1B5E20', fontWeight: 'bold' },
  lista: { padding: 20, paddingTop: 12, paddingBottom: 30 },
});
