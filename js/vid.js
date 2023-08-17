// inspired by the tane.us animal crossing music website by Brian Lee (https://tane.us/ac/)

// global variables are used to store previous weather/day conditions
var isRaining;
var isDay;

// used to test daytime changes (if dayOverride is true, it's daytime;
// if nightOverride is true, it's nighttime)
var dayOverride = null;
var nightOverride = null;

// used to test weather changes (just for the vid, for now)
var rainOverride = null;

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
    return (curWeatherId > 3999 || rainOverride);
}

// returns video id based on weather/day conditions
function getVidId() {
    isRaining = getRaining();
    isDay = getDaytime();

    if (!isDay) {
        // nighttime
        return isRaining ? vidIds[3] : vidIds[1];
    } else {
        // daytime
        return isRaining ? vidIds[2] : vidIds[0];
    }
}

// because of google's autoplay policy (and the fact that this page is not
// hosted on a server), the video won't autoplay. darn
var player;

// once API is ready, this function creates the iframe and loads proper video
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "324",
        width: "576",
        videoId: getVidId(),
        playerVars: {
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
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
        setTimeout(refreshVid, 50);
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

// checks on weather periodically (if weather-tracking isn't set up or
// location is blocked, only day/night changes are checked)
function weatherInterval() {
    checkNewWeather();
    compareWeather();
}

// confirms whether user would like the site to be tailored to the weather
// in their location
function weatherConfirm() {
    if (!isLocationSetUp) {
        let isWeatherConfirmed = confirm(
            "Would you like the video to change based on the weather where you are? We will not store or process your location data in any way."
        );

        if (isWeatherConfirmed) {
            isLocationSetUp = true;
            weatherStart();
        }
    }
}

// weather checking begins
function weatherStart() {
    isReady = false;

    // sets up location for first-time use
    getLocation();

    // resets the player now that weather-tracking is enabled
    refreshVid();
}

// this is here to make sure the compareWeather function runs smoothly when only day/night changes are checked
isReady = true;

// checks on weather (and day/night changes) every 5 minutes
// you can change the amount of time between each interval by modifying the number below
window.setInterval(weatherInterval, 1000 * 60 * 5);
