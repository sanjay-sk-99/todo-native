import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: "",
  allTask: [],
  editIndex: null,
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTask(state, action) {
      state.task = action.payload;
    },
    setAllTask(state, action) {
      state.allTask = action.payload;
    },
    addTask(state, action) {
      state.allTask.push(action.payload);
    },
    setEditIndex(state, action) {
      state.editIndex = action.payload;
    },
    updateTask(state, action) {
      const {index,value}=action.payload
      state.allTask[index]=value
    },
  },
});

export const { setTask, setAllTask, addTask, setEditIndex, updateTask } =
  todoSlice.actions;

export default todoSlice.reducer;
