import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/index";
import usersReducer from "./users/index";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    users: usersReducer,
  },
});
