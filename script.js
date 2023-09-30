const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
const messageScreen = document.getElementById("messageScreen");
const messageText = document.getElementById("messageText");
const newGameButton = document.getElementById("newGameButton");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

// Function to handle cell click
function handleCellClick(index) {
    if (boardState[index] === "" && !checkWinner()) {
        boardState[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            setTimeout(() => showEndMessage(`Player ${currentPlayer} wins!`), 500);
        } else if (!boardState.includes("")) {
            setTimeout(() => showEndMessage("It's a draw!"), 500);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

// Function to render the board with animations
function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < boardState.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = boardState[i];
        cell.addEventListener("click", () => handleCellClick(i));
        cell.style.backgroundColor = boardState[i] === "X" ? "#3498db" : (boardState[i] === "O" ? "#2ecc71" : "");
        cell.style.color = boardState[i] === "O" ? "#3498db" : "";
        board.appendChild(cell);
    }
}

// Function to show the end message screen with animation
function showEndMessage(text) {
    messageText.textContent = text;
    messageScreen.style.display = "block";
    setTimeout(() => {
        messageScreen.style.opacity = 1;
    }, 100);
}

// Function to hide the end message screen with animation
function hideEndMessage() {
    messageScreen.style.opacity = 0;
    setTimeout(() => {
        messageScreen.style.display = "none";
    }, 300);
}

// Function to reset the game
function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "";
    hideEndMessage();
    renderBoard();
}

// Event listeners
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

// Initial render
renderBoard();
