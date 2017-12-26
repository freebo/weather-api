
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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




geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`At ${current_hour}:${current_min} For address: ${results.address}, Lat: ${results.lat}, Long: ${results.lng}`);
        weather.getWeather(results.lat,results.lng, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Its Currently ${weatherResults.summary}, Temp: ${weatherResults.temperature} It Feels Like: ${weatherResults.apparentTemperature}`);
            }
        });

    }
}); 

