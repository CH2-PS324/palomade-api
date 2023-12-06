const nodemailer = require('nodemailer')
require("dotenv").config();

exports.kirimEmail = async (templateEmail) => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true, // https mode
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