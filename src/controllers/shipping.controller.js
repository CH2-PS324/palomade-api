const { db } = require('../models');
const { shipping: Shipping, shipping_detail: Shipping_Detail } = db;
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

exports.create = async (req, res) => {
    try {
        const fullUuid = uuidv4();
        const shortUuid = fullUuid.substring(0, 8);

        await Shipping.create({
            code: shortUuid.toUpperCase(),
            started_date: req.body.started_date,
            finish_date: req.body.finish_date,
            status: null,
            driver_id: null,
            organisasi_id: req.body.organisasi_id,
            plat: null,
            bobot: null,
            from: req.body.from,
            to: req.body.to,
            coordinate_from: req.body.coordinate_from,
            coordinate_to: req.body.coordinate_to,
            estimated_arrive: req.body.estimated_arrive,
        });

        res.status(201).send({
            message: "Shipping was added successfully!",
            data: req.body
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({
            message: "Failed to add shipping. Please check application log.",
        });
    }
};

exports.start = async (req, res) => {
    try {
        const shippingCode = req.params.code;
        const shipping = await Shipping.findOne({
            where: {
                code: shippingCode
            }
        });

        if (!shipping) {
            return res.status(404).send({
                message: "Shipping code not found ngap!"
            });
        }

        await Shipping.update(
            {
                status: 'diproses',
                driver_id: req.userId,
                ...req.body
            },
            {
                where: {
                    code: shippingCode
                }
            }
        );

        res.status(200).send({
            message: "Code successfully redeemed.",
            data: req.body
        });
    } catch (err) {
        console.error(err.message);
        if (err.message.includes("invalid input syntax")) {
            res.status(400).send({
                message: "Invalid input syntax. Please check your request data."
            });
        } else {
            res.status(500).send({
                message: "Failed to redeem code. Please check application log."
            });
        }
    }
};

exports.finish = async (req, res) => {
    try {
        const shippingCode = req.params.code;
        const shipping = await Shipping.findOne({
            where: {
                code: shippingCode
            }
        });

        if (!shipping) {
            return res.status(404).send({
                message: "Shipping code not found ngap!"
            });
        }

        await Shipping.update(
            {
                status: 'terkirim',
                finish_date: Date().toLocaleString({timeZone: "Asia/Jakarta"}),
            },
            {
                where: {
                    code: shippingCode
                }
            }
        );

        res.status(200).send({
            message: "Delivery completed, items received."
        });
    } catch (err) {
        console.error(err.message);
        if (err.message.includes("invalid input syntax")) {
            res.status(400).send({
                message: "Invalid input syntax. Please check your request data."
            });
        } else {
            res.status(500).send({
                message: "Failed to change status. Please check application log."
            });
        }
    }
};