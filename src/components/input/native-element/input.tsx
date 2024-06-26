import * as React from "react";
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default () => {
  return (
    <Input
      containerStyle={{}}
      disabledInputStyle={{ margin: 1 }}
      inputContainerStyle={{}}
      errorMessage="Oops! that's not correct."
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{}}
      label="User Form"
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="account-outline" size={20} />}
      leftIconContainerStyle={{}}
      rightIcon={<Icon name="close" size={20} />}
      rightIconContainerStyle={{}}
      placeholder="Enter Name"
    />
  );
};
