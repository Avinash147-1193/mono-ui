import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { HandleLike } from "../../helper/post/postAttibutes";

interface Post {
  _id: string;
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
    likedImageUrl: require("../../../assets/liked.png"),
    imageUrl: require("../../../assets/like.png"),
  },
  {
    name: "Comment",
    imageUrl: require("../../../assets/comments.png"),
  },
  {
    name: "Share",
    imageUrl: require("../../../assets/share.png"),
  },
  {
    name: "Send",
    imageUrl: require("../../../assets/send.png"),
  },
];

const PostReactions: React.FC<PostReactionsProps> = ({ post, navigation, setLikesCount, likesCount }) => {
  const likedPost = useSelector((state: any) => state.likedPost);
  const token = useSelector((state: any) => state.data);
  const [like, setLike] = useState<number | string>("");
  useEffect(() => {
    if (likedPost && likedPost.indexOf(post._id) >= 0) {
      setLike(1);
    } else {
      setLike(0);
    }
  }, [likedPost, post._id]);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity onPress={() => HandleLike(post, setLikesCount, setLike, like, token, likesCount)}>
          <Image style={styles.footerIcon} source={like == 1 ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("CommentScreen", { postDetails: post })}>
          <Image style={styles.footerIcon} source={postFooterIcons[1].imageUrl} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("====share")}>
          <Image style={styles.footerIcon} source={postFooterIcons[2].imageUrl} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => console.log("====send")}>
          <Image style={styles.footerIcon} source={postFooterIcons[3].imageUrl} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const Icon: React.FC<{
//   imageStyle: any;
//   imgUrl: string | undefined;
//   onPress: () => void;
// }> = ({ imageStyle, imgUrl, onPress }) => (
//   <TouchableOpacity onPress={onPress}>
//     <Image style={imageStyle} source={{ uri: imgUrl }} />
//   </TouchableOpacity>
// );

export default PostReactions;

const styles = StyleSheet.create({
  footerIcon: {
    width: 27,
    height: 27,
    marginTop: -9,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
