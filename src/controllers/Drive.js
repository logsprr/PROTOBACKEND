const Drive = require('../models/Drive');
const jwt = require('../services/tokens');
module.exports = {
    async createDrive(req, res) {
        if (req.body != null) {
            const driveResponse = await Drive.create(req.body);
            if (driveResponse != null) {
                driveResponse.password = undefined;
                return res.status(200).send({ data: driveResponse, message: 'Registrado com sucesso', status: true, token: await jwt.generateToken(userResponse._id) })
            } else {
                return res.status(401).send({ error: 'Falha no registro dos dados', status: false })
            }
        } else {
            return res.status(400).send({ error: 'Falha no registro por falta de dados', status: false })
        }
    },
    async updateDrive(req, res) {
        const _id = req.driveId;
        const driveResponse = await Drive.findOneAndUpdate(_id, req.body);
        if (driveResponse != null) {
            return res.status(200).send({ data: driveResponse, message: 'Atualizado  com sucesso', status: true })
        } else {
            return res.status(400).send({ error: 'Falha na atualização por falta de token', status: false })
        }
    },
}