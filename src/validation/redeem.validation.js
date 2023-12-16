const { body, validationResult } = require("express-validator");

const redeemValidator = [
    body('code')
        .notEmpty()
        .withMessage('Code belum dimasukkan!')
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
    redeemValidator,
    runValidaton,
};