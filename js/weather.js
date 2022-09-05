// uses the Tomorrow.io Weather API (https://www.tomorrow.io/weather-api/)

var apiKey = YOUR_KEY_HERE;
var url;
var latitude;
var longitude;

// identifies weather using weather codes (https://docs.tomorrow.io/reference/data-layers-weather-codes)
var curWeatherId;

// marks when weather-gathering code is finished so video id can be chosen
var isReady;

// if a user blocks the location request, the website won't check the weather during their visit
// by default this is set to true, as users have to request weather tracking
var isLocationBlocked = true;

// makes sure that location can only be set up once, hopefully causing less tomfoolery
// unfortunately, if a user clicks "OK" on the prompt to start setting up the weather but actually blocks the site's access to their location,
// they have to refresh if they want to allow weather tracking.
var isLocationSetUp;

// requests user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)
    } else {
        alert("Geolocation is not supported by your browser")
    }
}

// sets up user location if requested and calls function to fetch weather data
function success(position) {
    isLocationBlocked = false;

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    setUrl(latitude, longitude);

    fetchWeatherData();
}

// fetches the current weather conditions from the Tomorrow.io API
// uses weather codes (https://docs.tomorrow.io/reference/data-layers-weather-codes)
function fetchWeatherData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            curWeatherId = data.data.timelines[0].intervals[0].values.weatherCode
            console.log("The weather at " + latitude + ", " + longitude + " is: " + weatherCodes[curWeatherId])
            setWeatherIcon();
        })
        .then(function() { // video can now be loaded
            isReady = true;
        })
        .catch(() => { // video can now be loaded, although weather is unknown
            console.log("Weather could not be determined.");
            isReady = true;
        });
}

// user blocked location request
// video can now be loaded, although weather is unknown
function error() {
    isReady = true;
}

// helper function designed for testing weather in other locations
function setUrl(lat, lon) {
    url = `https://api.tomorrow.io/v4/timelines?location=${lat}%2C%20${lon}&fields=weatherCode&timesteps=current&apikey=${apiKey}` 
}

// sets weather icon based on weather conditions
function setWeatherIcon() {
    switch(curWeatherId) {
        case 1000:  case 1100:                                                                                      // clear skies
            displayWeatherIcon("sunny");
            break;
        case 1001:  case 1101:  case 1102:  case 2000:  case 2100:                                                  // cloudy
            displayWeatherIcon("cloudy");
            break;
        case 4000:  case 4001:  case 4200:  case 4201:  case 6000:  case 6001:  case 6200:  case 6201:  case 8000:  // rainy, but not snowy
            displayWeatherIcon("rainy");
            break;
        default:                                                                                                    // snowy
            displayWeatherIcon("snowy");
    }
}

// places weather icon on webpage, sunny being the default
function displayWeatherIcon(condition="sunny") {
    document.getElementById('weather-icon').src = `./images/${condition}.gif`;
}

// having these here makes it easier to record weather conditions in the console
const weatherCodes = {
    0: "unknown",
    1000: "clear",
    1100: "mostly clear",
    1101: "partly cloudy",
    1102: "mostly cloudy",
    1001: "cloudy",
    2000: "fog",
    2100: "light fog",
    4000: "drizzle",
    4001: "rain",
    4200: "light rain",
    4201: "heavy rain",
    5000: "snow",
    5001: "flurries",
    5100: "light snow",
    5101: "heavy snow",
    6000: "freezing drizzle",
    6001: "freezing rain",
    6200: "light freezing rain",
    6201: "heavy freezing rain",
    7000: "ice pellets",
    7101: "heavy ice pellets",
    7102: "light ice pellets",
    8000: "thunderstorm"
}