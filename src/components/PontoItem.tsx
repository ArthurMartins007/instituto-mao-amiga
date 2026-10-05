import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Ponto } from '../types/Ponto';
import { FavoritoButton } from './FavoritoButton';

type PontoItemProps = {
  ponto: Ponto;
  favorito: boolean;
  onPress: () => void;
  onToggleFavorito: () => void;
};

export function PontoItem({
  ponto,
  favorito,
  onPress,
  onToggleFavorito,
}: PontoItemProps) {
  return (
    <View style={styles.item}>
      <Pressable style={styles.conteudo} onPress={onPress}>
        <Text style={styles.itemNome}>{ponto.nome}</Text>
        <Text style={styles.itemEndereco}>{ponto.endereco}</Text>
        <Text style={styles.itemHorario}>{ponto.horario}</Text>
        <Text style={styles.itemAcao}>Ver detalhes →</Text>
      </Pressable>

      <FavoritoButton favorito={favorito} onPress={onToggleFavorito} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDE5DF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  conteudo: {
    flex: 1,
    padding: 4,
  },
  itemNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  itemEndereco: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
    lineHeight: 20,
  },
  itemHorario: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  itemAcao: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
});
