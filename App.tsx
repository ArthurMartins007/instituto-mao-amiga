import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/navigation/types';
import { ListaPontosScreen } from './src/screens/ListaPontosScreen';
import { DetalhePontoScreen } from './src/screens/DetalhePontoScreen';
import { NovaDoacaoScreen } from './src/screens/NovaDoacaoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          options={{ title: 'Instituto Mão Amiga' }}
        />
        <Stack.Screen
          name="DetalhePonto"
          component={DetalhePontoScreen}
          options={{ title: 'Detalhes do ponto' }}
        />
        <Stack.Screen
          name="NovaDoacao"
          component={NovaDoacaoScreen}
          options={{ title: 'Nova doação' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
