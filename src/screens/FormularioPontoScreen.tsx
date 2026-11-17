import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { cadastrarPonto, buscarPontoPorId, editarPonto } from '../services/pontosService';
import { PontoRequest, TipoPonto } from '../types/ponto';

type Props = NativeStackScreenProps<RootStackParamList, 'FormularioPonto'>;

export function FormularioPontoScreen({ navigation, route }: Props) {
  const id = route.params?.id;
  const editando = Boolean(id);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState<TipoPonto>('coleta');
  const [carregando, setCarregando] = useState(editando);
  const [salvando, setSalvando] = useState(false);

  // Quando recebe um ID, carrega os dados para reaproveitar o formulário na edição.
  useEffect(() => {
    if (!id) return;
    let ativo = true;
    buscarPontoPorId(id)
      .then((ponto) => {
        if (!ativo) return;
        setNome(ponto.nome);
        setEndereco(ponto.endereco);
        setBairro(ponto.bairro);
        setHorario(ponto.horario);
        setTipo(ponto.tipo);
      })
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar o ponto para edição.'))
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [id]);

  // Valida os campos no app antes de chamar a API.
  async function salvar() {
    const dados: PontoRequest = {
      nome: nome.trim(),
      endereco: endereco.trim(),
      bairro: bairro.trim(),
      horario: horario.trim(),
      tipo,
    };

    if (!dados.nome || !dados.endereco || !dados.bairro || !dados.horario || !dados.tipo) {
      Alert.alert('Dados incompletos', 'Preencha todos os campos antes de salvar.');
      return;
    }

    setSalvando(true);
    try {
      if (id) {
        await editarPonto(id, dados);
        Alert.alert('Ponto atualizado', 'As alterações foram salvas.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        await cadastrarPonto(dados);
        Alert.alert('Ponto cadastrado', 'O novo ponto já está disponível na lista.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      }
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : 'Não foi possível salvar o ponto.';
      Alert.alert('Não foi possível salvar', mensagem);
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <View style={styles.estado}><ActivityIndicator size="large" color="#1B5E20" /><Text>Carregando ponto...</Text></View>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.formulario}>
          <Text style={styles.titulo}>{editando ? 'Editar ponto' : 'Novo ponto'}</Text>
          <Text style={styles.label}>Nome</Text>
          <TextInput value={nome} onChangeText={setNome} style={styles.input} placeholder="Nome do ponto" />
          <Text style={styles.label}>Endereço</Text>
          <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} placeholder="Rua, número e referência" />
          <Text style={styles.label}>Bairro</Text>
          <TextInput value={bairro} onChangeText={setBairro} style={styles.input} placeholder="Bairro" />
          <Text style={styles.label}>Horário</Text>
          <TextInput value={horario} onChangeText={setHorario} style={styles.input} placeholder="Seg a Sex, 8h às 17h" />
          <Text style={styles.label}>Tipo do ponto</Text>
          <View style={styles.tipos}>
            <TouchableOpacity style={[styles.opcaoTipo, tipo === 'coleta' && styles.opcaoSelecionada]} onPress={() => setTipo('coleta')}>
              <Text style={[styles.textoTipo, tipo === 'coleta' && styles.textoSelecionado]}>Coleta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.opcaoTipo, tipo === 'distribuição' && styles.opcaoSelecionada]} onPress={() => setTipo('distribuição')}>
              <Text style={[styles.textoTipo, tipo === 'distribuição' && styles.textoSelecionado]}>Distribuição</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.botao} onPress={() => void salvar()} disabled={salvando}>
            {salvando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>{editando ? 'Salvar alterações' : 'Cadastrar ponto'}</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  scroll: { padding: 20, flexGrow: 1 },
  formulario: { width: '100%', maxWidth: 700, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 14, padding: 20, borderWidth: 1, borderColor: '#DDE5DF' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20', marginBottom: 12 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 7 },
  input: { minHeight: 48, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 14, color: '#222', backgroundColor: '#FAFCFB' },
  tipos: { flexDirection: 'row', gap: 10 },
  opcaoTipo: { minHeight: 44, flex: 1, borderWidth: 1, borderColor: '#1B5E20', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  opcaoSelecionada: { backgroundColor: '#1B5E20' },
  textoTipo: { color: '#1B5E20', fontWeight: 'bold' },
  textoSelecionado: { color: '#FFF' },
  botao: { minHeight: 46, backgroundColor: '#1B5E20', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 22 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  cancelar: { minHeight: 44, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  textoCancelar: { color: '#1B5E20', fontWeight: 'bold' },
  estado: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, backgroundColor: '#F4F7F5' },
});
