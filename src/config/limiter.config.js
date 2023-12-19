const { rateLimit } = require('express-rate-limit')

exports.limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 30, // Limit each IP to 60 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
