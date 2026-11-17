import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ApiError } from '../services/api';
import { buscarDoacaoPorId, excluirDoacao } from '../services/doacoesService';
import { Doacao } from '../types/Doacao';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;

export function DetalheDoacaoScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [excluindo, setExcluindo] = useState(false);

  // Busca os dados atualizados na API quando a tela abre ou volta do formulário.
  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      setDoacao(await buscarDoacaoPorId(id));
    } catch (falha) {
      setDoacao(null);
      if (falha instanceof ApiError && falha.status === 404) {
        setErro('Doação não encontrada.');
      } else {
        setErro('Não foi possível carregar a doação. Confira a conexão com a API.');
      }
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(useCallback(() => {
    void carregar();
  }, [carregar]));

  // Confirma antes de enviar o DELETE para o servidor.
  function confirmarExclusao() {
    Alert.alert('Excluir doação', 'Tem certeza que deseja excluir esta doação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setExcluindo(true);
          try {
            await excluirDoacao(id);
            navigation.goBack();
          } catch (falha) {
            Alert.alert('Não foi possível excluir', falha instanceof Error ? falha.message : 'Tente novamente.');
          } finally {
            setExcluindo(false);
          }
        },
      },
    ]);
  }

  if (carregando || excluindo) {
    return <View style={styles.estado}><ActivityIndicator size="large" color="#1B5E20" /><Text>{excluindo ? 'Excluindo doação...' : 'Carregando doação...'}</Text></View>;
  }

  if (!doacao) {
    return <View style={styles.estado}><Text style={styles.erro}>{erro || 'Doação não encontrada.'}</Text></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{doacao.tipoItem}</Text>
        <Text style={styles.label}>Quantidade</Text>
        <Text style={styles.texto}>{doacao.quantidade} unidade(s)</Text>
        <Text style={styles.label}>Ponto de destino</Text>
        <Text style={styles.texto}>{doacao.pontoDestino}</Text>
        <Text style={styles.label}>Data do cadastro</Text>
        <Text style={styles.texto}>{new Date(doacao.criadoEm).toLocaleString('pt-BR')}</Text>
        <Pressable style={styles.botaoEditar} onPress={() => navigation.navigate('NovaDoacao', { id: doacao.id })}>
          <Text style={styles.textoBotao}>Editar doação</Text>
        </Pressable>
        <Pressable style={styles.botaoExcluir} onPress={confirmarExclusao}>
          <Text style={styles.textoExcluir}>Excluir doação</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  scroll: { padding: 20, flexGrow: 1 },
  card: { backgroundColor: '#FFF', borderRadius: 14, padding: 20, borderWidth: 1, borderColor: '#DDE5DF' },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#1B5E20', marginBottom: 12 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 5 },
  texto: { fontSize: 16, color: '#444', lineHeight: 23 },
  botaoEditar: { minHeight: 44, backgroundColor: '#1B5E20', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  botaoExcluir: { minHeight: 44, borderWidth: 1, borderColor: '#C62828', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  textoExcluir: { color: '#C62828', fontWeight: 'bold' },
  estado: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F7F5', padding: 24, gap: 12 },
  erro: { color: '#C62828', textAlign: 'center', lineHeight: 22 },
});
