import { createContext, useState } from "react";

export const todoContext = createContext();

const TodoContext = ({ children }) => {
  const [task, setTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  return (
    <todoContext.Provider
      value={{ task, setTask, allTask, setAllTask, editIndex, setEditIndex }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default TodoContext;
