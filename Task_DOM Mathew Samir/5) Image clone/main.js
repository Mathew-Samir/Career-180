document.getElementById('cloneButton').addEventListener('click', function () {
    const originalImage = document.getElementById('originalImage');

    // Clone the original image
    const clone = originalImage.cloneNode(true);
    clone.id = 'clonedImage'; // Change the ID for the cloned image
    clone.classList.add('clonedImage'); // Add class for styling

    // Append the cloned image to the body
    document.body.appendChild(clone);

    // Move the original image to the bottom left
    originalImage.style.transform = 'translateY(calc(100vh - 270px))'; // Adjust based on image size
});


