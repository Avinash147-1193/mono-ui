import React, { useRef, useState, memo, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Animated, Platform, FlatList, ActivityIndicator } from "react-native";
import Header from "../components/home/Header";
import { GlobalColors, GlobalMode } from "../constants/GlobalColors";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import { Platforms } from "../constants/Common";
import { RootState } from "../redux/store";
import { fetchInfiniteUserPosts } from "../helper/auth/auth";
import Post from "../components/home/Post";
import SkeletonLoader from "../components/loaders/Post/SkeletonLoader";

const HEADER_HEIGHT = 50;
const marginTop = Platform.OS === Platforms.ANDROID ? 19 : 42;

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const token = useSelector((state: RootState) => state.data);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [videoInView] = useState(false);
  const dispatch = useDispatch();
  const scrollY = new Animated.Value(0);
  const headerOpacity = new Animated.Value(1);
  const headerContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [loading, setLoading] = useState(false);

  const fetchMoreData = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const nextPage = currentPage + 1;
      const newPosts = await fetchInfiniteUserPosts(dispatch, token, nextPage, pageSize, userPosts || []);
      if (newPosts.length > 0) {
        setCurrentPage(nextPage);
        setUserPosts([...userPosts, ...newPosts]);
        setLoading(false);
      } else {
        setCurrentPage(1);
      }
      //return newPosts;
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const newPosts = await fetchInfiniteUserPosts(dispatch, token, currentPage, pageSize, userPosts || []);
        setUserPosts(newPosts);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [token]);

  const renderFooter = () => {
    if (loading) {
      return null;
    }

    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color={GlobalColors[GlobalMode].primary.black} />;
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
        <FlatList
          onEndReached={fetchMoreData}
          onEndReachedThreshold={2.6}
          data={userPosts}
          ListFooterComponent={renderFooter}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Post post={item} navigation={navigation} videoInView={videoInView} />}
        />
      </View>
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
    flexDirection: "column-reverse",
  },
  skeletonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(HomeScreen);
