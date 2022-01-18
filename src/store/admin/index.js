import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";
import extraReducers from "./asyncActions";

const initialState = {
  name: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers,
  extraReducers,
});

export const { addName } = adminSlice.actions;

export default adminSlice.reducer;
