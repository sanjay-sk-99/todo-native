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
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import layout
import GradientLayout from "../layouts/GradientLayout";
//import reusable component
import Header from "../components/Header";
import TaskList from "../components/TaskList";

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
            <Header title={"Search Todo"} navi={navigation} />

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
                  <TaskList
                    key={index}
                    text={item}
                    onPress={() => navigation.navigate("Action")}
                  />
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
