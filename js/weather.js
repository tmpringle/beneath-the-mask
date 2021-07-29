// uses the OpenWeather Current Weather Data API (https://openweathermap.org/current)

const apiKey = "YOUR_KEY_HERE";
var url;

// identifies weather using condition codes (https://openweathermap.org/weather-conditions)
var curWeatherId;

// marks when weather-gathering code is finished so video id can be chosen
var isReady;

// if a user blocks the location request, the website won't check the weather for the rest of their visit
var isLocationBlocked;

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
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    setUrl(latitude, longitude);

    fetchWeatherData();
}

// fetches the current weather conditions from the OpenWeather API
// uses condition codes (https://openweathermap.org/weather-conditions)
function fetchWeatherData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            curWeatherId = data.weather[0]["id"];
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
function error() {
    isLocationBlocked = true;

    // video can now be loaded, although weather is unknown
    isReady = true;
}

// helper functions designed for testing weather in other locations
// to test changes in weather, use these functions in browser console
// visit https://openweathermap.org/current for more info on the API calls
function setUrl(lat, lon) {
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`
}

function setCityUrl(city) {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
}

function setCityIdUrl(cityId) {
    url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey}`
}

// sets weather icon based on weather conditions
function setWeatherIcon() {
    if (curWeatherId < 599) {           // rainy, but now snowy
        displayWeatherIcon("rainy");
    } else if (curWeatherId < 700) {    // snowy
        displayWeatherIcon("snowy");
    } else if (curWeatherId === 800) {  // clear skies
        displayWeatherIcon("sunny");
    } else {                            // cloudy
        displayWeatherIcon("cloudy");
    }
}

// places weather icon on webpage
function displayWeatherIcon(condition) {
    document.getElementById('weather-icon').src = `./images/${condition}.gif`;
}
