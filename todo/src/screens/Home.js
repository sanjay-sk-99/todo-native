import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function Home() {
  const [task, setTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  //handle adding the new task and edit existing task
  const handleTask = () => {
    if (task) {
      if (editIndex !== null) {
        const updateTasks = [...allTask];
        updateTasks[editIndex] = task;
        setAllTask(updateTasks);
        setEditIndex(null);
      } else {
        setAllTask([...allTask, task]);
      }
      setTask("");
    }
  };

  //handle delete function
  const handleDelete = (index) => {
    const filterTask = allTask.filter((_, i) => i != index);
    setAllTask(filterTask);
    setTask("")
    setEditIndex(null)
  };

  //edit index function
  const handleEditIndex = (index) => {
    const edittask = allTask[index];
    setTask(edittask);
    setEditIndex(index);
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
      <View style={styles.tasklist}>
        <Text style={styles.taskitem}>{item.task}</Text>
        <View style={styles.taskbtn}>
          <TouchableOpacity onPress={() => handleEditIndex(item.index)}>
            <Text style={styles.editbtn}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.index)}>
            <Text style={styles.deletebtn}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //console.log(allTask);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sanjay's Todo </Text>
      <Text style={styles.title}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="enter the todo"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.addbtn} onPress={handleTask}>
        <Text style={styles.addbtntext}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </Text>
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
    padding: 40,
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
  tasklist: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },
  taskbtn: {
    flexDirection: "row",
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
  taskitem: {
    fontSize: 18,
  },
});
