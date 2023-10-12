import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");

  const [todos, setTodos] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      };

      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updateTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodo);
  };

  const enterEditMode = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  };

  const updateTodo = () => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todos, text: editValue };
      }
      return todo;
    });
    setTodos(updateTodos);
    setEditMode(false);
    setEditId(null);
    setEditMode("");
  };

  return (
    <div className="todo-container">
      <h2>ToDo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {editMode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={updateTodo}>Update</button>
        </div>
      ) : (
        <button onClick={addTodo}>Add</button>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <div>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => enterEditMode(todo.id, todo.text)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
