import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<RootStackParamList>();

import HomeScreen from "./src/screens/Home";
import TermsScreen from "./src/screens/Terms";
import { RootStackParamList } from "./src/RootStackParam";
import { PlayerProvider } from "./src/context/PlayerContext";
import TechnologiesScreen from "./src/screens/Technologies";

export default function App() {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="Technologies" component={TechnologiesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}
