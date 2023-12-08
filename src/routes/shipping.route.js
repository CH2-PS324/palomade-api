const controller = require("../controllers/shipping.controller.js");
const { verifyUser, authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create Shipping
    app.post("/api/shipping/create", [authJwt.verifyToken, authJwt.isOrganisasi], controller.create);

    // Input Token Shipping (Supir)
    app.patch("/api/shipping/start/:code", [authJwt.verifyToken, authJwt.isSupir], controller.start);

    // Change Status Shipping (Supir)
    app.patch("/api/shipping/finish/:code", [authJwt.verifyToken, authJwt.isSupir], controller.finish);
};