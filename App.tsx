import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  NovaDoacao: undefined;
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

        <Pressable
          style={styles.botaoNovaDoacao}
          onPress={() => navigation.navigate('NovaDoacao')}
        >
          <Text style={styles.textoBotaoNovaDoacao}>
            Nova doação
          </Text>
        </Pressable>
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
      <ScrollView
        contentContainerStyle={styles.detalheScroll}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>
    </View>
  );
}

type NovaDoacaoProps = NativeStackScreenProps<
  RootStackParamList,
  'NovaDoacao'
>;

function NovaDoacaoScreen({ navigation }: NovaDoacaoProps) {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');

  const [erroTipoItem, setErroTipoItem] = useState('');
  const [erroQuantidade, setErroQuantidade] = useState('');
  const [erroPontoDestino, setErroPontoDestino] = useState('');

  function cadastrarDoacao() {
    let formularioValido = true;

    setErroTipoItem('');
    setErroQuantidade('');
    setErroPontoDestino('');

    if (!tipoItem.trim()) {
      setErroTipoItem('Informe o tipo do item.');
      formularioValido = false;
    }

    if (!quantidade.trim()) {
      setErroQuantidade('Informe a quantidade.');
      formularioValido = false;
    } else if (!/^\d+$/.test(quantidade.trim())) {
      setErroQuantidade(
        'A quantidade deve conter apenas números.'
      );
      formularioValido = false;
    } else if (Number(quantidade) <= 0) {
      setErroQuantidade(
        'A quantidade deve ser maior que zero.'
      );
      formularioValido = false;
    }

    if (!pontoDestino.trim()) {
      setErroPontoDestino(
        'Informe o ponto de destino.'
      );
      formularioValido = false;
    }

    if (!formularioValido) {
      return;
    }

    Alert.alert(
      'Doação validada',
      'Os dados foram preenchidos corretamente. O salvamento será implementado posteriormente.',
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.formularioScroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formularioContainer}>
          <Text style={styles.formularioTitulo}>
            Nova doação
          </Text>

          <Text style={styles.formularioDescricao}>
            Informe os dados da doação e o ponto que
            receberá os itens.
          </Text>

          <View style={styles.campoGrupo}>
            <Text style={styles.campoLabel}>
              Tipo do item
            </Text>

            <TextInput
              style={[
                styles.input,
                erroTipoItem
                  ? styles.inputErro
                  : null,
              ]}
              value={tipoItem}
              onChangeText={(texto) => {
                setTipoItem(texto);

                if (erroTipoItem) {
                  setErroTipoItem('');
                }
              }}
              placeholder="Ex.: arroz, roupas, material escolar"
              placeholderTextColor="#888"
              returnKeyType="next"
            />

            {erroTipoItem ? (
              <Text style={styles.textoErro}>
                {erroTipoItem}
              </Text>
            ) : null}
          </View>

          <View style={styles.campoGrupo}>
            <Text style={styles.campoLabel}>
              Quantidade
            </Text>

            <TextInput
              style={[
                styles.input,
                erroQuantidade
                  ? styles.inputErro
                  : null,
              ]}
              value={quantidade}
              onChangeText={(texto) => {
                setQuantidade(texto);

                if (erroQuantidade) {
                  setErroQuantidade('');
                }
              }}
              placeholder="Ex.: 10"
              placeholderTextColor="#888"
              keyboardType="numeric"
              returnKeyType="next"
            />

            {erroQuantidade ? (
              <Text style={styles.textoErro}>
                {erroQuantidade}
              </Text>
            ) : null}
          </View>

          <View style={styles.campoGrupo}>
            <Text style={styles.campoLabel}>
              Ponto de destino
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.inputMultilinha,
                erroPontoDestino
                  ? styles.inputErro
                  : null,
              ]}
              value={pontoDestino}
              onChangeText={(texto) => {
                setPontoDestino(texto);

                if (erroPontoDestino) {
                  setErroPontoDestino('');
                }
              }}
              placeholder="Ex.: Ponto Central Mão Amiga"
              placeholderTextColor="#888"
              multiline
              numberOfLines={2}
            />

            {erroPontoDestino ? (
              <Text style={styles.textoErro}>
                {erroPontoDestino}
              </Text>
            ) : null}
          </View>

          <Pressable
            style={styles.botaoCadastrar}
            onPress={cadastrarDoacao}
          >
            <Text style={styles.textoBotaoCadastrar}>
              Cadastrar doação
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoCancelar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textoBotaoCancelar}>
              Voltar
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

        <Stack.Screen
          name="NovaDoacao"
          component={NovaDoacaoScreen}
          options={{
            title: 'Nova doação',
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
    marginBottom: 16,
  },

  botaoNovaDoacao: {
    backgroundColor: '#1B5E20',
    borderRadius: 10,
    minHeight: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBotaoNovaDoacao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
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

  formularioScroll: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },

  formularioContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE5DF',
    padding: 20,
  },

  formularioTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },

  formularioDescricao: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
    marginBottom: 22,
  },

  campoGrupo: {
    marginBottom: 18,
  },

  campoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#C9D4CC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#FAFCFB',
  },

  inputMultilinha: {
    textAlignVertical: 'top',
    minHeight: 64,
  },

  inputErro: {
    borderColor: '#C62828',
  },

  textoErro: {
    marginTop: 5,
    fontSize: 13,
    color: '#C62828',
  },

  botaoCadastrar: {
    minHeight: 44,
    borderRadius: 10,
    backgroundColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },

  textoBotaoCadastrar: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  botaoCancelar: {
    minHeight: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },

  textoBotaoCancelar: {
    color: '#1B5E20',
    fontSize: 15,
    fontWeight: 'bold',
  },
});