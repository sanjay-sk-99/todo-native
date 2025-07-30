import Navigator from "./src/navigation/Navigator";
//connecting redux sotre
import store from "./src/app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
