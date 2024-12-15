const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector("#scoreText")
const resetBtn = document.querySelector("#resetBtn")
const overlay = document.getElementById('overlay')
const modal = document.querySelector("#modal")
const snakeSize = 25
let currentDirection;
let snakeX = 200;
let snakeY = 200;
let appleX = randomNumber();
let appleY = randomNumber();
let speed = 135;
let score = 0
let gameIsRunning = true
const snakeBody = []
ctx.fillStyle = "#003049";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawSnake() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
  snakeBody.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  })
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
  snakeBody.unshift({ x: snakeX, y: snakeY })
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
  if (snakeBody.length > 0) {
    snakeBody.pop()
  }
}


function checkCollision() {

  if (snakeX === 0 && currentDirection === "LEFT") gameIsOver()
  if (snakeX === canvas.width - snakeSize && currentDirection === "RIGHT") gameIsOver()
  if (snakeY === 0 && currentDirection === "UP") gameIsOver()
  if (snakeY === canvas.height - snakeSize && currentDirection === "DOWN") gameIsOver()
}

function randomNumber() {
  return Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
}

function eatApple() {
  if (snakeX === appleX && snakeY === appleY) {
    appleX = randomNumber()
    appleY = randomNumber()
    scoreText.textContent = ++score
    growSnake()
  }
}


function growSnake() {
  snakeBody.push({})
}


function checkSnakeCollision() {
  const hasCollision = snakeBody.slice(1).some(segment =>
    segment.x === snakeX && segment.y === snakeY
  );
  if (hasCollision) {
    gameIsOver()
  }
}



function resetGame() {
  currentDirection = null
  snakeX = 200;
  snakeY = 200;
  appleX = randomNumber();
  appleY = randomNumber();
  score = 0
  snakeBody.length = 0
  scoreText.textContent = score
  gameIsRunning = true
}

resetGame()




function gameloop() {
  if (!gameIsRunning) return
  ctx.fillStyle = "#003049";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  eatApple()
  moveSnake()
  drawApple()
  drawSnake()
  checkSnakeCollision()
  checkCollision()
}

function gameIsOver() {
  gameIsRunning = false
  modal.classList.add("active")
  overlay.classList.add("active")
  const finalScore = document.querySelector(".finalScore")
  finalScore.textContent = `Game Over! Score: ${score}`;
}

resetBtn.addEventListener("click", () => {
  resetGame()
  overlay.classList.remove("active")
  modal.classList.remove("active")
})

setInterval(gameloop, speed)
window.addEventListener("keydown", snakeDirection)




