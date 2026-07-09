document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', function() {
        // Check if the item has already been clicked/revealed
        if (!this.classList.contains('revealed')) {
            // Get the text from the data-reason attribute
            const reasonText = this.getAttribute('data-reason');
            
            // Replace the number with the text
            this.textContent = reasonText;
            
            // Add a class for styling/animations
            this.classList.add('revealed');
        }
    });
});