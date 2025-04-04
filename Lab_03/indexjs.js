var canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
const ctx = canvas.getContext("2d");
var heart = document.getElementById("heart");
var myMusic = document.getElementById("music");

const body = document.body;
const cursor = document.createElement("img");
cursor.src = "aim.png";
cursor.style.position = "absolute";
cursor.style.pointerEvents = "none";
cursor.style.transform = "translate(-54%, -65%)";
cursor.style.width = "258px";
cursor.style.height = "258px";
body.appendChild(cursor);

body.style.cursor = "none";

document.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

let lives = 3;
let score = 0;

function updateScore() {
  document.getElementById("score").textContent = String(score).padStart(5, "0");
  //jeśli nie chcemy formatu pięcocyfrowego z zerami na początku przed wynikiem trzeba usunąć ".padStart(5, "0")".
}

function updateHealth() {
  for (let i = 1; i <= 3; i++) {
    const heart = document.getElementById(`health${i}`);
    heart.src = i <= lives ? "../full_heart.png" : "../empty_heart.png";
  }
}

const zombieImage = new Image();
zombieImage.src = "walkingdead.png";

const frameWidth = 200;
const frameHeight = 312;
const totalFrames = 10;

class Zombie {
  constructor() {
    this.scale = 0.5 + Math.random() * 0.5;
    this.width = frameWidth * this.scale;
    this.height = frameHeight * this.scale;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.speed = 1 + Math.random() * 5;
    this.currentFrame = 0;
    this.frameDuration = 100 + Math.random() * 100;
    this.lastFrameTime = 0;
  }

  draw() {
    ctx.drawImage(
      zombieImage,
      this.currentFrame * frameWidth,
      0,
      frameWidth,
      frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(timestamp) {
    if (timestamp - this.lastFrameTime > this.frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % totalFrames;
      this.lastFrameTime = timestamp;
    }
    this.x -= this.speed;
  }

  isOffScreen() {
    return this.x + this.width < 0;
  }
  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }
}

const zombies = [];

function spawnZombie() {
  zombies.push(new Zombie());
}
function boardShot(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let hit = false;

  for (let i = zombies.length - 1; i >= 0; i--) {
    if (zombies[i].isClicked(mouseX, mouseY)) {
      zombies.splice(i, 1);
      score += 20;
      updateScore();
      hit = true;
      break;
    }
  }

  if (!hit) {
    score -= 5;
    updateScore();
  }
}

function showGameOverPopup() {
  document.getElementById("finalScore").textContent = score;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("gameOverPopup").style.display = "block";
}

function restartGame() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("gameOverPopup").style.display = "none";
  window.location.reload();
}
// Funkcja aktualizująca całą animację
function updateAnimation(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Aktualizacja i rysowanie każdego zombie
  for (let i = zombies.length - 1; i >= 0; i--) {
    const zombie = zombies[i];
    zombie.update(timestamp);
    zombie.draw();

    // Usunięcie zombie, gdy wyjdzie poza ekran
    if (zombie.isOffScreen()) {
      zombies.splice(i, 1);
      lives--;
      updateHealth();
      if (lives === 0) {
        myMusic.play();
        body.style.cursor = "initial";
        showGameOverPopup();
        return;
      }
    }
  }

  requestAnimationFrame(updateAnimation);
}

zombieImage.onload = () => {
  requestAnimationFrame(updateAnimation);

  setInterval(spawnZombie, 1000 + Math.random() * 1000);

  addEventListener("click", boardShot);
};
