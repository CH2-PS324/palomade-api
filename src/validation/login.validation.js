const { body, validationResult } = require("express-validator");

const loginValidator = [
	body("email")
		.notEmpty()
		.withMessage("Email tidak boleh kosong!")
		.isEmail()
		.withMessage("Email tidak valid!"),
	body("password")
        .notEmpty()
        .withMessage("Password tidak boleh kosong!"),
];

const runValidaton = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Bad Request",
        errors: errors.array().map((error) => error.msg),
      });
    }
    next();
};
  
module.exports = {
    loginValidator,
    runValidaton,
};