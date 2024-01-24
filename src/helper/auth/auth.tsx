// apiFunctions.tsx

export const handleLogin = async (
  username: string,
  password: string,
  setValidationError: React.Dispatch<React.SetStateAction<string>>,
  //   dispatch: (action: any) => void,
  navigation: any, // Adjust the type accordingly
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

  //   try {
  //     let baseUrl = API[SERVER_STATE] + API.USER.login;
  //     console.log(baseUrl);
  //     await axios
  //       .post(baseUrl, {
  //         user_id: username,
  //         password: password,
  //       })
  //       .then((res) => {
  //         console.log("-----------res-data", res.data);
  //         dispatch(setAuthUser(res.data));
  //         navigation.push("HomeScreen");
  //       })
  //       .catch((error) => console.log(error));
  //     // Handle the response from the server
  //     // e.g., store the authentication token in AsyncStorage, navigate to the main app screen, etc.
  //   } catch (error) {
  //     console.log("catch block", error);
  //   }
};
