const request = require('request');

var getWeather = (lat,lng,callback) => {
    request ({
        url: `https://api.darksky.net/forecast/6116532b9310a3c3bea05f1df71a78b5/${lat},${lng}?units=ca`, 
        json: true 
        }, (error, response, body) => {
            if ( !error && response.statusCode === 200) {
                callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                summary: body.currently.summary
                });
            } else
                callback('Can\'t connect to Dark Sky API');
            }); 
}


module.exports.getWeather = getWeather;

