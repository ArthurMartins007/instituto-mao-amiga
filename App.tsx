import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/navigation/types';
import { ListaPontosScreen } from './src/screens/ListaPontosScreen';
import { DetalhePontoScreen } from './src/screens/DetalhePontoScreen';
import { NovaDoacaoScreen } from './src/screens/NovaDoacaoScreen';
import { MinhasDoacoesScreen } from './src/screens/MinhasDoacoesScreen';
import { DetalheDoacaoScreen } from './src/screens/DetalheDoacaoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1B5E20' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="ListaPontos" component={ListaPontosScreen} options={{ title: 'Instituto Mão Amiga' }} />
        <Stack.Screen name="DetalhePonto" component={DetalhePontoScreen} options={{ title: 'Detalhes do ponto' }} />
        <Stack.Screen name="NovaDoacao" component={NovaDoacaoScreen} options={({ route }) => ({ title: route.params?.doacao ? 'Editar doação' : 'Nova doação' })} />
        <Stack.Screen name="MinhasDoacoes" component={MinhasDoacoesScreen} options={{ title: 'Minhas doações' }} />
        <Stack.Screen name="DetalheDoacao" component={DetalheDoacaoScreen} options={{ title: 'Detalhe da doação' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
