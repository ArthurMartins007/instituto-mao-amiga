import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';

export type DetalhePontoProps = NativeStackScreenProps<RootStackParamList, 'DetalhePonto'>;

export function DetalhePontoScreen({ route }: DetalhePontoProps) {
  const { ponto } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.detalheScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detalheContainer}>
          <Text style={styles.detalheTitulo}>{ponto.nome}</Text>

          <Text style={styles.detalheLabel}>Endereço</Text>
          <Text style={styles.detalheTexto}>{ponto.endereco}</Text>

          <Text style={styles.detalheLabel}>Dias e horários</Text>
          <Text style={styles.detalheTexto}>{ponto.horario}</Text>

          <Text style={styles.detalheLabel}>Recebe / Distribui</Text>
          <Text style={styles.detalheTexto}>{ponto.recebeDistribui}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },
  detalheScroll: {
    padding: 20,
    flexGrow: 1,
  },
  detalheContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE5DF',
  },
  detalheTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 18,
  },
  detalheLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 14,
    marginBottom: 5,
  },
  detalheTexto: {
    fontSize: 16,
    color: '#444',
    lineHeight: 23,
  },
});
