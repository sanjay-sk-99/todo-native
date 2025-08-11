import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
//import redux conectivity and state
import { updateTask } from "../slices/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import GradientLayout from "../GradientLayout";

const EditScreen = ({ navigation }) => {
  //get the state from redux store
  const { editIndex, allTask } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  //store the task name for editing
  const taskname = allTask[editIndex];
  const [newTask, setNewTask] = useState(taskname);

  const handleUpdateTask = () => {
    if (!newTask.trim()) {
      return Alert.alert("please Enter Todo");
    }
    dispatch(updateTask({ index: editIndex, value: newTask }));
    navigation.popToTop();
  };

  return (
    <GradientLayout>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          multiline
        />
        <TouchableOpacity style={styles.addbtn} onPress={handleUpdateTask}>
          <Text style={styles.addbtntext}>Update Task</Text>
        </TouchableOpacity>
      </View>
    </GradientLayout>
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
