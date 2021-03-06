// inspired by the tane.us animal crossing music website by Brian Lee (https://tane.us/ac/)

// global variables are used to store previous weather/day conditions
var isRaining;
var isDay;

// used to test daytime changes (if dayOverride is true, it's daytime; if nightOverride is true, it's nighttime)
var dayOverride = null;
var nightOverride = null;

// self-explanatory
function getCurrentHour() {
    return new Date().getHours();
}

// returns whether it's daytime
function getDaytime() {
    let hour = getCurrentHour();

    if (dayOverride) {
        return true;
    } else if (nightOverride) {
        return false;
    }
    
    if (hour >= 18 || hour < 6) {
        return false;
    } else {
        return true;
    }
}

// returns where it's raining/snowing
function getRaining() {
    if (curWeatherId < 700) { // raining or snowing
        return true;
    } else {                  // not raining/snowing or weather unknown
        return false;
    }
}

// returns video id based on weather/day conditions
function getVidId() {
    isRaining = getRaining();
    isDay = getDaytime();

    if (!isDay) { // nighttime
        if (isRaining) {
            console.log("Rainy/snowy night");
            return vidIds[3];
        } else {
            console.log("Clear/cloudy night");
            return vidIds[1];
        }
    } else { // daytime
        if (isRaining) {
            console.log("Rainy/snowy day");
            return vidIds[2];
        } else {
            console.log("Clear/cloudy day");
            return vidIds[0];
        }
    }
}

// because of google's autoplay policy (and the fact that this page is not hosted on a server), the video won't autoplay. darn
var player;

// once API is ready...
function onYouTubeIframeAPIReady() {
    // waits for location to be determined (using isReady variable and timeout, see weather.js)
    // then creates iframe and loads proper video
    if (isReady) {
        player = new YT.Player('player', {
            height: '324',
            width: '576',
            videoId: getVidId(),
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        setTimeout(onYouTubeIframeAPIReady, 50);
    }
}

// plays video once it's ready on first-time use
function onPlayerReady(event) {
    player.playVideo();
}

// loops video when it ends; checks weather first
function onPlayerStateChange(event) {
    if (event.data === 0) {
        checkNewWeather();
        refreshVid();
    }
}

// waits for weather to be determined before looping/loading new video
function refreshVid() {
    if (isReady) {
        refreshPlayer();
    } else {
        setTimeout(refreshVid, 50)
    }
}

// loads new video and plays it
function refreshPlayer() {
    player.loadVideoById(getVidId());
    player.playVideo();
}

// fetches weather data from API
function checkNewWeather() {
    if (!isLocationBlocked) {
        isReady = false;
        fetchWeatherData();
    }
}

// checks on weather periodically
function weatherInterval() {
    checkNewWeather();
    compareWeather();
}

// compares new weather conditions to old
function compareWeather() {
    let isRainingNow;
    let isDayNow;

    if (isReady) {
        isRainingNow = getRaining();
        isDayNow = getDaytime();

        // loads new video if conditions changed
        if (isRaining != isRainingNow || isDay != isDayNow) {
            refreshPlayer();
        }
    } else {
        setTimeout(compareWeather, 50);
    }
}

// sets up location for first-time use
// ensures video starts playing
getLocation();

// checks on weather (and day/night changes) every 5 minutes
// you can change the amount of time between each interval by modifying the number below
window.setInterval(weatherInterval, 300000);
