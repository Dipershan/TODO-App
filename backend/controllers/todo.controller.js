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


const addCategory =  async(req,res)=>{
    try {
        const {title} =  req.body;
        const newCategory =  new Todo({title , todos: []});
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        res.status(500).send({message: "Error Creating Todo"})
        console.log(error)
    }
};
const addTodo = async(req, res) =>{
    try {
        // throw new Error
        const {categoryId , text} = req.body;
        const category = await Todo.findById(categoryId);
        if(!category)return res.send({message: "Category not found"});

        category.todos.push({text});
        await category.save();        
        res.json(category);
    } catch (error) {
        res.send({message: "Error Adding Todo"})
        console.log(error)        
    }
}

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