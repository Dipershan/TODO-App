const router =  require("express").Router();

const {getTodos , addTodo ,  updateTodo , deleteTodo} = require("../controllers/todo.controller");

router.get('/todos', getTodos);
router.post('/todos', addTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports =  router;
