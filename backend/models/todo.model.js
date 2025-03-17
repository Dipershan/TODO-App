const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        completed: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    todos: [todoItemSchema] 
},{timestamps: true});

module.exports = mongoose.model("Todo", todoSchema);
