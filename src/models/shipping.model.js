module.exports = (sequelize, Sequelize) => {
    const shipping = sequelize.define("shipping", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        started_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        finish_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        status: {
            type: Sequelize.DataTypes.ENUM('diproses', 'dikirim', 'terkirim'),
            allowNull: false,
        },
        driver_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        organisasi_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        plat: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        bobot: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        from: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        to: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        coordinate_from: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        coordinate_to: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        estimated_arrive: {
            type: Sequelize.DATEONLY
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
        },
    }, {
        timestamps: false
    });

    return shipping;
}