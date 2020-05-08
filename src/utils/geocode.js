const request = require('request')

const geocode = (address, callback) => {
    mapurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGVib3NyZWVnaG9zaDU1IiwiYSI6ImNrOWloc3gwOTAwZXkzbGxyNTMxcjA4cTgifQ.8ArzQix-4MX7wzEP__LlTQ&limit=1'
    request({ url: mapurl, json: true }, (error, response) => {
        if (error) {
            
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode