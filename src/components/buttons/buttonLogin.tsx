import React, { useState } from "react";
import { ViewStyle, TextStyle } from "react-native";
import { Button, ButtonProps } from "@rneui/themed";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";

interface ButtonLoginProps {
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  loadingProps?: ButtonProps["loadingProps"];
  onPress?: () => void; // New prop to handle button press
  icon?: any;
  iconAlign?: "left" | "right" | "bottom" | undefined;
}

const ButtonLogin: React.FunctionComponent<ButtonLoginProps> = ({
  title,
  containerStyle,
  titleStyle,
  buttonStyle,
  loadingProps,
  onPress,
  icon,
  iconAlign,
}) => {
  const [loading, setLoading] = useState(false);

  const onPressHandler = () => {
    setLoading(true); // Set loading to true while handling press (you can modify this based on your logic)
    if (onPress) {
      onPress(); // Call the custom onPress function if provided
    }
    setLoading(false); // Reset loading state
  };

  return (
    <Button
      title={title}
      loading={loading}
      loadingProps={loadingProps || { size: "small", color: "white" }}
      buttonStyle={{
        backgroundColor: GlobalColors[GlobalMode].button.primary,
        borderRadius: 20,
        ...buttonStyle,
      }}
      titleStyle={{
        fontWeight: "bold",
        fontSize: 23,
        ...titleStyle,
      }}
      containerStyle={{
        backgroundColor: GlobalColors[GlobalMode].button.primary,
        borderRadius: 20,
        margin: 2,
        ...buttonStyle,
        ...containerStyle,
      }}
      onPress={onPressHandler}
      raised={true}
      icon={icon}
      iconPosition={iconAlign}
      iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
    />
  );
};

export default ButtonLogin;
