import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const Login = ({ navigation }) => {
  const { logIn } = useContext(AuthContext);
  //state for setting username,password and error
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  //fixed credential for validation
  const user = "sanjay";
  const pass = "sanjay@123";

  //login function and validate user credential
  const handleLogin = () => {
    if (user != username) {
      setUserError("Enter valid Username");
    } else if (pass != password) {
      setUserError("");
      setPassError("Enter valid Password");
    } else {
      Alert.alert("Login Successfully");
      setUserName("");
      setPassword("");
      setPassError("");
      //storing login token in useContext
      logIn("1234");
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
        {/* this section contain full data for login form */}

        <View style={styles.imgcontainer}>
          <Image
            source={require("../../assets/login-img.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Login</Text>

          <TextInput
            placeholder="User Name"
            value={username}
            onChangeText={setUserName}
            style={styles.txtinput}
          />

          <Text style={styles.error}>{userError}</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.txtinput}
            secureTextEntry
          />
          <TouchableOpacity
            style={{ alignItems: "flex-end", marginTop: 8 }}
            onPress={() => navigation.navigate("ForgetPass")}
          >
            <Text style={{ color: "cornflowerblue" }}>Forget Password ?</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{passError}</Text>
          <TouchableOpacity style={styles.loginbtn} onPress={handleLogin}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

//stylesheet for login component
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    paddingVertical: 90,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DA70D6",
    marginBottom: 10,
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  imgcontainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  txtinput: {
    borderColor: "cornflowerblue",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 300,
    fontSize: 20,
  },
  loginbtn: {
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
    alignItems: "center",
  },
});

export default Login;
