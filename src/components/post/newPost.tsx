import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { GlobalColors, GlobalMode } from "../../constants/GlobalColors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as ImagePicker from "expo-image-picker";
import { UserDisplay } from "./postUserImage";

const AddNewPost = ({ navigation }: { navigation: any }) => {
  const profile = useSelector((state: RootState) => state.profile);

  // State for the caption input
  const [caption, setCaption] = useState("");

  // State for image preview
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  // State for video preview (placeholder image)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // State for document preview
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const uploadProgress = 0;

  const canUploadDocument = selectedImages.length === 0 && !selectedVideo && !selectedDocument;

  const handleDone = () => {
    // Perform API call with user-uploaded data for post creation
    // For example:
    console.log("Caption:", caption);
    console.log("Images:", selectedImages);
    console.log("Video:", selectedVideo);
    console.log("Document:", selectedDocument);
    // Make your API call here

    // Reset states after API call
    setCaption("");
    setSelectedImages([]);
    setSelectedVideo(null);
    setSelectedDocument(null);
  };

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (result.canceled) {
        console.log("Image picker cancelled");
      } else if (selectedImages.length < 5) {
        const updatedImages = [...selectedImages, result.assets[0].uri];
        setSelectedImages(updatedImages);
      }
    } catch (error) {
      console.error("Error in image upload:", error);
    }
  };

  const handleVideoUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (result.canceled) {
        console.log("Video picker cancelled");
      } else if (!selectedVideo) {
        setSelectedVideo(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error in video upload:", error);
    }
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (result.canceled) {
        console.log("Document picker cancelled");
      } else if (!selectedDocument) {
        setSelectedDocument(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error in document upload:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Header navigation={navigation} profile={profile} />

          {/* Caption Input */}
          <View style={styles.captionContainer}>
            <TextInput
              style={styles.captionInput}
              placeholder="Start typing..."
              multiline
              numberOfLines={4}
              value={caption}
              onChangeText={(text) => setCaption(text)}
            />
          </View>

          {/* Empty Preview Area */}
          <View style={styles.emptyPreviewArea}>
            {/* Document or Image Preview */}
            {selectedDocument || selectedImages.length > 0 ? (
              <View style={styles.previewContainer}>
                {selectedDocument ? (
                  <View style={styles.previewImageContainer}>
                    <Image source={{ uri: selectedDocument }} style={styles.previewImage} />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDocument(null)}>
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  selectedImages.map((imageUri, index) => (
                    <View key={index} style={styles.previewImageContainer}>
                      <Image source={{ uri: imageUri }} style={styles.previewImage} />
                      <TouchableOpacity style={styles.closeButton} onPress={() => handleRemoveImage(index)}>
                        <Text style={styles.closeButtonText}>X</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}

                {/* Progress Bar for Document or Image Upload */}
                {uploadProgress > 0 && (
                  <View style={styles.progressBarContainer}>{/* <ProgressBar progress={uploadProgress} color="#3498db" /> */}</View>
                )}
              </View>
            ) : null}

            {/* Video Preview */}
            {selectedVideo && (
              <View style={styles.previewContainer}>
                <View style={styles.previewImageContainer}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.freepik.com/512/3708/3708519.png",
                    }}
                    style={styles.previewImage}
                  />
                  <TouchableOpacity style={styles.closeButton} onPress={handleRemoveVideo}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Buttons for Image, Video, and Document Upload */}
          <View style={styles.uploadButtonsContainer}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
              <Text style={styles.buttonText}>Upload Images</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadButton} onPress={handleVideoUpload}>
              <Text style={styles.buttonText}>Upload Video</Text>
            </TouchableOpacity>

            {canUploadDocument && (
              <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
                <Text style={styles.buttonText}>Upload Document</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={handleDone} disabled={!caption.trim() && !selectedImages.length}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Header = ({ navigation, profile }: { navigation: any; profile: any }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={require("../../../assets/back.png")} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <UserDisplay profile={profile} />
    </View>
    <Text style={styles.headerText}>Share your curiosity with your buddies..</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: GlobalColors[GlobalMode].primary.white,
    fontWeight: "300",
    fontSize: 15,
  },
  captionContainer: {
    marginTop: 10,
  },
  captionInput: {
    backgroundColor: "transparent",
    padding: 10,
    fontSize: 17,
    height: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: GlobalColors[GlobalMode].primary.gray,
  },
  emptyPreviewArea: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  previewImageContainer: {
    position: "relative",
    margin: 10,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  progressBarContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: GlobalColors[GlobalMode].elements.loginButton,
    padding: 0,
    borderRadius: 50,
    height: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  doneButton: {
    backgroundColor: GlobalColors[GlobalMode].elements.loginButton,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: GlobalColors[GlobalMode].primary.white,
    textAlign: "center",
    fontWeight: "500",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: GlobalColors[GlobalMode].primary.realBlack,
    borderRadius: 8,
    padding: 5,
  },
  closeButtonText: {
    color: GlobalColors[GlobalMode].primary.white,
    fontWeight: "700",
  },
});

export default AddNewPost;
