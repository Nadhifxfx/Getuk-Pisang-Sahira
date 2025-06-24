// Main JavaScript for Getuk Pisang Sahira Website

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Initialize all components
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initImageGallery();
    initContactForm();
    initStoreStatus();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/95', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white/95', 'shadow-lg');
            navbar.classList.add('bg-transparent');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
}

// Scroll effects (scroll to top button)
function initScrollEffects() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Image gallery functionality
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            imageModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functionality
    const closeModalFunc = () => {
        imageModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };
    
    closeModal.addEventListener('click', closeModalFunc);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModalFunc();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
            closeModalFunc();
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const loadingText = document.getElementById('loading-text');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        loadingText.classList.remove('hidden');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        // Validate form
        if (validateForm(data)) {
            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission(data);
                
                // Show success message
                showMessage('success', 'Pesan Anda berhasil dikirim! Kami akan segera merespons.');
                contactForm.reset();
                
                // Send to WhatsApp as backup
                const whatsappMessage = `Halo! Saya ${data.name}%0A%0AEmail: ${data.email}%0ATelepon: ${data.phone}%0A%0APesan: ${data.message}`;
                setTimeout(() => {
                    window.open(`https://wa.me/6281234567890?text=${whatsappMessage}`, '_blank');
                }, 1000);
                
            } catch (error) {
                showMessage('error', 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.');
            }
        }
        
        // Reset button state
        setTimeout(() => {
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }, 2000);
    });
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.classList.remove('input-error', 'input-success');
            
            if (input.required && !input.value.trim()) {
                input.classList.add('input-error');
                isValid = false;
            } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                input.classList.add('input-error');
                isValid = false;
            } else if (input.value.trim()) {
                input.classList.add('input-success');
            }
        });
        
        return isValid;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show success/error messages
    function showMessage(type, message) {
        // Remove existing messages
        const existingMessages = contactForm.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        
        // Insert message before form
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Simulate form submission
    async function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve('Success');
                } else {
                    reject('Error');
                }
            }, 2000);
        });
    }
}

// Store status functionality
function initStoreStatus() {
    const storeStatusElement = document.getElementById('store-status');
    
    function updateStoreStatus() {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentHour = now.getHours();
        
        let isOpen = false;
        
        // Check if store is open (Monday-Friday: 8-18, Saturday-Sunday: 8-20)
        if (currentDay >= 1 && currentDay <= 5) { // Monday to Friday
            isOpen = currentHour >= 8 && currentHour < 18;
        } else { // Saturday and Sunday
            isOpen = currentHour >= 8 && currentHour < 20;
        }
        
        if (isOpen) {
            storeStatusElement.textContent = 'Toko sedang buka';
            storeStatusElement.classList.add('store-open');
            storeStatusElement.classList.remove('store-closed');
        } else {
            storeStatusElement.textContent = 'Toko sedang tutup';
            storeStatusElement.classList.add('store-closed');
            storeStatusElement.classList.remove('store-open');
        }
    }
    
    // Update status immediately and every minute
    updateStoreStatus();
    setInterval(updateStoreStatus, 60000);
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// WhatsApp order functionality
function orderWhatsApp(productName, price, quantity) {
    let message = '';
    
    if (productName === 'Info Lokasi') {
        message = 'Halo! Saya ingin menanyakan lokasi toko Getuk Pisang Sahira. Bisakah Anda memberikan informasi detail lokasi dan cara menuju ke sana?';
    } else {
        message = `Halo! Saya ingin memesan:%0A%0A` +
                 `Produk: ${productName}%0A` +
                 `Harga: Rp ${price.toLocaleString('id-ID')}%0A` +
                 `Jumlah: ${quantity} biji%0A%0A` +
                 `Mohon informasi ketersediaan dan cara pembayarannya. Terima kasih!`;
    }
    
    const whatsappUrl = `https://wa.me/081233966883?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Google Maps functionality
function openGoogleMaps() {
    const mapsUrl = 'https://maps.app.goo.gl/2NnAHhS6QqdkV8vbA';
    window.open(mapsUrl, '_blank');
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('img-placeholder');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
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

// Add performance monitoring
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would be implemented with a library like web-vitals
        console.log('Performance monitoring initialized');
    }
}

// Service Worker registration for PWA capabilities (optional)
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Press 'h' to go to home
        if (e.key === 'h' && !e.ctrlKey && !e.altKey) {
            const target = document.querySelector('#home');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Press 'p' to go to products
        if (e.key === 'p' && !e.ctrlKey && !e.altKey) {
            const target = document.querySelector('#products');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Press 'c' to go to contact
        if (e.key === 'c' && !e.ctrlKey && !e.altKey) {
            const target = document.querySelector('#contact');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // This would integrate with Google Analytics or other analytics platforms
    console.log('Event tracked:', eventName, eventData);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// Export functions for testing or external use
window.GetukPisangSahira = {
    orderWhatsApp,
    openGoogleMaps,
    trackEvent
};