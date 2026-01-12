document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Typing Effect
    const subtitleElement = document.querySelector('.subtitle');
    const roles = ["Software Engineer", "Full Stack Developer", "Distributed Systems Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        // Create the cursor element if it doesn't exist
        if (subtitleElement && !subtitleElement.querySelector('.typing-cursor')) {
            const cursor = document.createElement('span');
            cursor.classList.add('typing-cursor');
            subtitleElement.appendChild(cursor);
        }

        if (!subtitleElement) return;

        const currentRole = roles[roleIndex];

        let textContent = isDeleting
            ? currentRole.substring(0, charIndex - 1)
            : currentRole.substring(0, charIndex + 1);

        // Update text safely
        if (subtitleElement.firstChild && subtitleElement.firstChild.nodeType === Node.TEXT_NODE) {
            subtitleElement.firstChild.textContent = textContent;
        } else {
            // If empty, insert text node
            if (subtitleElement.firstChild) {
                subtitleElement.insertBefore(document.createTextNode(textContent), subtitleElement.firstChild);
            } else {
                subtitleElement.textContent = textContent;
            }
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        } else {
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            typeSpeed = isDeleting ? 50 : 100;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Initial start
    if (subtitleElement) {
        setTimeout(typeEffect, 1000);
    }

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const icon = themeBtn.querySelector('i');

            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'dark');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }
});
