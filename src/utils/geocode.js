const request = require("request");
const { mapboxKey } = require("../../key") || process.env.mapboxKey;
module.exports = geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxKey}`;
  request({ url: geocodeURL, json: true }, (err, res) => {
    if (err) callback("Unable to connect to mapcode api", undefined);
    else if (res.body.features.length === 0)
      callback("No cities found!", undefined);
    else {
      callback(undefined, {
        longitude: res.body.features[0].center[0],
        latitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name,
      });
    }
  });
};
