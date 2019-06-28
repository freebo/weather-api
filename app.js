
const yargs = require('yargs');
const axios = require('axios');


var date = new Date();
var current_hour = date.getHours();
var current_min = date.getMinutes();


const argv = yargs
    .options({
        a: {
            demand: true, 
            alias: 'address',
            describe: 'Address to get weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Can\'t find address')
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    weatherUrl=`https://api.darksky.net/forecast/6116532b9310a3c3bea05f1df71a78b5/${lat},${lng}?units=ca`, 
    console.log(weatherUrl);
    console.log(`At ${current_hour}:${current_min} For address: ${response.data.results[0].formatted_address}`);
    
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var c_summary = response.data.currently.summary;
    var d_summary = response.data.daily.summary;
    console.log(`Its Currently ${c_summary}, Temp: ${temperature} It Feels Like: ${apparentTemperature}`);
    console.log(`Forecast: ${d_summary}`);
}).catch((error) => {
    if(error.code === 'ENOTFOUND') {
    console.log('Can\'t connect to API');
    } else {
        console.log(error.message);
    }
});