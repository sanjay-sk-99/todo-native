import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
//importing screens
import Login from "./src/screens/Login";
import Home from "./src/tabs/Home";
import ForgetPass from "./src/screens/ForgetPass";
import Profile from "./src/tabs/Profile";
import Action from "./src/screens/Action";
import EditScreen from "./src/screens/EditScreen";
//import images
import home from "./assets/home.png";
import profile from "./assets/profile.png";
//import context 
import TodoContext from "./src/context/TodoContext";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <TodoContext>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgetPass"
            component={ForgetPass}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTab"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="Action"
            component={Action}
          />
          <Stack.Screen
          name="Edit"
          component={EditScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoContext>
  );
}

//for bottom tab navigation
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: "false",
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
          headerShown: "false",
          tabBarIcon: () => (
            <Image source={profile} style={{ height: 30, width: 30 }} />
          ),
          tabBarActiveTintColor: "#DA70D6",
        }}
      />
    </Tab.Navigator>
  );
};
