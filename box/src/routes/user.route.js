const UserCTRL = require("../controllers/user.contoller")

module.exports = (express) => {
    api = express.Router();


    api.post('/register', async (req, res) => {
        const body = req.body
        const { ok, user, message, error } = await UserCTRL.registerLocal(body)
        if (ok) {
            res.status(201).json({ ok, user });
        } else {
            res.status(500).json({ ok, error, message });
        }
    });
    api.post('/login', async (req, res) => {
        const { email, password } = req.body

        const { ok, code, user, token, message, } = await UserCTRL.loginLocal(email, password)
        if (ok) {
            res.status(code).json({ ok, user, token });
        } else {
            res.status(code).json({ ok, message });
        }
    });


    api.get('/', async (req, res) => {
        const { ok, data, error } = await UserCTRL.getUsers()
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }
    });

    api.get('/:id', async (req, res) => {
        const { id } = req.params
        const { ok, data, error } = await UserCTRL.getUser(id)
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }
    });

    api.post('/', async (req, res) => {
        const body = req.body

        const { ok, data, error } = await UserCTRL.addUser(body)
        if (ok) {
            res.status(201).json({ ok, data, error });
        } else {
            res.status(500).json({ ok: false, error });
        }
    });

    api.put('/:id', async (req, res) => {
        const body = req.body
        const { id } = req.params
        const { ok, data, error } = await UserCTRL.updateUser(id, body)
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }
    });

    api.delete('/:id', async (req, res) => {
        const { id } = req.params
        const { ok, data, error } = await UserCTRL.deleteUser(id);
        if (ok) {
            res.status(200).json({ ok, data, error });
        } else {
            res.status(500).json({ ok, data, error });
        }

    });

    return api
}