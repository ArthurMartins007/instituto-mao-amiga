import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { buscarDoacao, excluirDoacao } from '../services/doacoesStorage';
import { Doacao } from '../types/Doacao';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;
const formatarData = (data: string) => new Date(data).toLocaleString('pt-BR');

export function DetalheDoacaoScreen({ navigation, route }: Props) {
  const [doacao, setDoacao] = useState<Doacao>(route.params.doacao);

  useFocusEffect(useCallback(() => {
    buscarDoacao(route.params.doacao.id).then((resultado) => resultado && setDoacao(resultado)).catch(() => {});
  }, [route.params.doacao.id]));

  const confirmarExclusao = () => {
    Alert.alert('Excluir doação', 'Tem certeza que deseja excluir esta doação?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await excluirDoacao(doacao.id); navigation.goBack(); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.titulo}>{doacao.tipoItem}</Text>
          <Text style={styles.label}>Quantidade</Text>
          <Text style={styles.texto}>{doacao.quantidade} unidades</Text>
          <Text style={styles.label}>Ponto de destino</Text>
          <Text style={styles.texto}>{doacao.pontoDestino}</Text>
          <Text style={styles.label}>Data do registro</Text>
          <Text style={styles.texto}>{formatarData(doacao.criadoEm)}</Text>

          <Pressable style={styles.botaoEditar} onPress={() => navigation.navigate('NovaDoacao', { doacao })}>
            <Text style={styles.textoBotaoEditar}>Editar doação</Text>
          </Pressable>
          <Pressable style={styles.botaoExcluir} onPress={confirmarExclusao}>
            <Text style={styles.textoBotaoExcluir}>Excluir doação</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  scroll: { padding: 20, flexGrow: 1 },
  card: { backgroundColor: '#FFF', borderRadius: 14, borderWidth: 1, borderColor: '#DDE5DF', padding: 20 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#1B5E20', marginBottom: 18 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 5 },
  texto: { fontSize: 16, color: '#444', lineHeight: 23 },
  botaoEditar: { minHeight: 44, borderRadius: 10, backgroundColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  textoBotaoEditar: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  botaoExcluir: { minHeight: 44, borderRadius: 10, borderWidth: 1, borderColor: '#C62828', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  textoBotaoExcluir: { color: '#C62828', fontWeight: 'bold', fontSize: 15 },
});
