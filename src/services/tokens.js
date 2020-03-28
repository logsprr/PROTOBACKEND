const jwt = require('jsonwebtoken');
module.exports = {
    async generateToken(params) {
        const token = await jwt.sign({ id: params }, process.env.NODEBCRYPT, {
            expiresIn: 86400
        })
        return token;
    },
    async verifyToken(params) {
        const token = await jwt.verify(params, process.env.NODEBCRYPT);
        return token;
    }
}