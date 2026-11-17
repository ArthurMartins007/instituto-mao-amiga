import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PontoItem } from '../components/PontoItem';
import { RootStackParamList } from '../navigation/types';
import { carregarFavoritos, salvarFavoritos } from '../services/favoritosStorage';
import { buscarPaginaPontos } from '../services/pontosService';
import { Ponto } from '../types/ponto';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPontos'>;

export function ListaPontosScreen({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [filtro, setFiltro] = useState('');
  const [filtroAplicado, setFiltroAplicado] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState('');
  const carregandoMaisRef = useRef(false);

  // Carrega a primeira página sempre que a tela volta ao foco.
  const carregarInicial = useCallback(async () => {
    setCarregando(true);
    setErro('');
    carregandoMaisRef.current = false;
    try {
      const resposta = await buscarPaginaPontos(0, filtroAplicado);
      setPontos(resposta.content);
      setPaginaAtual(resposta.page.number);
      setTotalPaginas(resposta.page.totalPages);
    } catch {
      setPontos([]);
      setTotalPaginas(0);
      setErro('Não foi possível carregar os pontos. Confira a conexão com a API e tente novamente.');
    } finally {
      setCarregando(false);
    }
  }, [filtroAplicado]);

  useFocusEffect(useCallback(() => {
    void carregarInicial();
    carregarFavoritos().then(setFavoritos).catch(() => setFavoritos([]));
  }, [carregarInicial]));

  // Busca uma nova página sem repetir IDs que já estão na lista.
  const carregarMais = useCallback(async () => {
    if (carregando || carregandoMaisRef.current || paginaAtual + 1 >= totalPaginas) return;
    carregandoMaisRef.current = true;
    setCarregandoMais(true);
    try {
      const resposta = await buscarPaginaPontos(paginaAtual + 1, filtroAplicado);
      setPontos((atuais) => {
        const ids = new Set(atuais.map((ponto) => ponto.id));
        return [...atuais, ...resposta.content.filter((ponto) => !ids.has(ponto.id))];
      });
      setPaginaAtual(resposta.page.number);
      setTotalPaginas(resposta.page.totalPages);
    } catch {
      setErro('Não foi possível carregar mais pontos. Tente novamente.');
    } finally {
      carregandoMaisRef.current = false;
      setCarregandoMais(false);
    }
  }, [carregando, paginaAtual, totalPaginas, filtroAplicado]);

  // Atualiza o favorito no app e salva apenas o ID no aparelho.
  async function alternarFavorito(id: string) {
    const anterior = favoritos;
    const novos = favoritos.includes(id) ? favoritos.filter((item) => item !== id) : [...favoritos, id];
    setFavoritos(novos);
    try {
      await salvarFavoritos(novos);
    } catch {
      setFavoritos(anterior);
    }
  }

  function aplicarBusca() {
    Keyboard.dismiss();
    setFiltroAplicado(filtro.trim());
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Instituto Mão Amiga</Text>
        <Text style={styles.descricao}>Encontre pontos de coleta e distribuição.</Text>
        <TextInput
          value={filtro}
          onChangeText={setFiltro}
          onSubmitEditing={aplicarBusca}
          returnKeyType="search"
          placeholder="Buscar por nome ou bairro"
          placeholderTextColor="#888"
          style={styles.campoBusca}
        />
        <View style={styles.acoes}>
          <Pressable style={styles.botaoPrimario} onPress={aplicarBusca}>
            <Text style={styles.textoBotao}>Buscar</Text>
          </Pressable>
          <Pressable style={styles.botaoSecundario} onPress={() => navigation.navigate('FormularioPonto')}>
            <Text style={styles.textoSecundario}>Novo ponto</Text>
          </Pressable>
        </View>
        <Pressable style={styles.linkFavoritos} onPress={() => navigation.navigate('MeusPontos')}>
          <Text style={styles.textoLink}>Meus pontos favoritos</Text>
        </Pressable>
        <View style={styles.acoes}>
          <Pressable style={styles.botaoSecundario} onPress={() => navigation.navigate('NovaDoacao')}>
            <Text style={styles.textoSecundario}>Nova doação</Text>
          </Pressable>
          <Pressable style={styles.botaoSecundario} onPress={() => navigation.navigate('MinhasDoacoes')}>
            <Text style={styles.textoSecundario}>Minhas doações</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={pontos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            favorito={favoritos.includes(item.id)}
            onPress={() => navigation.navigate('DetalhePonto', { id: item.id })}
            onToggleFavorito={() => void alternarFavorito(item.id)}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        onEndReached={() => void carregarMais()}
        onEndReachedThreshold={0.45}
        ListEmptyComponent={
          <View style={styles.estado}>
            {carregando ? <ActivityIndicator size="large" color="#1B5E20" /> : <Text style={erro ? styles.erro : styles.mensagem}>{erro || 'Nenhum ponto encontrado.'}</Text>}
            {!!erro && !carregando && (
              <Pressable style={styles.botaoPrimario} onPress={() => void carregarInicial()}>
                <Text style={styles.textoBotao}>Tentar novamente</Text>
              </Pressable>
            )}
          </View>
        }
        ListFooterComponent={carregandoMais ? <ActivityIndicator style={styles.rodape} color="#1B5E20" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  cabecalho: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#1B5E20', marginBottom: 5 },
  descricao: { fontSize: 14, color: '#555', marginBottom: 12 },
  campoBusca: { minHeight: 46, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 13, backgroundColor: '#FFF', color: '#222' },
  acoes: { flexDirection: 'row', gap: 8, marginTop: 9 },
  botaoPrimario: { minHeight: 44, flex: 1, borderRadius: 10, backgroundColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  botaoSecundario: { minHeight: 44, flex: 1, borderRadius: 10, borderWidth: 1, borderColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 },
  textoSecundario: { color: '#1B5E20', fontWeight: 'bold', fontSize: 13 },
  linkFavoritos: { alignSelf: 'flex-start', paddingVertical: 8 },
  textoLink: { color: '#1B5E20', fontWeight: 'bold' },
  lista: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 30, flexGrow: 1 },
  estado: { alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  mensagem: { color: '#555', textAlign: 'center' },
  erro: { color: '#C62828', textAlign: 'center', lineHeight: 22 },
  rodape: { paddingVertical: 18 },
});
