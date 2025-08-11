import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = ({title,navi}) => {
  return (
    <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navi.goBack()}>
        <AntDesign name="caretleft" size={30} color="orange" />
      </TouchableOpacity>
      <Text style={{ fontSize: 19, fontWeight: "bold", marginLeft: 15 }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

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
});
