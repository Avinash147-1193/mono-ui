import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, UIManager, Platform, LayoutAnimation } from "react-native";
import PostHeader from "../post/header";
import PostImage from "../post/postMedia";
import PostReactions from "../post/postReactions";
import { Divider } from "react-native-elements";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";
import { Platforms } from "../../constants/Common";

if (Platform.OS === Platforms.ANDROID) {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface Post {
  _id: string;
  caption: string;
}

interface PostProps {
  post?: Post;
  navigation?: any;
  setLikesCount?: (count: number) => void;
  likesCount?: number;
}

const Post = (post: { [key: string]: any }, { navigation }: { navigation: any }) => {
  const [likesCount, setLikesCount] = useState(post.post?.likes?.length || 0);
  const commentsCount = post.post?.comments?.length || 0;
  const sharesCount = post.post?.shares || 0;
  // };
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader post={post.post} />
      <Caption post={post.post} />
      <PostImage post={post.post} />
      <View style={{ marginHorizontal: 15 }}>
        <PostReactions post={post.post} navigation={navigation} setLikesCount={setLikesCount} likesCount={likesCount} />
        <View style={{ flexDirection: "row" }}>
          <Likes likesCount={likesCount} />
          <CommentsCount commentsCount={commentsCount} />
          <Shares sharesCount={sharesCount} />
        </View>
        <CommentSection post={post.post} />
        <Comments post={post.post} />
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
        fontWeight: "500",
      }}
    >
      {likesCount.likesCount} likes
    </Text>
  </View>
);

const CommentsCount = (commentsCount: any) => (
  <View style={{ flexDirection: "row", marginTop: 4, marginLeft: 7 }}>
    <Text
      style={{
        color: GlobalColors[GlobalMode].text.postText,
        fontWeight: "500",
      }}
    >
      {commentsCount.commentsCount} comments
    </Text>
  </View>
);

const Shares = (sharesCount: any) => (
  <View style={{ flexDirection: "row", marginTop: 4, marginLeft: 7 }}>
    <Text
      style={{
        color: GlobalColors[GlobalMode].text.postText,
        fontWeight: "500",
      }}
    >
      {sharesCount.sharesCount} reFeeds
    </Text>
  </View>
);

const Caption: React.FC<PostProps> = ({ post }) => {
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [captionHeight, setCaptionHeight] = useState(50);

  const captionCollapsedLength = 30;

  useEffect(() => {
    animateHeight(showFullCaption ? post?.caption.length || 0 : captionCollapsedLength);
  }, [showFullCaption]);

  const toggleCaptionVisibility = () => {
    setShowFullCaption(!showFullCaption);
  };

  const animateHeight = (toValue: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCaptionHeight(toValue);
  };

  return (
    <View>
      <ScrollView>
        <Text style={{ color: GlobalColors[GlobalMode].text.postText, margin: 7, height: captionHeight }}>
          {showFullCaption ? post?.caption : `${post?.caption.slice(0, captionCollapsedLength)}... `}
          {!showFullCaption && post?.caption && post.caption.length > captionCollapsedLength && (
            <Text style={{ color: GlobalColors[GlobalMode].text.grayText }} onPress={toggleCaptionVisibility}>
              See more
            </Text>
          )}
          {showFullCaption && (
            <Text style={{ color: GlobalColors[GlobalMode].text.grayText }} onPress={toggleCaptionVisibility}>
              See less
            </Text>
          )}
        </Text>
      </ScrollView>
    </View>
  );
};

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

const Comments = (post: any) => (
  <View style={{ flexDirection: "row", marginTop: 5 }}>
    {post.comments && post.comments.length > 0 && (
      <Text style={{ color: GlobalColors[GlobalMode].text.postText }}>
        <Text style={{ fontWeight: "600" }}>{post.comments[0]?.name}</Text>
        <Text>{post.comments[0]?.text}</Text>
      </Text>
    )}
  </View>
);

export default Post;

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
});
