const { body, validationResult } = require("express-validator");

const createShippingValidator = [
    body('bobot')
    .notEmpty()
    .withMessage('Bobot tidak boleh kosong!'),
    body('from')
    .notEmpty()
    .withMessage('Tempat asal tidak boleh kosong!'),
    body('to')
    .notEmpty()
    .withMessage('Tujuan tidak boleh kosong!'),
    body('coordinate_from')
    .notEmpty()
    .withMessage('Titik asal tidak boleh kosong!'),
    body('coordinate_to')
    .notEmpty()
    .withMessage('Titik tujuan tidak boleh kosong!')
];

const driverCheckpointValidator = [
    body('place_name')
    .notEmpty()
    .withMessage('Nama tempat tidak boleh kosong!'),
    body('detail')
    .notEmpty()
    .withMessage('Kegiatan tidak boleh kosong!')
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
    createShippingValidator,
    driverCheckpointValidator,
    runValidaton,
};