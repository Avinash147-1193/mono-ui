import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import StackNavigation from "./navigation";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Render the StackNavigation component */}
        <StackNavigation />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
