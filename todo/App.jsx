import Navigator from "./src/navigation/Navigator";
//import context
import TodoContext from "./src/context/TodoContext";
import AuthProvider from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <TodoContext>
        <Navigator />
      </TodoContext>
    </AuthProvider>
  );
}
