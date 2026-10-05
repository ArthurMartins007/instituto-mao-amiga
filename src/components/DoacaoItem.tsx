import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Doacao } from '../types/Doacao';

type DoacaoItemProps = {
  doacao: Doacao;
  onPress: () => void;
};

function formatarData(data: string): string {
  return new Date(data).toLocaleString('pt-BR');
}

export const DoacaoItem = memo(function DoacaoItem({ doacao, onPress }: DoacaoItemProps) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.tipo}>{doacao.tipoItem}</Text>
      <Text style={styles.info}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.info}>Ponto de destino: {doacao.pontoDestino}</Text>
      <Text style={styles.data}>Registrada em: {formatarData(doacao.criadoEm)}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  item: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#DDE5DF', marginBottom: 12, padding: 16, minHeight: 44 },
  tipo: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },
  info: { fontSize: 15, color: '#444', lineHeight: 21, marginBottom: 3 },
  data: { fontSize: 13, color: '#777', marginTop: 7 },
});
