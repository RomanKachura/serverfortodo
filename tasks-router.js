const express = require('express');
const {getOneTask, getTasks, changeTask, deleteTask, addTask} = require("./repository");
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/:tid/tasks/:id', async (req, res) => {
    let id = req.params.id;
    let tID = req.params.tid;
    let task = await getOneTask(tID, id);
    res.send(task);
});

router.get('/:tid/tasks', async (req, res) => {
    let tID = req.params.tid;
    let tasks = await getTasks(tID);
    res.send(tasks);
});

router.put('/:tid/tasks/:id', async (req, res) => {
    let id = req.params.id;
    let tID = req.params.tid;
    let task = req.body.task;
    await changeTask(tID, id, task);
    try {
        return {message: 'Successfully'};
    } catch (e) {
        console.error(e);
        throw e;
    }
});

router.delete('/:tid/tasks/:id', async (req, res) => {
    let id = req.params.id;
    let tID = req.params.tid;
    await deleteTask(tID, id);
    return {message: 'Successfully'};
});

router.post('/:id', async (req, res) => {
    let tID = req.params.id;
    let task = req.body.task;
    await addTask(tID, task);
    try {
        return {message: 'Successfully'};
    } catch (e) {
        console.error(e);
        throw e;
    }
});

module.exports = router;