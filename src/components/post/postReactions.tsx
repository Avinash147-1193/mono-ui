import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { API, CURRENT_STATE } from "../../constants/GlobalAPI";
import axios from "axios";
import { AuthActionTypes, setAuthUserLikedPost } from "../../redux/auth/action";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
const SERVER_STATE = CURRENT_STATE;

interface Post {
  pk: number;
}

interface PostReactionsProps {
  post: Post;
  navigation: any; // Adjust the type according to your actual navigation type
  setLikesCount: (count: number) => void;
  likesCount: number;
}

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: "https://img.icons8.com/ios/50/000000/facebook-like--v1.png",
    likedImageUrl: "https://img.icons8.com/ios-filled/50/facebook-like.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/ios/50/comments--v1.png",
  },
  {
    name: "Share",
    imageUrl: "https://img.icons8.com/ios/50/right2.png",
  },
  {
    name: "Save",
    imageUrl: "https://img.icons8.com/ios/50/add-bookmark.png",
  },
];

const PostReactions: React.FC<PostReactionsProps> = ({ post, navigation, setLikesCount, likesCount }) => {
  const { likedPost, user } = useSelector((state: any) => state.authReducer);
  const [like, setLike] = useState<number | string>("");
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AuthActionTypes>>();

  useEffect(() => {
    if (likedPost.indexOf(post.pk) >= 0) {
      setLike(1);
    } else {
      setLike(0);
    }
  }, [likedPost, post.pk]);

  const HandleLike = (post: Post) => {
    like === 0 ? setLikesCount(likesCount + 1) : setLikesCount(likesCount - 1);

    if (like === 0) {
      const temp = likedPost.slice();
      temp.push(post.pk);
      dispatch(setAuthUserLikedPost(temp));
    } else {
      const temp = likedPost.slice();
      const index = temp.indexOf(post.pk);
      temp.splice(index, 1);
      dispatch(setAuthUserLikedPost(temp));
    }
    setLike(like === 0 ? 1 : 0);

    try {
      const baseUrl = API[SERVER_STATE] + API.USER.postLike;
      const response = axios.post(baseUrl, {
        username: user.user_id,
        token: user.token,
        post: { post_id: post.pk },
      });
      console.log(`hit url: ${baseUrl} response received: ${response}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.leftFooterIconsContainer}>
        <Icon imageStyle={styles.footerIcon} onPress={() => HandleLike(post)} imgUrl={postFooterIcons[0].imageUrl} />
        <Icon
          imageStyle={styles.footerIcon}
          onPress={() => navigation.push("CommentScreen", { postDetails: post })}
          imgUrl={postFooterIcons[1].imageUrl}
        />
        <Icon imageStyle={styles.footerIcon} onPress={() => console.log("-------share-------")} imgUrl={postFooterIcons[2].imageUrl} />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Icon imageStyle={styles.footerIcon} onPress={() => console.log("-------save-------")} imgUrl={postFooterIcons[3].imageUrl} />
      </View>
    </View>
  );
};

const Icon: React.FC<{ imageStyle: any; imgUrl: string; onPress: () => void }> = ({ imageStyle, imgUrl, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={imageStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

export default PostReactions;

const styles = StyleSheet.create({
  footerIcon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
