const express = require('express');
const {getTasksForUser, updateTaskForUser, deleteTaskForUser, addTaskForUser} = require("./tasks-repository");
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/:tid/tasks', async (req, res) => {
    let tID = req.params.tid;
    const uid = '6349797bc488b6b87c1fab5f';
    let tasks = await getTasksForUser(uid, tID);
    try {
        res.send(tasks);
    } catch (e) {
        res.send({message: 'Error!'});
        console.error(e);
        throw e;
    }
});

router.put('/:tid/tasks/:id', async (req, res) => {
    let id = req.params.id;
    let tID = req.params.tid;
    let task = req.body.task;
    let uid = '6349797bc488b6b87c1fab5f';
    await updateTaskForUser(uid, tID, id, task);
    try {
        res.send({message: 'Success!'});
    } catch (e) {
        res.send({message: 'Error!'});
        console.error(e);
        throw e;
    }
});

router.delete('/:tid/tasks/:id', async (req, res) => {
    let id = req.params.id;
    let tID = req.params.tid;
    let uid = '6349797bc488b6b87c1fab5f';
    await deleteTaskForUser(uid, tID, id);
    try {
        res.send({message: 'Success!'});
    } catch (e) {
        res.send({message: 'Error!'});
        console.error(e);
        throw e;
    }
});

router.post('/:id', async (req, res) => {
    let tID = req.params.id;
    let title = req.body.title;
    let uid = '6349797bc488b6b87c1fab5f';
    await addTaskForUser(uid, tID, title);
    try {
        return {message: 'Successfully'};
    } catch (e) {
        console.error(e);
        throw e;
    }
});

module.exports = router;