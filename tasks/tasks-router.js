const express = require('express');
const router = express.Router();
const authMiddleWares = require('../middlewares/auth-middlewares');
const tasksController = require('./tasksController');

router.use((req, res, next) => {
    next();
});

router.get('/:tid/tasks', authMiddleWares, tasksController.getTasks);
router.post('/:todolists/:tid', authMiddleWares, tasksController.addTask);
router.put('/:todolists/:tid/tasks/:id', authMiddleWares, tasksController.updateTask);
router.delete('/:todolists/:tid/tasks/:id', authMiddleWares, tasksController.removeTask);

module.exports = router;