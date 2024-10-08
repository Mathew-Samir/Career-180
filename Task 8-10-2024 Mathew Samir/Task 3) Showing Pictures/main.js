const images = [
    "image/blog1.jpg",
    "image/blog2.jpg",
    "image/blog3.jpg",
    "image/branding-1.jpg"
];

let currentIndex = 0;
let slideInterval;

const imageDisplay = document.getElementById('imageDisplay');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const slideShowBtn = document.getElementById('slideShowBtn');
const stopBtn = document.getElementById('stopBtn');

// Show next image
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    imageDisplay.src = images[currentIndex];
}

// Show previous image
function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    imageDisplay.src = images[currentIndex];
}

// Start slideshow
function startSlideShow() {
    slideInterval = setInterval(showNextImage, 2000); // change image every 2 seconds
}

// Stop slideshow
function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);
slideShowBtn.addEventListener('click', startSlideShow);
stopBtn.addEventListener('click', stopSlideShow);
