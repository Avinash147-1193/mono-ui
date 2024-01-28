import axios from "axios";
import { API, CURRENT_STATE } from "../../constants/GlobalAPI";
import { loginUser, setAuthUserLikedPost, setAuthUserPost, setAuthUserProfile } from "../../redux/auth/action";

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
        dispatch(loginUser(res.data.access_token));
        if (res.data.access_token) navigation.push("HomeScreen");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const fetchUserProfile = async (dispatch: any, token: string | null) => {
  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.profile}`;
    console.log(baseUrl);
    axios
      .request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        url: baseUrl,
      })
      .then((res) => {
        dispatch(setAuthUserProfile(res.data));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const fetchUserPosts = async (dispatch: any, token: string | null) => {
  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.post}`;
    console.log(baseUrl);
    axios
      .request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        url: baseUrl,
      })
      .then((res) => {
        dispatch(setAuthUserPost(res.data));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const fetchUserLikedPosts = async (dispatch: any, token: string | null) => {
  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.like}`;
    console.log(baseUrl);
    axios
      .request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        url: baseUrl,
      })
      .then((res) => {
        dispatch(setAuthUserLikedPost(res.data));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};
