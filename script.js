const gameBoard = (function () {
    const board = new Array(9).fill("");
    
    const get = () => board;
    
    const getCell = (cell) => board[cell];

    const reset = () => {
        board.fill("");
    };

    const changeCell = (symbol, cell) => {
        if (gameBoard.getCell(cell) !== "") {
            return;
        }

        board[cell] = symbol;
    };
    
    return {get, getCell, reset, changeCell};
})();
 
const gameFlow = (function () {
    let player1 = {};
    let player2 = {};
    let turn = 1;
    
    const start = (name1, name2) => {
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O");
    }

    const reset = () => {
        gameBoard.reset();
        player1 = {};
        player2 = {};
        turn = 1;
    }
    
    const checkResult = (board) => checkResultHelper(board);

    const playTurn = (cell) => {
        if (gameBoard.getCell(cell) !== "") {
            return;
        }

        if (turn % 2 == 1) {
            player1.chooseCell(cell);
            turn++;
            console.log(gameBoard.get());
            if (checkResult(gameBoard.get()) !== "ongoing") {
                alert(player1.name + checkResult(gameBoard.get()));
                gameFlow.reset();
            }
            return;
        } 

        player2.chooseCell(cell); 
        turn++;
        if (checkResult(gameBoard.get()) !== "ongoing") {
            alert(player2.name + checkResult(gameBoard.get()));
            gameFlow.reset();
        }
    }
    return {start, reset, checkResult, playTurn};
})();

const displayControl = (function () { 
    
    const start = document.querySelector(".start");
    start.addEventListener("click", () => {
        gameFlow.start("AMIN","NARUTO");
        addCellInputs();
    });

    
    const addCellInputs = () => {
        const inputs = document.querySelectorAll(".cell");
        inputs.forEach((input) => {
            input.addEventListener("click", (event) => {
                const cell = event.currentTarget;
                gameFlow.playTurn(cell.dataset.index);
                showBoard();
            });
        });
    }

    const showBoard = () => {
        for (let i = 0; i < 9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = gameBoard.get()[i];
        }
    }

    return {addCellInputs, showBoard};
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
