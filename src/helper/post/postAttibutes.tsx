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
