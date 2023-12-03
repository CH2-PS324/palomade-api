const { db } = require("../models");
const User = db.user;

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
};

module.exports = verifyUser;
