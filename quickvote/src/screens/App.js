import { Button, View, Text, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./Home";
import ProfileScreen from "./Profile";
import SearchScreen from "./Search";

import auth from "../backend_interactions/AuthManager";
import FontText from "../components/FontText";

const Tab = createBottomTabNavigator();

export default ({ navigation }) => {
  if (!auth.isAuthed()) navigation.navigate("Auth");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else {
            iconName = "user-alt";
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#44a5e4",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "#071f4a" },
        headerTitleStyle: { color: "white" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "CURRENT ELECTIONS",
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
