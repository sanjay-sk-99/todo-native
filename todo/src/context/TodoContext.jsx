import { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoContext = ({ children }) => {
  const [task, setTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  return (
    <TodoContext.Provider
      value={{ task, setTask, allTask, setAllTask, editIndex, setEditIndex }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
