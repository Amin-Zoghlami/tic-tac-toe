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
    let player1 = null;
    let player2 = null;
    let currentPlayerNumber = null;

    function createPlayer(name, symbol) { 
        const chooseCell = (cell) => {
            gameBoard.changeCell(symbol, cell);
        }
        return {name, symbol, chooseCell};
    }
    
    const start = (name1, name2) => {
        players.push(createPlayer(name1, "X"));
        players.push(createPlayer(name2, "O"));
        console.log(players);
        currentPlayerNumber = 0;
    }

    const reset = () => {
        gameBoard.reset();
        players.length = 0;
        player1 = null;
        player2 = null;
        currentPlayerNumber = null;
    }
    
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
        if (checkResult(gameBoard.get()) !== "Ongoing") {
           const result = checkResult(gameBoard.get());
           if (result === "Win") {
                displayControl.showResult(`${currentPlayer.name} wins!`)
           } else {
            displayControl.showResult(`It's a tie!`)
           }
           displayControl.removeCellInputs();
        }
    }

    const checkResult = (board) => {
        const conditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        for (const condition of conditions) {
            const [a, b, c] = condition;
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return "Win";
            }
        }
    
        if (board.includes("")) {
            return "Ongoing";
        }
    
        return "Tie";
    };
    return {start, reset, playTurn, checkResult};
})();

const displayControl = (function () { 
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    
    const playerTitle = document.querySelector(".players");
    
    const form = document.querySelector("form");

    const startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", (event) => {
        if (form.checkValidity()) {
            event.preventDefault();
            const player1Name = document.getElementById("player1-name").value;
            const player2Name = document.getElementById("player2-name").value;
            gameFlow.start(player1Name, player2Name);
            showPlayers(player1Name, player2Name);
            addCellInputs();
            form.reset();
            dialog.close();
        }
    });

    const newGame = document.querySelector(".new-game");
    newGame.addEventListener("click", (event) => {
        gameFlow.reset();
        playerTitle.textContent = "";
        showResult("");
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

    const showPlayers = (name1, name2) => {
        playerTitle.textContent = `${name1} VS ${name2}`;
    }

    const showResult = (result) => {
        document.querySelector(".result").textContent = result;
    }

    return {addCellInputs, removeCellInputs, showBoard, showCell, showPlayers, showResult};
})();
