const MsgModel = require("../models/model");
const smpp = require("../controllers/smpp")

class MsgCTRL {
    constructor() {

    }
    async addMessage(data) {
        try {
            let newMsgs = new MsgModel(data)
            let message = await newMsgs.save()
            let recepients = message.recepients.map((recepient) => (recepient.phone));
            let response = await smpp(message.senderId, recepients, message.message)
            return { ok: true, data: message, vas_response: response }
        } catch (error) {
            return { ok: false, error }
        }
    }
    async getMessages() {
        try {
            let data = await MsgModel.find()
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }
    async getMessage(id) {
        try {
            let data = await MsgModel.findById(id)
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }
    async updateMessage(id, newData) {
        try {
            let data = await MsgModel.findByIdAndUpdate(id, newData, { new: true })
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }

    async deleteMessage(id) {
        try {
            let data = await MsgModel.findByIdAndDelete(id)
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }

}

module.exports = new MsgCTRL()