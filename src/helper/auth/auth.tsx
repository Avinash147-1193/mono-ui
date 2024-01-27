import axios from "axios";
import { API, CURRENT_STATE } from "../../constants/GlobalAPI";
import { loginUser } from "../../redux/auth/action";

export const handleLogin = async (
  username: string,
  password: string,
  setValidationError: React.Dispatch<React.SetStateAction<string>>,
  navigation: any,
  dispatch: any,
) => {
  if (username && password) {
    if (/^[a-zA-Z0-9-'@,.']+$/.test(username) && username.length > 5 && password.length > 7) {
      navigation.push("HomeScreen");
    } else {
      setValidationError("Invalid username or password");
    }
  } else {
    setValidationError("Please enter your username and password");
  }

  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.login}`;
    console.log(baseUrl);
    await axios
      .post(baseUrl, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("-----------res-data", res.data);
        dispatch(loginUser(res.data));
        //navigation.push("HomeScreen");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};
