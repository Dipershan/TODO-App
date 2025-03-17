const Todo  =  require("../models/todo.model");

const getTodos  =  async (req, res)=>{
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.send({message: "Error getting Todo"})
        console.log(error);
    }
};

const addCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const newCategory = new Todo({ title, todos: [], createdAt: new Date() });
        await newCategory.save();

        const categories = await Todo.find().sort({ createdAt: -1 });

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error Creating Todo" });
    }
};


const addTodo = async (req, res) => {
    try {
        const { categoryId, text } = req.body;
        const category = await Todo.findById(categoryId);

        if (!category) return res.status(404).json({ message: "Category not found" });

        const isDuplicate = category.todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
        if (isDuplicate) {
            return res.status(400).json({ message: "Todo already exists" });
        }

        category.todos.push({ text, createdAt: new Date() });

        category.todos.sort((a, b) => b.createdAt - a.createdAt);

        await category.save();
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error Adding Todo" });
    }
};


const toggleTodo = async (req,res)=>{
    try {
        const {categoryId , todoId} =   req.params;
        const category = await Todo.findById(categoryId);
        if(!category)return res.send({message: "Category not found"});

        const todo = category.todos.id(todoId);
        if(!todo) return res.send({messaga: "Todo not found"});

        todo.completed = !todo.completed;
        await category.save();
        res.json(category);

    } catch (error) {
        res.send({message: "Error toggling Todo"})
        console.log(error) 
    }
}

const deleteTodo =  async(req,res)=>{
    try {
     const {categoryId , todoId} =  req.body;
     const category =  await Todo.findById(categoryId);
     if(!category) return res.send({message: "Catgory not found"});

     category.todos.pull(todoId);
     await category.save();
     res.json(category);
    } catch (error) {
        res.send({messgae: "Error deleting todo"});
    }
}

const deleteCategory =async (req,res)=>{
    try {
        const {categoryId} =  req.body;
        const category = await Todo.findById(categoryId);
        console.log(category);
        const deletedCategory = await Todo.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted" });
    } catch (error) {
        res.send({messgae: "Error deleting category"});
    }
}

module.exports = {getTodos ,addCategory, addTodo ,toggleTodo,
     deleteTodo ,deleteCategory}