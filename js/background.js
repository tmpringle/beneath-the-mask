const backgroundVideoElement = document.getElementById('bg-video');

function startBackground() {
    backgroundVideoElement.classList.toggle('active');
    document.body.classList.toggle('active');
}

eventBus.addEventListener('playingNewSong', (e) => {
    if(e.detail.firstLoad){
        startBackground();
    }
})