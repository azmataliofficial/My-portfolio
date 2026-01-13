// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });

    // Hide/show header on scroll
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.remove('hidden');
    } else {
        header.classList.add('hidden');
    }
});

// Animated Counter
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 100);
        } else {
            counter.innerText = target;
        }
    });
};


// Create circular skills animation
function createSkillsOrbits() {
    const orbitsContainer = document.getElementById('skillsOrbits');

    // Skills data with icons and labels
    const skills = [
        { icon: 'fab fa-html5', name: 'HTML5' },
        { icon: 'fab fa-css3-alt', name: 'CSS3' },
        { icon: 'fab fa-js-square', name: 'JavaScript' },
        { icon: 'fab fa-php', name: 'PHP' },
        { icon: 'fas fa-database', name: 'MySQL' },
        { icon: 'fab fa-bootstrap', name: 'Bootstrap' },
        { icon: 'fab fa-linkedin', name: 'LinkedIn' },
        { icon: 'fab fa-figma', name: 'Figma' },
        { icon: 'fab fa-git-alt', name: 'Git' },
        { icon: 'fab fa-wordpress', name: 'WordPress' },
        { icon: 'fab fa-google', name: 'Google Ads' },
        { icon: 'fab fa-facebook', name: 'Meta Ads' },
        { icon: 'fas fa-search', name: 'SEO' },
        { icon: 'fas fa-chart-pie', name: 'Analytics' },
        { icon: 'fab fa-youtube', name: 'Youtube' },
        { icon: 'fas fa-paint-brush', name: 'Canva' },
        { icon: 'fas fa-code', name: 'VS Code' },
        { icon: 'fas fa-mobile-alt', name: 'Responsive' },
        { icon: 'fas fa-envelope-open-text', name: 'Email' },
        { icon: 'fas fa-hashtag', name: 'Social Media' }
    ];

    // Create orbits with fixed distances
    const orbits = [
        { className: 'skill-orbit skill-orbit-1', count: 6 },
        { className: 'skill-orbit skill-orbit-2', count: 7 },
        { className: 'skill-orbit skill-orbit-3', count: 4 },
        { className: 'skill-orbit skill-orbit-4', count: 3 }
    ];

    let skillIndex = 0;

    orbits.forEach((orbit, orbitIndex) => {
        const orbitEl = document.createElement('div');
        orbitEl.className = orbit.className;

        // Calculate positions for skills in this orbit
        for (let i = 0; i < orbit.count && skillIndex < skills.length; i++) {
            const skill = skills[skillIndex];
            const angle = (i / orbit.count) * 360;

            const badge = document.createElement('div');
            badge.className = 'skill-badge';
            badge.innerHTML = `<i class="${skill.icon}"></i>`;
            badge.title = skill.name;

            // Calculate position based on orbit index
            const baseRadius = 50; // Base radius percentage
            const radiusIncrement = 25; // Each orbit adds 25% radius
            const radius = baseRadius + (orbitIndex * radiusIncrement);

            const x = 50 + radius * Math.cos(angle * Math.PI / 180);
            const y = 50 + radius * Math.sin(angle * Math.PI / 180);

            badge.style.left = `${x}%`;
            badge.style.top = `${y}%`;
            badge.style.transform = `translate(-50%, -50%) rotate(${-angle}deg)`;

            // Add hover effect with tooltip
            badge.addEventListener('mouseenter', function () {
                const tooltip = document.createElement('div');
                tooltip.className = 'skill-tooltip';
                tooltip.textContent = skill.name;
                tooltip.style.position = 'absolute';
                tooltip.style.bottom = '100%';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.background = 'var(--dark)';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.fontSize = '0.8rem';
                tooltip.style.whiteSpace = 'nowrap';
                tooltip.style.zIndex = '100';
                tooltip.style.marginBottom = '8px';
                this.appendChild(tooltip);
            });

            badge.addEventListener('mouseleave', function () {
                const tooltip = this.querySelector('.skill-tooltip');
                if (tooltip) tooltip.remove();
            });

            orbitEl.appendChild(badge);
            skillIndex++;
        }

        orbitsContainer.appendChild(orbitEl);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class for animation
            entry.target.classList.add('visible');

            // Start counters if it's stats section
            if (entry.target.id === 'stats') {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.skill-card, .project-card, .journey-card, .stat-item, #stats');
animatedElements.forEach(el => observer.observe(el));

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Animate form submission
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, var(--success), var(--accent))';

    // Create success animation
    createSuccessAnimation();

    // Reset form
    contactForm.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
});

// Success animation
function createSuccessAnimation() {
    const successIcon = document.createElement('div');
    successIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    successIcon.style.position = 'fixed';
    successIcon.style.top = '50%';
    successIcon.style.left = '50%';
    successIcon.style.transform = 'translate(-50%, -50%) scale(0)';
    successIcon.style.fontSize = '100px';
    successIcon.style.color = 'var(--success)';
    successIcon.style.zIndex = '9999';
    successIcon.style.pointerEvents = 'none';
    document.body.appendChild(successIcon);

    // Animate the icon
    const animation = successIcon.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
    ], {
        duration: 2000,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    // Remove icon after animation
    animation.onfinish = () => {
        successIcon.remove();
    };
}

// Initialize on page load
window.addEventListener('load', () => {
    // Create circular skills animation
    createSkillsOrbits();

    // Trigger initial animations
    document.querySelectorAll('.skill-card, .project-card, .journey-card, .stat-item').forEach(el => {
        el.classList.add('visible');
    });
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Update header background based on scroll
    const header = document.getElementById('header');
    if (scrolled > 5) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});