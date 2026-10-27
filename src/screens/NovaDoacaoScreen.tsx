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
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { listarPontos } from '../services/pontosService';
import { atualizarDoacao, salvarDoacao } from '../services/doacoesStorage';
import { Ponto } from '../types/ponto';

type Props = NativeStackScreenProps<RootStackParamList, 'NovaDoacao'>;

export function NovaDoacaoScreen({ navigation, route }: Props) {
  const doacaoEdicao = route.params?.doacao;
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [erroTipoItem, setErroTipoItem] = useState('');
  const [erroQuantidade, setErroQuantidade] = useState('');
  const [erroPontoDestino, setErroPontoDestino] = useState('');
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregandoPontos, setCarregandoPontos] = useState(true);
  const [erroCarregarPontos, setErroCarregarPontos] = useState('');
  const [seletorAberto, setSeletorAberto] = useState(false);

  useEffect(() => {
    setTipoItem(doacaoEdicao?.tipoItem ?? '');
    setQuantidade(doacaoEdicao ? String(doacaoEdicao.quantidade) : '');
    setPontoDestino(doacaoEdicao?.pontoDestino ?? '');
    setErroTipoItem('');
    setErroQuantidade('');
    setErroPontoDestino('');
  }, [doacaoEdicao]);

  const carregarPontos = useCallback(async () => {
    setCarregandoPontos(true);
    setErroCarregarPontos('');
    try {
      setPontos(await listarPontos());
    } catch {
      setPontos([]);
      setErroCarregarPontos('Não foi possível carregar os pontos da API. Confira a conexão e tente novamente.');
    } finally {
      setCarregandoPontos(false);
    }
  }, []);

  useEffect(() => {
    void carregarPontos();
  }, [carregarPontos]);

  async function salvar() {
    let valido = true;
    setErroTipoItem('');
    setErroQuantidade('');
    setErroPontoDestino('');

    if (!tipoItem.trim()) {
      setErroTipoItem('Informe o tipo do item.');
      valido = false;
    }
    if (!quantidade.trim()) {
      setErroQuantidade('Informe a quantidade.');
      valido = false;
    } else if (!/^\d+$/.test(quantidade.trim())) {
      setErroQuantidade('A quantidade deve conter apenas números.');
      valido = false;
    } else if (Number(quantidade) <= 0) {
      setErroQuantidade('A quantidade deve ser maior que zero.');
      valido = false;
    }
    if (!pontoDestino.trim()) {
      setErroPontoDestino('Selecione um ponto de destino.');
      valido = false;
    }
    if (!valido) return;

    try {
      if (doacaoEdicao) {
        await atualizarDoacao({
          ...doacaoEdicao,
          tipoItem: tipoItem.trim(),
          quantidade: Number(quantidade),
          pontoDestino: pontoDestino.trim(),
        });
        Alert.alert('Doação atualizada', 'Os dados foram atualizados.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await salvarDoacao({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          tipoItem: tipoItem.trim(),
          quantidade: Number(quantidade),
          pontoDestino: pontoDestino.trim(),
          criadoEm: new Date().toISOString(),
        });
        Alert.alert('Doação registrada', 'A doação foi salva no histórico.', [
          { text: 'Ver histórico', onPress: () => navigation.replace('MinhasDoacoes') },
        ]);
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a doação.');
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.formularioScroll} keyboardShouldPersistTaps="handled">
          <View style={styles.formularioContainer}>
            <Text style={styles.titulo}>{doacaoEdicao ? 'Editar doação' : 'Nova doação'}</Text>
            <Text style={styles.descricao}>
              {doacaoEdicao ? 'Altere os dados e salve as modificações.' : 'Informe os dados da doação e o ponto que receberá os itens.'}
            </Text>

            <Text style={styles.label}>Tipo do item</Text>
            <TextInput
              value={tipoItem}
              onChangeText={setTipoItem}
              placeholder="Ex.: arroz, roupas, material escolar"
              placeholderTextColor="#888"
              style={[styles.input, erroTipoItem && styles.erro]}
            />
            {!!erroTipoItem && <Text style={styles.textoErro}>{erroTipoItem}</Text>}

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              value={quantidade}
              onChangeText={setQuantidade}
              placeholder="Ex.: 10"
              placeholderTextColor="#888"
              keyboardType="numeric"
              style={[styles.input, erroQuantidade && styles.erro]}
            />
            {!!erroQuantidade && <Text style={styles.textoErro}>{erroQuantidade}</Text>}

            <Text style={styles.label}>Ponto de destino</Text>
            <Pressable
              style={[styles.seletorPonto, erroPontoDestino && styles.erro]}
              onPress={() => setSeletorAberto(true)}
            >
              <Text style={[styles.textoSeletor, !pontoDestino && styles.placeholder]}>
                {pontoDestino || (carregandoPontos ? 'Carregando pontos...' : 'Selecione um ponto de destino')}
              </Text>
            </Pressable>
            {!!erroPontoDestino && <Text style={styles.textoErro}>{erroPontoDestino}</Text>}
            {!!erroCarregarPontos && (
              <View style={styles.erroPontosContainer}>
                <Text style={styles.textoErro}>{erroCarregarPontos}</Text>
                <Pressable style={styles.botaoRecarregar} onPress={() => void carregarPontos()}>
                  <Text style={styles.textoBotaoRecarregar}>Tentar carregar pontos novamente</Text>
                </Pressable>
              </View>
            )}

            <Pressable style={styles.botao} onPress={salvar}>
              <Text style={styles.textoBotao}>{doacaoEdicao ? 'Salvar alterações' : 'Cadastrar doação'}</Text>
            </Pressable>
            <Pressable style={styles.cancelar} onPress={() => navigation.goBack()}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </Pressable>
          </View>
        </ScrollView>

        <Modal
          visible={seletorAberto}
          transparent
          animationType="slide"
          onRequestClose={() => setSeletorAberto(false)}
        >
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitulo}>Selecione o ponto de destino</Text>
              {carregandoPontos ? (
                <View style={styles.estadoModal}>
                  <ActivityIndicator size="large" color="#1B5E20" />
                  <Text style={styles.mensagemModal}>Carregando pontos...</Text>
                </View>
              ) : erroCarregarPontos ? (
                <View style={styles.estadoModal}>
                  <Text style={styles.textoErro}>{erroCarregarPontos}</Text>
                  <Pressable style={styles.botao} onPress={() => void carregarPontos()}>
                    <Text style={styles.textoBotao}>Tentar novamente</Text>
                  </Pressable>
                </View>
              ) : (
                <FlatList
                  data={pontos}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.opcaoPonto}
                      onPress={() => {
                        setPontoDestino(item.nome);
                        setErroPontoDestino('');
                        setSeletorAberto(false);
                      }}
                    >
                      <Text style={styles.nomeOpcaoPonto}>{item.nome}</Text>
                      <Text style={styles.enderecoOpcaoPonto}>{item.endereco}</Text>
                    </Pressable>
                  )}
                  ListEmptyComponent={<Text style={styles.mensagemModal}>Nenhum ponto disponível.</Text>}
                />
              )}
              <Pressable style={styles.cancelarModal} onPress={() => setSeletorAberto(false)}>
                <Text style={styles.textoCancelar}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  formularioScroll: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  formularioContainer: { width: '100%', maxWidth: 700, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 14, borderWidth: 1, borderColor: '#DDE5DF', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },
  descricao: { fontSize: 15, color: '#555', lineHeight: 21, marginBottom: 22 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 7 },
  input: { minHeight: 48, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#222', backgroundColor: '#FAFCFB' },
  seletorPonto: { minHeight: 48, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 14, justifyContent: 'center', backgroundColor: '#FAFCFB' },
  textoSeletor: { fontSize: 15, color: '#222' },
  placeholder: { color: '#888' },
  multilinha: { minHeight: 64, textAlignVertical: 'top' },
  erro: { borderColor: '#C62828' },
  textoErro: { marginTop: 5, fontSize: 13, color: '#C62828', lineHeight: 19 },
  erroPontosContainer: { marginTop: 4 },
  botao: { minHeight: 44, borderRadius: 10, backgroundColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', marginTop: 18, paddingHorizontal: 12 },
  textoBotao: { color: '#FFF', fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  cancelar: { minHeight: 44, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  textoCancelar: { color: '#1B5E20', fontSize: 15, fontWeight: 'bold' },
  botaoRecarregar: { alignSelf: 'flex-start', marginTop: 8, paddingVertical: 6 },
  textoBotaoRecarregar: { color: '#1B5E20', fontWeight: 'bold', fontSize: 14 },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  modalContainer: { maxHeight: '80%', backgroundColor: '#FFF', borderRadius: 14, padding: 18 },
  modalTitulo: { fontSize: 19, fontWeight: 'bold', color: '#1B5E20', marginBottom: 12 },
  opcaoPonto: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#E5EAE6' },
  nomeOpcaoPonto: { color: '#222', fontSize: 15, fontWeight: 'bold' },
  enderecoOpcaoPonto: { color: '#666', fontSize: 13, marginTop: 4, lineHeight: 18 },
  estadoModal: { alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12 },
  mensagemModal: { color: '#555', textAlign: 'center', lineHeight: 21 },
  cancelarModal: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
});
