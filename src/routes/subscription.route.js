const { authJwt, verifyUser } = require("../middleware");
const controller = require("../controllers/subscription.controller");
const { redeemValidator, runValidaton } = require('../validation/redeem.validation');
const { run } = require("node:test");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/reedem-subscription', redeemValidator, runValidaton, [authJwt.verifyToken, authJwt.isUser], controller.reedem);

    app.get('/api/check-subscription', [authJwt.verifyToken, authJwt.isUser], controller.check)
};
