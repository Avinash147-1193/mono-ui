import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Video } from "expo-av";

interface PostImageProps {
  post: {
    media: {
      images: [key: { imgUrl: string }];
      videos: [string: { videoUrl: string }];
    };
  };
  scrollViewRef?: string;
}

const PostImage: React.FC<PostImageProps> = ({ post }) => {
  const [videoInView] = useState<boolean>(false);
  const postImages =
    post?.media?.images[0]?.imgUrl ||
    "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1707004800&semt=sph";

  if (postImages.endsWith(".mp4")) {
    return (
      <View style={styles.container}>
        <Video source={{ uri: postImages }} style={styles.video} useNativeControls shouldPlay={videoInView} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image source={{ uri: postImages }} style={styles.image} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 450,
  },
  video: {
    height: "100%",
    resizeMode: "cover",
  },
  image: {
    height: "100%",
    resizeMode: "cover",
  },
});

export default PostImage;
