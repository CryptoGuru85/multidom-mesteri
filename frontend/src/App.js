import React, { useEffect } from "react";
// import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/auth";
import Header2 from "./components/Header2";
import ProfileDetails from "./components/profile/ProfileDetails";
import Registration from "./components/registration/Registration";
import Home from "./pages/Home";
import store from "./store";
import ThemeProvider from "./theme";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [store]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Header2>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile/:id" component={ProfileDetails} />
            </Switch>
          </Header2>
          <Registration />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

// render(<App />, document.getElementById("app"));
