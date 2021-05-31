const request = require("request");
const openweatherKey = process.env.openweatherKey|||| require("../../key").openweatherKey;

module.exports = forecast = (longitude, latitude, callback) => {
  const openWeatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openweatherKey}`;

  request({ url: openWeatherURL, json: true }, (err, res) => {
    if (err) callback("Unable to connect to open weather api", undefined);
    else if (res.body.message) callback(res.body.message, undefined);
    else {
      const data = `Currently, it's ${res.body.weather[0].main.toLowerCase()} and ${
        res.body.main.temp
      } degrees in ${res.body.name}`;
      callback(undefined, data);
    }
  });
};
