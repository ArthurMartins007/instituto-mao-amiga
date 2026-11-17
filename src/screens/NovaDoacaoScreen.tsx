import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { buscarDoacaoPorId, cadastrarDoacao, editarDoacao } from '../services/doacoesService';
import { buscarPaginaPontos } from '../services/pontosService';
import { DoacaoRequest } from '../types/Doacao';
import { Ponto } from '../types/ponto';

type Props = NativeStackScreenProps<RootStackParamList, 'NovaDoacao'>;

export function NovaDoacaoScreen({ navigation, route }: Props) {
  const id = route.params?.id;
  const editando = Boolean(id);
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoPontos, setCarregandoPontos] = useState(true);
  const [modalPontos, setModalPontos] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Carrega pontos e, na edição, recupera os dados da doação pela API.
  const carregarPontos = useCallback(async () => {
    setCarregandoPontos(true);
    try {
      const primeira = await buscarPaginaPontos(0, '');
      let lista = [...primeira.content];
      for (let pagina = 1; pagina < primeira.page.totalPages; pagina += 1) {
        const resposta = await buscarPaginaPontos(pagina, '');
        lista = [...lista, ...resposta.content];
      }
      setPontos(lista);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os pontos de destino pela API.');
    } finally {
      setCarregandoPontos(false);
    }
  }, []);

  useEffect(() => {
    void carregarPontos();
  }, [carregarPontos]);

  useEffect(() => {
    if (!id) {
      setCarregando(false);
      return;
    }
    let ativo = true;
    buscarDoacaoPorId(id)
      .then((doacao) => {
        if (!ativo) return;
        setTipoItem(doacao.tipoItem);
        setQuantidade(String(doacao.quantidade));
        setPontoDestino(doacao.pontoDestino);
      })
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar a doação para edição.'))
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [id]);

  // Valida os campos antes de mandar o cadastro ou a edição para o servidor.
  async function salvar() {
    const qtd = Number(quantidade.trim());
    const dados: DoacaoRequest = {
      tipoItem: tipoItem.trim(),
      quantidade: qtd,
      pontoDestino: pontoDestino.trim(),
    };

    if (!dados.tipoItem || !quantidade.trim() || !Number.isInteger(qtd) || qtd <= 0 || !dados.pontoDestino) {
      Alert.alert('Dados inválidos', 'Informe o item, uma quantidade inteira maior que zero e o ponto de destino.');
      return;
    }

    setSalvando(true);
    try {
      if (id) {
        await editarDoacao(id, dados);
        Alert.alert('Doação atualizada', 'As alterações foram salvas.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        await cadastrarDoacao(dados);
        Alert.alert('Doação registrada', 'A doação foi salva no histórico.', [{ text: 'Ver histórico', onPress: () => navigation.replace('MinhasDoacoes') }]);
      }
    } catch (falha) {
      Alert.alert('Não foi possível salvar', falha instanceof Error ? falha.message : 'Confira os dados e a conexão com a API.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <View style={styles.estado}><ActivityIndicator size="large" color="#1B5E20" /><Text>Carregando doação...</Text></View>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.formulario}>
          <Text style={styles.titulo}>{editando ? 'Editar doação' : 'Nova doação'}</Text>
          <Text style={styles.label}>Tipo do item</Text>
          <TextInput value={tipoItem} onChangeText={setTipoItem} style={styles.input} placeholder="Ex.: alimentos, roupas" placeholderTextColor="#888" />
          <Text style={styles.label}>Quantidade</Text>
          <TextInput value={quantidade} onChangeText={setQuantidade} style={styles.input} keyboardType="numeric" placeholder="Ex.: 10" placeholderTextColor="#888" />
          <Text style={styles.label}>Ponto de destino</Text>
          <TouchableOpacity style={styles.seletor} onPress={() => setModalPontos(true)} disabled={carregandoPontos}>
            <Text style={pontoDestino ? styles.textoSeletor : styles.placeholder}>{pontoDestino || (carregandoPontos ? 'Carregando pontos...' : 'Selecione o ponto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => void salvar()} disabled={salvando}>
            {salvando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>{editando ? 'Salvar alterações' : 'Cadastrar doação'}</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalPontos} transparent animationType="slide" onRequestClose={() => setModalPontos(false)}>
        <View style={styles.fundoModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>Escolha o ponto de destino</Text>
            {carregandoPontos ? (
              <ActivityIndicator size="large" color="#1B5E20" />
            ) : (
              <FlatList
                data={pontos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.opcaoPonto, pontoDestino === item.nome && styles.opcaoSelecionada]}
                    onPress={() => {
                      setPontoDestino(item.nome);
                      setModalPontos(false);
                    }}
                  >
                    <Text style={[styles.nomePonto, pontoDestino === item.nome && styles.nomeSelecionado]}>{item.nome}</Text>
                    <Text style={[styles.bairroPonto, pontoDestino === item.nome && styles.nomeSelecionado]}>{item.bairro} • {item.tipo}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.placeholder}>Nenhum ponto disponível.</Text>}
              />
            )}
            <TouchableOpacity style={styles.cancelar} onPress={() => setModalPontos(false)}>
              <Text style={styles.textoCancelar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  scroll: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  formulario: { width: '100%', maxWidth: 700, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 14, borderWidth: 1, borderColor: '#DDE5DF', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20', marginBottom: 12 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 7 },
  input: { minHeight: 48, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 14, color: '#222', backgroundColor: '#FAFCFB' },
  seletor: { minHeight: 48, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 14, justifyContent: 'center', backgroundColor: '#FAFCFB' },
  textoSeletor: { fontSize: 15, color: '#222' },
  placeholder: { color: '#888', textAlign: 'center', padding: 8 },
  botao: { minHeight: 46, borderRadius: 10, backgroundColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  textoBotao: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  cancelar: { minHeight: 44, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  textoCancelar: { color: '#1B5E20', fontWeight: 'bold' },
  estado: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F7F5', gap: 12 },
  fundoModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  modal: { maxHeight: '80%', backgroundColor: '#FFF', borderRadius: 14, padding: 18 },
  tituloModal: { color: '#1B5E20', fontSize: 19, fontWeight: 'bold', marginBottom: 12 },
  opcaoPonto: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#E5EAE6' },
  opcaoSelecionada: { backgroundColor: '#EAF3EC', borderRadius: 8 },
  nomePonto: { color: '#222', fontWeight: 'bold' },
  bairroPonto: { color: '#666', fontSize: 13, marginTop: 4 },
  nomeSelecionado: { color: '#1B5E20' },
});
