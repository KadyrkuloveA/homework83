const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');

const Album = require('../models/Album');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.artist) {
        try {
            const items = await Album.find({artist: req.query.artist});

            if (!items) {
                return res.status(404).send({message: 'Not found'});
            }

            res.send(items);
        } catch (e) {
            res.status(404).send({message: 'Not found'});
        }
    } else {
        const items = await Album.find();
        res.send(items);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Album.findById(req.params.id).populate('artist');

        if (!item) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(item);
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);

    try {
        await album.save();

        return res.send({id: album._id});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;