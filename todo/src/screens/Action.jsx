import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Action = ({ route }) => {
  const { taskname } = route.params;
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Actions</Text>

      <View style={styles.taskcontainer}>
        <View>
          <Text style={styles.text}>{taskname}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
            <Text style={styles.editbtn}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.deletebtn}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  taskcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    height:60,
    width:300,
    paddingHorizontal:10,
    borderRadius:8,
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  editbtn: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 15,
  },
  deletebtn: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DA70D6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
