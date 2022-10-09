import FontText from "../components/FontText";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./election/Search";
import ElectionScreen from "./election/Election";

export default ({ navigator }) => {
  let Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActualSearch"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Election" component={ElectionScreen} />
    </Stack.Navigator>
  );
};
