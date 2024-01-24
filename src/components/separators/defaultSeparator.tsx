import { View, StyleSheet, ViewStyle } from "react-native";

interface SeparatorProps {
  containerStyle?: ViewStyle;
}

const Separator: React.FunctionComponent<SeparatorProps> = ({ containerStyle }) => {
  return <View style={{ ...styles.orLine, ...containerStyle }}></View>;
};

export default Separator;
const styles = StyleSheet.create({
  orLine: {
    width: 40,
    height: 1,
    backgroundColor: "#DBDBDB",
  },
});
