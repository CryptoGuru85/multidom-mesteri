import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import ProfileDetails from "./components/profile/ProfileDetails";
import Home from "./pages/Home";
import { loadUser } from "./redux/actions/auth";
import store from "./redux/store";
import ThemeProvider from "./theme";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [store]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Header>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile/:id" component={ProfileDetails} />
            </Switch>
          </Header>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
