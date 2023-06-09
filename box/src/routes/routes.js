const multer = require('multer'); // Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });
const parse = require("../controllers/csv-parser");
const sendMessage = require("../controllers/smpp");
const MsgCTRL = require("message.controller")

module.exports = (express) => {
    api = express.Router();

    api.post('/validate-csv', upload.single('csv'), async (req, res) => {
        const file = req.file;
        console.log({ file })
        const path = file?.path

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // try {
        const { ok, results, summary } = await parse(path)
        res.status(200).json({ ok, results, summary })
        // } catch (error) {
        //     res.status(500).json({error})

        // }


    })
    api.post('/vas-box/sms', async (req, res) => {
        // Extract data from request body
        const { senderId, receivers, message } = req.body;
        try {
            const resp = await sendMessage(senderId, receivers, message)
            res.json(resp);

        } catch (error) {
            res.json({ ok: false, error: error.message });

        }
    });




    api.get('/', async (req, res) => {
        // Extract data from request body
        try {
            const { ok, data, error } = await MsgCTRL.getMessages()
            res.status(200).json({ ok, data, error });

        } catch (error) {
            res.status(500).json({ ok, data, error });
        }
    });

    api.get('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const { ok, data, error } = await MsgCTRL.getMessage(id)
            res.status(200).json({ ok, data, error });

        } catch (error) {
            res.status(500).json({ ok, data, error });
        }
    });

    api.post('/', async (req, res) => {
        const body = req.body

        const { ok, data, error } = await MsgCTRL.addMessage(body)
        if (ok) {
            res.status(201).json({ ok, data, error });
            
        }


        res.status(500).json({ ok: false, error });

    });
    api.put('/:id', async (req, res) => {
        const data = req.body
        const { id } = req.params
        try {
            const { ok, data, error } = await MsgCTRL.updateMessage(id, data)
            res.status(200).json({ ok, data, error });

        } catch (error) {
            res.status(500).json({ ok, data, error });
        }
    });
    api.delete('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const { ok, data, error } = await MsgCTRL.deleteMessage(id)
            res.status(200).json({ ok, data, error });

        } catch (error) {
            res.status(500).json({ ok, data, error });
        }
    });
    return api
}