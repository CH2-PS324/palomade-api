module.exports = (sequelize, Sequelize) => {
    const Config = sequelize.define("config", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    }
    );

    return Config;
}