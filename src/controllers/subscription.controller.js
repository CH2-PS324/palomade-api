const { db } = require('../models');
const { plus30day } = require('../utils/helper.utils');
const { user: User, subscription: Subscription, subscription_detail: Subscription_detail } = db;

exports.reedem = async (req, res) => {
    try {

        // Get latest record
        const isUserSubscribed = await Subscription_detail.findOne({
            where: {
                id_user: req.userId
            },
            order: [
                ['id', 'DESC']
            ]
        })

        // Check if User is Exist and have active subscription time
        if (isUserSubscribed && new Date(isUserSubscribed.subsExpiredAt) > new Date()) {
            return res.status(400).send({
                message: "you have active subscription at this time!"
            })
        }

        // Check if subscription code is not found or has maximum reedem or has expired or is non-active code
        const subscription = await Subscription.findOne({
            where: {
                code: req.body.code
            }
        })

        if (!subscription || subscription.quota < 1 || (subscription.is_active == false) || new Date(subscription.expiredAt) < new Date()) {
            return res.status(404).send({
                message: "subscription code not found, already have maximum reedem, or already expired"
            })
        }

        Subscription_detail.create({
            id_subscription: subscription.id,
            id_user: req.userId,
            subsExpiredAt: plus30day(30)
        })

        User.update({
            is_subscribe: true,
        }, {
            where: {
                id: req.userId
            }
        })

        Subscription.update({
            quota: subscription.quota - 1
        }, {
            where: {
                id: subscription.id
            }
        })

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
}

exports.check = async (req, res) => {
    // Get latest record
    const isUserSubscribed = await Subscription_detail.findOne({
        where: {
            id_user: req.userId
        },
        order: [
            ['id', 'DESC']
        ]
    })

    // Check if User is Exist and have active subscription time
    if (isUserSubscribed && new Date(isUserSubscribed.subsExpiredAt) > new Date()) {
        return res.status(200).send({
            status: true,
            message: "you have active subscription at this time!",
        })
    }

    return res.status(404).send({
        status: false,
        message: "you not have active subscription now!",
    })
}