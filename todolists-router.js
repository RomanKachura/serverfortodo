const {getTodoLists, addTodoList, deleteTodoList, updateTodoList} = require('./repository');
const express = require('express');
const app = express();
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ' + Date.now());
    next();
});

router.get('/', async (req, res) => {
    let todolists = await getTodoLists();
    res.send(todolists);
});

router.post('/', async (req, res) => {
    const title = req.body.title;
    const todolist = await addTodoList(title);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const todolist = await deleteTodoList(id);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const todolist = await updateTodoList(id, title);
});

module.exports = router;