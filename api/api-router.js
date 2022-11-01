const express = require('express');
const router = express.Router();
const controller = require('./apiController');
const {check} = require('express-validator');
const authMiddleWares = require('../middlewares/auth-middlewares');

router.post('/login', controller.login);
router.post('/registration', [
        check('email', 'Email is empty!').notEmpty(),
        check('password', 'Password must have from 4 to 10 symbols!').isLength({min: 4, max: 10})
    ],
    controller.registration
);
router.delete('/logout', controller.logout);
router.get('/activate/:link', controller.activate);
router.get('/refresh', controller.refresh);
router.get('/users', authMiddleWares, controller.getUsers);

module.exports = router;