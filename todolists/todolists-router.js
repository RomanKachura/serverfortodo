const express = require('express');
const router = express.Router();
const todolistsController = require('./todolistsController')
const authMiddleWares = require('../middlewares/auth-middlewares');

router.use((req, res, next) => {
    next();
});

router.get('/', authMiddleWares, todolistsController.getTodoLists);
router.post('/', authMiddleWares, todolistsController.addTodoList);
router.delete('/:id', authMiddleWares, todolistsController.removeTodoList);
router.put('/:id', authMiddleWares, todolistsController.updateTitleTodoList);

module.exports = router;