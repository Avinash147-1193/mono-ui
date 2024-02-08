import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import Constants from "expo-constants";
import PostHeader from "../post/header";
import PostImage from "../post/postMedia";
import PostReactions from "../post/postReactions";
import { Divider } from "react-native-elements";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";
import { POSTS } from "../.../../../../data/Posts";

const Post = (post: { [key: string]: any }, { navigation }: { navigation: any }) => {
  // const [videoInView, setVideoInView] = useState(false);
  const [likesCount, setLikesCount] = useState(post.post?.likes?.length || 0);
  // const handleScroll = (event: any) => {
  //   const scrollPosition = event.nativeEvent.contentOffset.y;
  //   const screenHeight = Dimensions.get("window").height - Constants.statusBarHeight;
  //   const isVideoInView = scrollPosition > 0 && scrollPosition < screenHeight;
  //   setVideoInView(isVideoInView || videoInView);
  // };
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader post={post.post} />
      <PostImage post={post.post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostReactions post={post.post} navigation={navigation} setLikesCount={setLikesCount} likesCount={likesCount} />
        <Likes likesCount={likesCount} />
        <Caption post={post.post} />
        <CommentSection post={post.post} />
        <Comments />
        <Divider width={1} orientation="vertical" style={styles.divider} />
      </View>
    </View>
  );
};

const Likes = (likesCount: any) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text
      style={{
        color: GlobalColors[GlobalMode].text.postText,
        fontWeight: "600",
      }}
    >
      {likesCount.likesCount} likes
    </Text>
  </View>
);

const Caption = (post: any) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: GlobalColors[GlobalMode].text.postText }}>
      <Text>{POSTS[0].user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = (post: any) => (
  <View style={{ marginTop: 5 }}>
    {post.comments && !!post.comments.length && (
      <Text style={{ color: GlobalColors[GlobalMode].text.postText }}>
        {post.comments.length > 1 ? " all" : ""} {post.post.comments.length}
        {post.comments.length > 1 ? " comments" : " comment"}
      </Text>
    )}
  </View>
);

const Comments = () => (
  <View style={{ flexDirection: "row", marginTop: 5 }}>
    <Text style={{ color: GlobalColors[GlobalMode].text.postText }}>
      <Text style={{ fontWeight: "600" }}>{POSTS[0].comments[0].user}</Text>
      <Text>{POSTS[0].comments[0].comment}</Text>
    </Text>
  </View>
);

export default Post;

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
