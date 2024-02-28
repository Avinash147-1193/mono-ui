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
    } else {
      setValidationError("Invalid username or password");
    }
  } else {
    setValidationError("Please enter your username and password");
  }

  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.login}`;
    console.log("--axios-call", baseUrl);
    await axios
      .post(baseUrl, {
        username: username,
        password: password,
      })
      .then((res) => {
        dispatch(loginUser(res.data.access_token));
        fetchUserProfile(dispatch, res.data.access_token);
        if (res.data.access_token) navigation.navigate("Home", {});
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const fetchUserProfile = async (dispatch: any, token: string | null) => {
  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.profile}`;
    console.log("--axios-call", baseUrl);
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

export const fetchUserPosts = async (dispatch: any, token: string | null, page: number, pageSize: number, userPost: [] = []) => {
  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.post}?page=${page}&pageSize=${pageSize}`;
    console.log("--axios-call", baseUrl);
    axios
      .request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        url: baseUrl,
      })
      .then(async (res) => {
        if (res.data) userPost.length <= 0 ? dispatch(setAuthUserPost(res.data)) : dispatch(setAuthUserPost([...userPost, res.data]));
        return await res.data;
      })
      .catch((error) => console.log(error));
    return [];
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

let isFetching = false;
export const fetchInfiniteUserPosts = async (dispatch: any, token: string | null, page: number, pageSize: number, userPost: any[] = []) => {
  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.post}?page=${page}&pageSize=${pageSize}`;
    console.log("--axios-call", baseUrl);
    if (isFetching) {
      console.log("Already fetching posts...");
      return [];
    }

    isFetching = true;
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newPosts = response.data.reverse();
    isFetching = false;
    return [...userPost, ...newPosts];
  } catch (error) {
    console.error(`Error: ${error}`);
    return [];
  }
};

export const fetchUserLikedPosts = async (dispatch: any, token: string | null) => {
  try {
    const baseUrl = `${API[CURRENT_STATE]}${API.USER.like}`;
    console.log("--axios-call", baseUrl);
    axios
      .request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: baseUrl,
      })
      .then((res) => {
        const postIds = res.data.filter((data: any) => data.post && data.post._id !== undefined).map((data: any) => data.post._id);

        if (postIds) {
          dispatch(setAuthUserLikedPost(postIds));
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};
