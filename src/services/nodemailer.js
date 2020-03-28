const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "wakanoreply@gmail.com",
        pass: "10313264"
    }
});

module.exports.resetPassword = async function (email, nome, language = 'sp') {
    const mailOptions = {
        from: 'wakanoreply@gmail.com',
        to: email,
        subject: 'Recuperação de Waka Crm',
        html: `
        <div style="background-color: #005BA7;color:white; border-radius:20px; padding:30px">
        <h1 style="color:#FFDD00">Recuperação de senha <strong style="color:#FFDD00">Waka Crm!</strong><h1>
        <hr style="color:#FFDD00; border-color:#FFDD00; background-color:#FFDD00;"/>
        <br />
        <h2>Prezado Sr.(a) `+ nome + `</h2>
        <h4>Estamos avisando que sua senha foi redefinida</h4>
        <br />
        <h4>Não esqueça que dentro de 24 horas , não poderá mudar a senha.</h4>
        <br />
        <h4>Muito obrigado</h4>
        <h3>Equipe <strong style="color:#FFDD00">Waka Crm!</strong></h3>
        </div>
        `
    };

    return await transporter.sendMail(mailOptions).then(function (error, info) {
        return {
            status: true,
            message: 'Email enviado com sucesso'
        }
    });
}