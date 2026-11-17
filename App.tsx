import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/navigation/types';
import { ListaPontosScreen } from './src/screens/ListaPontosScreen';
import { FormularioPontoScreen } from './src/screens/FormularioPontoScreen';
import { DetalhePontoScreen } from './src/screens/DetalhePontoScreen';
import { MeusPontosScreen } from './src/screens/MeusPontosScreen';
import { NovaDoacaoScreen } from './src/screens/NovaDoacaoScreen';
import { MinhasDoacoesScreen } from './src/screens/MinhasDoacoesScreen';
import { DetalheDoacaoScreen } from './src/screens/DetalheDoacaoScreen';

// O App só configura a navegação; cada tela cuida da própria funcionalidade.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1B5E20' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#F4F7F5' },
        }}
      >
        <Stack.Screen name="ListaPontos" component={ListaPontosScreen} options={{ title: 'Instituto Mão Amiga' }} />
        <Stack.Screen name="FormularioPonto" component={FormularioPontoScreen} options={({ route }) => ({ title: route.params?.id ? 'Editar ponto' : 'Novo ponto' })} />
        <Stack.Screen name="DetalhePonto" component={DetalhePontoScreen} options={{ title: 'Detalhes do ponto' }} />
        <Stack.Screen name="MeusPontos" component={MeusPontosScreen} options={{ title: 'Meus pontos' }} />
        <Stack.Screen name="NovaDoacao" component={NovaDoacaoScreen} options={({ route }) => ({ title: route.params?.id ? 'Editar doação' : 'Nova doação' })} />
        <Stack.Screen name="MinhasDoacoes" component={MinhasDoacoesScreen} options={{ title: 'Minhas doações' }} />
        <Stack.Screen name="DetalheDoacao" component={DetalheDoacaoScreen} options={{ title: 'Detalhe da doação' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
