import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type FavoritoButtonProps = {
  favorito: boolean;
  onPress: () => void;
};

export function FavoritoButton({ favorito, onPress }: FavoritoButtonProps) {
  return (
    <TouchableOpacity
      style={styles.botaoFavorito}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      accessibilityState={{ selected: favorito }}
    >
      <Text style={styles.favoritoTexto}>
        {favorito ? '♥' : '♡'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botaoFavorito: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoritoTexto: {
    fontSize: 22,
    color: '#C62828',
  },
});
