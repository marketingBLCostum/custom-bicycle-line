// Smooth scrolling for navigation links
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

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Intersection Observer for slide-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all slide-in elements
document.querySelectorAll('.slide-in').forEach(el => {
    observer.observe(el);
});

// Global variable to track form submission
let formSubmitted = false;

// Form elements
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Show success message and reset form
function showSuccessMessage() {
    if (formSubmitted) {
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();
        
        // Reset button state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Invia Richiesta';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
        
        // Scroll to show success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset flag
        formSubmitted = false;
    }
}

// Client-side validation before form submission
contactForm.addEventListener('submit', function(e) {
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        sport: document.getElementById('sport').value,
        message: document.getElementById('message').value.trim(),
        privacy: document.getElementById('privacy').checked
    };

    // Validation
    let isValid = true;
    let errorMessage = '';

    if (!formData.name || formData.name.length < 2) {
        errorMessage = 'Il nome deve contenere almeno 2 caratteri.';
        isValid = false;
    } else if (!formData.surname || formData.surname.length < 2) {
        errorMessage = 'Il cognome deve contenere almeno 2 caratteri.';
        isValid = false;
    } else if (!formData.email || !isValidEmail(formData.email)) {
        errorMessage = 'Inserisci un\'email valida.';
        isValid = false;
    } else if (!formData.sport) {
        errorMessage = 'Seleziona uno sport di interesse.';
        isValid = false;
    } else if (!formData.message || formData.message.length < 10) {
        errorMessage = 'Il messaggio deve contenere almeno 10 caratteri.';
        isValid = false;
    } else if (!formData.privacy) {
        errorMessage = 'Devi accettare la privacy policy.';
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault(); // Prevent form submission
        showError(errorMessage);
        return false;
    }
    
    // If validation passes, prepare for submission
    formSubmitted = true;
    
    // Show loading state on the submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Invio in corso...';
    
    // The form will be submitted to the hidden iframe
    // The iframe's onload event will handle showing the success message
    
    return true;
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    
    contactForm.insertBefore(errorDiv, contactForm.firstChild);

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);

    // Scroll to top of form
    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add hover effects to sport cards
document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('shadow-xl');
    } else {
        nav.classList.remove('shadow-xl');
    }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Parallax effect removed - hero section stays fixed

// Counter animation for statistics (if added in the future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
});

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

// Apply debounce to scroll events (parallax removed)

console.log('Bicycle Line - Landing page loaded successfully!');
