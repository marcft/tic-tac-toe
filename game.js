const gameCells = document.querySelectorAll('.gamecell');
const resetButton = document.querySelector('main button');

const Player = (name, symbol) => {
    const getSymbol = () => symbol;
    const getName = () => name;
    return {getSymbol, getName};
}

const gameBoard = (() => {
    let gameBoardArray = [null, null, null, null, null, null, null, null, null];

    const addToArray = (symbol, position) => {
        gameBoardArray[position] = symbol;
    }

    const clearArray = () => {
        gameBoardArray = [null, null, null, null, null, null, null, null, null];
    }

    const getGameBoardRows = () => {
        const copyGameArray = [...gameBoardArray];
        const res = [];
        for (let i = 0; i < gameBoardArray.length / 3; i++) {
            res.push(copyGameArray.splice(0, 3));
        }
        return res;
    }

    const getGameBoardColumns = () => {
        const copyGameArray = [...gameBoardArray];
        const res = [[],[],[]];
        for (let i = 0; i < gameBoardArray.length; i++) {
            if (i % 3 === 0) {
                res[0].push(copyGameArray[i]);
            } else if (i % 3 === 1) {
                res[1].push(copyGameArray[i]);
            } else {
                res[2].push(copyGameArray[i]);
            }
        }
        return res;
    }

    const getGameBoardDiagonals = () => {
        const copyGameArray = [...gameBoardArray];
        const diagonal1 = [copyGameArray[0], copyGameArray[4], copyGameArray[8]];
        const diagonal2 = [copyGameArray[2], copyGameArray[4], copyGameArray[6]];
        return [diagonal1, diagonal2];
    }

    const areItemsOfArrayEqual = (arr) => {
        const res = {
            areItemsEqual: null,
            winnerSymbol: ''
        };
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] !== arr[i + 1] || arr[i] === null) {
                res.areItemsEqual = false;
                return res;
            }
        }
        res.areItemsEqual = true;
        res.winnerSymbol = arr[0];
        return res;
    } 

    const checkWinner = () => {
        const gameRows = getGameBoardRows();
        const gameColumns = getGameBoardColumns();
        const gameDiagonals = getGameBoardDiagonals();
        const gameCombinations = [...gameRows, ...gameColumns, ...gameDiagonals];

        const result = {
            hasSomeoneWon: false,
            tie: false,
            winnerSymbol: '',
        };

        for (let i = 0; i < gameCombinations.length; i++) {
            const localRes = areItemsOfArrayEqual(gameCombinations[i]);
            if (localRes.areItemsEqual) {
                result.hasSomeoneWon = true;
                result.winnerSymbol = localRes.winnerSymbol;
                return result;
            };
        }

        //Comprobar empate si no hay null
        if (!gameBoardArray.includes(null)) {
            result.tie = true;
            return result;
        }

        return result;
    }

    return {addToArray, clearArray, checkWinner};

})();

const displayController = (() => {
    const playerTurnTitle = document.querySelector('main p');
    const winnerDialog = document.querySelector('dialog');
    const winnerDialogMessage = winnerDialog.querySelector('h1');

    // Close dialog when click outside form
    winnerDialog.addEventListener('click', (event) => {
        if (event.target === winnerDialog) {
            winnerDialog.close();
        }
    });
    
    const addPlayerSymbol = (target, symbol) => {
        target.textContent = symbol;
    }

    const changePlayerTurnTitle = (player) => {
        playerTurnTitle.textContent = `${player.getName()}'s Turn`;
    }

    const showResultDialog = (message) => {
        winnerDialogMessage.textContent = message;
        winnerDialog.showModal();
    }

    const cleanGameboard = () => {
        gameCells.forEach(cell => {cell.textContent = ''})
    }

    return {addPlayerSymbol, changePlayerTurnTitle, showResultDialog, cleanGameboard};
    
})();

const game = (() => {
    const makePlayerMove = (cell, player) => {
        if(cell.textContent !== '') return false;

        displayController.addPlayerSymbol(cell, player.getSymbol() );
        gameBoard.addToArray(player.getSymbol(), cell.dataset.position);
        return true;
    }

    const parseSymbolToPlayer = (symbol, player1, player2) => {
        switch (symbol) {
            case player1.getSymbol():
                return player1;
    
            case player2.getSymbol():
                return player2;

            default:
                throw new Error('Invalid symbol provided');
        }
    }

    const processGameResult = (player1, player2) => {
        const res = {gameEnded: false};
        
        const winnerObj = gameBoard.checkWinner();
        if (winnerObj.hasSomeoneWon) {
            const winnerPlayer = parseSymbolToPlayer(winnerObj.winnerSymbol, player1, player2);
            const message = `${winnerPlayer.getName()} Wins!`;
            displayController.showResultDialog(message);
            res.gameEnded = true;
        }
        else if (winnerObj.tie) {
            const message = `It's a Tie`;
            displayController.showResultDialog(message);
            res.gameEnded = true;
        }

        return res;
    }

    return {makePlayerMove, processGameResult};

})();

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

((firstPlayer, secondPlayer) => {
    let currentPlayer = firstPlayer;
    let gameEnded = false;

    const changePlayerTurn = () => {
        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
        displayController.changePlayerTurnTitle(currentPlayer);
    }

    const playerTurn = function(e) {
        if(gameEnded) return;
        
        game.makePlayerMove(e.target, currentPlayer);
        const result = game.processGameResult(firstPlayer, secondPlayer);
        gameEnded = result.gameEnded;
        changePlayerTurn();
    }

    resetButton.addEventListener('click', () => {
        displayController.cleanGameboard();
        gameBoard.clearArray();
        gameEnded = false;
    });

    gameCells.forEach(cell => {
        cell.addEventListener('click', playerTurn);
    });

})(player1, player2);