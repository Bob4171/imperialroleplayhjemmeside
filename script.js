// Advanced Imperial RP Script

// 1. Loading Screen Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loader-progress');
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 800);
            }, 500);
        } else {
            width += Math.random() * 10;
            if(width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 100);
});

// 2. Mouse Glow Trail
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// 3. Header Scroll Effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 4. Particles Effect (Refined)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 50;

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(0, 255, 179, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) particles.push(new Particle());

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
};
animate();

// 5. Intersection Observer for Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .glass, .stat-card, h2').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
});

// 6. Stats Counter
const counters = document.querySelectorAll('.counter');
const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / 100;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}
