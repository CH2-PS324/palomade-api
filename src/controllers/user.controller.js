const { db } = require('../models');
const { user: User, refreshToken: RefreshToken } = db;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then(async (user) => {
        // Check User Registered or Not
        if (!user) {
            return res.status(404).send({
                message: "Account Used By Your Email is not Registered, Please Check the Email again!",
            })
        }

        // Compare Password
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
            id: user.id,
            name: user.name,
            role: user.role,
            accessToken: token,
            refreshToken: refreshToken,
        });
    }).catch((err) => {
        console.error(err.message);
        res.status(500).send({
            message: "Failed to login. Please check application log.",
        });
    });
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

exports.create = (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role || 'user',
    })
        .then((user) => {
            res.status(201).send({
                message: "User was registered successfully!",
            });
        })
        .catch((err) => {
            console.error(err.message);
            res.status(500).send({
                message: "Failed to register user. Please check application log.",
            });
        });
};

exports.getOne = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((user) => {
            if (!user) return res.status(404).send({ message: "User not found." });
            else
                res.status(200).send({
                    message: "User was fetched successfully.",
                    data: user,
                });
        })
        .catch((err) => {
            console.error(err.message);
            if (err.message.includes("invalid input syntax")) {
                res.status(404).send({
                    message: "User not found. Invalid ID.",
                });
            } else {
                res.status(500).send({
                    message: "Failed to fetch user. Please check application log.",
                });
            }
        });
};

exports.update = (req, res) => {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    User.update(
        {
            ...req.body,
        },
        { where: { id: req.params.id } }
    )
        .then((user) => {
            res.status(200).send({
                message: "User was updated successfully.",
            });
        })
        .catch((err) => {
            console.error(err.message);
            if (err.message.includes("invalid input syntax")) {
                res.status(404).send({
                    message: "User not found.",
                });
            } else {
                res.status(500).send({
                    message: "Failed to update user. Please check application log.",
                });
            }
        });
};