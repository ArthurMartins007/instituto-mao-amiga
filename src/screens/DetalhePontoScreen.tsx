import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ApiError } from '../services/api';
import { buscarPontoPorId, excluirPonto } from '../services/pontosService';
import { Ponto } from '../types/ponto';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhePonto'>;

export function DetalhePontoScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [excluindo, setExcluindo] = useState(false);

  // Atualiza o detalhe quando a tela ganha foco, inclusive depois de editar.
  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      setPonto(await buscarPontoPorId(id));
    } catch (falha) {
      setPonto(null);
      if (falha instanceof ApiError && falha.status === 404) {
        setErro('Ponto não encontrado.');
      } else {
        setErro('Não foi possível carregar o ponto. Confira a conexão com a API.');
      }
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(useCallback(() => {
    void carregar();
  }, [carregar]));

  // Só exclui depois que a pessoa confirmar.
  function confirmarExclusao() {
    Alert.alert('Excluir ponto', 'Tem certeza que deseja excluir este ponto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setExcluindo(true);
          try {
            await excluirPonto(id);
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
    return <View style={styles.estado}><ActivityIndicator size="large" color="#1B5E20" /><Text>{excluindo ? 'Excluindo ponto...' : 'Carregando ponto...'}</Text></View>;
  }

  if (!ponto) {
    return <View style={styles.estado}><Text style={styles.erro}>{erro || 'Ponto não encontrado.'}</Text></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{ponto.nome}</Text>
        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.texto}>{ponto.endereco}</Text>
        <Text style={styles.label}>Bairro</Text>
        <Text style={styles.texto}>{ponto.bairro}</Text>
        <Text style={styles.label}>Horário</Text>
        <Text style={styles.texto}>{ponto.horario}</Text>
        <Text style={styles.label}>Tipo</Text>
        <Text style={styles.texto}>{ponto.tipo}</Text>
        <Pressable style={styles.botaoEditar} onPress={() => navigation.navigate('FormularioPonto', { id: ponto.id })}>
          <Text style={styles.textoBotao}>Editar ponto</Text>
        </Pressable>
        <Pressable style={styles.botaoExcluir} onPress={confirmarExclusao}>
          <Text style={styles.textoExcluir}>Excluir ponto</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  scroll: { padding: 20, flexGrow: 1 },
  card: { backgroundColor: '#FFF', borderRadius: 14, padding: 20, borderWidth: 1, borderColor: '#DDE5DF' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20', marginBottom: 10 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 5 },
  texto: { fontSize: 16, color: '#444', lineHeight: 23 },
  botaoEditar: { minHeight: 44, borderRadius: 10, backgroundColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  botaoExcluir: { minHeight: 44, borderWidth: 1, borderColor: '#C62828', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  textoExcluir: { color: '#C62828', fontWeight: 'bold' },
  estado: { flex: 1, backgroundColor: '#F4F7F5', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  erro: { color: '#C62828', textAlign: 'center', lineHeight: 22 },
});
