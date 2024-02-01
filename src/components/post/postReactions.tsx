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
        <Icon
          imageStyle={styles.footerIcon}
          onPress={() => HandleLike(post, setLikesCount, setLike, like, token, likesCount)}
          imgUrl={like == 1 ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl}
        />
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

const Icon: React.FC<{
  imageStyle: any;
  imgUrl: string | undefined;
  onPress: () => void;
}> = ({ imageStyle, imgUrl, onPress }) => (
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
