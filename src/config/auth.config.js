// configuration file for jwt
module.exports = {
    secret: process.env.SECRET_KEY,
    jwtExpiration: 86400, // 1 day / 24 hours
    jwtRefreshExpiration: 172800, // 48 hours
};
