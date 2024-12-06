// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Insights Slider
const insightsContainer = document.querySelector('.insights-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cardWidth = 300 + 32; // card width + gap

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        insightsContainer.scrollLeft -= cardWidth;
    });

    nextBtn.addEventListener('click', () => {
        insightsContainer.scrollLeft += cardWidth;
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate sections on scroll
const animatedSections = document.querySelectorAll('.about-content, .presence-grid, .work-item');
animatedSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Form Submission
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = subscribeForm.querySelector('.email-input');
        if (emailInput.value) {
            // Here you would typically send this to your backend
            alert('Thank you for subscribing!');
            emailInput.value = '';
        }
    });
}

// Dynamic Copyright Year
const copyrightYear = document.querySelector('.footer-bottom .terms');
if (copyrightYear) {
    copyrightYear.textContent = `© ${new Date().getFullYear()} SPACIO TECHTONICS`;
}

// Image Lazy Loading
const images = document.querySelectorAll('img[data-src]');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => imageObserver.observe(img));

// Carousel Auto-Scroll
let autoScrollInterval;
const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
        insightsContainer.scrollLeft += cardWidth;
        if (insightsContainer.scrollLeft >= insightsContainer.scrollWidth - insightsContainer.clientWidth) {
            insightsContainer.scrollLeft = 0;
        }
    }, 5000);
};

const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
};

if (insightsContainer) {
    startAutoScroll();
    insightsContainer.addEventListener('mouseenter', stopAutoScroll);
    insightsContainer.addEventListener('mouseleave', startAutoScroll);
}

// Handle Window Resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    }, 250);
});