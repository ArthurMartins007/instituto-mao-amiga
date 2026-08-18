import { useLayoutEffect } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  horario: string;
  recebeDistribui: string;
};

type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: {
    ponto: Ponto;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Ponto Central Mão Amiga',
    endereco: 'Rua das Flores, 120 - Centro',
    horario: 'Segunda a sexta, das 08:00 às 17:00',
    recebeDistribui:
      'Recebe alimentos não perecíveis, roupas e produtos de higiene. Distribui cestas básicas e roupas para famílias cadastradas.',
  },
  {
    id: '2',
    nome: 'Unidade Esperança',
    endereco: 'Avenida Brasil, 850 - Jardim Esperança',
    horario: 'Terças e quintas, das 09:00 às 16:00',
    recebeDistribui:
      'Recebe roupas, cobertores e produtos de higiene. Distribui roupas e kits de higiene para famílias em situação de vulnerabilidade.',
  },
  {
    id: '3',
    nome: 'Ponto Solidário Norte',
    endereco: 'Rua São Lucas, 45 - Vila Nova',
    horario: 'Sábados, das 08:00 às 13:00',
    recebeDistribui:
      'Recebe alimentos frescos de feiras e mercados. Distribui frutas, verduras e outros alimentos para famílias atendidas pelo instituto.',
  },
  {
    id: '4',
    nome: 'Centro Comunitário Sul',
    endereco: 'Avenida das Palmeiras, 430 - Parque Sul',
    horario: 'Segundas, quartas e sextas, das 10:00 às 18:00',
    recebeDistribui:
      'Recebe alimentos não perecíveis, brinquedos e roupas infantis. Distribui cestas de alimentos e roupas para crianças e adolescentes.',
  },
  {
    id: '5',
    nome: 'Ponto Nova Vida',
    endereco: 'Rua da Solidariedade, 210 - Nova Vida',
    horario: 'Segunda a sábado, das 08:30 às 15:30',
    recebeDistribui:
      'Recebe roupas de adultos, calçados e cobertores. Distribui peças de inverno e calçados para famílias cadastradas.',
  },
  {
    id: '6',
    nome: 'Unidade São José',
    endereco: 'Rua Padre Antônio, 78 - São José',
    horario: 'Terças, quintas e sábados, das 09:00 às 14:00',
    recebeDistribui:
      'Recebe alimentos, produtos de higiene e materiais escolares. Distribui kits escolares e produtos básicos para famílias atendidas.',
  },
  {
    id: '7',
    nome: 'Ponto Acolher',
    endereco: 'Avenida da Amizade, 1020 - Jardim União',
    horario: 'Quartas e sextas, das 08:00 às 17:00',
    recebeDistribui:
      'Recebe roupas, colchões e cobertores. Distribui itens de inverno e materiais para famílias em situação de emergência.',
  },
  {
    id: '8',
    nome: 'Centro Solidário Leste',
    endereco: 'Rua das Acácias, 315 - Jardim Leste',
    horario: 'Segunda a sexta, das 09:00 às 16:30',
    recebeDistribui:
      'Recebe alimentos, leite e produtos de higiene. Distribui cestas básicas e kits de higiene para famílias acompanhadas pelo instituto.',
  },
];

type ListaPontosProps = NativeStackScreenProps<
  RootStackParamList,
  'ListaPontos'
>;

function PontoItem({
  ponto,
  navigation,
}: {
  ponto: Ponto;
  navigation: ListaPontosProps['navigation'];
}) {
  function abrirDetalhe() {
    navigation.navigate('DetalhePonto', {
      ponto,
    });
  }

  return (
    <Pressable
      style={styles.item}
      onPress={abrirDetalhe}
    >
      <Text style={styles.itemNome}>
        {ponto.nome}
      </Text>

      <Text style={styles.itemEndereco}>
        {ponto.endereco}
      </Text>

      <Text style={styles.itemHorario}>
        {ponto.horario}
      </Text>

      <Text style={styles.itemAcao}>
        Ver detalhes →
      </Text>
    </Pressable>
  );
}

function ListaPontosScreen({
  navigation,
}: ListaPontosProps) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Pontos de atendimento',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Instituto Mão Amiga
        </Text>

        <Text style={styles.descricao}>
          Encontre pontos de coleta e distribuição de doações.
        </Text>
      </View>

      <FlatList
        data={pontosMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            navigation={navigation}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

type DetalhePontoProps = NativeStackScreenProps<
  RootStackParamList,
  'DetalhePonto'
>;

function DetalhePontoScreen({
  route,
}: DetalhePontoProps) {
  const { ponto } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detalheContainer}>
        <Text style={styles.detalheTitulo}>
          {ponto.nome}
        </Text>

        <Text style={styles.detalheLabel}>
          Endereço
        </Text>

        <Text style={styles.detalheTexto}>
          {ponto.endereco}
        </Text>

        <Text style={styles.detalheLabel}>
          Dias e horários
        </Text>

        <Text style={styles.detalheTexto}>
          {ponto.horario}
        </Text>

        <Text style={styles.detalheLabel}>
          Recebe / Distribui
        </Text>

        <Text style={styles.detalheTexto}>
          {ponto.recebeDistribui}
        </Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1B5E20',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="ListaPontos"
          component={ListaPontosScreen}
          options={{
            title: 'Instituto Mão Amiga',
          }}
        />

        <Stack.Screen
          name="DetalhePonto"
          component={DetalhePontoScreen}
          options={{
            title: 'Detalhes do ponto',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },

  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },

  lista: {
    padding: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },

  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDE5DF',
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

  detalheContainer: {
    margin: 20,
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