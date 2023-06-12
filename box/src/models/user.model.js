const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    teams: { type: [String] },
    userType : { type: String },
    status: { type: String, enum: ["Pending", "Suspended", "Active"], default: "Active" },
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() },
});


module.exports = mongoose.model("User", UserSchema);