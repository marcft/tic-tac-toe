const gameCells = document.querySelectorAll('.gamecell');
const resetButton = document.getElementById('btn-reset');
const namesDialog = document.querySelector('.names-dialog');
const namesDialogButton = namesDialog.querySelector('button');

let IA_mode = false;
let translations = null; // Whole languages.json, fetched once and kept in memory
const LANGUAGES_URL = 'languages.json';
const LANGUAGE_STORAGE_KEY = 'language';
const DEFAULT_LANG = 'en'; // Used when there is no saved choice and the browser language is not in the JSON
let currentLang = DEFAULT_LANG;
let isAiThinking = false;
const modeButton = document.getElementById('mode-button');
const languageSelect = document.getElementById('select-button');

const selectMode = document.getElementById('select-mode');
if (selectMode) {
    selectMode.addEventListener('change', function() {
        IA_mode = (this.value === "pve");
    });
} else if (modeButton) {
    modeButton.addEventListener('change', function() {
        IA_mode = (this.value === "true");
    });
}

// The option value is the language id used as key in languages.json
if (languageSelect) {
    languageSelect.addEventListener('change', function() {
        setLanguage(this.value);
    });
}

// Single lookup function: returns the text of "key" in the current language.
// Placeholders like {name} are replaced with the values given in params.
function translate(key, params = {}) {
    const text = translations?.[currentLang]?.[key];
    if (text === undefined) return key; // JSON not loaded yet or key missing
    return text.replace(/\{(\w+)\}/g, (placeholder, name) => params[name] ?? placeholder);
}

// Fetches languages.json only once and applies the initial language
async function loadLanguages() {
    try {
        const response = await fetch(LANGUAGES_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        translations = await response.json();
    } catch (error) {
        console.error('Could not load the languages file:', error);
        return;
    }
    setLanguage(getInitialLanguage());
}

// Priority: saved preference > browser language (if present in the JSON) > default language
function getInitialLanguage() {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && translations[saved]) return saved;

    for (const code of navigator.languages ?? [navigator.language]) {
        const normalized = code.toLowerCase().replace(/[^a-z]/g, ''); // "pt-BR" -> "ptbr"
        if (translations[normalized]) return normalized;
        // "es-MX" -> "es", "pt-AO" -> first Portuguese id found in the JSON
        const match = Object.keys(translations).find(id => id.startsWith(normalized.slice(0, 2)));
        if (match) return match;
    }
    return DEFAULT_LANG;
}

function setLanguage(lang) {
    if (!translations?.[lang]) return;
    currentLang = lang;
    if (languageSelect) languageSelect.value = lang;
    applyTranslations();
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

// Refreshes the static texts of the page. Dynamic messages call translate() when they are shown.
function applyTranslations() {
    // The option carries the real BCP 47 code (pt-BR, pt-PT...) in its lang attribute
    document.getElementById('html-root')?.setAttribute('lang', languageSelect?.selectedOptions[0]?.lang || currentLang);

    const setText = (id, key) => {
        const element = document.getElementById(id);
        if (element) element.textContent = translate(key);
    };
    setText('page-title', 'title');
    setText('main-heading', 'title');
    setText('setup-title', 'chooseLanguage');
    setText('btn-confirm', 'start');
    setText('btn-reset', 'playagain');

    document.getElementById('board')?.setAttribute('aria-label', translate('title'));

    const player2NameInput = document.getElementById('name2');
    if (IA_mode && player2NameInput) {
        player2NameInput.value = translate('aiName');
    }
}

const Player = (name, symbol) => {
    const getSymbol = () => symbol;
    const getName = () => name;
    return {getSymbol, getName};
}

//Inicialization of Players (the dialog is opened at the end of the file, after the translations are loaded)
namesDialogButton.addEventListener('click', (event) => {
    const form = namesDialog.querySelector('form');
    const player1Name = form.querySelector('#name1');
    const player2Name = form.querySelector('#name2');

    if (IA_mode && player2Name) {
        player2Name.removeAttribute('required');
        if (!player2Name.value) player2Name.value = translate('aiName');
    }

    if (form.checkValidity()) {
        event.preventDefault(); // Don't want to submit this form
        const player1 = Player(player1Name.value, 'X');
        const player2 = Player(player2Name.value, 'O');
        namesDialog.close();
        gameInitialization(player1, player2);
    } else {
        form.reportValidity();
    }
});

//Game Initialization after player names being chosen
function gameInitialization(player1, player2) {
    const gameBoard = (() => {
        let gameBoardArray = [null, null, null, null, null, null, null, null, null];
    
        const addToArray = (symbol, position) => {
            gameBoardArray[position] = symbol;
        }
    
        const clearArray = () => {
            gameBoardArray = [null, null, null, null, null, null, null, null, null];
        }

        const getArray = () => gameBoardArray;
    
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
            
            //Checks if there is a winner
            for (let i = 0; i < gameCombinations.length; i++) {
                const localRes = areItemsOfArrayEqual(gameCombinations[i]);
                if (localRes.areItemsEqual) {
                    result.hasSomeoneWon = true;
                    result.winnerSymbol = localRes.winnerSymbol;
                    return result;
                };
            }
    
            //Checks tie
            if (!gameBoardArray.includes(null)) {
                result.tie = true;
                return result;
            }
    
            return result;
        }
    
        return {addToArray, clearArray, checkWinner, getArray};
    
    })();
    
    
    const displayController = (() => {
        const playerTurnTitle = document.querySelector('main p');
        const winnerDialog = document.getElementById('finish-dialog') || document.querySelector('.result-dialog');
        const winnerDialogMessage = document.getElementById('result-message') || winnerDialog?.querySelector('h1');
    
        // Close dialog when click outside form
        winnerDialog.addEventListener('click', (event) => {
            if (event.target === winnerDialog) {
                winnerDialog.close();
            }
        });
        
        const addPlayerSymbol = (target, symbol) => {
            target.textContent = symbol;

            target.classList.remove('x-color', 'o-color');
            if (symbol === 'X') target.classList.add('x-color');
            if (symbol === 'O') target.classList.add('o-color');

            const pos = parseInt(target.dataset.position) + 1;
            target.setAttribute('aria-label', `${translate('square')} ${pos}, ${symbol}`);
        }
    
        const changePlayerTurnTitle = (message) => {
            playerTurnTitle.textContent = message;
        }
    
        const showResultDialog = (message) => {
             if (winnerDialogMessage) winnerDialogMessage.textContent = message;
            winnerDialog.showModal();
            winnerDialogMessage?.focus();
        }
    
        const cleanGameboard = () => {
            gameCells.forEach((cell,idx) => {
                cell.textContent = '';
                cell.classList.remove('x-color', 'o-color');

                cell.setAttribute('aria-label', `${translate('square')} ${idx + 1}, ${translate('empty')}`);
                cell.setAttribute('tabindex', idx === 0 ? '0' : '-1');
            });
        }
    
        return {addPlayerSymbol, changePlayerTurnTitle, showResultDialog, cleanGameboard};
        
    })();
    
    const game = ((firstPlayer, secondPlayer) => {
    let currentPlayer = firstPlayer;
    let gameEnded = false;

    // Inicialização do PlayerTurnTitle
    displayController.changePlayerTurnTitle(translate('turn', {name: currentPlayer.getName()}));
        displayController.cleanGameboard();

    const makePlayerMove = (cell, player) => {
        // Se a célula já tiver texto, retorna true (está ocupada)
        if (cell.textContent !== '') return true;

        displayController.addPlayerSymbol(cell, player.getSymbol());
        gameBoard.addToArray(player.getSymbol(), cell.dataset.position);
        return false;
    }

    const parseSymbolToPlayer = (symbol, p1, p2) => {
        switch (symbol) {
            case p1.getSymbol(): return p1;
            case p2.getSymbol(): return p2;
            default: throw new Error('Invalid symbol provided');
        }
    }

    const processGameResult = (p1, p2) => {
        const res = { gameEnded: false };
        const winnerObj = gameBoard.checkWinner();
        
        if (winnerObj.hasSomeoneWon) {
        const winnerPlayer = parseSymbolToPlayer(winnerObj.winnerSymbol, p1, p2);
        displayController.showResultDialog(translate('win', {name: winnerPlayer.getName()}));
        res.gameEnded = true;
    } else if (winnerObj.tie) {
        displayController.showResultDialog(translate('draw'));
        res.gameEnded = true;
    }
    return res;
}
    const changePlayerTurn = () => {
        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
        const message = gameEnded
                ? translate('gameOver')
                : translate('turn', {name: currentPlayer.getName()});
            displayController.changePlayerTurnTitle(message);
            
            if (!gameEnded && IA_mode && currentPlayer === secondPlayer && !isAiThinking) {
                isAiThinking = true;
                setTimeout(doIAMove, 600); // 600ms para uma resposta ágil
            }
        }

    const doIAMove = () => {
        if (gameEnded) {
            isAiThinking = false;
            return;
    }
    
    const arr = gameBoard.getArray(); 
    let targetPosition = null;

    //Se a IA estiver quase ganhando:
    if (arr[0] === null && arr[1] === 'O' && arr[2] === 'O' || arr[0] === null && arr[4] === 'O' && arr[8] === 'O' || arr[0] === null && arr[3] === 'O' && arr[6] === 'O') targetPosition = 0;
    else if (arr[1] === null && arr[0] === 'O' && arr[2] === 'O' || arr[1] === null && arr[4] === 'O' && arr[7] === 'O') targetPosition = 1;
    else if (arr[2] === null && arr[0] === 'O' && arr[1] === 'O' || arr[2] === null && arr[4] === 'O' && arr[6] === 'O' || arr[2] === null && arr[5] === 'O' && arr[8] === 'O') targetPosition = 2;
    else if (arr[3] === null && arr[0] === 'O' && arr[6] === 'O' || arr[3] === null && arr[4] === 'O' && arr[5] === 'O') targetPosition = 3;
    else if (arr[4] === null && arr[3] === 'O' && arr[5] === 'O' || arr[4] === null && arr[0] === 'O' && arr[8] === 'O' || arr[4] === null && arr[2] === 'O' && arr[6] === 'O' || arr[4] === null && arr[1] === 'O' && arr[7] === 'O') targetPosition = 4;
    else if (arr[5] === null && arr[3] === 'O' && arr[4] === 'O' || arr[5] === null && arr[2] === 'O' && arr[8] === 'O') targetPosition = 5;
    else if (arr[6] === null && arr[0] === 'O' && arr[3] === 'O' || arr[6] === null && arr[2] === 'O' && arr[4] === 'O' || arr[6] === null && arr[7] === 'O' && arr[8] === 'O') targetPosition = 6;
    else if (arr[7] === null && arr[1] === 'O' && arr[4] === 'O' || arr[7] === null && arr[6] === 'O' && arr[8] === 'O') targetPosition = 7;
    else if (arr[8] === null && arr[0] === 'O' && arr[4] === 'O' || arr[8] === null && arr[2] === 'O' && arr[5] === 'O' || arr[8] === null && arr[6] === 'O' && arr[7] === 'O') targetPosition = 8;
    // Se o jogador estiver quase ganhando:
    else if (arr[0] === null && arr[1] === 'X' && arr[2] === 'X' || arr[0] === null && arr[4] === 'X' && arr[8] === 'X' || arr[0] === null && arr[3] === 'X' && arr[6] === 'X') targetPosition = 0;
    else if (arr[1] === null && arr[0] === 'X' && arr[2] === 'X' || arr[1] === null && arr[4] === 'X' && arr[7] === 'X') targetPosition = 1;
    else if (arr[2] === null && arr[0] === 'X' && arr[1] === 'X' || arr[2] === null && arr[4] === 'X' && arr[6] === 'X' || arr[2] === null && arr[5] === 'X' && arr[8] === 'X') targetPosition = 2;
    else if (arr[3] === null && arr[0] === 'X' && arr[6] === 'X' || arr[3] === null && arr[4] === 'X' && arr[5] === 'X') targetPosition = 3;
    else if (arr[4] === null && arr[3] === 'X' && arr[5] === 'X' || arr[4] === null && arr[0] === 'X' && arr[8] === 'X' || arr[4] === null && arr[2] === 'X' && arr[6] === 'X' || arr[4] === null && arr[1] === 'X' && arr[7] === 'X') targetPosition = 4;
    else if (arr[5] === null && arr[3] === 'X' && arr[4] === 'X' || arr[5] === null && arr[2] === 'X' && arr[8] === 'X') targetPosition = 5;
    else if (arr[6] === null && arr[0] === 'X' && arr[3] === 'X' || arr[6] === null && arr[2] === 'X' && arr[4] === 'X' || arr[6] === null && arr[7] === 'X' && arr[8] === 'X') targetPosition = 6;
    else if (arr[7] === null && arr[1] === 'X' && arr[4] === 'X' || arr[7] === null && arr[6] === 'X' && arr[8] === 'X') targetPosition = 7;
    else if (arr[8] === null && arr[0] === 'X' && arr[4] === 'X' || arr[8] === null && arr[2] === 'X' && arr[5] === 'X' || arr[8] === null && arr[6] === 'X' && arr[7] === 'X') targetPosition = 8;
    //Se não, a IA escolhe uma posição aleatória:
    if (targetPosition === null) {
        let availablePositions = [];
        arr.forEach((cell, index) => {
            if (cell === null) availablePositions.push(index);
        });
        if (availablePositions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availablePositions.length);
            targetPosition = availablePositions[randomIndex];
        }
    }

    if (targetPosition !== null) {
        const targetCell = Array.from(gameCells).find(cell => parseInt(cell.dataset.position) === targetPosition);
        
        makePlayerMove(targetCell, currentPlayer);
        
        const result = processGameResult(firstPlayer, secondPlayer);
        gameEnded = result.gameEnded;

        isAiThinking = false;
        changePlayerTurn();
    } else {
        isAiThinking = false;
    }
}
    const doPlayerTurn = function(e) {
    if (gameEnded  || isAiThinking) return;
    
    // PROTEÇÃO: Impede cliques humanos se for o turno da IA
    if (IA_mode && currentPlayer === secondPlayer) return;

    const isCellTaken = makePlayerMove(e.target, currentPlayer);
    if (isCellTaken) return;

    const result = processGameResult(firstPlayer, secondPlayer);
    gameEnded = result.gameEnded;
    changePlayerTurn();
}

    const cleanGame = function() {
        gameBoard.clearArray();
        displayController.cleanGameboard();
        currentPlayer = firstPlayer; // Garante que o Player 1 sempre recomeça
        gameEnded = false;
        isAiThinking = false;

        displayController.changePlayerTurnTitle(translate('turn', {name: currentPlayer.getName()}));
    }

    return { doPlayerTurn, cleanGame };

})(player1, player2);
        
    resetButton.addEventListener('click', game.cleanGame);
    
    resetButton?.addEventListener('click', game.cleanGame);
    gameCells.forEach(cell => { cell.addEventListener('click', game.doPlayerTurn); });
}

// Ouvinte do Teclado (Setas) de Acessibilidade
document.getElementById('board')?.addEventListener('keydown', (event) => {
    const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (!validKeys.includes(event.key)) return;
    event.preventDefault(); 
    const currentCell = document.activeElement;
    if (!currentCell || !currentCell.classList.contains('gamecell')) return;
    const currentPos = parseInt(currentCell.dataset.position);
    let nextPos = currentPos;
    switch (event.key) {
        case 'ArrowLeft':  if (currentPos % 3 !== 0) nextPos = currentPos - 1; break;
        case 'ArrowRight': if (currentPos % 3 !== 2) nextPos = currentPos + 1; break;
        case 'ArrowUp':    if (currentPos >= 3) nextPos = currentPos - 3; break;
        case 'ArrowDown':  if (currentPos <= 5) nextPos = currentPos + 3; break;
    }
    const nextCell = document.querySelector(`.gamecell[data-position="${nextPos}"]`);
    if (nextCell && nextPos !== currentPos) {
        currentCell.setAttribute('tabindex', '-1');
        nextCell.setAttribute('tabindex', '0');
        nextCell.focus();
    }
});

// Inicialização do JSON de Idiomas: the setup dialog opens only after the translations are loaded
loadLanguages().finally(() => namesDialog.showModal());
