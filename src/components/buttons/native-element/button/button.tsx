import * as React from "react";
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
//import LinearGradient from "react-native-linear-gradient";

export default () => {
  return (
    <Button
      buttonStyle={{ width: 150 }}
      containerStyle={{ margin: 5 }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F",
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={{
        colors: ["#FF9800", "#F44336"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      icon={<Icon name="react" size={15} color="#0FF" />}
      iconContainerStyle={{ marginLeft: 10 }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={() => alert("click")}
      raised
      title="Hello"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
  );
};
