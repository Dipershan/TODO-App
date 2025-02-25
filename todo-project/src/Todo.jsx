import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div 
    className="d-flex align-items-center justify-content-center bg-secondary text-white"
      style={{ height: "100vh", width: "100vw" }} >

    <div  className="p-4 shadow-lg"
          style={{
           width: "350px",
           minHeight: "400px",
           background: "linear-gradient(black,rgb(19, 5, 5))",
           borderRadius: "12px"}}>

             <h5 className="text-center">To-Do List</h5>
      <input
        type="text"
        value={input}
        style={{ marginRight: "10px" }}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleComplete(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
           
            <button onClick={() => deleteTodo(todo.id)}  style={{ marginLeft: "10px" }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TodoApp;

