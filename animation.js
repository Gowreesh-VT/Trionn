'use strict';

let canvas, ctx;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let isMouseVisible = false;
let isHovering = false;

document.addEventListener('DOMContentLoaded', function() {
  // Support both ids to be safe
  canvas = document.getElementById('cursorCanvas') || document.getElementById('fluidCanvas');
  if (!canvas) {
    console.error('Cursor canvas element not found');
    return;
  }
  
  ctx = canvas.getContext('2d');
  resizeCanvas();
  
  setupEventListeners();
  animate();
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawCursor() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (!isMouseVisible) return;
  
  // Smooth follow animation
  const lerp = 0.15;
  currentX += (targetX - currentX) * lerp;
  currentY += (targetY - currentY) * lerp;
  
  // Dynamic size based on hover state
  const baseSize = isHovering ? 18 : 12;
  const ringSize = isHovering ? 35 : 25;
  
  // Main cursor circle
  ctx.save();
  ctx.globalAlpha = isHovering ? 0.8 : 0.6;
  ctx.fillStyle = isHovering ? '#00d4ff' : '#ffffff';
  ctx.shadowBlur = isHovering ? 25 : 20;
  ctx.shadowColor = isHovering ? '#00d4ff' : '#ffffff';
  
  ctx.beginPath();
  ctx.arc(currentX, currentY, baseSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Outer ring
  ctx.globalAlpha = isHovering ? 0.5 : 0.3;
  ctx.strokeStyle = isHovering ? '#00d4ff' : '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(currentX, currentY, ringSize, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.restore();
}

function animate() {
  drawCursor();
  requestAnimationFrame(animate);
}

function setupEventListeners() {
  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    isMouseVisible = true;
  });
  
  document.addEventListener('mouseenter', () => {
    isMouseVisible = true;
  });
  
  document.addEventListener('mouseleave', () => {
    isMouseVisible = false;
  });
  
  // Detect hovering over interactive elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
        target.classList.contains('button') || target.classList.contains('nav-link') ||
        target.classList.contains('service-card') || target.classList.contains('portfolio-item')) {
      isHovering = true;
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
        target.classList.contains('button') || target.classList.contains('nav-link') ||
        target.classList.contains('service-card') || target.classList.contains('portfolio-item')) {
      isHovering = false;
    }
  });
  
  window.addEventListener('resize', resizeCanvas);
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  
  // Also hide cursor on all interactive elements
  const style = document.createElement('style');
  style.textContent = `
    *, *:hover { cursor: none !important; }
    input, textarea, input:hover, textarea:hover { cursor: text !important; }
  `;
  document.head.appendChild(style);
}