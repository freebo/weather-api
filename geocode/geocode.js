const request = require('request');


var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
    }, (error, response, body) => {
        if (error) {
            callback('Can\'t connect to Google API');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Address not found');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
                
            });
         }
    });
};

module.exports = {
    geocodeAddress
}

//  6116532b9310a3c3bea05f1df71a78b5

// https://api.darksky.net/forecast/6116532b9310a3c3bea05f1df71a78b5/-27.8537264,153.3610228?units=ca