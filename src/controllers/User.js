const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('../services/tokens');
const firebase = require('firebase');
const recovery = require('../services/nodemailer');
const nexmo = require('../services/nexmo');
module.exports = {
    async createUser(req, res) {
        if (req.body != null) {
            const userResponse = await User.create(req.body);
            if (userResponse != null) {
                userResponse.password = undefined;
                await firebase.database().ref('users/' + userResponse._id).set({ name: userResponse.name, avatar: userResponse.photoUrl, email: userResponse.email });
                return res.status(200).send({ data: userResponse, message: 'Registrado com sucesso', status: true, token: await jwt.generateToken(userResponse._id) })
            } else {
                return res.status(401).send({ error: 'Falha no registro dos dados', status: false })
            }
        } else {
            return res.status(400).send({ error: 'Falha no registro por falta de dados', status: false })
        }
    },
    async authenticateUser(req, res) {
        const { email, password } = req.body;
        if (req.body != null) {
            const userResponse = await User.findOne({ email }).select('+password');
            if (userResponse != null) {
                const newpassword = process.env.NODEBCRYPT + password;
                if (!await bcryptjs.compare(newpassword, userResponse.password)) {
                    return res.status(400).send({ error: 'Senha invalida', status: false })
                } else {
                    userResponse.password = undefined;

                    return res.status(200).send({ data: userResponse, message: 'Autenticado com sucesso', status: true, token: await jwt.generateToken(userResponse._id) })
                }
            } else {
                return res.status(400).send({ error: 'Falha na busca do usuário por falta de dados', status: false })
            }
        } else {
            return res.status(400).send({ error: 'Falha na busca por falta de dados', status: false })
        }
    },
    async listUsers(req, res) {
        const userResponse = await User.find();
        if (userResponse != null) {
            return res.status(200).send({ data: userResponse, message: 'Busca com sucesso', status: true })
        } else {
            return res.status(400).send({ error: 'Falha na busca por falta de token', status: false })
        }
    },
    async updateUser(req, res) {
        const _id = req.userId;
        console.log(req)
        const userResponse = await User.findOneAndUpdate(_id, req.body);
        if (userResponse != null) {
            return res.status(200).send({ data: userResponse, message: 'Atualizado  com sucesso', status: true })
        } else {
            return res.status(400).send({ error: 'Falha na atualização por falta de token', status: false })
        }
    },
    async deleteUser(req, res) {
        const _id = req.userId;
        const userResponse = await User.findOneAndDelete(_id);
        if (userResponse != null) {
            return res.status(200).send({ data: userResponse, message: 'Deletado com sucesso', status: true })
        } else {
            return res.status(400).send({ error: 'Falha no delete por falta de token', status: false })
        }
    },
    async sendCode(req, res) {
        const { email } = req.body;
        const code = Math.floor(100000 + Math.random() * 900000);
        const userResponse = await User.findOneAndUpdate(email, { code: code });
        const from = 'Waka Crm';
        const text = `Seu código de senha ${code}!`;
        nexmo.message.sendSms(from, userResponse.phone, text);
        return res.status(200).send({ message: 'Enviado com sucesso', status: true, email: userResponse.email })
    },
    async resetPassword(req, res) {
        const { email, password, code } = req.body;
        const newpassword = process.env.NODEBCRYPT + password;
        const hashpassword = await bcryptjs.hash(newpassword, 10);
        const userResponseCode = await User.findOne({ email });
        if (userResponseCode.code == code) {
            const userResponse = await User.findOneAndUpdate(email, { password: hashpassword });
            if (userResponse != null) {
                await recovery.resetPassword(email, userResponse.name);
                return res.status(200).send({ data: userResponse, message: 'Atualizado  com sucesso', status: true })
            } else {
                return res.status(400).send({ error: 'Falha na atualização por falta de token', status: false })
            }
        } else {
            return res.status(400).send({ error: 'Falha na atualização por falta de token', status: false })
        }
    }
}
