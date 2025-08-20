import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/features/authSlice";
import todoReducer from '../slices/features/todoSlice'
import themeReducer from "../slices/features/themeSlice"
 const store = configureStore({
  reducer: {
    auth: authReducer,
    todo:todoReducer,
    theme:themeReducer
  },
});

export default store;