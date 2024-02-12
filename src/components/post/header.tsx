import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Share } from "react-native";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";

interface Post {
  user: {
    profile: {
      display: {
        profilePictures: [string: any];
      };
      description: string;
      institutionName: string;
      institutionType: string;
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
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 5,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: post.user?.profile?.display.profilePictures[0].imgUrl || "",
            }}
            style={styles.story}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: GlobalColors[GlobalMode].primary.realBlack,
                marginLeft: 5,
                fontWeight: "700",
              }}
            >
              {post?.user?.firstName || ""} {post?.user?.lastName || ""}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={
                  post.user.profile.institutionType === "SCHOOL"
                    ? require("../../../assets/school-badge.png")
                    : require("../../../assets/college-badge.png")
                }
                style={styles.badge}
              />

              <Text
                style={{
                  marginLeft: 4,
                  color: GlobalColors[GlobalMode].primary.realBlack,
                }}
              >
                | {post.user.profile.institutionName}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 19,
              marginTop: -30,
              marginRight: 5,
              color: GlobalColors[GlobalMode].primary.realBlack,
            }}
            onPress={onShare}
          >
            ...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: GlobalColors[GlobalMode].elements.loginButton,
  },
  badge: {
    width: 22,
    height: 22,
    marginLeft: 3,
  },
});

export default PostHeader;
