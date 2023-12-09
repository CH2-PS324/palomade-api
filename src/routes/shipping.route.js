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

    // Create Shipping (Organisasi)
    app.post("/api/shipping/create", [authJwt.verifyToken, authJwt.isOrganisasi], controller.create);

    // Input Token Shipping (Supir)
    app.patch("/api/shipping/start/:code", [authJwt.verifyToken, authJwt.isDriver], controller.start);

    // Change Status Shipping (Organisasi)
    app.patch("/api/shipping/finish/:code", [authJwt.verifyToken, authJwt.isOrganisasi], controller.finish);

    // Add Shipping Detail (Supir) 
    app.post("/api/shipping/record/:code", [authJwt.verifyToken, authJwt.isDriver], controller.record);
    
    // Get Detail Shipping (Organisasi)
    app.get("/api/shipping/record/:code", [authJwt.verifyToken, authJwt.isOrgOrDriver], controller.getShipping);

    // Get All Shipping (Organisasi)
    app.get("/api/shipping/org/:id", [authJwt.verifyToken, authJwt.isOrganisasi], controller.getAllshippingOrg);

    // Get All Shipping (Driver)
    app.get("/api/shipping/driver/:id", [authJwt.verifyToken, authJwt.isDriver], controller.getAllshippingDriver);
};