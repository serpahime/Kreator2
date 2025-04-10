document.addEventListener('DOMContentLoaded', function() {
    // Menu mobilne
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Efekt przewijania dla linków nawigacji
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('cta-button')) {
                // Dla przycisków CTA, przewiń natychmiast
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // Dla linków nawigacji, zamknij menu mobilne najpierw
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                
                setTimeout(() => {
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Efekt scrollu nagłówka
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animacja liczników
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const step = Math.ceil(target / (duration / 16)); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = current;
        }, 16);
    }

    // Animacja elementów czasu
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Efekty hover obrazów
    const images = document.querySelectorAll('.about-img, .future-img, .hero-img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease';
        });
    });

    // Podanie formularza
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Symulacja wysyłania formularza
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Wysyłanie...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Wysłano!';
                
                // Resetowanie formularza
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Pokaż komunikat sukcesu
                    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                }, 1500);
            }, 2000);
        });
    }

    // Animacja kropek
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 2}s`;
    });

    // Animacja na load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});