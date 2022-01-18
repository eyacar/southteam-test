import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async (amount) => {
  const response = await fetch(`https://randomuser.me/api/?results=${amount}`);
  const users = await response.json();

  const data = users.results.reduce(
    (accumulator, { gender, name, email, phone, picture, cell, location }) => [
      ...accumulator,
      {
        gender,
        name: `${name.first} ${name.last}`,
        email,
        phone,
        picture,
        cell,
        location: `${location.city}, ${location.state} - ${location.country}`
      },
    ],
    []
  );

  return data;
});

const extraReducers = (builder) => {
  builder
    .addCase(getUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};

export default extraReducers;
