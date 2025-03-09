import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const API_BASE_URL = "http://localhost:7000/api";

const TodoApp = () => {
  const [categories, setCategories] = useState([]);
  const [inputCat, setInputCat] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/todos`);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!inputCat) return;
    try {
      const { data } = await axios.post(`${API_BASE_URL}/category`, { title: inputCat });
      setCategories([...categories, data]);
      setInputCat("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const addTodo = async (categoryId, todoText) => {
    if (!todoText) return;
    try {
      const { data } = await axios.post(`${API_BASE_URL}/todos`, { categoryId, text: todoText });
      setCategories(categories.map(category => category._id === data._id ? data : category));
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleComplete = async (categoryId, todoId) => {
    try {
      const { data } = await axios.put(`${API_BASE_URL}/todos/${categoryId}/toggle/${todoId}`, { categoryId });
      setCategories(categories.map(category =>
        category._id === data._id ? data : category
      ));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (categoryId, todoId) => {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/todos/${todoId}`, {
        data: { categoryId, todoId }
      });
      setCategories(categories.map(category =>
        category._id === data._id ? data : category
      ));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${API_BASE_URL}/category/${categoryId}`);
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
            placeholder="Add Category"
            onChange={(e) => setInputCat(e.target.value)}
          />
          <button onClick={addCategory}>Add</button>
        </div>

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {categories.map((category) => (
            <div key={category._id} className="p-3 shadow-lg"
              style={{
                background: "linear-gradient(black, rgb(19, 5, 5))",
                borderRadius: "12px",
                minWidth: "300px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                {editCategoryId === category._id ? (
                  <input
                    type="text"
                    value={category.title}
                    onChange={(e) => {
                      const updatedTitle = e.target.value;
                      setCategories(categories.map(cat =>
                        cat._id === category._id ? { ...cat, title: updatedTitle } : cat
                      ));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditCategoryId(null);
                    }}
                  />
                ) : (
                  <h6>{category.title}</h6>
                )}
                <div>
                  <button onClick={() => setEditCategoryId(category._id)}>✏️</button>
                  <button onClick={() => deleteCategory(category._id)}>❌</button>
                </div>
              </div>

              <input
                type="text"
                placeholder="Add Todo"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo(category._id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <ul>
                {category.todos.map((todo) => (
                  <li key={todo._id} className="d-flex align-items-center gap-2">
                    {editTodoId === todo._id ? (
                      <input
                        type="text"
                        value={todo.text}
                        onChange={(e) => {
                          const newText = e.target.value;
                          setCategories(categories.map(cat =>
                            cat._id === category._id
                              ? {
                                  ...cat,
                                  todos: cat.todos.map(t =>
                                    t._id === todo._id ? { ...t, text: newText } : t
                                  )
                                }
                              : cat
                          ));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditTodoId(null);
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => toggleComplete(category._id, todo._id)}
                        style={{
                          textDecoration: todo.completed ? "line-through" : "none",
                          color: todo.completed ? "red" : "white",
                          cursor: "pointer",
                        }}
                      >
                        {todo.text}
                      </span>
                    )}
                    <button onClick={() => setEditTodoId(todo._id)}>✏️</button>
                    <button onClick={() => deleteTodo(category._id, todo._id)}>❌</button>
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
