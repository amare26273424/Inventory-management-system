const menuLinks = document.querySelectorAll('nav ul li a');
        const checkbox = document.getElementById('check');

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    checkbox.checked = false;
                }
            });
        });
//home page background img
        const backgroundImages = document.querySelectorAll('.background-image');
let currentImageIndex = 0;

function changeBackgroundImage() {
  backgroundImages[currentImageIndex].classList.remove('active');
  
  currentImageIndex++;
  
  if (currentImageIndex >= backgroundImages.length) {
    currentImageIndex = 0;
  }
  
  backgroundImages[currentImageIndex].classList.add('active');
}

setInterval(changeBackgroundImage, 3000);
//table pagination


//footer
        // Make the footer stick to the bottom of the page
const body = document.querySelector('body');
const footer = document.querySelector('footer');

if (body.offsetHeight + footer.offsetHeight < window.innerHeight) {
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
}

// Smooth scroll to top when the "back to top" button is clicked
const backToTopBtn = document.querySelector('.back-to-top');

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
