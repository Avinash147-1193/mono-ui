import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import { GlobalColors } from "../constants/GlobalColors";
import ButtonLogin from "../components/buttons/buttonLogin";
import Separator from "../components/separators/defaultSeparator";
import { handleLogin } from "../helper/auth/auth";

//const SERVER_STATE = API.CURRENT_STATE;

//{ navigation }: { navigation: any }
const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  //const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <TextInput style={styles.input} placeholder="Phone, username, or email" onChangeText={(text) => setUsername(text)} value={username} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} />
      {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}

      <ButtonLogin title="Log In" onPress={() => handleLogin(username, password, setValidationError, navigation)} />
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your login details? Get help signing in.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orContainer}>
        <Separator containerStyle={{ width: "40%" }} />
        <Text>OR</Text>
        <Separator containerStyle={{ width: "40%" }} />
      </View>
      <View style={styles.horizontalContainer}>
        <Text>Log in with </Text>
        <ButtonLogin
          title=""
          icon={<Icon color={GlobalColors.primary.white} name="google" type="font-awesome" size={14} />}
          buttonStyle={{ padding: 0, width: 31, height: 31 }}
        />
        <ButtonLogin
          title=""
          icon={<Icon name="linkedin" color={GlobalColors.primary.white} type="font-awesome" size={13} />}
          buttonStyle={{ padding: 0, width: 31, height: 31 }}
        />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign up.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.primary.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 225,
    height: 189,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: GlobalColors.buttonColor.primary,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  validationError: {
    color: GlobalColors.primary.error,
    fontSize: 14,
    marginBottom: 10,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: GlobalColors.primary.black,
    fontSize: 14,
    fontWeight: "bold",
  },
  orContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  signupContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: GlobalColors.text.grayText,
    fontSize: 14,
  },
  signupLink: {
    color: GlobalColors.text.postText,
    fontSize: 14,
  },
});

export default LoginScreen;
