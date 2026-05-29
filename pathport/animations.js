const backgroundImages = [
    'images/Swayambhunath.jpg',
    'images/boudha stupa.jpg',
    'images/boudha stupa1.jpg',
    'images/durbarsquare.jpg',
    'images/durbarsquare1.jpg',
    'images/durbar square2.jpg',
    'images/durbarsquare3.jpg'
];

let currentImageIndex = 0;
const heroSection = document.getElementById('heroSlider');

function changeHeroBackground() {
    if (!heroSection) {
        return;
    }

    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    const targetUrl = backgroundImages[currentImageIndex];
    const safeUrl = targetUrl.replace(/ /g, '%20');

    heroSection.style.backgroundImage = `linear-gradient(rgba(13, 110, 253, 0.45), rgba(0, 0, 0, 0.75)), url('${safeUrl}')`;
}

function initDestinationSliders() {
    const sliders = document.querySelectorAll('.destination-photo-slider');

    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll('img');

        if (slides.length < 2) {
            return;
        }

        let activeSlideIndex = 0;

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === activeSlideIndex);
        });

        setInterval(() => {
            activeSlideIndex = (activeSlideIndex + 1) % slides.length;

            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === activeSlideIndex);
            });
        }, 3000);
    });
}

function openInfoModal(title, imgSrc, description) {
    const overlay = document.getElementById('infoModal');

    if (!overlay) {
        return;
    }

    const box = overlay.querySelector('.modal-box');

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalDesc').innerText = description;

    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.style.opacity = '1';
        box.style.transform = 'scale(1)';
    }, 20);
}

function closeInfoModal(event) {
    if (event) {
        event.stopPropagation();
    }

    const overlay = document.getElementById('infoModal');

    if (!overlay) {
        return;
    }

    const box = overlay.querySelector('.modal-box');

    overlay.style.opacity = '0';
    box.style.transform = 'scale(0.8)';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

export function initAnimations() {
    if (heroSection) {
        changeHeroBackground();
        setInterval(changeHeroBackground, 5000);
    }

    initDestinationSliders();

    window.openInfoModal = openInfoModal;
    window.closeInfoModal = closeInfoModal;
}
