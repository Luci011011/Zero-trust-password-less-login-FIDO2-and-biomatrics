// Smooth scroll for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.content-card, .tech-card, .benefit-card, .impl-card, .flow-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add active state to navigation links
const sections = document.querySelectorAll('.section, .hero, .cta-section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id') || section.className;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current.includes('hero') && href === '#overview')) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to flow steps
document.querySelectorAll('.flow-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.querySelector('.flow-number').style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.querySelector('.flow-number').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add counter animation to stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target === Infinity ? '∞' : target + (target === 100 ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 100 ? '%' : '');
        }
    }, 16);
};

// Observe CTA stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text === '100%') {
                    animateCounter(stat, 100);
                } else if (text === '0') {
                    stat.textContent = '0';
                } else if (text === '∞') {
                    stat.textContent = '∞';
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const ctaStats = document.querySelector('.cta-stats');
if (ctaStats) {
    statsObserver.observe(ctaStats);
}

// Add typing effect to hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    // Simple fade-in instead of typing for better performance
    setTimeout(() => {
        heroTitle.innerHTML = text;
    }, 300);
}

console.log('Zero Trust Passwordless Authentication - Page Loaded');

