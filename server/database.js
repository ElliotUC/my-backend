const moongose = require('mongoose');

const URI = 'mongodb://localhost/spotify-albums';

moongose.connect(URI)
    .then(db => console.log('DB is ready'))
    .catch(err => console.error(err));

module.exports = moongose;