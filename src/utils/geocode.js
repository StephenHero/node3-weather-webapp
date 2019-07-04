const request = require("request");

const geocode = function(address, callback) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYnJ5YW50MDA3IiwiYSI6ImNqd3MyNWs3cTB5ZmQ0NHFpcTRhdXYxNmQifQ.1TkRUn0ExOWQL1yR63emiA&limit=1";

  request({ url: url, json: true }, function(error, response) {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
