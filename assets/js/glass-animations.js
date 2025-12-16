/*
    GLASS ANIMATIONS ENGINE
    Scroll Reveals, Parallax, Floating Elements
*/

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallax();
    initCountUp();
});

// Scroll Reveal
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); // Stagger effect
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    reveals.forEach(reveal => observer.observe(reveal));
}

// Parallax Effect
function initParallax() {
    const blobs = document.querySelectorAll('.blob');
    const badges = document.querySelectorAll('.badge');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Blob parallax
        blobs.forEach((blob, index) => {
            const speed = 0.1 + (index * 0.05);
            blob.style.transform = `translate(0, ${scrolled * speed}px)`;
        });

        // Badge parallax
        badges.forEach((badge, index) => {
            const speed = 0.05 + (index * 0.02);
            const direction = index % 2 === 0 ? 1 : -1;
            badge.style.transform = `translateY(${scrolled * speed * direction}px)`;
        });
    });
}

// Count Up Animation
function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCount(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCount(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.ceil(current));
        }
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return num + '+';
}

// Smooth Mouse Parallax on Hero Card
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        heroCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
}
