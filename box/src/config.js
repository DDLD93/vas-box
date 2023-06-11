require('dotenv').config();
const {
    APP_PORT,
    MONGODB_URL,
    APP_VERSION
} = process.env;

module.exports = {
    app: {
        port: APP_PORT || 3000,
        appVersion: APP_VERSION || "v1",
   
    }, 
    endpoints: {
        mongoUrl: MONGODB_URL || "mongodb://noniuser:noniuser@localhost:27017/vas"
    },

}
