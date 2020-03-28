const Chat = require('../models/Chat');
module.exports = {
    async createChat(req, res) {
        if (req.body != null) {
            const chatResponse = await Chat.create(req.body);
            if (chatResponse != null) {
                chatResponse.password = undefined;
                return res.status(200).send({ data: chatResponse, message: 'Registrado com sucesso', status: true })
            } else {
                return res.status(401).send({ error: 'Falha no registro dos dados', status: false })
            }
        } else {
            return res.status(400).send({ error: 'Falha no registro por falta de dados', status: false })
        }
    },
    async updateChat(req, res) {
        const _id = req.user_Id;
        const chatResponse = await Chat.findOneAndUpdate(_id, req.body);
        if (chatResponse != null) {
            return res.status(200).send({ data: chatResponse, message: 'Atualizado  com sucesso', status: true })
        } else {
            return res.status(400).send({ error: 'Falha na atualização por falta de token', status: false })
        }
    },
    async deleteChat(req, res) {
        const _id = req.user_Id;
        const chatResponse = await Chat.findOneAndDelete(_id);
        if (chatResponse != null) {
            return res.status(200).send({ data: chatResponse, message: 'Atualizado  com sucesso', status: true })
        } else {
            return res.status(400).send({ error: 'Falha na atualização por falta de token', status: false })
        }
    },
}