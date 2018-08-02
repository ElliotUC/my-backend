
const request = require('request');
const accessToken = { token: "" };

const authorization  = module.exports = {}; 

authorization.getAccessToken = async (needRefresh) => {

    if (accessToken.token === '' || needRefresh) {
        console.log("get new token")
        const clientID = '5de5cc1dea9a49248447e9c1fc8c883e';
        const clientSecret = 'f96497e6b670460a8b68279f9d9a1375';

        var payload = `${clientID}:${clientSecret}`;
        var encodedPayload = new Buffer.from(payload).toString("base64");

        var options = {
            url: "https://accounts.spotify.com/api/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + encodedPayload
            },
            body: "grant_type=client_credentials&scope=playlist-modify-public playlist-modify-private"
        };

        return new Promise((resolve, reject) => {
            request(options, function (err, httpResponse, body) {
                if(err != null){
                    reject(err);
                    return;
                }
                if (httpResponse.statusCode = 200) { 
                    accessToken.token = JSON.parse(body)["access_token"];                
                    console.log(accessToken)
                    resolve(accessToken);
                }
             });
        });

        
    } else {
        return new Promise((resolve, reject) => {
            resolve(accessToken);
        });
    }
}
