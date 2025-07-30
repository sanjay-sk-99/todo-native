import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/features/authSlice";
import todoReducer from '../slices/features/todoSlice'
 const store = configureStore({
  reducer: {
    auth: authReducer,
    todo:todoReducer,
  },
});

export default store;