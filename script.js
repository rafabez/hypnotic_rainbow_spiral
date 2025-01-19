const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let angle = 0;
let radius = 10;

// Parameters
let maxRadius = 300;
let numCircles = 200;
let angleIncrement = 0.005;
let circleRadius = 10;
let autoMovementSpeed = 5;

// Input elements
const maxRadiusInput = document.getElementById("maxRadius");
const numCirclesInput = document.getElementById("numCircles");
const angleIncrementInput = document.getElementById("angleIncrement");
const circleRadiusInput = document.getElementById("circleRadius");
const randomizeButton = document.getElementById("randomizeButton");
const autoMovementButton = document.getElementById("autoMovementButton");
const autoMovementSpeedInput = document.getElementById("autoMovementSpeed");
const refreshButton = document.getElementById("refreshButton");

// Update parameters
maxRadiusInput.addEventListener("input", () => {
  maxRadius = parseInt(maxRadiusInput.value);
});
numCirclesInput.addEventListener("input", () => {
  numCircles = parseInt(numCirclesInput.value);
});
angleIncrementInput.addEventListener("input", () => {
  angleIncrement = parseFloat(angleIncrementInput.value);
});
circleRadiusInput.addEventListener("input", () => {
  circleRadius = parseInt(circleRadiusInput.value);
});
autoMovementSpeedInput.addEventListener("input", () => {
  autoMovementSpeed = parseFloat(autoMovementSpeedInput.value);
});

// Randomize parameters
randomizeButton.addEventListener("click", () => {
  maxRadius = Math.floor(Math.random() * 991) + 10;
  numCircles = Math.floor(Math.random() * 991) + 10;
  angleIncrement = (Math.random() * 0.099) + 0.001;
  circleRadius = Math.floor(Math.random() * 800) + 1;

  maxRadiusInput.value = maxRadius;
  numCirclesInput.value = numCircles;
  angleIncrementInput.value = angleIncrement;
  circleRadiusInput.value = circleRadius;
});

// Auto movement
let autoMovementInterval;
let isAutoMoving = false;

function startAutoMovement() {
  if (!isAutoMoving) {
    isAutoMoving = true;
    autoMovementInterval = setInterval(() => {
      maxRadius = Math.min(1000, Math.max(10, maxRadius + (Math.random() * 10 - 5) * autoMovementSpeed));
      numCircles = Math.min(1000, Math.max(10, numCircles + (Math.random() * 10 - 5) * autoMovementSpeed));
      angleIncrement = Math.min(0.1, Math.max(0.001, angleIncrement + (Math.random() * 0.01 - 0.005) * autoMovementSpeed));
      circleRadius = Math.min(800, Math.max(1, circleRadius + (Math.random() * 10 - 5) * autoMovementSpeed));

      maxRadiusInput.value = maxRadius;
      numCirclesInput.value = numCircles;
      angleIncrementInput.value = angleIncrement;
      circleRadiusInput.value = circleRadius;
    }, 500);
  }
}

function stopAutoMovement() {
  if (isAutoMoving) {
    isAutoMoving = false;
    clearInterval(autoMovementInterval);
  }
}

autoMovementButton.addEventListener("click", () => {
  if (isAutoMoving) {
    stopAutoMovement();
    autoMovementButton.textContent = "Auto Movement";
  } else {
    startAutoMovement();
    autoMovementButton.textContent = "Stop Auto Movement";
  }
});

// Refresh button
refreshButton.addEventListener("click", () => {
  location.reload();
});

// Animation loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numCircles; i++) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const hue = (i / numCircles) * 360;

    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${hue}, 50%, 50%)`;
    ctx.fill();

    angle += angleIncrement;
    radius += 0.5;

    if (radius > maxRadius) {
      radius = circleRadius;
    }
  }

  requestAnimationFrame(draw);
}

draw();
