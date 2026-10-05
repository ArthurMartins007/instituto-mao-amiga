import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { atualizarDoacao, salvarDoacao } from '../services/doacoesStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'NovaDoacao'>;

export function NovaDoacaoScreen({ navigation, route }: Props) {
  const doacaoEdicao = route.params?.doacao;
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [erroTipoItem, setErroTipoItem] = useState('');
  const [erroQuantidade, setErroQuantidade] = useState('');
  const [erroPontoDestino, setErroPontoDestino] = useState('');

  useEffect(() => {
    setTipoItem(doacaoEdicao?.tipoItem ?? '');
    setQuantidade(doacaoEdicao ? String(doacaoEdicao.quantidade) : '');
    setPontoDestino(doacaoEdicao?.pontoDestino ?? '');
    setErroTipoItem(''); setErroQuantidade(''); setErroPontoDestino('');
  }, [doacaoEdicao]);

  async function salvar() {
    let valido = true;
    setErroTipoItem(''); setErroQuantidade(''); setErroPontoDestino('');
    if (!tipoItem.trim()) { setErroTipoItem('Informe o tipo do item.'); valido = false; }
    if (!quantidade.trim()) { setErroQuantidade('Informe a quantidade.'); valido = false; }
    else if (!/^\d+$/.test(quantidade.trim())) { setErroQuantidade('A quantidade deve conter apenas números.'); valido = false; }
    else if (Number(quantidade) <= 0) { setErroQuantidade('A quantidade deve ser maior que zero.'); valido = false; }
    if (!pontoDestino.trim()) { setErroPontoDestino('Informe o ponto de destino.'); valido = false; }
    if (!valido) return;

    try {
      if (doacaoEdicao) {
        await atualizarDoacao({ ...doacaoEdicao, tipoItem: tipoItem.trim(), quantidade: Number(quantidade), pontoDestino: pontoDestino.trim() });
        Alert.alert('Doação atualizada', 'Os dados foram atualizados.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        await salvarDoacao({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, tipoItem: tipoItem.trim(), quantidade: Number(quantidade), pontoDestino: pontoDestino.trim(), criadoEm: new Date().toISOString() });
        Alert.alert('Doação registrada', 'A doação foi salva no histórico.', [{ text: 'Ver histórico', onPress: () => navigation.replace('MinhasDoacoes') }]);
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
            <Text style={styles.descricao}>{doacaoEdicao ? 'Altere os dados e salve as modificações.' : 'Informe os dados da doação e o ponto que receberá os itens.'}</Text>
            <Text style={styles.label}>Tipo do item</Text>
            <TextInput value={tipoItem} onChangeText={setTipoItem} placeholder="Ex.: arroz, roupas, material escolar" placeholderTextColor="#888" style={[styles.input, erroTipoItem && styles.erro]} />
            {!!erroTipoItem && <Text style={styles.textoErro}>{erroTipoItem}</Text>}
            <Text style={styles.label}>Quantidade</Text>
            <TextInput value={quantidade} onChangeText={setQuantidade} placeholder="Ex.: 10" placeholderTextColor="#888" keyboardType="numeric" style={[styles.input, erroQuantidade && styles.erro]} />
            {!!erroQuantidade && <Text style={styles.textoErro}>{erroQuantidade}</Text>}
            <Text style={styles.label}>Ponto de destino</Text>
            <TextInput value={pontoDestino} onChangeText={setPontoDestino} placeholder="Ex.: Ponto Central Mão Amiga" placeholderTextColor="#888" style={[styles.input, styles.multilinha, erroPontoDestino && styles.erro]} multiline numberOfLines={2} />
            {!!erroPontoDestino && <Text style={styles.textoErro}>{erroPontoDestino}</Text>}
            <Pressable style={styles.botao} onPress={salvar}><Text style={styles.textoBotao}>{doacaoEdicao ? 'Salvar alterações' : 'Cadastrar doação'}</Text></Pressable>
            <Pressable style={styles.cancelar} onPress={() => navigation.goBack()}><Text style={styles.textoCancelar}>Cancelar</Text></Pressable>
          </View>
        </ScrollView>
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
  multilinha: { minHeight: 64, textAlignVertical: 'top' },
  erro: { borderColor: '#C62828' },
  textoErro: { marginTop: 5, fontSize: 13, color: '#C62828' },
  botao: { minHeight: 44, borderRadius: 10, backgroundColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', marginTop: 18 },
  textoBotao: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  cancelar: { minHeight: 44, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  textoCancelar: { color: '#1B5E20', fontSize: 15, fontWeight: 'bold' },
});
