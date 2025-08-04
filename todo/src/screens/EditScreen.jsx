import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useContext, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { todoContext } from "../context/TodoContext";

const EditScreen = ({ navigation }) => {
  //access state from context api
  const { allTask,setAllTask, editIndex } = useContext(todoContext);

  //store the task name for editing
  const taskname = allTask[editIndex];
  const [newTask, setNewTask] = useState(taskname);

  const updateTask = () => {
   setAllTask(prev =>
      prev.map((task, i) => (i === editIndex ? newTask : task))
    );
    navigation.popToTop()
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
      />
      <TouchableOpacity style={styles.addbtn} onPress={updateTask}>
        <Text style={styles.addbtntext}>Update Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  addbtn: {
    backgroundColor: "#DA70D6",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  addbtntext: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
  },
});
