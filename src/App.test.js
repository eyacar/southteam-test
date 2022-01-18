import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./store/store";
import AppBar from "./components/features/AppBar/AppBar";
import WelcomePage from "./components/features/WelcomePage/WelcomePage";
import UsersCards from "./components/features/users/UsersCards";

test("renders Continue button", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/results" element={<UsersCards />} />
        </Routes>
      </Router>
    </Provider>
  );

  expect(getByText(/Continue/i)).toBeInTheDocument();
});
