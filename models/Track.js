const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new mongoose.Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;