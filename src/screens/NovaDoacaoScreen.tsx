import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';

export type NovaDoacaoProps = NativeStackScreenProps<RootStackParamList, 'NovaDoacao'>;

export function NovaDoacaoScreen({ navigation }: NovaDoacaoProps) {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');

  const [erroTipoItem, setErroTipoItem] = useState('');
  const [erroQuantidade, setErroQuantidade] = useState('');
  const [erroPontoDestino, setErroPontoDestino] = useState('');

  function cadastrarDoacao() {
    let formularioValido = true;

    setErroTipoItem('');
    setErroQuantidade('');
    setErroPontoDestino('');

    if (!tipoItem.trim()) {
      setErroTipoItem('Informe o tipo do item.');
      formularioValido = false;
    }

    if (!quantidade.trim()) {
      setErroQuantidade('Informe a quantidade.');
      formularioValido = false;
    } else if (!/^\d+$/.test(quantidade.trim())) {
      setErroQuantidade('A quantidade deve conter apenas números.');
      formularioValido = false;
    } else if (Number(quantidade) <= 0) {
      setErroQuantidade('A quantidade deve ser maior que zero.');
      formularioValido = false;
    }

    if (!pontoDestino.trim()) {
      setErroPontoDestino('Informe o ponto de destino.');
      formularioValido = false;
    }

    if (!formularioValido) {
      return;
    }

    Alert.alert(
      'Doação validada',
      'Os dados foram preenchidos corretamente. O salvamento será implementado posteriormente.',
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.formularioScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formularioContainer}>
            <Text style={styles.formularioTitulo}>Nova doação</Text>

            <Text style={styles.formularioDescricao}>
              Informe os dados da doação e o ponto que receberá os itens.
            </Text>

            <View style={styles.campoGrupo}>
              <Text style={styles.campoLabel}>Tipo do item</Text>
              <TextInput
                style={[styles.input, erroTipoItem ? styles.inputErro : null]}
                value={tipoItem}
                onChangeText={(texto) => {
                  setTipoItem(texto);
                  if (erroTipoItem) setErroTipoItem('');
                }}
                placeholder="Ex.: arroz, roupas, material escolar"
                placeholderTextColor="#888"
                returnKeyType="next"
              />
              {erroTipoItem ? <Text style={styles.textoErro}>{erroTipoItem}</Text> : null}
            </View>

            <View style={styles.campoGrupo}>
              <Text style={styles.campoLabel}>Quantidade</Text>
              <TextInput
                style={[styles.input, erroQuantidade ? styles.inputErro : null]}
                value={quantidade}
                onChangeText={(texto) => {
                  setQuantidade(texto);
                  if (erroQuantidade) setErroQuantidade('');
                }}
                placeholder="Ex.: 10"
                placeholderTextColor="#888"
                keyboardType="numeric"
                returnKeyType="next"
              />
              {erroQuantidade ? <Text style={styles.textoErro}>{erroQuantidade}</Text> : null}
            </View>

            <View style={styles.campoGrupo}>
              <Text style={styles.campoLabel}>Ponto de destino</Text>
              <TextInput
                style={[styles.input, styles.inputMultilinha, erroPontoDestino ? styles.inputErro : null]}
                value={pontoDestino}
                onChangeText={(texto) => {
                  setPontoDestino(texto);
                  if (erroPontoDestino) setErroPontoDestino('');
                }}
                placeholder="Ex.: Ponto Central Mão Amiga"
                placeholderTextColor="#888"
                multiline
                numberOfLines={2}
              />
              {erroPontoDestino ? <Text style={styles.textoErro}>{erroPontoDestino}</Text> : null}
            </View>

            <Pressable style={styles.botaoCadastrar} onPress={cadastrarDoacao}>
              <Text style={styles.textoBotaoCadastrar}>Cadastrar doação</Text>
            </Pressable>

            <Pressable style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
              <Text style={styles.textoBotaoCancelar}>Voltar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },
  formularioScroll: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  formularioContainer: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE5DF',
    padding: 20,
  },
  formularioTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  formularioDescricao: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
    marginBottom: 22,
  },
  campoGrupo: {
    marginBottom: 18,
  },
  campoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#C9D4CC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#FAFCFB',
  },
  inputMultilinha: {
    textAlignVertical: 'top',
    minHeight: 64,
  },
  inputErro: {
    borderColor: '#C62828',
  },
  textoErro: {
    marginTop: 5,
    fontSize: 13,
    color: '#C62828',
  },
  botaoCadastrar: {
    minHeight: 44,
    borderRadius: 10,
    backgroundColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  textoBotaoCadastrar: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    minHeight: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  textoBotaoCancelar: {
    color: '#1B5E20',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
