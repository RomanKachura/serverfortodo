const express = require('express');
const router = express.Router();
const todolistsController = require('./todolistsController')
const authMiddleWares = require('../middlewares/auth-middlewares');

router.use((req, res, next) => {
    next();
});

router.get(`/:todolists`, authMiddleWares, todolistsController.getTodoLists);
router.post('/:todolists', authMiddleWares, todolistsController.addTodoList);
router.delete('/:todolists/:id', authMiddleWares, todolistsController.removeTodoList);
router.put('/:todolists/:id', authMiddleWares, todolistsController.updateTitleTodoList);

module.exports = router;