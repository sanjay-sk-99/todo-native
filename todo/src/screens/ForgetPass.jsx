import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const ForgetPass = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  //reset function
  const handleReset = () => {
    if (!email) {
      setEmailError("Fill Your Email/Gmail");
    }
  };

  return (
    // for overlapping the keyboard when we press input
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* it will enable scrolling */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        {/* this section contain full data for reset form */}
        <View>
          <View style={styles.imgcontainer}>
            <Image
              source={require("../../assets/login-img.jpg")}
              style={styles.img}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Reset password</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.txtinput}
            />
            <Text style={styles.error}>{emailError}</Text>
            <TouchableOpacity style={styles.btn} onPress={handleReset}>
              <Text style={styles.btntext}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

//stylesheet for reset form
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DA70D6",
    marginBottom: 10,
  },
  img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  imgcontainer: {
    alignItems: "center",
    marginTop: 40,
  },
  txtinput: {
    borderColor: "cornflowerblue",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 300,
    fontSize: 20,
  },
  btn: {
    borderWidth: 2,
    borderColor: "cornflowerblue",
    backgroundColor: "cornflowerblue",
    borderRadius: 5,
    padding: 8,
    width: 300,
  },
  btntext: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  error: {
    margin: 5,
    color: "red",
  },
  textContainer: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ForgetPass;
