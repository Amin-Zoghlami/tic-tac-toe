const gameBoard = (function () {
    const board = new Array(9).fill("");
    
    const get = () => [...board];
    
    const getCell = (cell) => board[cell];

    const changeCell = (symbol, cell) => {
        if (gameBoard.getCell(cell) !== "") {
            return;
        }

        board[cell] = symbol;
    };

    const reset = () => {
        board.fill("");
    };

    return {get, getCell, changeCell, reset};
})();
 
const gameFlow = (function () {
    const players = [];
    let player1;
    let player2;
    let currentPlayerNumber;

    const start = (name1, name2) => {
        players.push(createPlayer(name1, "X"));
        players.push(createPlayer(name2, "O"));
        console.log(players);
        currentPlayerNumber = 0;
    }

    const reset = () => {
        gameBoard.reset();
        players.length = 0;
        player1 = undefined;
        player2 = undefined;
        currentPlayerNumber = undefined;
    }
    
    const checkResult = (board) => checkResultHelper(board);

    const playTurn = (cell) => {
        if (gameBoard.getCell(cell) !== "") {
            return;
        }

        const currentPlayer = players[currentPlayerNumber];
        currentPlayer.chooseCell(cell);
        currentPlayerNumber++;
        if (currentPlayerNumber >= players.length) {
            currentPlayerNumber = 0;
        }
        if (checkResult(gameBoard.get()) !== "ongoing") {
           alert(currentPlayer.name + checkResult(gameBoard.get()));
           displayControl.removeCellInputs();
        }
    }
    return {start, reset, checkResult, playTurn};
})();

const displayControl = (function () { 
    
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    
    const startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", (event) => {
        event.preventDefault();
        const player1Name = document.getElementById("player1-name").value;
        const player2Name = document.getElementById("player2-name").value;
        gameFlow.start(player1Name, player2Name);
        addCellInputs();
        dialog.close();
    });

    const newGame = document.querySelector(".new-game");
    newGame.addEventListener("click", (event) => {
        gameFlow.reset();
        showBoard();
        dialog.showModal();
    });
    
    const inputs = document.querySelectorAll(".cell");
    function inputEvent(event) {
        const cell = event.currentTarget;
        gameFlow.playTurn(cell.dataset.index);
        showCell(cell.dataset.index);
    }

    const addCellInputs = () => {
        inputs.forEach((input) => {
            input.addEventListener("click", inputEvent);
        });
    }

    const removeCellInputs = () => {
        inputs.forEach((input) => {
            input.removeEventListener("click", inputEvent);
        });
    }

    const showBoard = () => {
        for (let i = 0; i < 9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = gameBoard.getCell(i);
        }
    }

    const showCell = (cell) => {
        document.querySelector(`div[data-index="${cell}"]`).textContent = gameBoard.getCell(cell);
    }

    return {addCellInputs, removeCellInputs, showBoard, showCell};
})();

function createPlayer(name, symbol) { 
    const chooseCell = (cell) => {
        gameBoard.changeCell(symbol, cell);
    }
    return {name, symbol, chooseCell};
}

function checkResultHelper(board) {
    if (board[0] === "X" && board[1] === "X" && board[2] === "X"
        || board[3] === "X" && board[4] === "X" && board[5] === "X"
        || board[6] === "X" && board[7] === "X" && board[8] === "X"
        || board[0] === "X" && board[3] === "X" && board[6] === "X"
        || board[1] === "X" && board[4] === "X" && board[7] === "X"
        || board[2] === "X" && board[5] === "X" && board[8] === "X"
        || board[0] === "X" && board[4] === "X" && board[8] === "X"
        || board[2] === "X" && board[4] === "X" && board[8] === "X" 
        || board[0] === "O" && board[1] === "O" && board[2] === "O"
        || board[3] === "O" && board[4] === "O" && board[5] === "O"
        || board[6] === "O" && board[7] === "O" && board[8] === "O"
        || board[0] === "O" && board[3] === "O" && board[6] === "O"
        || board[1] === "O" && board[4] === "O" && board[7] === "O"
        || board[2] === "O" && board[5] === "O" && board[8] === "O"
        || board[0] === "O" && board[4] === "O" && board[8] === "O"
        || board[2] === "O" && board[4] === "O" && board[8] === "O") {
            return " wins!";
    }
    if (board.includes("")) {
        return "ongoing";
    }

    return "It's a tie!";
}
