import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GradientLayout from "../GradientLayout";

const Search = ({ navigation }) => {
  const [text, setText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const { allTask } = useSelector((state) => state.todo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if text is empty need to set filterTodos is []
    if (!text.trim()) {
      setFilteredTodos([]);
      return;
    }
    //show loading state when searching happens
    setLoading(true);

    //timer for debounce
    const timer = setTimeout(() => {
      const result = allTask.filter((task) =>
        task.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTodos(result);
      setLoading(false);
    }, 5000);

    //clear timout when component unmount so the new timer will set each time
    return () => clearTimeout(timer);
  }, [text, allTask]);

  return (
    <GradientLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/*Custom Header */}
            <View style={styles.customHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="caretleft" size={30} color="orange" />
              </TouchableOpacity>
              <Text
                style={{ fontSize: 19, fontWeight: "bold", marginLeft: 15 }}
              >
                Search Todo
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter The Todo"
                value={text}
                onChangeText={(text) => setText(text)}
              />
              {text.length > 0 && (
                <TouchableOpacity
                  onPress={() => setText("")}
                  style={styles.clearIcon}
                >
                  <Ionicons name="close-circle" size={24} color="gray" />
                </TouchableOpacity>
              )}
            </View>

            {/* Search Results */}
            {text.length === 0 ? (
              <View style={styles.centeredView}>
                <Text style={styles.infoText}>Enter the todo text</Text>
              </View>
            ) : loading ? (
              <View style={styles.centeredView}>
                <Text style={styles.infoText}>Searching....</Text>
              </View>
            ) : filteredTodos.length > 0 ? (
              <ScrollView style={{ marginHorizontal: 10 }}>
                {filteredTodos.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.todoItem}
                    onPress={() => navigation.navigate("Action")}
                  >
                    <Text style={styles.todoText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.centeredView}>
                <Text style={styles.infoText}>No Data Found</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GradientLayout>
  );
};

export default Search;

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "gray",
    paddingBottom: 10,
    marginTop: 40,
    marginBottom: 10,
    paddingLeft: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todoItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 8,
  },
  todoText: {
    fontSize: 18,
  },
  noDataText: {
    fontSize: 20,
    color: "gray",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});
