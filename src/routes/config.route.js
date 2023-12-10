const { authJwt, verifyUser } = require("../middleware");
const controller = require("../controllers/config.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/config/:name', [authJwt.verifyToken, authJwt.isUser], controller.getConfig);
};
