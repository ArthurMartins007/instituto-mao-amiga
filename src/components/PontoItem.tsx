import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ponto } from '../types/ponto';
import { FavoritoButton } from './FavoritoButton';

type Props = {
  ponto: Ponto;
  favorito: boolean;
  onPress: () => void;
  onToggleFavorito: () => void;
};

// Mostra os dados principais do ponto e deixa o favorito separado.
export function PontoItem({ ponto, favorito, onPress, onToggleFavorito }: Props) {
  return (
    <View style={styles.item}>
      <Pressable style={styles.conteudo} onPress={onPress}>
        <Text style={styles.nome}>{ponto.nome}</Text>
        <Text style={styles.detalhe}>{ponto.endereco}</Text>
        <Text style={styles.detalhe}>{ponto.bairro} • {ponto.tipo}</Text>
        <Text style={styles.horario}>{ponto.horario}</Text>
        <Text style={styles.acao}>Ver detalhes →</Text>
      </Pressable>
      <FavoritoButton favorito={favorito} onPress={onToggleFavorito} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: { backgroundColor: '#FFF', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#DDE5DF', flexDirection: 'row', alignItems: 'center' },
  conteudo: { flex: 1, padding: 4 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginBottom: 7 },
  detalhe: { fontSize: 14, color: '#444', lineHeight: 20 },
  horario: { fontSize: 14, color: '#666', lineHeight: 20, marginTop: 4 },
  acao: { marginTop: 10, fontSize: 14, fontWeight: 'bold', color: '#2E7D32' },
});
