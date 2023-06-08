require('dotenv').config();
const {
    APP_PORT,
    MONGODB_URL,
    APP_VERSION,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USER,
    REDIS_PASS
} = process.env;

module.exports = {
    app: {
        port: APP_PORT || 3000,
        appVersion: APP_VERSION || "v1",
   
    },
    redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        user: REDIS_USER,
        password: REDIS_PASS
    },

    endpoints: {
        mongoUrl: MONGODB_URL || "mongodb://localhost:27017/vas"
    },

}
