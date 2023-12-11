const { db } = require('../models');
const { configs: Configs } = db;

exports.getConfig = async (req, res) => {

    try {
        const config = await Configs.findOne({
            where: {
                name: req.params.name,
            },
            order: [
                ['id', 'DESC']
            ]
        })

        if (config) {
            return res.status(200).send({
                message: "config has been successfully retrieved",
                data: {
                    name: config.name,
                    value: config.value
                }
            })
        }

        return res.status(404).send({
            message: "config is not found"
        })
    } catch (err) {
        console.error(err.message);
        if (err.message.includes("invalid input syntax")) {
            res.status(400).send({
                message: "Invalid input syntax. Please check your request data."
            });
        } else {
            res.status(500).send({
                message: "Failed to find configs. Please check application log."
            });
        }
    }


}