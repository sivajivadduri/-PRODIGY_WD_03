const board = document.getElementById('game-board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

const cells = [];
const X = 'X';
const O = 'O';
let currentPlayer = X;
let gameActive = true;

function initializeBoard() {
    board.innerHTML = '';
    cells.length = 0;
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    if (!gameActive || cell.classList.contains('X') || cell.classList.contains('O')) return;

    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;
    cell.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        cell.style.transform = 'scale(1)';
    }, 150);

    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        highlightWinningCells();
        return;
    }

    if (isBoardFull()) {
        status.textContent = 'It\'s a Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === X ? O : X;
    status.textContent = `Player ${currentPlayer}'s turn`;

    if (currentPlayer === O) {
        setTimeout(makeAIMove, 500); // AI move with a delay
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function highlightWinningCells() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const winner = currentPlayer;

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (cells[a].textContent === winner && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
        }
    });
}

function isBoardFull() {
    return cells.every(cell => cell.textContent);
}

function makeAIMove() {
    const emptyCells = cells.filter(cell => !cell.textContent);
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.classList.add(O);
    randomCell.textContent = O;
    randomCell.style.transform = 'scale(1.2)';

    setTimeout(() => {
        randomCell.style.transform = 'scale(1)';
    }, 150);

    if (checkWinner()) {
        status.textContent = 'Player O Wins!';
        gameActive = false;
        highlightWinningCells();
    } else if (isBoardFull()) {
        status.textContent = 'It\'s a Draw!';
        gameActive = false;
    } else {
        currentPlayer = X;
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = X;
    status.textContent = `Player ${currentPlayer}'s turn`;
    initializeBoard();
}

restartBtn.addEventListener('click', restartGame);

initializeBoard();
