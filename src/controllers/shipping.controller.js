const { db } = require('../models');
const { sequelize, shipping: Shipping, shipping_detail: Shipping_Detail, user: User } = db;
const { v4: uuidv4 } = require('uuid');
const { plusMinutes } = require('../utils/helper.utils');
const axios = require('axios');
require("dotenv").config();

exports.create = async (req, res) => {
    try {
        const fullUuid = uuidv4();
        const shortUuid = fullUuid.substring(0, 8);
        
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: req.body.coordinate_from, // Replace with your origin address or coordinates
                destinations: req.body.coordinate_to, // Replace with your destination address or coordinates
                key: process.env.MAPS_KEY, // Replace with your Google Maps API key
            },
        });

        // Process the response and send the relevant information back to the client
        const duration = response.data.rows[0].elements[0].duration.value;
        const minuteduration = Math.floor(duration / 60);
        console.log(minuteduration);

        await Shipping.create({
            code: shortUuid.toUpperCase(),
            started_date: req.body.started_date,
            finish_date: req.body.finish_date,
            status: null,
            driver_id: null,
            organisasi_id: req.userId,
            plat: null,
            bobot: req.body.bobot,
            from: req.body.from,
            to: req.body.to,
            coordinate_from: req.body.coordinate_from,
            coordinate_to: req.body.coordinate_to,
            estimated_arrive: plusMinutes(minuteduration + 840),
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
                finish_date: Date().toLocaleString({ timeZone: "Asia/Jakarta" }),
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


exports.record = async (req, res) => {
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

        await Shipping_Detail.create({
            shipping_id: shipping.id,
            place_name: req.body.place_name,
            coordinate: req.body.coordinate,
            detail: req.body.detail
        });

        res.status(200).send({
            message: "Tracking has been successfully recorded."
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
}

exports.getShipping = async (req, res) => {
    try {
        const shippingCode = req.params.code;
        const shippingDetail = await Shipping.findOne({
            include: [{ model: Shipping_Detail, required: false }],
            where: {
                code: shippingCode
            }
        });

        if (!shippingDetail || shippingDetail.length === 0) {
            return res.status(404).send({
                message: "Shipping not found or no update from driver yet"
            });
        }

        const data = {
            code: shippingDetail.code,
            berat: shippingDetail.bobot,
            plat: shippingDetail.plat,
            detail: shippingDetail.shipping_details
        }

        res.status(200).send({
            message: "Shipping was fetched succesfully",
            data: data
        })
    } catch (err) {
        console.error(err.message);
        if (err.message.includes("invalid input syntax")) {
            res.status(404).send({
                message: "Shipping not found. Invalid ID.",
            });
        } else {
            res.status(500).send({
                message: "Failed to fetch shipping. Please check application log.",
            });
        }
    }
};

exports.getAllshippingOrg = async (req, res) => {
    try {
        const orgId = req.userId;
        const shippingByOrg = await User.findOne({
            include: [{ model: Shipping, required: false }],
            where: {
                id: orgId,
                role: 'organisasi'
            }
        });

        if (!shippingByOrg || shippingByOrg.length === 0) {
            return res.status(404).send({
                message: "This organization don't have shipping yet"
            });
        }

        const data = {
            nama: shippingByOrg.name,
            shipping: shippingByOrg.shippings
        }

        res.status(200).send({
            message: "Shipping was fetched succesfully",
            data: data
        })
    } catch (err) {
        console.error(err.message);
        if (err.message.includes("invalid input syntax")) {
            res.status(404).send({
                message: "Shipping not found. Invalid ID.",
            });
        } else {
            res.status(500).send({
                message: "Failed to fetch shipping. Please check application log.",
            });
        }
    }
}

exports.getAllshippingDriver = async (req, res) => {
    try {
        const driverId = req.userId;
        const query = `
            SELECT
                users.id,
                users.name,
                shippings.id AS 'shipping_id',
                shippings.code AS 'code',
                shippings.started_date AS 'started_date',
                shippings.finish_date AS 'finish_date',
                shippings.status AS 'status',
                shippings.plat AS 'plat',
                shippings.bobot AS 'bobot',
                shippings.from AS 'from',
                shippings.to AS 'to',
                shippings.coordinate_from AS 'coordinate_from',
                shippings.coordinate_to AS 'coordinate_to',
                shippings.estimated_arrive AS 'estimated_arrive',
                shippings.createdAt AS 'createdAt'
            FROM
                users
            LEFT OUTER JOIN
                shippings ON users.id = shippings.driver_id
            WHERE
                users.id = :driverId AND users.role = 'supir';
        `;

        const shippingByDriver = await sequelize.query(query, {
            replacements: { driverId: driverId },
            type: sequelize.QueryTypes.SELECT
        });

        if (!shippingByDriver || shippingByDriver.length === 0) {
            return res.status(404).send({
                message: "This driver don't have shipping yet"
            });
        }

        const data = shippingByDriver.map(shipping => {
            return {
                shipping_id: shipping.shipping_id,
                code: shipping.code,
                started_date: shipping.started_date,
                finish_date: shipping.finish_date,
                status: shipping.status,
                plat: shipping.plat,
                bobot: shipping.bobot,
                from: shipping.from,
                to: shipping.to,
                coordinate_from: shipping.coordinate_from,
                coordinate_to: shipping.coordinate_to,
                estimated_arrive: shipping.estimated_arrive,
                createdAt: shipping.createdAt
            }
        })

        const newData = {
            nama: shippingByDriver[0].name,
            shippings: data
        }

        res.status(200).send({
            message: "Shipping was fetched succesfully",
            data: newData
        })
    } catch (err) {
        console.error(err.message);
        if (err.message.includes("invalid input syntax")) {
            res.status(404).send({
                message: "Shipping not found. Invalid ID.",
            });
        } else {
            res.status(500).send({
                message: "Failed to fetch shipping. Please check application log.",
            });
        }
    }
}