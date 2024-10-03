document.addEventListener('DOMContentLoaded', function () {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav1');
        
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
});
    


document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.logo img');
    const navbar = document.querySelector('nav');
    
    // Ensure logo and navbar are selected correctly
    if (!logo || !navbar) {
        console.error("Logo or Navbar not found");
        return;
    }

    // Hide logo on scroll for larger screens
    window.addEventListener('scroll', function () {
        console.log("Scroll Y:", window.scrollY, "Navbar OffsetTop:", navbar.offsetTop);
        
        // Check the scroll position
        if (window.scrollY > 580) {  // Adjust scroll value for testing
            logo.classList.add('hidden'); // Add 'hidden' class to hide logo
        } else {
            logo.classList.remove('hidden'); // Remove 'hidden' class to show logo again
        }
    });
});
