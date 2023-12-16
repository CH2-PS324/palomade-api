const { db } = require('../models');
const { user: User, refreshToken: RefreshToken } = db;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const Hashids = require('hashids/cjs');
const hashids = new Hashids(process.env.HASH_KEY, 16)

const { mailWelcomeTemplate } = require('../utils/mailtemplate.utils');
const { kirimEmail } = require('../utils/mailsender.utils');
require("dotenv").config();


exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        
        if (!user) {
            return res.status(404).send({
                message: "Account Used By Your Email is not Registered, Please Check the Email again!",
            })
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid password.",
            });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration, // Expires in 24 Hours
        });

        let refreshToken = await RefreshToken.createToken(user);

        res.status(200).send({
            id: hashids.encode(user.id),
            name: user.name,
            role: user.role,
            accessToken: token,
            refreshToken: refreshToken,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Failed to generate access token. Please check application log.",
        });
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(400).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({
            where: { token: requestToken },
        });

        if (!refreshToken) {
            res.status(400).json({
                message: "Refresh token is not in database!",
            });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            config.secret,
            {
                expiresIn: config.jwtExpiration,
            }
        );

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Failed to generate access token. Please check application log.",
        });
    }
};

exports.create = async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role || 'user',
        })

        let message = {
            from: 'noreply.palomade@hafizcaniago.my.id',
            to: req.body.email,
            subject: 'Welcome to Palomade!',
            html: mailWelcomeTemplate(req.body)
        }

        await kirimEmail(message);

        res.status(201).send({
            message: "User was registered successfully!",
            data: req.body
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Failed to register user. Please check application log.",
        });
    }
};

exports.getOne = async (req, res) => {
    try { 
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        })

        if (!user) {
            return res.status(404).send({ 
                message: "User not found." 
            }); 
        }

        res.status(200).send({
            message: "User was fetched successfully.",
            data: {
                id: hashids.encode(user.id),
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
            },
        });

    } catch (err) {
        console.error(err);
        if (err.includes("invalid input syntax")) {
            res.status(404).send({
                message: "User not found. Invalid ID.",
            });
        } else {
            res.status(500).send({
                message: "Failed to fetch user. Please check application log.",
            });
        }
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
        }

        await User.update(
            { 
                ...req.body 
            },
            { 
                where: { 
                    id: userId 
                } 
            }
        );

        res.status(200).json({
            message: "User was updated successfully.",
            data: req.body,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "Failed to update user. Please check application log.",
        });
    }
};


// exports.sendWelcomeEmail = (req, res) => {
//     if (!req.body.email) {
//         return res.status(400).json({
//             message: "Email cannot empty!"
//         })
//     }

//     let configMailer = {
//         host: "mail.hafizcaniago.my.id",
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.MAIL_USER,   // your email address
//             pass: process.env.MAIL_PASSWORD // your password
//         }
//     }

//     let transporter = nodemailer.createTransport(configMailer)

//     User.findOne({
//         where: {
//             email: req.body.email,
//         },
//     }).then((user) => {
//         let message = {
//             from: 'noreply.palomade@hafizcaniago.my.id',
//             to: req.body.email,
//             subject: 'Welcome to Palomade!',
//             html: mailWelcomeTemplate(user)
//         }

//         transporter.sendMail(message).then((info) => {
//             return res.status(201).json(
//                 {
//                     msg: "Email sent",
//                     info: info.messageId,
//                     preview: nodemailer.getTestMessageUrl(info)
//                 }
//             )
//         })
//     }).catch((err) => {
//         console.error(err.message);
//         if (err.message.includes("invalid input syntax")) {
//             res.status(404).send({
//                 message: "User not found.",
//             });
//         } else if (err.message.includes("Cannot read properties of null (reading 'name')")) {
//             res.status(404).send({
//                 message: "User not found, check your email again.",
//             });
//         }
//         else {
//             res.status(500).send({
//                 message: "Error Occured, Please check application log.",
//             });
//         }
//     });
// }