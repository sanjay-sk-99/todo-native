import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import ForgetPass from "./src/screens/ForgetPass"
export default function App() {
  const Stack = createNativeStackNavigator()
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name="Login"
      component={Login}
     // options={{ headerShown: false }}
      />
       <Stack.Screen
      name="Home"
      component={Home}
      />
        <Stack.Screen
      name="ForgetPass"
      component={ForgetPass}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>

  </NavigationContainer>;
}
