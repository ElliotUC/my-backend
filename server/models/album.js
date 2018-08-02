const moongose = require('mongoose');
const { Schema } = moongose;

const ExternalUrl = new Schema({
    spotify : String
});

const Artist = new Schema({
    href          : {type: String, required: true},
    id            : {type: String, required: true},
    name          : {type: String, required: true},
    type          : {type: String, required: true},
    uri           : {type: String, required: true},
    external_urls : {type: ExternalUrl, required: true}
});

const Image = new Schema({
    height : {type: Number, required: true},
    width  : {type: Number, required: true},
    url    : {type: String, required: true}
});

const Album = new Schema({
    id           : {type: String,   required: true},
    href         : {type: String,   required: true},
    name         : {type: String,   required: true},
    release_date : {type: String,   required: true},
    uri          : {type: String,   required: true},
    album_type   : {type: String,   required: true},
    artists      : {type: [Artist], required: true},
    images       : {type: [Image],  required: true}
});

module.exports = moongose.model('Album', Album);