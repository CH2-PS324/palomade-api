const { db } = require('../models');
const { shipping: Shipping } = db;
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

exports.create = async (req, res) => {
    const fullUuid = uuidv4();
    const shortUuid = fullUuid.substring(0, 8);
    Shipping.create({
        code: shortUuid.toUpperCase(),
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

exports.start = async (req, res) => {
    Shipping.findOne({
        where: {
            code: req.body.code
        },
    }).then((shipping) => {
        Shipping.update(
            {
                ...req.body
            },
            {
                where: {id : 1} // ini idnya harus di fetch dari jwt si, soalnya gaada masukan dari input yekan. tapi dari req.body juga bisa aja sih sebenernya.
            }
        ).then((shippingData) => {

        })
        .catch((err) => {

        })
    })
}