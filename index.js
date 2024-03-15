const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 20;
    this.vx = Math.random() * 6 - 3;
    this.vy = Math.random() * -10 - 10;
    this.gravity = 0.2;
    this.alpha = 1;
    this.color = `hsl(${Math.random() * 40 + 15}, 100%, 50%)`;
    this.size = Math.random() * 20 + 5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= 0.01;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function createParticles() {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle());
  }
}

function removeParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createParticles();
  for (const particle of particles) {
    particle.update();
    particle.draw();
  }
  removeParticles();
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function simulateFire() {
  const fireParticles = [];

  class FireParticle {
    constructor() {
      this.x = canvas.width / 2 + (Math.random() * 40 - 20);
      this.y = canvas.height;
      this.vx = Math.random() * 4 - 2;
      this.vy = Math.random() * -10 - 10;
      this.gravity = 0.2;
      this.alpha = 1;
      this.color = `rgba(255, ${Math.random() * 100}, 0, 0.8)`;
      this.size = Math.random() * 20 + 5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= 0.01;
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function createFireParticles() {
    for (let i = 0; i < 5; i++) {
      fireParticles.push(new FireParticle());
    }
  }

  function removeFireParticles() {
    for (let i = fireParticles.length - 1; i >= 0; i--) {
      if (fireParticles[i].alpha <= 0) {
        fireParticles.splice(i, 1);
      }
    }
  }

  function animateFire() {
    requestAnimationFrame(animateFire);
    createFireParticles();
    for (const particle of fireParticles) {
      particle.update();
      particle.draw();
    }
    removeFireParticles();
  }

  animateFire();
}

simulateFire();
