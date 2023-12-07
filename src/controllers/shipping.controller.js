const { db } = require('../models');
const { shipping: Shipping } = db;
const { v4: uuidv4 } = require('uuid');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const config = require('../config/auth.config');
// const Hashids = require('hashids/cjs');
// const hashids = new Hashids(process.env.HASH_KEY, 16)

// const { mailWelcomeTemplate } = require('../utils/mailtemplate.utils');
// const { kirimEmail } = require('../utils/mailsender.utils');
require("dotenv").config();

exports.create = async (req, res) => {
    const fullUuid = uuidv4();
    const shortUuid = fullUuid.substring(0, 10);
    Shipping.create({
        code: shortUuid,
        started_date: req.body.started_date, // format date = year-month-day
        finish_date: req.body.finish_date, // format date = year-month-day
        status: req.body.status,
        driver_id: req.body.driver_id,
        organisasi_id: req.body.organisasi_id,
        plat: req.body.plat,
        bobot: req.body.bobot,
        from: req.body.from,
        to: req.body.to,
        coordinate_from: req.body.coordinate_from,
        coordinate_to: req.body.coordinate_to,
        estimated_arrive: req.body.estimated_arrive, // format date = year-month-day
    })
        .then(async () => {
            res.status(201).send({
                message: "Shipping was added successfully!",
                data: req.body
            });
        })
        .catch((err) => {
            console.error(err.message);
            res.status(500).send({
                message: "Failed to add shipping. Please check application log.",
            });
        });
};