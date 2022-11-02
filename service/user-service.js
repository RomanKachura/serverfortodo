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
            throw ApiErrors.BadRequest('Any error', e);
        }
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiErrors.BadRequest(`User with email ${email} is not found!`);
        }
        const validPassword = await bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            throw ApiErrors.BadRequest(`Email or password is not correct!`);
        }

        if (!user.isActivated) {
            throw ApiErrors.BadRequest(`You need to activate your account!`);
        }

        const userDto = await new UserDto(user);
        const tokens = await tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiErrors.UnauthorizedError();
        }

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiErrors.UnauthorizedError();
        }

        const user = User.findById(userData.id);
        const userDto = await new UserDto(user);
        const tokens = await tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink});
        if (!user) {
            throw ApiErrors.BadRequest('Activation link is not correct!');
        }

        user.isActivated = true;
        await user.save();
    }

    async getAll() {
        const users = await User.find();
        return users;
    }

    async getUser(refreshToken) {
        const user = await User.findOne({refreshToken});
        const userDto = await new UserDto(user);
        return {...userDto};
    }
}

module.exports = new UserService();