// helps track whether mouse is being held down outside of the play button
var isMouseDown = false;

function initializePlayButton() {
    const playButton = document.getElementById("play-button");

    // Image URLs
    const unpressedButton = "./images/play-button.png";
    const pressedButton = "./images/play-button-pressed.png";

    // when user clicks the button and is holding down the button
    playButton.addEventListener('mousedown', () => {
        // Switch to the pressed state
        isMouseDown = true;
        playButton.style.backgroundImage = `url('${pressedButton}')`;
    });

    // start loading audio once user lets go of mouse click
    document.addEventListener('mouseup', () => {
        if (isMouseDown) {
            // visual stuff 
            isMouseDown = false;
            playButton.style.backgroundImage = `url('${unpressedButton}')`;

            beginAudio();

            // TODO - do a fade transition instead?
            setTimeout(() => {document.getElementById('play-button').remove()}, 100);
        }
    });

    // remove play button if weather button is clicked first
    eventBus.addEventListener('weatherStartedBeforePlayClicked', () => {
        beginAudio();

        // TODO - do a fade transition instead?
        setTimeout(() => {document.getElementById('play-button').remove()}, 100);
    });
}