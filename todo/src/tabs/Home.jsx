import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GradientLayout from "../layouts/GradientLayout";
//import redux conectivity and state
import { addTask, setTask, setEditIndex } from "../slices/features/todoSlice";
import { useSelector, useDispatch } from "react-redux";
//import reusable component
import TaskList from "../components/TaskList";

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

  //for tasklisk component
  const handlePress = (index) => {
    dispatch(setEditIndex(index));
    navigation.navigate("Action");
  };

  return (
    <GradientLayout>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Todo Creaters</Text>
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.text}>Enter Todo</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter The Todo"
            value={task}
            onChangeText={(text) => dispatch(setTask(text))}
          />
          {todoError && <Text style={styles.error}>{todoError}</Text>}

          <View style={styles.addBtnContainer}>
            <TouchableOpacity style={styles.addbtn} onPress={handleTask}>
              <Text style={styles.addbtntext}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tasklistContainer}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskHeaderTitle}>Added Tasks</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          </View>

          {allTask.length === 0 ? (
          <View style={styles.noTaskContainer}>
            <Text style={styles.noTaskText}>No Task Added</Text>
          </View>
        ) : (
          <FlatList
            data={mapedTask}
            renderItem={({ item }) => (
              <TaskList
                text={item.task}
                onPress={() => handlePress(item.index)}
              />
            )}
            keyExtractor={(i) => i.key}
            // ListEmptyComponent={
            //   <View style={styles.noTaskContainer}>
            //     <Text style={styles.noTaskText}>No Task Added</Text>
            //   </View>
            // }
          />
          )}
        </View>
      </View>
    </GradientLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    marginBottom: 8,
  },
  // inputcontainer: {
  //   borderColor: "black",
  //   borderWidth: 2,
  // },
  tasklistContainer: {
    flex: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 8,
    textAlign: "center",
    color: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DA70D6",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    fontSize: 18,
  },
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
  addBtnContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  addbtn: {
    backgroundColor: "#DA70D6",
    padding: 8,
    borderRadius: 5,
    width: 120,
  },
  addbtntext: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  taskHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchIcon: {
    fontSize: 20,
  },
  noTaskContainer: {
     flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTaskText: {
    fontSize: 18,
    color: "#999",
  },
  taskcontainer: {
    marginTop: 5,
  },
});
