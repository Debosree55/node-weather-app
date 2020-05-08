const request = require('request')

const forecast = (latitude, longitude, callback) => {
    forcasturl='http://api.weatherstack.com/current?access_key=a30a42c6521a8baaa370b5eabe31242d&query='+latitude+','+longitude+'&units=m'
    request({ url: forcasturl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.temperature )
        }
    })
}

module.exports = forecast