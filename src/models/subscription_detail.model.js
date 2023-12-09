module.exports = (sequelize, Sequelize) => {
    const subscription_detail = sequelize.define("subscription_detail", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_subscription: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
        }
    }, {
        timestamps: false
    });

    return subscription_detail;
}