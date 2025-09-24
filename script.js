// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Loading animation
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const lionImage = document.getElementById('lionImage');
    
    let progress = 0;
    const loadingDuration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const increment = (100 / (loadingDuration / interval));
    
    // Play roar sound when loading starts (optional)
    const roarSound = new Audio('Assets/Other/roar.mp3');
    roarSound.volume = 0.3;
    
    setTimeout(() => {
        if (window.soundEnabled !== false) {
            roarSound.play().catch(e => console.log('Audio play failed:', e));
        }
    }, 1000);
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Final roar effect
            lionImage.style.transform = 'scale(3)';
            lionImage.style.filter = 'drop-shadow(0 0 60px rgba(255, 165, 0, 1))';
            
            // Complete loading animation
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.remove('loading');
                
                // Remove loading screen from DOM after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 800);
        }
        
        // Update progress bar
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        // Add loading growth class to disable pulse animation
        lionImage.classList.add('loading-growth');
        
        // Make lion grow bigger as loading progresses
        const scale = 1 + (progress / 100) * 2; // Grows from 1x to 3x
        const glowIntensity = 10 + (progress / 100) * 50; // Glow grows stronger
        const glowOpacity = 0.3 + (progress / 100) * 0.7;
        
        lionImage.style.transform = `scale(${scale})`;
        lionImage.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 165, 0, ${glowOpacity}))`;
        
        // Update the glow background
        const lionAnimation = document.querySelector('.lion-animation');
        if (lionAnimation) {
            const glowScale = 1 + (progress / 100) * 2;
            lionAnimation.style.setProperty('--glow-scale', glowScale);
        }
        
        // Add screen shake effect when near completion
        if (progress > 90) {
            const shakeIntensity = (progress - 90) / 10 * 5;
            loadingScreen.style.transform = `translate(${Math.random() * shakeIntensity - shakeIntensity/2}px, ${Math.random() * shakeIntensity - shakeIntensity/2}px)`;
        }
    }, interval);
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const soundToggle = document.getElementById('soundToggle');
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Check for saved sound preference or default to 'on'
    const soundEnabled = localStorage.getItem('sound') !== 'false';
    if (!soundEnabled) {
        soundToggle.classList.add('muted');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.setAttribute('aria-pressed', newTheme === 'light');
        
        // Add a subtle animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Sound toggle event listener
    soundToggle.addEventListener('click', function() {
        const isMuted = soundToggle.classList.contains('muted');
        soundToggle.classList.toggle('muted');
        const newSoundEnabled = !isMuted;
        localStorage.setItem('sound', newSoundEnabled);
        soundToggle.setAttribute('aria-pressed', !newSoundEnabled);
        
        // Add a subtle animation
        soundToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            soundToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Update roar sound based on sound setting
    window.soundEnabled = soundEnabled;
    // Update aria-labels for accessibility
    themeToggle.setAttribute('aria-pressed', currentTheme === 'light');
    soundToggle.setAttribute('aria-pressed', !soundEnabled);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Add loading animation delay for better effect
    const heroTitle = document.querySelector('.hero-title');
    const ctaButton = document.querySelector('.cta-button');
    
    // Intersection Observer for animations
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

    // Observe elements for animations
    const animatedElements = [
        '.contact-section h2', '.contact-section p', '.contact-link',
        '.section-title', '.section-description', '.stat-item', 
        '.service-card', '.portfolio-item'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });

    // Add hover effect for CTA button
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Add typing effect to hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    let tag = '';
                    while (i < text.length && text.charAt(i) !== '>') {
                        tag += text.charAt(i);
                        i++;
                    }
                    tag += text.charAt(i); // Add the closing >
                    element.innerHTML += tag;
                    i++;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Uncomment the line below if you want the typing effect
    // typeWriter(heroTitle, 'time to<br>roar!', 100);

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContainer = document.querySelector('.hero-container');
        
        if (heroContainer && scrolled <= window.innerHeight) {
            const rate = scrolled * -0.5;
            heroContainer.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add click animation to CTA buttons
    document.querySelectorAll('.cta-button, .cta-button-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animate statistics numbers
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                }
            };
            
            // Start animation when element comes into view
            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        statObserver.unobserve(entry.target);
                    }
                });
            });
            
            statObserver.observe(stat);
        });
    }

    // Service cards hover effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio items click to expand (optional)
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add active state to navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00ccff)';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
        
        // Add floating label effect
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Initialize number animation
    animateNumbers();

    // Magnetic buttons effect
    const magneticButtons = document.querySelectorAll('.button');
    magneticButtons.forEach(btn => {
        btn.dataset.magnet = 'true';
        const strength = 30;
        const scaleMax = 1.06;
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x/strength}px, ${y/strength}px) scale(${scaleMax})`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0,0) scale(1)';
        });
    });

    // Pause marquee on hover
    const marquee = document.querySelector('.brands-track');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fallback handling for missing icons
window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            // Hide broken images
            img.style.display = 'none';
        });
    });
});