const {User, TodoListsForUser} = require("../schemas/schemas");
const bcrypt = require('bcryptjs');
const {mongoose} = require("mongoose");
const {validationResult} = require('express-validator');
const uuid = require("uuid");
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiErrors = require('../exeption/api-error');

class UserService {
    async registration(email, password, userName) {
        try {
            const candidate = await User.findOne({email});
            const hash = await bcrypt.hashSync(password, 7);
            const random = uuid.v4();
            const activationLink = `${process.env.API_URL}/auth/activate/${random}`;
            const todolists = new mongoose.Types.ObjectId();

            if (candidate) {
                throw ApiErrors.BadRequest('User with such email is already registered!');
            }

            const user = await User.create({email, password: hash, userName, todolists, activationLink});
            await mailService.sendActivationLink(email, activationLink);
            const userDto = await new UserDto(user);
            const payload = {...userDto};
            const tokens = await tokenService.generateToken(payload);
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            const tl = await new TodoListsForUser({_id: todolists, todolists: []});
            await tl.save();
            return {...tokens, user: userDto};
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink});
        if (!user) {
            throw ApiErrors.BadRequest('Activation link is not correct!');
        }

        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();