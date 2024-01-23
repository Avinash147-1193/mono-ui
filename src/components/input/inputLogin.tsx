import React from "react";
import { Input, Icon } from "@rneui/themed";

interface InputLoginProps {
  placeholder?: string; // Made placeholder optional
  onPress?: () => void; // New prop to handle button press
  size?: number;
}

const InputLogin: React.FunctionComponent<InputLoginProps> = ({
  placeholder = "Default Placeholder", // Use provided placeholder or default value
  size = 24,
}) => {
  return <Input placeholder={placeholder} leftIcon={<Icon name="user" size={size} color="black" />} />;
};

export default InputLogin;
