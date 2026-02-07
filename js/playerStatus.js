const statusTextElement = document.getElementById('status-text');
const songNameElement = document.getElementById('song-name');

function setLoadingText(audioStatus) {
    statusTextElement.textContent = audioStatus;
}

function setNowPlayingText(event) {
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
eventBus.addEventListener('finishedLoadingAudio', () => {setLoadingText("Playing...");});
eventBus.addEventListener('playingNewSong', setNowPlayingText);