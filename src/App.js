import { Provider } from "react-redux";
import "./App.css";
import configureStore from "./redux/store";
import ThemedApp from "./theme";
import Home from "./views/home";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ThemedApp>
      <Home />
    </ThemedApp>
  </Provider>
);

export default App;
