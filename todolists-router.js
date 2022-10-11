const {getTodoLists, addTodoList, deleteTodoList, updateTodoList, getOneTodoList} = require('./repository');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', async (req, res) => {
    let todolists = await getTodoLists();
    console.log(todolists)
    res.send(todolists);
});

router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    let todolist = await getOneTodoList(id);
    res.send(todolist);
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