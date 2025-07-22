import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";
import React from "react";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btncontainer}>
        <TouchableOpacity
          style={styles.loginbtn}
          onPress={() =>
            //it will remove previous screen on the stack
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            )
          }
        >
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
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
});
