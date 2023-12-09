module.exports = (sequelize, Sequelize) => {
    const shipping_detail = sequelize.define("shipping_detail", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        shipping_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        place_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        coordinate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        detail: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
        },
    }, {
        timestamps: false
    });

    return shipping_detail;
}