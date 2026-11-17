import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Doacao } from '../types/Doacao';

type Props = {
  doacao: Doacao;
  onPress: () => void;
};

// Card de histórico. O memo evita redesenhar itens que não mudaram.
function DoacaoItemBase({ doacao, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.textos}>
        <Text style={styles.titulo}>{doacao.tipoItem}</Text>
        <Text style={styles.info}>{doacao.quantidade} unidade(s)</Text>
        <Text style={styles.info}>Destino: {doacao.pontoDestino}</Text>
        <Text style={styles.data}>{new Date(doacao.criadoEm).toLocaleString('pt-BR')}</Text>
      </View>
      <Text style={styles.seta}>›</Text>
    </Pressable>
  );
}

export const DoacaoItem = memo(DoacaoItemBase);

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#DDE5DF', marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  textos: { flex: 1 },
  titulo: { fontSize: 17, color: '#1B5E20', fontWeight: 'bold', marginBottom: 5 },
  info: { fontSize: 14, color: '#444', lineHeight: 20 },
  data: { fontSize: 12, color: '#777', marginTop: 6 },
  seta: { fontSize: 28, color: '#1B5E20', paddingLeft: 8 },
});
