const {User} = require("../schemas/schemas");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const userService = require('../service/user-service');
const ApiErrors = require('../exeption/api-error');

const isValidate = (email) => {
    const reg = /^[\w]+[\.\-\_]{0,}[\w]+@[\w]+\.[\w]{2,4}/.test(email);
    return reg;
}

class authController {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiErrors.BadRequest('Errors of registration',errors);
        }
        try {
            const {email, password, userName} = req.body;

            if (!isValidate(email)) {
                throw ApiErrors.BadRequest('Email is not correct!',errors);
            }

            const userData = await userService.registration(email, password, userName);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: `User with email ${email} is not found!`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({message: `Email or password is not correct!`});
            }
            const token = generateAccessToken(user._id, user.userName);
            return res.json({token});

        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        console.log('Activate!')
        try {
            const activationLink = `${process.env.API_URL}/auth/activate/${req.params.link}`;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res) {
        try {
            res.send('Server works!');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new authController();