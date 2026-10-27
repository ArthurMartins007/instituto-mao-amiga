import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { ApiError } from '../services/api';
import { buscarPontoPorId } from '../services/pontosService';
import { Ponto } from '../types/ponto';

export type DetalhePontoProps = NativeStackScreenProps<RootStackParamList, 'DetalhePonto'>;

export function DetalhePontoScreen({ route }: DetalhePontoProps) {
  const { id } = route.params;
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro('');
    setPonto(null);

    buscarPontoPorId(id)
      .then((resultado) => {
        if (ativo) setPonto(resultado);
      })
      .catch((erroBusca: unknown) => {
        if (!ativo) return;
        if (erroBusca instanceof ApiError && erroBusca.status === 404) {
          setErro('Ponto não encontrado.');
        } else {
          setErro('Não foi possível carregar os dados do ponto. Verifique a conexão com a API.');
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [id]);

  if (carregando) {
    return <View style={styles.estado}><ActivityIndicator size="large" color="#1B5E20" /><Text style={styles.detalheTexto}>Carregando ponto...</Text></View>;
  }

  if (erro || !ponto) {
    return <View style={styles.estado}><Text style={styles.mensagemErro}>{erro || 'Ponto não encontrado.'}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.detalheScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.detalheContainer}>
          <Text style={styles.detalheTitulo}>{ponto.nome}</Text>
          <Text style={styles.detalheLabel}>Endereço</Text>
          <Text style={styles.detalheTexto}>{ponto.endereco}</Text>
          <Text style={styles.detalheLabel}>Dias e horários</Text>
          <Text style={styles.detalheTexto}>{ponto.horario}</Text>
          <Text style={styles.detalheLabel}>Recebe / Distribui</Text>
          <Text style={styles.detalheTexto}>{ponto.recebeDistribui}</Text>
          <Text style={styles.detalheLabel}>Coordenadas</Text>
          <Text style={styles.detalheTexto}>{ponto.latitude}, {ponto.longitude}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  detalheScroll: { padding: 20, flexGrow: 1 },
  detalheContainer: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 14, borderWidth: 1, borderColor: '#DDE5DF' },
  detalheTitulo: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20', marginBottom: 18 },
  detalheLabel: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 5 },
  detalheTexto: { fontSize: 16, color: '#444', lineHeight: 23 },
  estado: { flex: 1, backgroundColor: '#F4F7F5', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  mensagemErro: { fontSize: 16, color: '#C62828', textAlign: 'center', lineHeight: 23 },
});
