const jwt = require('jsonwebtoken');
const {Token} = require("../schemas/schemas");


class TokenService {
    async generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    async saveToken(userID, refreshToken) {
        const tokenData = await Token.findOne({user: userID});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Token.create({user: userID, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            return userData;
        } catch (e) {
            return nulll
        }
    }

    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
            return userData;
        } catch (e) {
            return nulll
        }
    }
}

module.exports = new TokenService();