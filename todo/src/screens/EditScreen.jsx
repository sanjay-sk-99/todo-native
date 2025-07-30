import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import {useState } from "react";
import { CommonActions } from "@react-navigation/native";
//import redux conectivity and state
import { updateTask } from "../slices/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";


const EditScreen = ({ navigation }) => {
  //get the state and dispatch function from redux store
  const { editIndex, allTask } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  //store the task name for editing
  const taskname = allTask[editIndex];
  const [task, setTask] = useState(taskname);

  const handleUpdateTask = () => {
    if(!task.trim()){
      return Alert.alert("please Enter Todo")
    }
    dispatch(updateTask({ index: editIndex, value: task }));

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeTab" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.addbtn} onPress={handleUpdateTask}>
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
