const { db } = require('../models');
const { user: User, subscription: Subscription, subscription_detail: Subscription_detail } = db;

exports.reedem = async (req, res) => {
    try {

        const isUserSubscribed = await Subscription_detail.findOne({
            where: {
                id_user: req.userId
            }
        });

        if (isUserSubscribed) {
            return res.status(400).send({
                message: "you have active subscription at this time!"
            })
        }

        Subscription.findOne({
            where: {
                code: req.body.code
            }
        }).then((subscription) => {
            if (!subscription || subscription.quota < 1) {
                return res.status(404).send({
                    message: "subscription code not found or already used"
                })
            }

            Subscription_detail.create({
                id_subscription: subscription.id,
                id_user: req.userId,
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
        })
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