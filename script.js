/* ===================================
   WEBLIXY DEVNORA SOLUTION SCRIPTS
   Vanilla JavaScript - Interactive Features
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // === MOBILE NAVIGATION TOGGLE === //
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // === NAVBAR SCROLL EFFECT === //
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === SMOOTH SCROLL FOR ANCHOR LINKS === //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // === INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS === //
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .value-card, .pricing-card, .stat-card, .process-step, .expect-step, .help-card, .faq-item, .tech-card, .skill-category');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // === ACTIVE NAVIGATION HIGHLIGHTING === //
    function updateActiveNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateActiveNav();

    // === PRICING CARD HOVER EFFECT === //
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // === SERVICE CARDS STAGGER ANIMATION === //
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 100);
    });

    // === SCROLL TO TOP FUNCTIONALITY === //
    // Create scroll to top button dynamically
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.5)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.3)';
    });

    // === PARALLAX EFFECT FOR HERO SECTION === //
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const orbs = hero.querySelectorAll('.glow-orb');
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.3;
                orb.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }

    // === EMAIL LINK CLICK TRACKING (Console Log) === //
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email contact initiated: ' + this.getAttribute('href'));
        });
    });

    // === FORM VALIDATION (if forms are added later) === //
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b35';
                } else {
                    input.style.borderColor = '#00d4ff';
                }
            });

            if (isValid) {
                console.log('Form submitted successfully');
                // Add form submission logic here
            } else {
                alert('Please fill in all required fields');
            }
        });
    });

    // === LAZY LOADING FOR IMAGES === //
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add fade-in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in';
                
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });

                // If image is already loaded
                if (img.complete) {
                    img.style.opacity = '1';
                }

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // === DYNAMIC YEAR IN FOOTER === //
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} Weblixy Devnora Solution. All rights reserved.`;
    }

    // === CARD TILT EFFECT (SUBTLE 3D) === //
    const cards = document.querySelectorAll('.pricing-card, .service-card, .mv-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === STATS COUNTER ANIMATION === //
    const statNumbers = document.querySelectorAll('.stat-card h3');
    
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetText = target.textContent;
                const hasPlus = targetText.includes('+');
                const number = parseInt(targetText.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = number + (hasPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                        }
                    }, 30);
                }
                
                countUpObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        countUpObserver.observe(stat);
    });

    // === PRICING TAG ANIMATION === //
    const businessTags = document.querySelectorAll('.tag');
    
    businessTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        tag.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, index * 30);
    });

    // === SOCIAL LINK HOVER EFFECT === //
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('svg').style.transform = 'rotate(360deg)';
            this.querySelector('svg').style.transition = 'transform 0.5s ease';
        });

        link.addEventListener('mouseleave', function() {
            this.querySelector('svg').style.transform = 'rotate(0deg)';
        });
    });

    // === CONSOLE WELCOME MESSAGE === //
    console.log('%c Welcome to Weblixy Devnora Solution! ', 'background: linear-gradient(135deg, #00d4ff, #ff6b35); color: white; font-size: 20px; padding: 10px; font-weight: bold;');
    console.log('%c Built with ❤️ using HTML, CSS, and Vanilla JavaScript ', 'background: #0a0e27; color: #00d4ff; font-size: 14px; padding: 5px;');
    console.log('%c Founder: Numaan Khan | Email: weblixydevnorasolutions@gmail.com ', 'color: #b8c1ec; font-size: 12px;');

    // === PERFORMANCE MONITORING === //
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });

});

// === UTILITY FUNCTIONS === //

/**
 * Debounce function to limit the rate of function execution
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit the rate of function execution
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get scroll percentage
 */
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}

// === OPTIMIZED SCROLL HANDLER === //
const optimizedScroll = throttle(function() {
    const scrollPercent = getScrollPercentage();
    // Can be used for progress bars or other scroll-based features
    console.log(`Scroll: ${scrollPercent.toFixed(2)}%`);
}, 100);

// Uncomment to enable scroll percentage logging
// window.addEventListener('scroll', optimizedScroll);