const request = require('postman-request');

const forecast = (latitude, longitude, _callback) =>{

    const url = `http://api.weatherstack.com/current?access_key=23334c9130111b3f54bad8f99cbaf595&query=${latitude},${longitude}&units=m`;   

    request({url, json:true}, (error, {body}, {current} = {})=>{

        if(error){
            _callback('Unable to connect to weather service!', undefined);
        }else if(body.error){
            _callback('Unable to find location!', undefined);
        }else{
            const {temperature, feelslike, weather_descriptions} = current;
            const data =  `It is currently ${temperature} degrees out.It feels like ${feelslike}. ${weather_descriptions}.`;

            _callback(undefined, data);
        }
    });   
}

module.exports = forecast;
