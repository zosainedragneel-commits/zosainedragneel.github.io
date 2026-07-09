let currentAudio = null;
let currentPlayingItem = null;

document.querySelectorAll('.song-item').forEach(item => {
    item.addEventListener('click', function() {
        
        // 1. If this card is already revealed, clicking it acts as a Play/Pause button
        if (this.classList.contains('revealed')) {
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                this.style.opacity = "0.85"; // Dim slightly to show it's paused
            } else if (currentAudio) {
                currentAudio.play();
                this.style.opacity = "1";
            }
            return;
        }

        // 2. Stop and reset any other song card currently playing
        if (currentAudio) {
            currentAudio.pause();
            if (currentPlayingItem) {
                currentPlayingItem.classList.remove('revealed');
                currentPlayingItem.style.opacity = "1";
            }
        }

        // 3. Expand the clicked card
        this.classList.add('revealed');
        currentPlayingItem = this;

        // 4. Fetch the audio source and custom timestamps inside .card-content
        const cardContent = this.querySelector('.card-content');
        const audioSrc = cardContent.getAttribute('data-audio');
        const startTime = parseFloat(cardContent.getAttribute('data-start')) || 0;
        const endTime = parseFloat(cardContent.getAttribute('data-end')) || null;

        // 5. Initialize and play the track
        currentAudio = new Audio(audioSrc);
        
        currentAudio.addEventListener('loadedmetadata', () => {
            currentAudio.currentTime = startTime;
            currentAudio.play();
        });

        // 6. Monitor time changes to stop the song if it passes the 'data-end' mark
        currentAudio.addEventListener('timeupdate', () => {
            if (endTime && currentAudio.currentTime >= endTime) {
                resetCard(this);
            }
        });

        // Reset if the song finishes playing entirely
        currentAudio.addEventListener('ended', () => {
            resetCard(this);
        });
    });
});

// Helper function to safely shrink the card back down and kill the audio instance
function resetCard(item) {
    if (currentAudio) {
        currentAudio.pause();
    }
    item.classList.remove('revealed');
    item.style.opacity = "1";
    currentAudio = null;
    currentPlayingItem = null;
}