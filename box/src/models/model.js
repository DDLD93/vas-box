const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeessageSchema = new Schema({
    title: { type: String },
    senderId: { type: String },
    messageType: { type: String },
    recepients: {
        type: [{
            phone: { type: String },
            network: { type: String },
            isDelievered: { type: Boolean },

        }],
    },
    summary: {
        type: {
            total: { type: Number },
            invalid: { type: Number },
            MTN: { type: Number },
            GLO: { type: Number },
            AIRTEL: { type: Number },
            ETISALAT: { type: Number },
        }
    },
    status: { type: String, enum: ["Pending", "Suspended", "Sent"], default: "Pending" },
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() },
});


module.exports = mongoose.model("Meessage", MeessageSchema);