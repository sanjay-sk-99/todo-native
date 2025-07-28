import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CommonActions } from "@react-navigation/native";
import profile from "../../assets/profile.png";
import { AuthContext } from "../context/AuthContext";

const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);

  const { logOut } = useContext(AuthContext);

  // Handle external link
  const handleExternelLink = (url) => {
    Linking.openURL(url);
  };

  // Open camera to take photo
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  //choose photo from gallery
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.loginbtn} onPress={()=>logOut()}>
          <Text style={styles.btntext}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={profile} style={{ height: 100, width: 100 }} />
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Text style={styles.imageButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={pickImageFromGallery}
            >
              <Text style={styles.imageButtonText}>Choose Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.infoText}>Name : Sanjay Kumar</Text>
          <Text style={styles.infoText}>Gmail : sanjay@gmail.com</Text>
          <Text style={styles.infoText}>Phone No : 1234567890</Text>

          <View style={styles.linkContainer}>
            <Text style={styles.infoText}>GitHub profile : </Text>
            <TouchableOpacity
              onPress={() =>
                handleExternelLink("https://github.com/sanjay-sk-99")
              }
            >
              <Text style={styles.link}>Click Here</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkContainer}>
            <Text style={styles.infoText}>LinkedIn profile : </Text>
            <TouchableOpacity
              onPress={() =>
                handleExternelLink(
                  "https://www.linkedin.com/in/99-sanjay-kumar/"
                )
              }
            >
              <Text style={styles.link}>Click Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 10,
  },
  btncontainer: {
    alignItems: "flex-end",
  },
  loginbtn: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "red",
    borderRadius: 5,
    padding: 8,
    width: 100,
  },
  btntext: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  profileImageContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  linkContainer: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginTop: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfo: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
