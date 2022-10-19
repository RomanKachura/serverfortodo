const {User} = require("../schemas/schemas");
const bcrypt = require('bcryptjs');
const {mongoose} = require("mongoose");
const {validationResult} = require('express-validator');

class authController {
    async registration(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Errors of registration', errors});
        }
        try {
            const {email, password, userName} = req.body;
            const candidate = await User.findOne({email});
            const salt = bcrypt.genSaltSync(7);
            const hash = bcrypt.hashSync(password, salt);
            const todolists = new mongoose.Types.ObjectId();

            if (candidate) {
                return res.status(400).json({message: 'User with such email is already registered!'})
            }
            const user = await new User({email, password: hash, userName, todolists});

            await user.save();
            return res.json({message: 'User successfully registered!'});
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async login(req, res) {
        try {

        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getUsers(req, res) {
        try {
            res.send('Server works!');
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

module.exports = new authController();