import { View, Text, StyleSheet } from 'react-native';

type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  horario: string;
  recebeDistribui: string;
};

const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Ponto Central Mão Amiga',
    endereco: 'Rua das Flores, 120 - Centro',
    horario: 'Segunda a sexta, das 08:00 às 17:00',
    recebeDistribui:
      'Recebe alimentos não perecíveis e roupas. Distribui cestas básicas para famílias cadastradas.',
  },
  {
    id: '2',
    nome: 'Unidade Esperança',
    endereco: 'Avenida Brasil, 850 - Jardim Esperança',
    horario: 'Terças e quintas, das 09:00 às 16:00',
    recebeDistribui:
      'Recebe roupas, cobertores e produtos de higiene. Distribui roupas e kits de higiene.',
  },
  {
    id: '3',
    nome: 'Ponto Solidário Norte',
    endereco: 'Rua São Lucas, 45 - Vila Nova',
    horario: 'Sábados, das 08:00 às 13:00',
    recebeDistribui:
      'Recebe alimentos frescos de feiras e mercados. Distribui alimentos para famílias em situação de vulnerabilidade.',
  },
];

function PontoItem({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemNome}>{ponto.nome}</Text>
      <Text style={styles.itemEndereco}>{ponto.endereco}</Text>
      <Text style={styles.itemHorario}>{ponto.horario}</Text>
    </View>
  );
}

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.detalheContainer}>
      <Text style={styles.detalheTitulo}>{ponto.nome}</Text>

      <Text style={styles.detalheLabel}>Endereço</Text>
      <Text style={styles.detalheTexto}>{ponto.endereco}</Text>

      <Text style={styles.detalheLabel}>Dias e horários</Text>
      <Text style={styles.detalheTexto}>{ponto.horario}</Text>

      <Text style={styles.detalheLabel}>Recebe / Distribui</Text>
      <Text style={styles.detalheTexto}>{ponto.recebeDistribui}</Text>
    </View>
  );
}

function TelaListaPontos() {
  return (
    <View>
      <Text style={styles.subtitulo}>Pontos disponíveis</Text>

      {pontosMock.map((ponto) => (
        <PontoItem key={ponto.id} ponto={ponto} />
      ))}
    </View>
  );
}

function TelaDetalhePonto() {
  const pontoSelecionado = pontosMock[0];

  return <DetalhePonto ponto={pontoSelecionado} />;
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Instituto Mão Amiga</Text>

      <Text style={styles.descricao}>
        Pontos de coleta e distribuição de doações.
      </Text>

      <TelaListaPontos />

      <TelaDetalhePonto />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },

  subtitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },

  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDE5DF',
  },

  itemNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 6,
  },

  itemEndereco: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },

  itemHorario: {
    fontSize: 14,
    color: '#666',
  },

  detalheContainer: {
    backgroundColor: '#E8F5E9',
    padding: 18,
    borderRadius: 10,
    marginTop: 10,
  },

  detalheTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 18,
  },

  detalheLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 4,
  },

  detalheTexto: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});