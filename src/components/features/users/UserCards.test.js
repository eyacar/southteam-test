import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../../../store/users/index";
import UsersCards from "./UsersCards";

const preloadedState = {
  users: {
    data: [],
    loading: true,
  },
};

describe("Tests AppBar", () => {
  test("Should render a loading", () => {
    const { getByText } = render(
      <Provider
        store={configureStore({
          reducer: { users: usersReducer },
          preloadedState,
        })}
      >
        <Router>
          <UsersCards />
        </Router>
      </Provider>
    );
    expect(getByText("loading")).toBeInTheDocument();
  });

  test("Should render an error", () => {
    const { getByText } = render(
      <Provider
        store={configureStore({
          reducer: { users: usersReducer },
          preloadedState: { users: { error: "Error" } },
        })}
      >
        <Router>
          <UsersCards />
        </Router>
      </Provider>
    );
    expect(getByText("There was an error: Error")).toBeInTheDocument();
  });
});
