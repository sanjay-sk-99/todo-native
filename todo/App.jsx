import Navigator from "./src/navigation/Navigator";
//connecting redux sotre
import store from "./src/app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </QueryClientProvider>
  );
}
