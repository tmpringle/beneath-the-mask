const playerStatusDiv = document.getElementById('player-status');

const statusTextElement = document.createElement('p');
const songNameElement = document.createElement('p');

function setLoadingText(audioStatus) {
    if(!statusTextElement.id) {
        statusTextElement.id = 'status-text';
        playerStatusDiv.append(statusTextElement);
    }

    statusTextElement.textContent = audioStatus;
}

function setNowPlayingText(event) {
    if (!songNameElement.id) {
        songNameElement.id = 'song-name';
        playerStatusDiv.append(songNameElement);
    }

    songNameElement.textContent = event.detail.songName;
}

eventBus.addEventListener('startedLoadingAudio', (e) => {
    let timeout = e.detail.firstLoad == true ? 100 : 0;

    if (timeout > 0) {
        setTimeout(() => {setLoadingText("Loading...")}, timeout);
    } else {
        setLoadingText("Loading...");
    }
});
eventBus.addEventListener('finishedLoadingAudio', () => {setLoadingText("Playing:");});
eventBus.addEventListener('playingNewSong', setNowPlayingText);