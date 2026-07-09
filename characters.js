let currentOpenChar = null;

document.querySelectorAll('.char-item').forEach(item => {
    item.addEventListener('click', function() {
        
        // If it's already open, do nothing or let it stay open
        if (this.classList.contains('revealed')) return;

        // 1. Close the previously open character profile card
        if (currentOpenChar) {
            currentOpenChar.classList.remove('revealed');
        }

        // 2. Open this character profile card
        this.classList.add('revealed');
        currentOpenChar = this;
    });
});