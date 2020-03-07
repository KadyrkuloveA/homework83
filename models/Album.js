const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new mongoose.Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    image: String,
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;