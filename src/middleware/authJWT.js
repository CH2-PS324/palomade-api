const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { db } = require("../models/index.js");
const User = db.user;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        res.status(401).send({
            message: "Unauthorized! Access Token was expired!",
        });
    }
    res.status(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    token = token && token.split(' ')[1]

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

const isUser = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if (!user) return res.status(404).send({ message: "User not found." });
        if (user.role === "user") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require user role!",
        });
    });
};

const isDriver = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if (!user) return res.status(404).send({ message: "User not found." });
        if (user.role === "supir") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require driver role!",
        });
    });
};

const isOrganisasi = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if (!user) return res.status(404).send({ message: "User not found." });
        if (user.role === "organisasi") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require organisasi role!",
        });
    });
};

const isNotUser = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        if (!user) return res.status(404).send({ message: "User not found." });
        if (['organisasi', 'user', 'supir'].includes(user.role)) {
            next();
            return;
        }
        res.status(403).send({
            message: "Action forbidden.",
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isDriver: isDriver,
    isUser: isUser,
    isOrganisasi: isOrganisasi,
    isNotUser: isNotUser,
};
module.exports = authJwt;
