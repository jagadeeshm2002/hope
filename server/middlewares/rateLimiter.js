const rateLimit = require("express-rate-limit");

const {logEvent} = require("./logger");


/**
 * Rate limit login requests to 5 per minute, with the
 * response returned in the `RateLimit-*` headers.
 */
const rateLimiter = rateLimit({
    // Window of time to apply the rate limiting to (in ms)
    windowMs: 60 * 1000,
    // Max number of requests allowed within the windowMs
    max: 5,
    // Message to return in response to exceeded rate limit
    message: {
        msg: "Too many login attempts, please try again after 60 seconds"
    },
    // Function called when the rate limit is exceeded
    handler: (req, res, next, options) => {
        // Log the blocked request and send the message in the response
        logEvent(`Too Many Requests: ${options.message.msg}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
        res.status(options.statusCode).send(options.message);
    },
    // Return rate limit info in the `RateLimit-*` headers
    standardHeaders: true,
    legacyHeaders:false,
});

module.exports = rateLimiter 