const express = require('express');
const router = express.Router();
const controller = require('./authController');
const {check} = require('express-validator');

router.post('/registration', [
    check('email', 'Email is empty!').notEmpty(),
    check('password', 'Password must have from 4 to 10 symbols!').isLength({min:4,max:10})
],
controller.registration
)
;
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;