const {validationResult} = require('express-validator');
const userService = require('../service/user-service');
const ApiErrors = require('../exeption/api-error');

const isValidate = (email) => {
    const reg = /^[\w]+[\.\-\_]{0,}[\w]+@[\w]+\.[\w]{2,4}/.test(email);
    return reg;
}

class apiController {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiErrors.BadRequest('Errors of registration', errors.array()));
        }
        try {
            const {email, password, userName} = req.body;

            if (!isValidate(email)) {
                throw ApiErrors.BadRequest('Email is not correct!', errors);
            }

            const userData = await userService.registration(email, password, userName);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        try {
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const userData = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
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
            const {refreshToken} = req.cookies.refreshToken;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userService.getAll();
            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new apiController();