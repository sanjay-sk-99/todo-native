import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import GradientLayout from "../GradientLayout";

const Joke = () => {
    //to check the screen is focused or not
  const isFocused = useIsFocused();

  //refetch on screen focus
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  
  // Queries
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["joke"],
    queryFn: fetchJoke,
  });

  async function fetchJoke() {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Any/safe-mode?type=single"
    );
    if (!res.ok) throw new Error("Network response Not Ok");
    return res.json();
  }

  return (
    <GradientLayout>
    <View style={styles.container}>
      <Text style={styles.heading}>
        If You Sad ? Read below{" "}
        <FontAwesome5 name="hand-point-down" size={20} color="red" />
      </Text>
      <View style={styles.jokeContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#DA70D6" />
        ) : (
          <>
            <Text style={styles.jokeHeading}>
              {" "}
              Category : <Text style={styles.jokeapi}>
                {data?.category}
              </Text>{" "}
            </Text>
            <Text style={styles.jokeHeading}>
              {" "}
              Joke : <Text style={styles.jokeapi}>{data?.joke}</Text>
            </Text>
          </>
        )}
      </View>
      {error && <Text>{error.message}</Text>}
    </View>
    </GradientLayout>
  );
};

export default Joke;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#5E936C",
  },
  jokeContainer: {
    width: 300,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  jokeHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#17313E",
    paddingBottom: 10,
  },
  jokeapi: {
    fontSize: 16,
    fontWeight: "400",
    color: "#415E72",
  },
});
