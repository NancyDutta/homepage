$(document).ready(function() {
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;
    const dots = $('.dot');

    // Function to update active dot indicator
    function updateDots() {
        dots.removeClass('active');
        dots.eq(currentSlide).addClass('active');
    }

    // Function to show a specific slide
    function showSlide(index) {
        const newTransform = `translateX(-${index * 100}%)`;
        $('.slide').css('transform', newTransform);
        updateDots();
    }

    // Function to rotate slides automatically
    function rotateSlides() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);

        // Clone and manage slides for infinite loop
        const firstSlide = $('.slides .slide').first();
        const secondSlide = firstSlide.next();
        const thirdSlide = secondSlide.next();
        const lastSlide = $('.slides .slide').last();

        firstSlide.after(secondSlide.clone());
        secondSlide.after(thirdSlide.clone());
        thirdSlide.after(firstSlide.clone());
        lastSlide.after(secondSlide.clone());

        firstSlide.remove();
        secondSlide.remove();
        thirdSlide.remove();

        updateDots();
    }

    // Click event for dots navigation
    dots.click(function() {
        currentSlide = $(this).data('slide');
        showSlide(currentSlide);
    });

    // Interval for automatic slide rotation
    setInterval(rotateSlides, 3000); // Change slide every 3 seconds

    // Initial slide display
    showSlide(currentSlide);

    // Background image change based on text animation
    const texts = document.querySelectorAll('.text');
    const backgroundImage = document.getElementById('background-image');

    texts.forEach((text, index) => {
        text.addEventListener('animationiteration', () => {
            if (index === 0) {
                backgroundImage.style.backgroundImage = "url('image/japan.webp')";
            } else if (index === 1) {
                backgroundImage.style.backgroundImage = "url('image/food.jpg')";
            } else if (index === 2) {
                backgroundImage.style.backgroundImage = "url('image/fruit.jpeg')";
            }
        });
    });

    // Modal Popup Form
    const modal = document.getElementById('popupForm');
    const btn = document.getElementById('contactBtn');
    const span = document.getElementById('closeBtn');

    btn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    span.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});
