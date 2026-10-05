import { useCallback, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DoacaoItem } from '../components/DoacaoItem';
import { listarDoacoes } from '../services/doacoesStorage';
import { Doacao } from '../types/Doacao';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MinhasDoacoes'>;

const normalizar = (texto: string) => texto.trim().toLocaleLowerCase('pt-BR');

export function MinhasDoacoesScreen({ navigation }: Props) {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [filtro, setFiltro] = useState('');

  const carregar = useCallback(async () => setDoacoes(await listarDoacoes()), []);

  useFocusEffect(useCallback(() => {
    carregar().catch(() => setDoacoes([]));
  }, [carregar]));

  const filtradas = useMemo(() => {
    const termo = normalizar(filtro);
    return termo ? doacoes.filter((d) => normalizar(d.tipoItem).includes(termo)) : doacoes;
  }, [doacoes, filtro]);

  const resumo = useMemo(() => {
    const grupos: Record<string, { tipo: string; quantidade: number; doacoes: number }> = {};
    doacoes.forEach((d) => {
      const chave = normalizar(d.tipoItem);
      grupos[chave] ??= { tipo: d.tipoItem, quantidade: 0, doacoes: 0 };
      grupos[chave].quantidade += d.quantidade;
      grupos[chave].doacoes += 1;
    });
    return Object.values(grupos).sort((a, b) => b.quantidade - a.quantidade);
  }, [doacoes]);

  const vazio = doacoes.length === 0;
  const semResultado = doacoes.length > 0 && filtradas.length === 0;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        data={filtradas}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <DoacaoItem doacao={item} onPress={() => navigation.navigate('DetalheDoacao', { doacao: item })} />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.titulo}>Minhas doações</Text>
            <Text style={styles.descricao}>Consulte, filtre e gerencie as doações registradas.</Text>

            <Pressable style={styles.botaoPrimario} onPress={() => navigation.navigate('NovaDoacao')}>
              <Text style={styles.textoBotaoPrimario}>Registrar nova doação</Text>
            </Pressable>

            <View style={styles.resumo}>
              <Text style={styles.resumoTitulo}>Resumo</Text>
              <Text style={styles.resumoTotal}>Total: {doacoes.length} doações</Text>
              {resumo.map((item) => (
                <Text key={normalizar(item.tipo)} style={styles.resumoItem}>
                  {item.tipo}: {item.quantidade} unidades em {item.doacoes} doações
                </Text>
              ))}
            </View>

            <Text style={styles.filtroLabel}>Buscar por tipo de item</Text>
            <TextInput
              value={filtro}
              onChangeText={setFiltro}
              placeholder="Ex.: roupa"
              placeholderTextColor="#888"
              style={styles.filtroInput}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            {vazio ? (
              <>
                <Text style={styles.vazioTitulo}>Nenhuma doação registrada</Text>
                <Text style={styles.vazioTexto}>Cadastre sua primeira doação para começar o histórico.</Text>
                <Pressable style={styles.botaoPrimario} onPress={() => navigation.navigate('NovaDoacao')}>
                  <Text style={styles.textoBotaoPrimario}>Cadastrar doação</Text>
                </Pressable>
              </>
            ) : semResultado ? (
              <Text style={styles.vazioTexto}>Nenhuma doação encontrada para "{filtro}".</Text>
            ) : null}
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  lista: { padding: 20, paddingBottom: 30, flexGrow: 1 },
  titulo: { fontSize: 27, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },
  descricao: { fontSize: 15, color: '#555', lineHeight: 21, marginBottom: 16 },
  botaoPrimario: { minHeight: 44, borderRadius: 10, backgroundColor: '#1B5E20', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
  textoBotaoPrimario: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  resumo: { backgroundColor: '#EAF3EC', borderRadius: 12, borderWidth: 1, borderColor: '#CFE1D3', padding: 16, marginBottom: 18 },
  resumoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginBottom: 6 },
  resumoTotal: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  resumoItem: { fontSize: 14, color: '#444', lineHeight: 21 },
  filtroLabel: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 7 },
  filtroInput: { minHeight: 48, borderWidth: 1, borderColor: '#C9D4CC', borderRadius: 10, paddingHorizontal: 14, fontSize: 15, color: '#222', backgroundColor: '#FAFCFB', marginBottom: 18 },
  vazioBox: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 12 },
  vazioTitulo: { fontSize: 19, fontWeight: 'bold', color: '#1B5E20', textAlign: 'center', marginBottom: 8 },
  vazioTexto: { fontSize: 15, color: '#666', lineHeight: 21, textAlign: 'center' },
});
