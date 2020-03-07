const express = require('express');
const auth = require('../middleware/auth');

const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const historyData = req.body;
    const user = req.user;
    historyData.user = user._id;

    const history = new TrackHistory(historyData);

    try {
        await history.save();

        return res.send("lol");
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;
