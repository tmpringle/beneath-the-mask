// inspired by the tane.us animal crossing music website by Brian Lee (https://tane.us/ac/)

// you can change the amount of time (in minutes) between each weather/date check
// by modifying the constant below
const WAIT_TIME_FOR_STATUS_CHECK = 5;

// the amount of time (in ms) we wait for the weather status to update if it
// hasn't updated yet
const TIMEOUT_DURATION_FOR_UPDATES = 50;

// global variables are used to store previous weather/day conditions
var isRaining;
var isDay;

// used to test daytime changes (if dayOverride is true, it's daytime;
// if nightOverride is true, it's nighttime)
var dayOverride = null;
var nightOverride = null;

// used to test weather changes (just for the vid, for now)
var rainOverride = null;

// whether play button has been clicked once
var hasPlayButtonBeenClicked = false

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
    return curWeatherId > 3999 || rainOverride;
}

// returns video id based on weather/day conditions
function getSongId() {
    isRaining = getRaining();
    isDay = getDaytime();

    if (!isDay) {
        // nighttime
        return isRaining ? 3 : 1;
    } else {
        // daytime
        return isRaining ? 2 : 0;
    }
}

// waits for weather to be determined before looping/loading new video
function refreshVid() {
    if (isReady) {
        refreshPlayer();
    } else {
        setTimeout(refreshVid, TIMEOUT_DURATION_FOR_UPDATES);
    }
}

// loads new video and plays it
function refreshPlayer() {
    // player.loadVideoById(getVidId());
    // player.playVideo();
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
        setTimeout(compareWeather, TIMEOUT_DURATION_FOR_UPDATES);
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

// loads and starts first song
async function handlePlayButtonClicked() {
    if (!hasPlayButtonBeenClicked) {
        await prepareAudioContext();

        // sets start song based on daytime
        startSongId = getSongId();
        currentSongId = startSongId;

        await loadStartSong();

        initialStart();

        hasPlayButtonBeenClicked = true;
    }
}

// this is here to make sure the compareWeather function runs smoothly when only day/night changes are checked
isReady = true;

// checks on weather (and day/night changes) every 5 minutes
window.setInterval(weatherInterval, 1000 * 60 * WAIT_TIME_FOR_STATUS_CHECK);
