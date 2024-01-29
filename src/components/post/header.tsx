import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";

// interface Post {
//   fields: {
//     profile_picture?: string;
//     username?: string;
//   };
// }

interface PostHeaderProps {
  post: any;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  // Check if the required properties are present in the post object
  if (
    !post
    // !post. ||
    // !post.fields.profile_picture ||
    // !post.fields.username
  ) {
    return null; // Render nothing if the required properties are not available
  }

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
        <Image source={{ uri: post.user.profile.display.profilePictures[0].imgUrl }} style={styles.story} />
        <Text
          style={{
            color: GlobalColors[GlobalMode].text.postText,
            marginLeft: 5,
            fontWeight: "700",
          }}
        >
          `${post.user.firstName}${post.user.lastName}`
        </Text>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            color: GlobalColors[GlobalMode].text.postText,
            fontWeight: "900",
          }}
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
