import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import profile from "../../assets/profile.png";
//import redux conectivity and state
import { logOut } from "../slices/features/authSlice";
import { useDispatch } from "react-redux";
//for form handling
import { Formik } from "formik";
import * as Yup from "yup";
import GradientLayout from "../GradientLayout";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [modelVisible, setModelVisible] = useState(false);

  //for triiger reducer function
  const dispatch = useDispatch();

  // Handle external link
  const handleExternalLink = (url) => {
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

  //for logout
  const handleLogout = () => {
    dispatch(logOut());
    setModelVisible(false);
  };

  // created schema for validation
  const profileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
  });

  return (
    <>
      {/* open model for delete confirmation */}
      <Modal
        transparent
        visible={modelVisible}
        animationType="fade"
        onRequestClose={() => setModelVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Are you sure?</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => setModelVisible(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* for overlapping the keyboard when we press input */}
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 70}
      >
        {/* it will enable scrolling */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <GradientLayout>
            <View style={styles.container}>
              <View style={styles.btncontainer}>
                <TouchableOpacity
                  style={styles.logoutbtn}
                  onPress={() => setModelVisible(true)}
                >
                  <Text style={styles.btntext}>Logout</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <View style={styles.profileImageContainer}>
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Image
                      source={profile}
                      style={{ height: 100, width: 100 }}
                    />
                  )}
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.imageButton}
                      onPress={takePhoto}
                    >
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
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                  }}
                  validationSchema={profileSchema}
                  onSubmit={(values) => {
                    Alert.alert(
                      "Profile Updated",
                      JSON.stringify(values, null, 2)
                    );
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <View style={styles.userInfo}>
                      <Text style={styles.infoText}>Name :</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={values.name}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                      {touched.name && errors.name && (
                        <Text style={styles.error}>{errors.name}</Text>
                      )}

                      <Text style={styles.infoText}>Gmail : </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        keyboardType="email-address"
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}

                      <Text style={styles.infoText}>Phone No :</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={values.phone}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        keyboardType="phone-pad"
                      />
                      {touched.phone && errors.phone && (
                        <Text style={styles.error}>{errors.phone}</Text>
                      )}

                      <View style={styles.linkContainer}>
                        <Text style={styles.infoText}>GitHub profile : </Text>
                        <TouchableOpacity
                          onPress={() =>
                            handleExternalLink(
                              "https://github.com/sanjay-sk-99"
                            )
                          }
                        >
                          <Text style={styles.link}>Click Here</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.linkContainer}>
                        <Text style={styles.infoText}>LinkedIn profile : </Text>
                        <TouchableOpacity
                          onPress={() =>
                            handleExternalLink(
                              "https://www.linkedin.com/in/99-sanjay-kumar/"
                            )
                          }
                        >
                          <Text style={styles.link}>Click Here</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        style={styles.updateBtn}
                        onPress={handleSubmit}
                      >
                        <Text style={styles.updateText}>Update Profile</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          </GradientLayout>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btncontainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  logoutbtn: {
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
    borderWidth:1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: "black",
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
    borderRadius: 10,
    padding: 20,
    shadowColor: "#fff",
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
  input: {
    borderColor: "#fff",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  updateBtn: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelBtn: {
    marginRight: 12,
  },
  cancelText: {
    color: "#555",
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: "#FF4D4F",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
