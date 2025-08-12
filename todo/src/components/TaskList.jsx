import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TaskList = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.todoItem} onPress={onPress}>
      <Text style={styles.todoText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  todoText: {
    fontSize: 18,
  },
});

export default TaskList;
