import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const TodoApp = () => {
  const [categories, setCategories] = useState([]);
  const [inputCat, setInputCat] = useState("");

  const addCategory = () => {
    if (!inputCat) return;
    setCategories([...categories, { id: Date.now(), title: inputCat, todos: [] }]);
    setInputCat("");
  };

  const addTodo = (categoryId, todoText) => {
    if (!todoText) return;
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, todos: [...category.todos, { id: Date.now(), text: todoText, completed: false }] }
        : category
    ));
  };

  const toggleComplete = (categoryId, todoId) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? {
            ...category,
            todos: category.todos.map(todo =>
              todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
          }
        : category
    ));
  };

  const deleteTodo = (categoryId, todoId) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, todos: category.todos.filter(todo => todo.id !== todoId) }
        : category
    ));
  };

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  return (
<div
  className="d-flex justify-content-center align-items-center bg-secondary text-white"
  style={{ minHeight: "100vh", width: "100vw", padding: "20px", boxSizing: "border-box" }}
>
  <div className="text-center">
    <h5>To-Do Notes</h5>

    <div className="mb-3">
      <input
        type="text"
        value={inputCat}
        placeholder="Add Ur ToDo Notes"
        onChange={(e) => setInputCat(e.target.value)}
      />
      <button onClick={addCategory}>Add</button>
    </div>

    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {categories.map((category) => (
        <div key={category.id} className="p-3 shadow-lg"
          style={{
            background: "linear-gradient(black, rgb(19, 5, 5))",
            borderRadius: "12px",
            minWidth: "300px",
          }}
        >
          <h6>{category.title}</h6>

          <input
            type="text"
            placeholder="Add Todo"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo(category.id, e.target.value);
            }}
          />
          <button onClick={() => deleteCategory(category.id)} style={{ marginBottom: "10px" }}>
            ❌ 
          </button>

          <ul>
            {category.todos.map((todo) => (
              <li key={todo.id}>
                <span
                  onClick={() => toggleComplete(category.id, todo.id)}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(category.id, todo.id)} style={{ marginLeft: "10px" }}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</div>

  
  );
};

export default TodoApp;
