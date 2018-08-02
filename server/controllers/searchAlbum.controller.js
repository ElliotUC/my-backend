const searchAlbumController = {};
const request = require('request');
const authorization = require('../data/authorization.js');
const Album = require('../models/album');

searchAlbumController.getAlbumBySearch = async (req, res) => {

    let accessToken;
    try {
        accessToken = await authorization.getAccessToken(false);
    } catch( e) {
        console.log(e);
    }

    const q = req.query.q;
    var data; 

    try{
        console.log("search data")
        data = await searchAlbumController.searchData(q, accessToken);
    } catch (e) {
        if(e == "Unauthorized") {
            accessToken = await authorization.getAccessToken(true);
            data = await searchAlbumController.searchData(q, accessToken);
        }   
    }

    res.json(data);
   
}

searchAlbumController.searchData = async (q, accessToken) => {
    return new Promise((resolve, reject) => {
        var url = 'https://api.spotify.com/v1/search?q=' + q + '&type=album&limit=20&offset=0';

        console.log(`url: ${url}`)
        var options = {
            url: url,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken.token}`
            }
          }
    
          request(options, async function (err, httpResponse, body) {

            if (httpResponse.statusCode == 401) {
                reject('Unauthorized')
            }
    
            const bodyParse = JSON.parse(body);
            const albums = bodyParse['albums'];
            const items = albums['items']
            const keys = Object.keys(items);
    
            var arrayAlbums = [];

            console.log("ITEMS", items);
            
            for (var index = 0; index < keys.length; index ++) {
                const album = new Album(items[index]);
                await album.save();
                arrayAlbums.push(album)
            }
    
            resolve(arrayAlbums);
    
          });
    });
    
}

module.exports = searchAlbumController;