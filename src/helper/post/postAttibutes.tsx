import axios from "axios";
import { API, CURRENT_STATE } from "../../constants/GlobalAPI";

export const HandleLike = (post: any, setLikesCount: any, setLike: any, like: any, token: any, likesCount: any) => {
  like === 0 ? setLikesCount(likesCount + 1) : setLikesCount(likesCount - 1);
  setLike(like === 0 ? 1 : 0);
  try {
    const baseUrl = API[CURRENT_STATE] + API.POST.like + post._id;
    axios
      .request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: baseUrl,
      })
      .then((res) => {
        console.log(baseUrl, res.data);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (blob: any, uri: string) => {
  try {
    if (blob && uri) {
      const baseUrl = API[CURRENT_STATE] + API.USER.documentUpload;
      console.log("---axios-call", baseUrl);

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: blob._data.name,
        type: blob._data.type,
      } as unknown as Blob);
      formData.append("Content-Type", blob._data.type);

      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response?.data || false;
    }
    return false;
  } catch (error) {
    console.error("Error uploading file:", error);
    return false;
  }
};

export const createPost = async (body: any, token: string) => {
  try {
    const baseUrl = API[CURRENT_STATE] + API.POST.newPost;
    console.log("---axios-call", baseUrl, "-----body", JSON.stringify(body), "----token", token);

    const response = await axios.post(baseUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    return false;
  }
};
