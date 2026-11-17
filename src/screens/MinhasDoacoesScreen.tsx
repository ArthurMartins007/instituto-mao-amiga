import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DoacaoItem } from '../components/DoacaoItem';
import { RootStackParamList } from '../navigation/types';
import { buscarPaginaDoacoes } from '../services/doacoesService';
import { Doacao } from '../types/Doacao';

type Props = NativeStackScreenProps<RootStackParamList, 'MinhasDoacoes'>;

export function MinhasDoacoesScreen({ navigation }: Props) {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [filtro, setFiltro] = useState('');
  const [filtroAplicado, setFiltroAplicado] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState('');
  const carregandoMaisRef = useRef(false);

  // Atualiza o histórico ao entrar ou voltar para a tela.
  const carregarInicial = useCallback(async () => {
    setCarregando(true);
    setErro('');
    carregandoMaisRef.current = false;
    try {
      const resposta = await buscarPaginaDoacoes(0, filtroAplicado);
      setDoacoes(resposta.content);
      setPaginaAtual(resposta.page.number);
      setTotalPaginas(resposta.page.totalPages);
    } catch {
      setDoacoes([]);
      setTotalPaginas(0);
      setErro('Não foi possível carregar o histórico. Confira se a API está ligada.');
    } finally {
      setCarregando(false);
    }
  }, [filtroAplicado]);

  useFocusEffect(useCallback(() => {
    void carregarInicial();
  }, [carregarInicial]));

  // Busca a próxima página e evita duplicar itens.
  const carregarMais = useCallback(async () => {
    if (carregando || carregandoMaisRef.current || paginaAtual + 1 >= totalPaginas) return;
    carregandoMaisRef.current = true;
    setCarregandoMais(true);
    try {
      const resposta = await buscarPaginaDoacoes(paginaAtual + 1, filtroAplicado);
      setDoacoes((atuais) => {
        const ids = new Set(atuais.map((doacao) => doacao.id));
        return [...atuais, ...resposta.content.filter((doacao) => !ids.has(doacao.id))];
      });
      setPaginaAtual(resposta.page.number);
      setTotalPaginas(resposta.page.totalPages);
    } catch {
      setErro('Não foi possível carregar mais doações. Tente novamente.');
    } finally {
      carregandoMaisRef.current = false;
      setCarregandoMais(false);
    }
  }, [carregando, paginaAtual, totalPaginas, filtroAplicado]);

  function aplicarFiltro() {
    Keyboard.dismiss();
    setFiltroAplicado(filtro.trim());
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        data={doacoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        onEndReached={() => void carregarMais()}
        onEndReachedThreshold={0.45}
        renderItem={({ item }) => (
          <DoacaoItem doacao={item} onPress={() => navigation.navigate('DetalheDoacao', { id: item.id })} />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.titulo}>Minhas doações</Text>
            <Text style={styles.descricao}>Histórico de doações registradas no Instituto.</Text>
            <Pressable style={styles.botaoNovo} onPress={() => navigation.navigate('NovaDoacao')}>
              <Text style={styles.textoBotao}>Registrar doação</Text>
            </Pressable>
            <Text style={styles.label}>Buscar por tipo de item</Text>
            <View style={styles.busca}>
              <TextInput value={filtro} onChangeText={setFiltro} onSubmitEditing={aplicarFiltro} returnKeyType="search" placeholder="Ex.: alimentos" placeholderTextColor="#888" style={styles.input} />
              <Pressable style={styles.botaoBuscar} onPress={aplicarFiltro}><Text style={styles.textoBotao}>Buscar</Text></Pressable>
            </View>
            {!!erro && <Text style={styles.erro}>{erro}</Text>}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.estado}>
            {carregando ? <ActivityIndicator size="large" color="#1B5E20" /> : <Text style={styles.vazio}>{erro || 'Nenhuma doação encontrada.'}</Text>}
            {!!erro && !carregando && <Pressable style={styles.botaoNovo} onPress={() => void carregarInicial()}><Text style={styles.textoBotao}>Tentar novamente</Text></Pressable>}
          </View>
        }
        ListFooterComponent={carregandoMais ? <ActivityIndicator style={styles.rodape} color="#1B5E20" /> : null}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  lista: { padding: 20, flexGrow: 1 },
  titulo: { fontSize: 27, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },
  descricao: { fontSize: 15, color: '#555', lineHeight: 21, marginBottom: 16 },
  botaoNovo: { minHeight: 44, backgroundColor: '#1B5E20', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 14, marginBottom: 16 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  label: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 7 },
  busca: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: { flex: 1, minHeight: 46, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 12, backgroundColor: '#FFF', color: '#222' },
  botaoBuscar: { minWidth: 84, minHeight: 44, backgroundColor: '#1B5E20', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  erro: { color: '#C62828', lineHeight: 21, marginBottom: 10 },
  estado: { alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  vazio: { color: '#555', textAlign: 'center', lineHeight: 22 },
  rodape: { paddingVertical: 18 },
});
