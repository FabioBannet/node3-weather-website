const request = require('postman-request');

const geocode = (address, callback) => {
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmFiaW9iYW5uZXQiLCJhIjoiY2tsMTNqODRnM2c0djMwcW5tNjNrcG43YSJ9.4lC6tTSZTmOSikU28CCuqQ&limit=1`

    
    request({url:url, json:true}, (error, {body}, {features})=>{
        
        if(error)
        {
            return callback('Unable to connect to location services', undefined);
        }else if(body.features.length < 1)
        {
            return callback('You must provide an address!', undefined);
        }else
        {
           return  callback(undefined, {
               
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
        
    });
}

module.exports= geocode;