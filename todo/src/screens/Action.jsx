import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
//import redux conectivity and state
import { setAllTask } from "../slices/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Action = ({ navigation }) => {
  //get the state and dispatch function from redux store
  const { allTask, editIndex } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  //store the task name for deleting
  const taskname = allTask[editIndex];

  //handle delete function
  const handleDelete = (taskname) => {
    const filterTask = allTask.filter((task) => task != taskname);
    dispatch(setAllTask(filterTask));
    //after deleting navigate to home screen
    navigation.pop();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions</Text>

      <View style={[styles.taskcontainer]}>
        <View>
          <Text style={styles.text} numberOfLines={1}>
            {taskname}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit")}
            style={{ marginRight: 15 }}
          >
            <Feather name="edit" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(taskname)}>
            <AntDesign name="delete" size={24} color="red" />
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
    alignItems: "center",
    height: 60,
    width: 300,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
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
    maxWidth: 200, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
