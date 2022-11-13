const express = require('express');
const {getUser, getTodoForUser} = require("./users-repository");
const router = express.Router();
let user = {
    todolists:'6349797bc488b6b87c1fab5f'
};

router.use((req, res, next) => {
    next();
});

router.get(`/:id`, async (req, res) => {
    const id = req.params.id;
    user = await getUser(id);
    if (user) {
        console.log(user)
        const tl = await getTodoForUser(user.todolists);
        console.log(tl)
        res.send(tl)
    } else {
        res.send(user);
    }
});

exports.user = user;
module.exports = router;