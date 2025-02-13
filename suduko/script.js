// Function to generate a random Sudoku board (partial solution for restart functionality)
function generateNewBoard() {
    const baseBoard = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // Shuffle rows to get a new board each time
    const shuffledBoard = baseBoard.map(row => shuffleRow(row));
    return shuffledBoard;
}

// Function to shuffle the numbers in a row (just randomizes non-zero cells)
function shuffleRow(row) {
    const shuffled = row.filter(num => num !== 0);
    while (shuffled.length < 9) {
        shuffled.push(0); // Fill in empty cells with 0
    }
    return shuffled.sort(() => Math.random() - 0.5); // Shuffle non-zero numbers
}

// Create the Sudoku board dynamically
function createBoard(board) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';  // Clear the existing board

    // Generate the Sudoku grid
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.min = '1';
            cell.max = '9';
            cell.value = board[row][col] === 0 ? '' : board[row][col];
            cell.readOnly = board[row][col] !== 0;  // Pre-filled cells are read-only
            cell.addEventListener('input', (e) => handleInput(e, row, col, board));
            boardElement.appendChild(cell);
        }
    }
}

// Handle user input and update the board
function handleInput(event, row, col, board) {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= 9) {
        board[row][col] = value;
    } else {
        board[row][col] = 0;
    }
}

// Restart the game and generate a new board
function restartGame() {
    board = generateNewBoard(); // Generate a new random board
    createBoard(board);         // Create the new board
}

// Check if the board is solved
function checkSolved(board) {
    return board.every(row => row.every(cell => cell !== 0));
}

// Submit the board to check if it's solved
function submitMove() {
    if (checkSolved(board)) {
        alert("Congratulations! You've solved the Sudoku!");
    } else {
        alert("The puzzle is not solved yet. Keep going!");
    }
}

// Initialize the game
let board = generateNewBoard();  // Generate the initial Sudoku board
createBoard(board);  // Create the initial board

// Add event listeners for buttons
document.getElementById('restart').addEventListener('click', restartGame);
document.getElementById('submit').addEventListener('click', submitMove);
