import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../../../store/admin/index";
import AppBar from "./AppBar";

const preloadedState = { admin: { name: "Eze" } };

describe("Tests AppBar", () => {
  let renderer;
  let text;

  beforeEach(() => {
    renderer = render(
      <Provider
        store={configureStore({
          reducer: { admin: adminReducer },
          preloadedState,
        })}
      >
        <Router>
          <AppBar />
        </Router>
      </Provider>
    );
    const { getByText } = renderer;
    text = getByText;
  });

  test("Should render a wellcome to Eze", () => {
    expect(text(/Welcome Eze!/i)).toBeInTheDocument();
  });

  test("Should render the menu", () => {
    fireEvent.click(screen.getByTestId("MenuIcon"));
    expect(text(/Main Page/i)).toBeInTheDocument();
    expect(text(/Linkedin/i)).toBeInTheDocument();
  });
});
