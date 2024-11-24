const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector("#scoreText")
const resetBtn = document.querySelector("#resetBtn")
const snakeSize = 25
let currentDirection;
let snakeX = 0;
let snakeY = 0;
const appleX = 200; 
const appleY = 200; 
let speed = 500;
ctx.fillStyle = "#003049";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawSnake() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
}

function drawApple() {
  ctx.fillStyle = "#FF0000";
  ctx.beginPath();
  ctx.arc(appleX + snakeSize / 2, appleY + snakeSize / 2, snakeSize / 2, 0, 2 * Math.PI);
  ctx.fill()
}
drawApple()
drawSnake()



function snakeDirection(e) {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      if (currentDirection !== "DOWN") {
        currentDirection = "UP";
      }
      break;
    case "ArrowDown":
    case "s":
      if (currentDirection !== "UP") {
        currentDirection = "DOWN";
      }
      break;
    case "ArrowLeft":
    case "a":
      if (currentDirection !== "RIGHT") {
        currentDirection = "LEFT";
      }
      break;
    case "ArrowRight":
    case "d":
      if (currentDirection !== "LEFT") {
        currentDirection = "RIGHT";
      }
      break;
  }
}

function moveSnake() {
  if (checkCollision()) {
    return;
  }
  switch (currentDirection) {
    case "RIGHT":
      snakeX += snakeSize
      break;

    case "LEFT":
      snakeX -= snakeSize
      break;

    case "UP":
      snakeY -= snakeSize
      break;

    case "DOWN":
      snakeY += snakeSize
  }

}


function checkCollision() {

  if (snakeX === 0 && currentDirection === "LEFT") return true;
  if (snakeX === canvas.width - snakeSize && currentDirection === "RIGHT") return true
  if (snakeY === 0 && currentDirection === "UP") return true;
  if (snakeY === canvas.height - snakeSize && currentDirection === "DOWN") return true

}

function gameloop() {
  ctx.fillStyle = "#003049";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  moveSnake()
  drawApple()
  drawSnake()
}

setInterval(gameloop, speed)
window.addEventListener("keydown", snakeDirection)
