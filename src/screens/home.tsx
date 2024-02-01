import React, { useLayoutEffect, useRef, useState } from "react";
import { View, SafeAreaView, StyleSheet, Animated, Platform, Dimensions, ScrollView } from "react-native";
import Header from "../components/home/Header";
import { GlobalColors, GlobalMode } from "../constants/GlobalColors";
import BottomTabs, { bottomTabIcon } from "../components/home/BottomTabs";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import SkeletonLoader from "../components/loaders/Post/SkeletonLoader";
import { Platforms } from "../constants/Common";
import { RootState } from "../redux/store";
import { fetchUserPosts, fetchUserProfile } from "../helper/auth/auth";
import Post from "../components/home/Post";

const HEADER_HEIGHT = 50;
const marginTop = Platform.OS === Platforms.ANDROID ? 19 : 0;

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const token = useSelector((state: RootState) => state.data);
  const userPosts = useSelector((state: RootState) => state.post);
  const [videoInView] = useState(false);
  const dispatch = useDispatch();
  const scrollY = new Animated.Value(0);
  const headerOpacity = new Animated.Value(1);
  const headerContainerRef = useRef(null);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserProfile(dispatch, token);
        await fetchUserPosts(dispatch, token);
        //await fetchUserLikedPosts(dispatch, token);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        //setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, token]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const screenHeight = Dimensions.get("window").height;

    if (scrollPosition > 0 && scrollPosition < screenHeight) {
      //setVideoInView(true);
    } else {
      //setVideoInView(false);
    }
  };

  if (!userPosts) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.skeletonContainer}>
          <SkeletonLoader />
          <SkeletonLoader />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        ref={headerContainerRef}
        style={[
          styles.headerContainer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_HEIGHT],
                  outputRange: [0, -HEADER_HEIGHT],
                  extrapolate: "clamp",
                }),
              },
            ],
            opacity: headerOpacity,
          },
        ]}
      >
        <Header navigation={navigation} />
        <Divider width={1} orientation="vertical" />
      </Animated.View>
      <View style={styles.postContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} onScroll={handleScroll} scrollEventThrottle={16}>
          {userPosts.map((post, index) => (
            <View key={index}>
              <Post post={post} navigation={navigation} videoInView={videoInView} />
            </View>
          ))}
        </ScrollView>
      </View>
      <BottomTabs icons={bottomTabIcon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors[GlobalMode].primary.black,
    flex: 1,
  },
  postContainer: {
    backgroundColor: GlobalColors[GlobalMode].primary.white,
    marginTop: marginTop,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: GlobalColors[GlobalMode].primary.black,
    height: HEADER_HEIGHT,
    paddingTop: 0,
  },
  scrollViewContent: {
    paddingTop: HEADER_HEIGHT,
  },
  skeletonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
