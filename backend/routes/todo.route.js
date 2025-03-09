const router =  require("express").Router();

const {getTodos , addTodo ,   
     addCategory,
      deleteTodo , deleteCategory 
      ,toggleTodo,      
    } = require("../controllers/todo.controller");

router.get('/todos', getTodos);
router.post('/category', addCategory);
router.post('/todos', addTodo);
router.put('/todos/:categoryId/toggle/:todoId', toggleTodo);
router.delete('/todos/:todoId', deleteTodo);
router.delete('/category/:categoryId', deleteCategory); 

module.exports =  router;
