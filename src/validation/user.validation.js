const { body, validationResult } = require('express-validator')

const registerValidator = [
    body('name')
        .notEmpty()
        .withMessage('Nama tidak boleh kosong!'),
    body('email')
        .isEmail()
        .withMessage('Email tidak valid!')
        .notEmpty()
        .withMessage('Email tidak boleh kosong!'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password harus terdiri minimal 8 karakter!')
        .notEmpty()
        .withMessage('Password tidak boleh kosong!'),
    body('role')
        .notEmpty()
        .withMessage('Role tidak boleh kosong!')
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
    registerValidator,
    runValidaton,
};