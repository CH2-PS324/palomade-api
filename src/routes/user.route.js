const { authJwt, verifyUser } = require("../middleware");
const controller = require("../controllers/user.controller");
const { registerValidator, runValidaton } = require('../validation/user.validation');


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Register User
    app.post(
        "/api/users/register",
        registerValidator, runValidaton,
        [verifyUser.checkDuplicateEmail],
        controller.create
    );

    // Login User
    app.post("/api/users/login", controller.login);

    // Refresh Token
    app.post("/api/users/refreshtoken", controller.refreshToken);

    // Get User Detail
    app.get("/api/users/:id", [authJwt.verifyToken], controller.getOne);

    // Update User
    app.patch(
        "/api/users/:id",
        [
            authJwt.verifyToken,
            verifyUser.checkDuplicateEmail,
            verifyUser.checkRolesExisted,
        ],
        controller.update
    );

    // Send Email Example API
    // app.post("/api/users/sendmail", controller.sendWelcomeEmail);
};
