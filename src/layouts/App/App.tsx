import React from "react";
import { Provider } from "react-redux";

// components
import { ListCard } from "../../components";

// store
import store from "../../redux/store";

// styles
import styles from "./App.module.css";

const App = () => (
  <Provider store={store}>
    <div className={styles.container}>
      <ListCard />
    </div>
  </Provider>
);

export default App;
