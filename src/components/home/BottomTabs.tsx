import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Platform, ImageSourcePropType } from "react-native";
import { Divider } from "react-native-elements";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";
import { Icon } from "react-native-elements";

const height = Platform.OS === "android" ? 50 : 65;

export interface Icon {
  name: string;
  inactive: ImageSourcePropType;
  active: ImageSourcePropType;
}

interface BottomTabsProps {
  icons: Icon[];
}

export const bottomTabIcon: Icon[] = [
  {
    name: "Home",
    inactive: require("../../../assets/home--v2.png"),
    active: require("../../../assets/home.png"),
  },
  {
    name: "Search",
    inactive: require("../../../assets/search--v1.png"),
    active: require("../../../assets/search--v1-black.png"),
  },
  {
    name: "Reels",
    inactive: require("../../../assets/lawyer.png"),
    active: require("../../../assets/lawyer-black.png"),
  },
  {
    name: "Shop",
    inactive: require("../../../assets/user-male-circle.png"),
    active: require("../../../assets/user-male-circle-black.png"),
  },
];

const BottomTabs: React.FC<BottomTabsProps> = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [activeImages, setActiveImages] = useState<{ [key: string]: ImageSourcePropType }>({});

  useEffect(() => {
    const newActiveImages: { [key: string]: ImageSourcePropType } = {};
    bottomTabIcon.forEach((icon) => {
      newActiveImages[icon.name] = activeTab === icon.name ? icon.active : icon.inactive;
    });
    setActiveImages(newActiveImages);
  }, [activeTab, bottomTabIcon]);

  const Icon: React.FC<{ icon: Icon }> = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image source={activeImages[icon.name]} style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {bottomTabIcon.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: height,
    zIndex: 999,
    backgroundColor: GlobalColors[GlobalMode].primary.black,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    marginTop: 5,
    position: "relative",
  },
  icon: {
    width: 27,
    height: 27,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: `${100 / bottomTabIcon.length}%`,
    backgroundColor: "white",
    borderRadius: 2,
  },
});
