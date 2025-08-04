import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, ActivityIndicator, View } from "react-native";
//importing screens
import Login from "../../src/screens/Login";
import Home from "../../src/tabs/Home";
import ForgetPass from "../../src/screens/ForgetPass";
import Profile from "../../src/tabs/Profile";
import Action from "../../src/screens/Action";
import EditScreen from "../../src/screens/EditScreen";
//import images
import home from "../../assets/home.png";
import profile from "../../assets/profile.png";
//import context
import { AuthContext } from "../context/AuthContext";
import { useContext,useEffect } from "react";
import * as SecureStore from "expo-secure-store";

 //for bottom tab navigation
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
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

  //token and loading state from context
  const { token, loading, setToken, setLoading } = useContext(AuthContext);

  //To check login state for initial rendering
  useEffect(() => {
    const checktoken = async () => {
      try {
        const stored = await SecureStore.getItemAsync("token");
        if (stored) {
          setToken(stored);
        }
      } catch (e) {
        console.log("Error fetching token", e);
      } finally {
        setLoading(false);
      }
    };
    checktoken();
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
              options={{ headerShown: false }}
            />

            <Stack.Screen name="Action" component={Action} />
            <Stack.Screen name="Edit" component={EditScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;


