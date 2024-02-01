import { SafeAreaView } from "react-native";
import React from "react";
import AddNewPost from ".././components/post/newPost";
import { GlobalColors, GlobalMode } from "../constants/GlobalColors";

const NewPostScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={{ backgroundColor: GlobalColors[GlobalMode].primary.black, flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewPostScreen;

//const styles = StyleSheet.create({});
