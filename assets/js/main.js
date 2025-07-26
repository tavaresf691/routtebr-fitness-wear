// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Auto slide hero
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }

    // Product Carousels
    function setupCarousel(carouselSelector) {
        const carousels = document.querySelectorAll(carouselSelector);
        
        carousels.forEach(carousel => {
            const grid = carousel.querySelector('.products-grid, .kits-grid, .testimonials-grid');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');
            
            if (!grid || !prevBtn || !nextBtn) return;
            
            let scrollAmount = 0;
            const itemWidth = 320; // Approximate width including gap
            
            nextBtn.addEventListener('click', () => {
                scrollAmount += itemWidth;
                if (scrollAmount > grid.scrollWidth - grid.clientWidth) {
                    scrollAmount = 0;
                }
                grid.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            prevBtn.addEventListener('click', () => {
                scrollAmount -= itemWidth;
                if (scrollAmount < 0) {
                    scrollAmount = grid.scrollWidth - grid.clientWidth;
                }
                grid.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        });
    }

    setupCarousel('.products-carousel');
    setupCarousel('.kits-carousel');
    setupCarousel('.testimonials-carousel');

    // Popup Modal
    const popup = document.getElementById('discountPopup');
    const popupClose = document.querySelector('.popup-close');
    const popupForm = document.querySelector('.popup-form');

    // Show popup after 2 seconds
    setTimeout(() => {
        if (popup) {
            popup.style.display = 'flex';
        }
    }, 2000);

    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    if (popupForm) {
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cupom ativado com sucesso! Verifique seu e-mail.');
            popup.style.display = 'none';
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Obrigado por se inscrever! Você receberá nossas novidades em breve.');
            newsletterForm.reset();
        });
    }

    // Image Error Handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
            img.alt = 'Imagem não disponível';
        });
    });

    // Smooth Scrolling for Navigation Links
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

    // Add to Cart Simulation
    document.querySelectorAll('.kit-btn, .banner-btn, .cta-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Produto adicionado ao carrinho!');
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                alert(`Buscando por: ${searchInput.value}`);
                searchInput.value = '';
            }
        });
    }

    // Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Performance Optimization - Debounce Scroll Events
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

    // Handle Resize Events
    const handleResize = debounce(() => {
        // Reset scroll positions on resize
        document.querySelectorAll('.products-grid, .kits-grid, .testimonials-grid').forEach(grid => {
            grid.scrollLeft = 0;
        });
    }, 250);

    window.addEventListener('resize', handleResize);

    // Initialize
    console.log('ROUTTEBR website loaded successfully!');
});

// Error Handling for External Resources
window.addEventListener('error', (e) => {
    console.warn('Resource failed to load:', e.filename || e.target.src);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker registration failed');
        });
    });
}
