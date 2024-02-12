import { StyleSheet, Image } from "react-native";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";

export const UserDisplay = ({ profile }: { profile: any }) => (
  <Image
    source={{
      uri: profile?.display.profilePictures[0].imgUrl || "",
    }}
    style={styles.story}
  />
);

const styles = StyleSheet.create({
  story: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: GlobalColors[GlobalMode].elements.loginButton,
  },
  badge: {
    width: 20,
    height: 20,
    marginLeft: 3,
  },
});
