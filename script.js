let currentPlayer = "X";
let gameActive = false;
let cells = Array(9).fill("");
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const gameArea = document.getElementById("gameArea");

let playerNames = { X: "Player X", O: "Player O" };

// Start the game after entering names
function startGame() {
  const nameX = document.getElementById("playerX").value.trim();
  const nameO = document.getElementById("playerO").value.trim();

  if (!nameX || !nameO) {
    alert("Please enter names for both players!");
    return;
  }

  playerNames = { X: nameX, O: nameO };
  document.getElementById("playerForm").style.display = "none";
  gameArea.style.display = "block";
  statusText.textContent = `${playerNames.X}'s turn`;
  gameActive = true;

  // Create game cells
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.innerHTML = `
      🎉 <strong>Congratulations ${playerNames[currentPlayer]}!</strong><br>
      🏆 You won this game! Well done! Well played! 🎊
    `;
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.innerHTML = `
      🤝 <strong>It's a tie!</strong><br>
      😅 Great match! Nobody won, but everyone played well!
    `;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${playerNames[currentPlayer]}'s turn`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      highlightWinner(pattern);
      return true;
    }
  }
  return false;
}

function highlightWinner(pattern) {
  pattern.forEach(index => {
    board.children[index].classList.add("winner");
  });
}

function resetGame() {
  // Reset all game values
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;

  // Reset board
  Array.from(board.children).forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });

  statusText.textContent = `${playerNames.X}'s turn`;
}
