// SubTask1

const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];
let current = players[0];
let gameOver = false;


// // add event listeners to each cell

for (let cell of cells) {
  cell.addEventListener("click", handleCellClick);
}


function handleCellClick(event) {
  // Handle Cell Clicking Functionality

  const cell = event.target;
  
  if (cell.innerText === "" && !gameOver) {
    cell.innerText = current;
    cell.style.color = current === "X" ? "red" : "blue";
    if (checkWin(current)) {
      msg.innerText = `${current} wins!`;
      msg.style.color = "#1fc600";
      highlightWinningCells(current);
      gameOver = true;
      showBalloons();
    } else if (checkTie()) {
      msg.innerText = "It's a tie!";
      msg.style.color = "darkslateblue";
      gameOver = true;
      showBalloons();
    } else {
      current = current === players[0] ? players[1] : players[0];
      msg.innerText = `${current}'s turn!`;
    }
  }
  
}

// SubTask2

function checkWin(player) {
  // // Check Winning conditions

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].innerText === player;
    });
  });
  
}


function checkTie() {
  // // Check Tie conditions

  return [...cells].every(cell => {
    return cell.innerText !== "";
  });
  
}

function highlightWinningCells(player) {
  const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
  ];

  winPatterns.forEach(pattern => {
    if (pattern.every(index => cells[index].innerText === player)) {
      pattern.forEach(index => {
        cells[index].style.backgroundColor = "yellow";
      });
    }
  });
}

// SubTask3
function restart() {
  // // Restart Game Functionality

  for (let cell of cells) {
    cell.innerText = "";
    cell.style.backgroundColor = " #1ed0a1";
    cell.style.color = "#000000";
  }
  current = players[0];
  msg.innerText = `${current}'s turn!`;
  msg.style.color = "#000000";
  gameOver = false;
  hideBalloons();
  
}

function showBalloons() {
  const balloonsContainer = document.createElement("div");
  balloonsContainer.id = "balloons";
  document.body.appendChild(balloonsContainer);

  for (let i = 0; i < 30; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDelay = `${Math.random() * 2}s`;
    balloon.style.backgroundColor = getRandomColor();
    balloonsContainer.appendChild(balloon);
  }
}

function hideBalloons() {
  const balloons = document.getElementById("balloons");
  if (balloons) {
    balloons.remove();
  }
}

function getRandomColor() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
}
