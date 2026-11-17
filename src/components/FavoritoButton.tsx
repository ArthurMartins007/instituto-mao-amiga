import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  favorito: boolean;
  onPress: () => void;
};

// Botão pequeno e reutilizável para marcar ou desmarcar um ponto.
export function FavoritoButton({ favorito, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.botao}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      accessibilityState={{ selected: favorito }}
    >
      <Text style={styles.icone}>{favorito ? '♥' : '♡'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  icone: { fontSize: 23, color: '#C62828' },
});
