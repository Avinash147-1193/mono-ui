import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";
import { Platforms } from "../../constants/Common";
const paddingTop = Platform.OS === Platforms.ANDROID ? 20 : 35;

//{ navigation }: { navigation: any }
const Header = ({}: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.logo} source={require("../../../assets/logo.png")}></Image>
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        {/* <TouchableOpacity onPress={() => navigation.push("NewPost")}>
          <Image style={styles.icon} source={require("../../../assets/post.png")}></Image>
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Image style={styles.icon} source={require("../../../assets/bell-notification.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>2</Text>
          </View>
          <Image style={styles.icon} source={require("../../../assets/message.png")}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: paddingTop,
    backgroundColor: GlobalColors[GlobalMode].primary.black,
  },
  logo: {
    width: 100,
    height: 55,
  },
  iconsContainer: {
    flexDirection: "row",
    marginRight: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    resizeMode: "contain",
    borderTopRightRadius: 10,
  },
  unreadBadge: {
    backgroundColor: GlobalColors[GlobalMode].primary.white,
    position: "absolute",
    left: 20,
    bottom: 18,
    height: 18,
    width: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: GlobalColors[GlobalMode].primary.black,
    fontWeight: "600",
  },
});

export default Header;
