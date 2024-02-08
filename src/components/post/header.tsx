import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Share } from "react-native";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";

interface Post {
  user: {
    profile: {
      display: {
        profilePictures: [string: any];
      };
    };
    firstName: string;
    lastName: string;
  };
}

interface PostHeaderProps {
  post: Post;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  if (!post) {
    return null;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Mono-post share",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.user?.profile?.display.profilePictures[0].imgUrl || "" }} style={styles.story} />
        <Text
          style={{
            color: GlobalColors[GlobalMode].text.postText,
            marginLeft: 5,
            fontWeight: "700",
          }}
        >
          {post?.user?.firstName || ""} {post?.user?.lastName || ""}
        </Text>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            color: GlobalColors[GlobalMode].text.postText,
            fontWeight: "900",
          }}
          onPress={onShare}
        >
          ...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: GlobalColors[GlobalMode].elements.storyBorderColor,
  },
});

export default PostHeader;
