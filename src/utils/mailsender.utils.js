const nodemailer = require('nodemailer')
require("dotenv").config();

exports.kirimEmail = async (templateEmail) => {
    let transporter = nodemailer.createTransport({
        host: "mail.hafizcaniago.my.id",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,   // your email address
            pass: process.env.MAIL_PASSWORD // your password
        },
    });
    return (
        transporter.sendMail(templateEmail)
            .then(info => console.log(`Email terkirim: ${info.message}`))
            .catch(err => console.log(`Terjadi kesalahan: ${err}`))
    )
}