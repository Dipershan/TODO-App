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

const addTodo = async(req, res) =>{
    try {
        const newTodo  = new Todo(req.body);
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.send({message: "Error Creating Todo"})
        console.log(error)        
    }
}
const updateTodo  = async (req, res) =>{
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id ,  req.body, {new: true});
        if(!updatedTodo) return res.send({message: "Todo not found"});
        res.json(updatedTodo);
    } catch (error) {
        console.log(error)
    }
}

const deleteTodo =  async(req,res)=>{
    try {
        const deletedTodo =  await Todo.findByIdAndDelete(req.params.id);
        if(!deleteTodo) return res.send({message: "Error Deleting Todo"});
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.send({messgae: "Error deleting todo"});
    }
}

module.exports = {getTodos , addTodo ,  updateTodo , deleteTodo}