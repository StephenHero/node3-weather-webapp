const request = require("request");

const forecast = function(latitude, longitude, callback) {
  const url =
    "https://api.darksky.net/forecast/9a20657f726a58256eaea7088e3d141b/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, function(error, body) {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " It is currently " +
          response.body.currently.temperature +
          " degrees out.  There is a " +
          response.body.currently.precipProbability +
          " % chance of rain, and alert follows if available: " +
          response.body.alerts.description +
          "."
      );
    }
  });
};

// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = forecast;
