import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";
import extraReducers from "./asyncActions";

const initialState = {
  userAmount: null,
  data: null,
  filterData: null,
  loading: null,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers,
  extraReducers,
});

export const { addAmount, filterByGender } = usersSlice.actions;

export const usersSelector = (state) => state.users.data;

export default usersSlice.reducer;
