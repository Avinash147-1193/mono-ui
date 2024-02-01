// navigation.tsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/login";
import HomeScreen from "./src/screens/home";
import NewPostScreen from "./src/screens/newPost";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={screenOptions}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
