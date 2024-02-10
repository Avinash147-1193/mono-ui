// Import necessary libraries
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/login";
import HomeScreen from "./src/screens/home";
import NewPostScreen from "./src/screens/newPost";
import { Image } from "react-native";
import { bottomTabIcon, Icon } from "./src/components/home/BottomTabs"; // Update the path accordingly
import { GlobalColors, GlobalMode } from "./src/constants/GlobalColors";
import { useSelector } from "react-redux";
import { RootState } from "./src/redux/store";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigation: React.FC = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icon: Icon | undefined = bottomTabIcon.find((item: { name: string }) => item.name === route.name);
          console.log("--------icon", icon);

          if (!icon) {
            return null;
          }

          return <Image source={focused ? icon.active : icon.inactive} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveTintColor: GlobalColors[GlobalMode].primary.white,
        tabBarInactiveTintColor: GlobalColors[GlobalMode].primary.realBlack,
        tabBarStyle: {
          backgroundColor: GlobalColors[GlobalMode].primary.black,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      {/* Add more bottom tab screens as needed */}
    </Tab.Navigator>
  </NavigationContainer>
);

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="NewPost" component={NewPostScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const SelectedStack = () => {
  const authenticated = useSelector((state: RootState) => state.data);
  return authenticated ? <MainNavigation /> : <AuthStack />;
};
export default SelectedStack;
