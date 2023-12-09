const { db } = require("../models");
const User = db.user;
const Hashids = require('hashids/cjs');
const hashids = new Hashids(process.env.HASH_KEY, 16)

const checkDuplicateEmail = (req, res, next) => {
    if (!req.body.email) return next();
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already taken!",
            });
            return;
        }
        next();
    });
};

const checkDriverId = (req, res, next) => {
    if (!req.body.driver_id) return next();
    User.findOne({
        where: {
            id: req.body.driver_id,
        },
    }).then((user) => {
        if (!user) {
            return res.status(400).send({
                message: "Failed! Driver ID Not Found ngap!",
            });
        }
        next();
    });
};

const checkRolesExisted = (req, res, next) => {
    let roles = ['organisasi', 'user', 'supir'];
    if (req.body.role) {
        if (!roles.includes(req.body.role)) {
            res.status(400).send({
                message: `Role '${req.body.role}' does not exist!`,
            });
            return;
        }
    }
    next();
};

const verifyUser = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted,
    checkDriverId: checkDriverId,
};

module.exports = verifyUser;
