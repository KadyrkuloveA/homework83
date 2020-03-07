const express = require('express');

const Track = require('../models/Track');
const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.album) {
        try {
            const items = await Track.find({album: req.query.album});

            if (!items) {
                return res.status(404).send({message: 'Not found'});
            }

            res.send(items);
        } catch (e) {
            res.status(404).send({message: 'Not found'});
        }
    } else if (req.query.artist) {
        try {
            const albums = await Album.find({artist: req.query.artist});

            const tracks = (await Promise.all(albums.map(album => {
                return Track.find({album: album._id})
            }))).flat();

            res.send(tracks);
        } catch (e) {
            res.status(404).send({message: 'Not found'});
        }
    } else {
        const items = await Track.find();
        res.send(items);
    }
});

router.post('/', async (req, res) => {
    const trackData = req.body;

    const track = new Track(trackData);

    try {
        await track.save();

        return res.send({id: track._id});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;