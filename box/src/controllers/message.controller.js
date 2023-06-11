const MsgModel = require("../models/model");
class MsgCTRL {
    constructor() {

    }
    async addMessage(data) {
        let newMsgs = new MsgModel(data)
        try {
            let data = await newMsgs.save()
            return { ok: true, data }
        } catch (error) {
            console.log(error)
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