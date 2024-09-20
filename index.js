document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('reset-btn');
    const status = document.getElementById('status');

    let currentPlayer = 'x'; // Start with 'x'
    let board = Array(9).fill(null); // Initialize empty board
    let gameActive = true; // Track game state

    function handleClick(event) {
        const index = Number(event.target.dataset.index); // Convert data-index to a number

        // Validate cell index
        if (isNaN(index) || index < 0 || index >= board.length) {
            console.error("Invalid cell index:", index);
            return;
        }

        // If the cell is already taken or the game is not active, return
        if (board[index] || !gameActive) return;

        // Update the board state and display X or O
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer.toUpperCase(); // Display X or O in uppercase
        event.target.classList.add(currentPlayer); // Add class 'x' or 'o' for CSS

        // Check if there's a winner
        if (checkForWinner(board)) {
            status.textContent = ${currentPlayer.toUpperCase()} Wins!; // Display winner message
            gameActive = false; // End the game
            return;
        }

        // Check if it's a tie
        if (board.every(cell => cell)) {
            status.textContent = "It's a Tie!";
            gameActive = false; // End the game
            return;
        }

        // Switch the current player
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }

    // Optimized checkWinner function
    function checkForWinner(board) {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningPatterns.some(pattern => checkPattern(pattern, board));
    }

    function checkPattern(pattern, board) {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    }

    function resetGame() {
        board = Array(9).fill(null); // Reset the board array
        cells.forEach(cell => {
            cell.textContent = ''; // Clear the cell content
            cell.classList.remove('x', 'o'); // Remove any class 'x' or 'o'
        });
        status.textContent = ''; // Clear the status message
        gameActive = true; // Reactivate the game
        currentPlayer = 'x'; // Reset to 'x' as the starting player
    }

    // Add event listeners for each cell
    cells.forEach(cell => cell.addEventListener('click', handleClick));

    // Reset button listener
    resetBtn.addEventListener('click', resetGame);
});