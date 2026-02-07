// web audio api thingamabobs
// i have a array of audio context sources for each version of the Behind The Mask song
var audioCtx;
var sourceArray = [null, null, null, null];

// these gain nodes will be used to control transitions between tracks
var gainNodeArray = [null, null, null, null];

// holds the AudioBuffers for all songs, in order of:
// 0 - clear day
// 1 - clear night
// 2 - rainy day
// 3 - rainy night
var songBufferArray = [null, null, null, null]

// identifies the current song ID
var currentSongId;

// song info
const songs = [
    {
        "name": "Beneath the Mask -instrumental version-",
        "link": "audio/btm_clear_day.mp3"
    },
    {
        "name": "Beneath the Mask",
        "link": "audio/btm_clear_night.mp3"
    },
    {
        "name": "Beneath the Mask -rain, instrumental version-",
        "link": "audio/btm_rainy_day.mp3"
    },
    {
        "name": "Beneath the Mask -rain-",
        "link": "audio/btm_rainy_night.mp3"
    }
]

// used to help calculate the current position in the song
var startTime;
const LENGTH_OF_SONG_IN_MILLISECONDS = 259464

// gets web audio api stuff ready
function prepareAudioContext(startSongId) {
    audioCtx = new window.AudioContext();

    // initialize all gain nodes and connect them to output
    for (let j = 0; j < 4; j++) {
        gainNodeArray[j] = audioCtx.createGain();
        gainNodeArray[j].connect(audioCtx.destination);
    }

    // sets the volume for the start song to 100%
    gainNodeArray[startSongId].gain.value = 1;
}

// actually plays the audio
function initialStart() {
    sourceArray[currentSongId].start();
    startTime = Date.now();

    eventBus.dispatchEvent(new CustomEvent('playingNewSong', {
        detail: {
            songName: songs[currentSongId].name
        }
    }));
}

// in milliseconds, since the first track started playing (NOT WITHIN THE LOOP)
function getTimeSinceFirstSongStarted() {
    return Date.now() - startTime;
}

// loads song based on passed-in song ID
async function loadSong(
    songId,
    onFirstLoad=false
) {
    // don't reload song if we're already playing it
    if (!onFirstLoad && songId == currentSongId) {
        console.log("Selected song already playing")
        return;
    }

    eventBus.dispatchEvent(new CustomEvent('startedLoadingAudio', {
        detail: {
            firstLoad: onFirstLoad
        }
    }));

    // download song if we haven't already
    if (songBufferArray[songId] == null) {
        const arrayBuffer = await fetch(songs[songId].link,
        ).then((res) => res.arrayBuffer()).catch(e => {
            console.log(e);
        });
    
        songBufferArray[songId] = await audioCtx.decodeAudioData(arrayBuffer);
    }

    // (re)create buffer source node for song
    sourceArray[songId] = audioCtx.createBufferSource();

    // set buffer for downloaded song to proper source
    sourceArray[songId].buffer = songBufferArray[songId]
    sourceArray[songId].loop = true;
    sourceArray[songId].connect(gainNodeArray[songId]);

    console.log(`${songs[songId].name} loaded`)
    eventBus.dispatchEvent(new CustomEvent('finishedLoadingAudio'));
}

async function initialLoadSong() {
    await loadSong(
        songId=currentSongId,
        onFirstLoad=true
    );
}

// song IDs:
// 0 - clear day
// 1 - clear night
// 2 - rainy day
// 3 - rainy night
//
// uses the Web Audio API to transition between songs
function fadeInto(nextSongId) {
    // don't allow a track to fade into itself
    if (currentSongId == nextSongId) {
        return;
    }

    let timeSinceFirstSongStarted = getTimeSinceFirstSongStarted()
    let posToSeekTo = (timeSinceFirstSongStarted % LENGTH_OF_SONG_IN_MILLISECONDS) / 1000;

    // setting the gain/volume just to be safe
    gainNodeArray[currentSongId].gain.setValueAtTime(1, audioCtx.currentTime);
    gainNodeArray[nextSongId].gain.setValueAtTime(0, audioCtx.currentTime);

    // fade out current song and fade in next song over 3 seconds
    gainNodeArray[currentSongId].gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3);
    gainNodeArray[nextSongId].gain.linearRampToValueAtTime(1, audioCtx.currentTime + 3);

    sourceArray[nextSongId].start(0, posToSeekTo);
    sourceArray[currentSongId].stop(audioCtx.currentTime + 3.01);

    currentSongId = nextSongId;
    eventBus.dispatchEvent(new CustomEvent('playingNewSong', {
        detail: {
            songName: songs[currentSongId].name
        }
    }));
}