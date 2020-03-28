const jwt = require('./tokens');
module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader != null) {
        const partsofToken = authHeader.split(' ');
        if (partsofToken !== 1) {
            const [bearer, token] = partsofToken;
            if (bearer == 'Bearer') {
                const tokenResponse = await jwt.verifyToken(token);
                if (tokenResponse != null) {
                    req.userId = tokenResponse.id;
                    next();
                }
            } else {
                return res.status(401).send({ error: "  Token invalido na requisição", status: false })
            }
        } else {
            return res.status(401).send({ error: "  Token invalido sem partes", status: false })
        }
    } else {
        return res.status(401).send({ error: "Nenhum token na requisição", status: false })
    }
}
