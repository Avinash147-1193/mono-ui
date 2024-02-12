import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";

interface PostImageProps {
  post: {
    media: {
      images: { imgUrl: string }[];
      videos: { videoUrl: string }[];
    };
  };
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const PostImage: React.FC<PostImageProps> = ({ post }) => {
  const postMedia = post?.media || {};
  const postImages = postMedia.images || [];
  const postVideos = postMedia.videos || [];
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item }: { item: { imgUrl?: string; videoUrl?: string }; index: number }) => {
    if (item.imgUrl) {
      return (
        <View style={styles.container}>
          <Image source={{ uri: item.imgUrl }} style={styles.image} />
        </View>
      );
    } else if (item.videoUrl) {
      return (
        <View style={styles.container}>
          {/* <Video source={{ uri: "https://static.videezy.com/system/resources/previews/000/000/168/original/Record.mp4" }} style={styles.video} resizeMode="cover" /> */}
        </View>
      );
    }
    return null;
  };

  const paginationDots = () => {
    return (
      <Pagination
        dotsLength={postImages.length + postVideos.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
      />
    );
  };

  return (
    <View style={styles.carouselContainer}>
      {postMedia && postImages.length + postVideos.length > 0 && (
        <Carousel
          data={[...postImages, ...postVideos]}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onBeforeSnapToItem={(index) => setActiveSlide(index)}
        />
      )}
      {paginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 10,
  },
  container: {
    width: screenWidth * 0.5, // Adjust the fraction based on your preference
    height: screenHeight * 0.5, // Adjust the fraction based on your preference
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  video: {
    flex: 1,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: GlobalColors[GlobalMode].primary.black,
  },
  inactiveDotStyle: {},
});

export default PostImage;
