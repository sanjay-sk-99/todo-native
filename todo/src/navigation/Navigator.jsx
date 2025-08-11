import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
//importing screens
import Login from "../../src/screens/Login";
import Home from "../../src/tabs/Home";
import ForgetPass from "../../src/screens/ForgetPass";
import Profile from "../../src/tabs/Profile";
import Joke from "../../src/tabs/Joke";
import Action from "../../src/screens/Action";
import EditScreen from "../../src/screens/EditScreen";
//import images
import home from "../../assets/home.png";
import profile from "../../assets/profile.png";
import joke from "../../assets/joke.webp";
//import redux connectivity and state
import { useDispatch, useSelector } from "react-redux";
import { loadToken } from "../slices/features/authSlice";
import Search from "../screens/Search";

//for bottom tab navigation
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image source={home} style={{ height: 30, width: 30 }} />
          ),
          tabBarActiveTintColor: "#DA70D6",
        }}
      />
      <Tab.Screen
        name="Joke"
        component={Joke}
        options={{
          title: "Entertainment",
          tabBarIcon: () => (
            <Image source={joke} style={{ height: 30, width: 30 }} />
          ),
          tabBarActiveTintColor: "#DA70D6",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image source={profile} style={{ height: 30, width: 30 }} />
          ),
          tabBarActiveTintColor: "#DA70D6",
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  //token and loading state from redux
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  //check the user login info
  useEffect(() => {
    dispatch(loadToken());
  }, []);

  // Loader screen
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#DA70D6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen
              name="ForgetPass"
              component={ForgetPass}
              options={{
                title: "Forget Password",
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeTab"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen name="Action" component={Action} />
            <Stack.Screen name="Edit" component={EditScreen} />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
