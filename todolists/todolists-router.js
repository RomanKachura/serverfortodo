const express = require('express');
const {getTodoForUser, addTodoForUser, deleteTodoForUser, updateTitleTodoForuser, updateTitleTodoForUser} = require("./todolists-repository");
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', async (req, res) => {
    const tl = await getTodoForUser('6349797bc488b6b87c1fab5f');
    res.send(tl);
});

router.post('/', async (req, res) => {
    const tl = await addTodoForUser('6349797bc488b6b87c1fab5f', req.body.title);
    console.log(tl)
    try {
        res.send({message: 'Success'});
    } catch (e) {
        res.send({message: e});
        console.error(e);
        throw e;
    }
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const uid = '6349797bc488b6b87c1fab5f';
    const delTl = await deleteTodoForUser(uid, id);
    try {
        res.send({message: 'Success!'});
    } catch (e) {
        res.send({message: 'Error!'});
        console.error(e);
        throw e;
    }
});
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const t = await updateTitleTodoForUser('6349797bc488b6b87c1fab5f', id, title);
    try {
        res.send({message: 'Success!'});
    } catch (e) {
        res.send({message: 'Error!'});
        console.error(e);
        throw e;
    }
})
module.exports = router;