import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Home";
import ProfileDetail from "./components/profile/ProfileDetail";
import NotFound from "./pages/NotFound";
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/profile">
              <Route path=":id" element={<ProfileDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
