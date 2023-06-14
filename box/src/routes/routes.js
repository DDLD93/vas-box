const multer = require('multer'); // Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });
const parse = require("../controllers/csv-parser");
const sendMessage = require("../controllers/smpp");
const MsgCTRL = require("../controllers/message.controller")

module.exports = (express) => {
    api = express.Router();

    api.post('/validate-csv', upload.single('csv'), async (req, res) => {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ ok: false, error: 'No file uploaded' });
        }
        const path = file?.path
        const { ok, results, summary, error } = await parse(path)
        if (ok) {
            res.status(200).json({ ok, results, summary })

        } else {
            res.status(500).json({ ok, error })

        }

    });
    api.post('/vas-box/sms', async (req, res) => {
        // Extract data from request body
        const { senderId, receivers, message } = req.body;
        try {
            const { ok, success, errors, summary } = await sendMessage(senderId, receivers, message)
            if (ok) {
                res.status(200).json({ ok, success, summary });
            } else {
                res.json({ ok, errors });
            }

        } catch (error) {
            res.json({ ok: false, error: error.message });
        }
    });




    api.get('/', async (req, res) => {
        const { ok, data, error } = await MsgCTRL.getMessages()
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }
    });

    api.get('/:id', async (req, res) => {
        const { id } = req.params
        const { ok, data, error } = await MsgCTRL.getMessage(id)
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }
    });

    api.post('/', async (req, res) => {
        const body = req.body

        const { ok, data, error, vas_response } = await MsgCTRL.addMessage(body)
        if (ok) {
            res.status(201).json({ ok, data, error, vas_response});
        } else {
            res.status(500).json({ ok: false, error, vas_response });
        }
    });

    api.put('/:id', async (req, res) => {
        const body = req.body
        const { id } = req.params
        const { ok, data, error } = await MsgCTRL.updateMessage(id, body)
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }
    });

    api.delete('/:id', async (req, res) => {
        const { id } = req.params
        const { ok, data, error } = await MsgCTRL.deleteMessage(id);
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }

    });

    return api
}