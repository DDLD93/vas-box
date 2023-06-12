require('dotenv').config();
const {
    APP_PORT,
    MONGODB_URL,
    APP_VERSION,
    JWT_SECRETE
} = process.env;

module.exports = {
    app: {
        port: APP_PORT || 3000,
        appVersion: APP_VERSION || "v1",
        jwtSecret: JWT_SECRETE  || "thftftyr556576tiuyhkjghjfyrtwetre1qwreyr6tiuyh"

   
    }, 
    endpoints: {
        mongoUrl: MONGODB_URL || "mongodb://localhost:27017/vas"
    },
    // "mongodb://noniuser:noniuser@localhost:27017/vas"

}
