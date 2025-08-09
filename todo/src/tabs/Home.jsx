import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import redux conectivity and state
import { addTask, setTask, setEditIndex } from "../slices/features/todoSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Home({ navigation }) {
  const [todoError, setTodoError] = useState("");
  //get the state and dispatch function from redux store
  const { task, allTask } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  //handle adding the new task and edit existing task
  const handleTask = () => {
    if (task) {
      dispatch(addTask(task));
      dispatch(setTask(""));
      setTodoError("");
    } else {
      setTodoError("Please Enter the Todo");
    }
  };

  //maped for flatlist
  const mapedTask = allTask.map((task, i) => ({
    task: task,
    index: i,
    key: i.toString(),
  }));

  //render function for flatlist
  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskcontainer}>
        <TouchableOpacity
          style={styles.tasklist}
          onPress={() => {
            dispatch(setEditIndex(item.index));
            navigation.navigate("Action");
          }}
        >
          <Text style={styles.taskitem}>{item.task}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sanjay's Todo </Text>
      <Text style={styles.title}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="enter the todo"
        value={task}
        onChangeText={(text) => dispatch(setTask(text))}
      />
      {todoError && <Text style={styles.error}>{todoError}</Text>}
      <TouchableOpacity style={styles.addbtn} onPress={handleTask}>
        <Text style={styles.addbtntext}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={mapedTask}
        renderItem={renderItem}
        keyExtractor={(i) => i.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 40,
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DA70D6",
    marginBottom: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
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
  taskcontainer: {
    marginTop: 5,
  },
  tasklist: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 310,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  taskitem: {
    fontSize: 18,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
