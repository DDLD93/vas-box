const multer = require('multer'); // Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });
const parse = require("../controllers/csv-parser");
const sendMessage = require("../controllers/smpp");

module.exports = (express) => {
    api = express.Router();

    api.post('/validate-csv', upload.single('file'), async (req, res) => {
        const file = req.file;
        const path = file?.path

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // try {
        const response = await parse(path)
        res.status(200).json({ response })
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

    return api
}