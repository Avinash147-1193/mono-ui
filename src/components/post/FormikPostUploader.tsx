import React, { useState } from "react";
import { Text, View, TextInput, Image } from "react-native";
import { Divider } from "react-native-elements";
import * as Yup from "yup";
import { Formik } from "formik";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";
import axios from "axios";
import { API, CURRENT_STATE } from "../../constants/GlobalAPI";
import { useSelector } from "react-redux";
import ButtonLogin from "../buttons/buttonLogin";

const SERVER_STATE = CURRENT_STATE;

const PLACEHOLDER_IMG = "https://img.freepik.com/premium-vector/gallery-icon-picture-landscape-vector-sign-symbol_660702-224.jpg";

const uploadPostSchema = Yup.object().shape({
  postImages: Yup.string().url().required("A URL is required"),
  text: Yup.string().max(2200, "Caption has reached the character limit!"),
});

const FormikPostUploader = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.data);
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  // const [createdPost, setCreatedPost] = useState([]);

  return (
    <Formik
      initialValues={{ text: "", postImages: "" }}
      onSubmit={async (values) => {
        const createUserPost = async () => {
          try {
            const baseUrl = API[SERVER_STATE] + API.POST.newPost;
            const response = await axios.request({
              headers: {
                Authorization: `Bearer ${user}`,
              },
              method: "POST",
              url: baseUrl,
              data: {
                caption: values.text,
                media: {
                  images: [{ imgUrl: values.postImages, isActive: true }],
                  videos: [
                    {
                      url: "https: //www.pngfind.com/pngs/m/39-398349_computer-icons-user-profile-facebook-instagram-instagram-profile.png",
                      tagged_location: "google.maps/locations/city=blr&place=vanshee",
                    },
                  ],
                },
              },
            });
            console.log(baseUrl, response.data);
            // if (response.data) {
            //   setCreatedPost(response.data);
            // }
          } catch (error) {
            console.log(error);
          }
        };

        const fetchUserPosts = async () => {
          try {
            const baseUrl = API[SERVER_STATE] + API.USER.post;
            const response = await axios.request({
              headers: {
                Authorization: `Bearer ${user}`,
              },
              method: "GET",
              url: baseUrl,
            });
            console.log(baseUrl, response.data);
          } catch (error) {
            console.log(error);
          }
        };

        await createUserPost();
        await fetchUserPosts();
        navigation.pop();
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <>
          <View
            style={{
              margin: 30,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }} style={{ width: 100, height: 100 }} />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{
                  color: GlobalColors[GlobalMode].primary.white,
                  fontSize: 20,
                }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("text")}
                onBlur={handleBlur("text")}
                value={values.text}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{
              color: GlobalColors[GlobalMode].primary.white,
              fontSize: 18,
            }}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange("postImages")}
          />
          {errors.text && <Text style={{ fontSize: 10, color: "red" }}>{errors.text}</Text>}
          {errors.postImages && <Text style={{ fontSize: 10, color: "red" }}>{errors.postImages}</Text>}
          <ButtonLogin
            onPress={handleSubmit}
            titleStyle={{ color: GlobalColors[GlobalMode].text.grayText }}
            buttonStyle={{
              backgroundColor: GlobalColors[GlobalMode].primary.white,
            }}
            title="share"
          />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
