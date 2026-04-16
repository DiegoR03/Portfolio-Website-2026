// Bron: https://codepen.io/JulianLaval/pen/KpLXOO
function Particle(parent) {
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particleColor = parent.options.particleColor;
    
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    
    this.velocity = {
        x: (Math.random() - 0.5) * parent.options.velocity,
        y: (Math.random() - 0.5) * parent.options.velocity
    };
}

Particle.prototype.update = function() {
    if (this.x > this.canvas.width + 20 || this.x < -20) {
        this.velocity.x = -this.velocity.x;
    }
    if (this.y > this.canvas.height + 20 || this.y < -20) {
        this.velocity.y = -this.velocity.y;
    }
    
    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Particle.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = 0.7;
    this.ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
    this.ctx.fill();
};

function ParticleNetwork(element, options) {
    this.element = element;
    this.options = {
        particleColor: options.particleColor || '#fff',
        background: options.background || '#1a252f',
        interactive: options.interactive !== undefined ? options.interactive : true,
        velocity: this.setVelocity(options.speed),
        density: this.setDensity(options.density)
    };
    this.init();
}

ParticleNetwork.prototype.init = function() {
    this.canvas = document.createElement('canvas');
    this.element.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.width = this.element.offsetWidth;
    this.canvas.height = this.element.offsetHeight;
    
    this.applyStyles(this.canvas, { position: 'absolute', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' });

    window.addEventListener('resize', function() {
        this.canvas.width = this.element.offsetWidth;
        this.canvas.height = this.element.offsetHeight;
        this.createParticles();
    }.bind(this));

    this.createParticles();
    this.update();
};

ParticleNetwork.prototype.createParticles = function() {
    this.particles = [];
    const quantity = (this.canvas.width * this.canvas.height) / this.options.density;
    
    for (let i = 0; i < quantity; i++) {
        this.particles.push(new Particle(this));
    }

    if (this.options.interactive) {
        this.mouseParticle = new Particle(this);
        this.mouseParticle.velocity = { x: 0, y: 0 };
        this.particles.push(this.mouseParticle);

        this.canvas.addEventListener('mousemove', function(e) {
            this.mouseParticle.x = e.clientX - this.element.offsetLeft;
            this.mouseParticle.y = e.clientY - this.element.offsetTop;
        }.bind(this));
    }
};

ParticleNetwork.prototype.update = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        p1.update();
        p1.draw();

        for (let j = this.particles.length - 1; j > i; j--) {
            const p2 = this.particles[j];
            const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

            if (dist < 120) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.options.particleColor;
                this.ctx.globalAlpha = (120 - dist) / 120;
                this.ctx.lineWidth = 0.7;
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.stroke();
            }
        }
    }

    if (this.options.velocity !== 0) {
        requestAnimationFrame(this.update.bind(this));
    }
};

ParticleNetwork.prototype.setVelocity = function(speed) {
    if (speed === 'fast') return 1;
    if (speed === 'slow') return 0.33;
    return 0.66; // medium
};

ParticleNetwork.prototype.setDensity = function(density) {
    if (density === 'high') return 5000;
    if (density === 'low') return 20000;
    return 10000;
};

ParticleNetwork.prototype.applyStyles = function(el, styles) {
    for (let prop in styles) {
        el.style[prop] = styles[prop];
    }
};


const particleContainer = document.getElementById('particle-canvas-container');

function getParticleColor() {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue('--particle-color').trim();
}

// MARKL: Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    let darkModeToggleButton = document.getElementById('darkModeToggleButton');

    if (document.body.classList.contains('dark-mode')) {
        darkModeToggleButton.innerHTML = "𖤓";
    } else {
        darkModeToggleButton.innerHTML = "⏾";
    }
    
    particleContainer.innerHTML = ''; 

    const newOptions = {
        particleColor: getParticleColor(),
        interactive: true,
        speed: 'medium',
        density: 'high'
    };

    new ParticleNetwork(particleContainer, newOptions);
}

let currentOptions = {
    particleColor: getParticleColor(),
    interactive: true,
    speed: 'medium',
    density: 'high'
};

new ParticleNetwork(particleContainer, currentOptions);