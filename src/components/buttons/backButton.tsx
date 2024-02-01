import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";

const BackButtonHeader = ({ navigation }: { navigation: any }, color: string) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-glyphs/30/" + color + "/back.png",
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  </View>
);

export default BackButtonHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: GlobalColors[GlobalMode].primary.white,
    fontWeight: "700",
    fontSize: 20,
    marginRight: 23,
  },
});
