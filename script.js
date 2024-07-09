var board;
var score = 0;
var tries = 0;
var rows;
var columns;
var gameActive = false;
var maxTries = 3;
var currentLevel;
var nextLevelUrl;

function initializeGame(size, level, nextUrl) {
    rows = size;
    columns = size;
    currentLevel = level;
    nextLevelUrl = nextUrl;
    tries = 0;
    setGame();
}

function setGame() {
    board = Array.from({length: rows}, () => Array.from({length: columns}, () => 0));
    score = 0;
    gameActive = false;

    updateScore();
    updateTries();
    renderBoard();

    document.getElementById("playButton").disabled = false;
    document.getElementById("retryButton").disabled = true;
    document.getElementById("nextLevelButton").style.display = 'none';

    document.removeEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    if (!gameActive) {
        return;
    }

    if (e.code === "ArrowLeft") {
        e.preventDefault();
        slideLeft();
        generateTile();
        checkGameOver();
    } else if (e.code === "ArrowRight") {
        e.preventDefault();
        slideRight();
        generateTile();
        checkGameOver();
    } else if (e.code === "ArrowUp") {
        e.preventDefault();
        slideUp();
        generateTile();
        checkGameOver();
    } else if (e.code === "ArrowDown") {
        e.preventDefault();
        slideDown();
        generateTile();
        checkGameOver();
    }
}

function slideLeft() {
    var changed = false;
    for (var r = 0; r < rows; r++) {
        for (var c = 1; c < columns; c++) {
            if (board[r][c] !== 0) {
                for (var k = c - 1; k >= 0; k--) {
                    if (board[r][k] === 0) {
                        board[r][k] = board[r][c];
                        board[r][c] = 0;
                        changed = true;
                    } else if (board[r][k] === board[r][c]) {
                        board[r][k] *= 2;
                        score += board[r][k];
                        board[r][c] = 0;
                        changed = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    if (changed) {
        updateScore();
        renderBoard();
    }
}

function slideRight() {
    var changed = false;
    for (var r = 0; r < rows; r++) {
        for (var c = columns - 2; c >= 0; c--) {
            if (board[r][c] !== 0) {
                for (var k = c + 1; k < columns; k++) {
                    if (board[r][k] === 0) {
                        board[r][k] = board[r][c];
                        board[r][c] = 0;
                        changed = true;
                    } else if (board[r][k] === board[r][c]) {
                        board[r][k] *= 2;
                        score += board[r][k];
                        board[r][c] = 0;
                        changed = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    if (changed) {
        updateScore();
        renderBoard();
    }
}

function slideUp() {
    var changed = false;
    for (var c = 0; c < columns; c++) {
        for (var r = 1; r < rows; r++) {
            if (board[r][c] !== 0) {
                for (var k = r - 1; k >= 0; k--) {
                    if (board[k][c] === 0) {
                        board[k][c] = board[r][c];
                        board[r][c] = 0;
                        changed = true;
                    } else if (board[k][c] === board[r][c]) {
                        board[k][c] *= 2;
                        score += board[k][c];
                        board[r][c] = 0;
                        changed = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    if (changed) {
        updateScore();
        renderBoard();
    }
}

function slideDown() {
    var changed = false;
    for (var c = 0; c < columns; c++) {
        for (var r = rows - 2; r >= 0; r--) {
            if (board[r][c] !== 0) {
                for (var k = r + 1; k < rows; k++) {
                    if (board[k][c] === 0) {
                        board[k][c] = board[r][c];
                        board[r][c] = 0;
                        changed = true;
                    } else if (board[k][c] === board[r][c]) {
                        board[k][c] *= 2;
                        score += board[k][c];
                        board[r][c] = 0;
                        changed = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    if (changed) {
        updateScore();
        renderBoard();
    }
}

function generateTile() {
    var emptyTiles = [];
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push({ row: r, col: c });
            }
        }
    }
    if (emptyTiles.length > 0) {
        var randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
        renderBoard();
    }
}

function updateScore() {
    document.getElementById("score").textContent = score;
}

function updateTries() {
    document.getElementById("tries").textContent = "Tries: " + tries + "/" + maxTries;
}

function renderBoard() {
    var boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    boardElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = board[r][c] !== 0 ? board[r][c] : "";
            tile.style.backgroundColor = getTileColor(board[r][c]);
            boardElement.appendChild(tile);
        }
    }
}

function getTileColor(value) {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
        default: return "#cdc1b4";
    }
}

function checkGameOver() {
    if (isGameWon()) {
        endGame("Congratulations! You won in " + tries + " tries.");
        showNextLevelButton();
    } else if (!canMove()) {
        if (tries >= maxTries) {
            endGame("Game Over! Out of tries. Final score: " + score);
            showNextLevelButton();
        } else {
            endGame("No more moves. Try again.");
        }
    }
}

function isGameWon() {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            if (board[r][c] === 2048) {
                return true;
            }
        }
    }
    return false;
}

function canMove() {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                return true;
            }
            if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
                return true;
            }
            if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
                return true;
            }
        }
    }
    return false;
}

function endGame(message) {
    gameActive = false;
    document.removeEventListener('keydown', handleKeyPress);
    document.getElementById("retryButton").disabled = false;
    document.getElementById("playButton").disabled = true;
    document.getElementById("tries").textContent = message;
}

function resetGame() {
    if (tries < maxTries) {
        tries++;
        setGame();
        playGame();
    } else {
        endGame("Game Over! Out of tries. Final score: " + score);
        showNextLevelButton();
    }
    updateTries();
}

function playGame() {
    if (tries <= maxTries) {
        gameActive = true;
        document.addEventListener('keydown', handleKeyPress);
        document.getElementById("retryButton").disabled = false;
        document.getElementById("playButton").disabled = true;
        generateTile();
        generateTile();
        updateTries();
    } else {
        endGame("Game Over! Out of tries. Final score: " + score);
        showNextLevelButton();
    }
}

function showNextLevelButton() {
    if (nextLevelUrl) {
        document.getElementById("nextLevelButton").style.display = 'inline-block';
    }
}

function nextLevel() {
    if (nextLevelUrl) {
        window.location.href = nextLevelUrl;
    }
}