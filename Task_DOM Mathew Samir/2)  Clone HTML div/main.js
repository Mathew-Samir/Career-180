// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Get the original div element
const originalDiv = document.getElementById('cloneDiv');

// Add event listener to the div for the 'click' event
originalDiv.addEventListener('click', function () {
    // Clone the clicked div
    const clonedDiv = originalDiv.cloneNode(true);

    // Generate a random color and apply it as the background color
    clonedDiv.style.backgroundColor = getRandomColor();

    // Append the cloned div to the body
    document.body.appendChild(clonedDiv);
});
