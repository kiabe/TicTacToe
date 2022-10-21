// Gameboard Module with IIFE. Just create board.
const Gameboard = (() => {

    const createBoard = function() {
        const selectBoard = document.querySelector('#board');
        for (let i = 0; i < 9; i++) {
            const grid = document.createElement('div');
            grid.setAttribute('id', i);
            grid.classList.add('grid');
            selectBoard.appendChild(grid);
        };
    };

    return {createBoard};
})();

Gameboard.createBoard();

// Now that board is created, create players for use
// Player Factory creates players
const playerFactory = (tagName) => {

    const getTagName = () => tagName;

    const chooseSide = function () {
    // what is player playing? X or O? initially undefined
    let firstPlayer = 'X';
    let secondPlayer = 'O';

    let symbol = prompt("Do you want to go first or second?");

        if (symbol !== null && symbol === 'first') {
            side = 'X';
            console.log(side);
        } else if (symbol !== null && symbol === 'second') {
            side = 'O';
            console.log(side);
        } else {
            console.log("Hey, if you're here, it's time to reset")
        }
    }

    return {getTagName, chooseSide};
};

const gorny = playerFactory('Gorny');
console.log(gorny.tagName);
console.log(gorny.getTagName());
// gorny.chooseSide();

// Game State Module to keep track of board state represented by array
const GameStateModule = (() => {
    // TicTacToe board as array with 9 empty elements
    const gameboard = [,,,,,,,,,];
    const gridNodes = document.querySelectorAll('.grid');
    let count = 0;
    let isPlayerOneTurn = true;
    let isPlayerTwoTurn = false;

    const addGridListeners = function() {
        // add event listeners to grid divs
        const gridNodes = document.querySelectorAll('.grid');

        gridNodes.forEach(grid => {
            grid.addEventListener('click', isValidGrid);
        });

        gridNodes.forEach(grid => {
            grid.addEventListener('click', updateGameboardAndGrid);
        })
    };

    const isValidGrid = function(e) {
        // keeps track of gameboard array, and if a grid is valid (ergo whether or not it has children)
        // if valid (false), will mark board
        // if not (true), will do nothing
        let haveGridChildren = e.target.hasChildNodes();

        if (haveGridChildren === false) {
            updateGameboardAndGrid(e);
        }
    };

    const updateGameboardAndGrid = function(e) {
        // update array value index
        let gridID = parseInt(e.target.id);

        if (gameboard[gridID] === undefined && isPlayerOneTurn === true) {
            gameboard[gridID] = 'X';
            markGrid(gridID);
            turnCounter();
            publicBoard();
        } else if (gameboard[gridID] === undefined && isPlayerTwoTurn === true) {
            gameboard[gridID] = 'O';
            markGrid(gridID);
            turnCounter();
            publicBoard();
        };
    };

    const markGrid = function(num) {
        const mark = document.createElement('div');
        mark.classList.add('mark');
        mark.textContent = gameboard[num];
        gridNodes[num].appendChild(mark);
    };

    const publicBoard = function() {
        // shows state of board, empty or filled. initially empty
        console.log(gameboard);
    };

    const turnCounter = function() {
        // increments count variable

        if (count % 2 === 0) {
            // it's player1 turn :: X
            // after increment, player turn switches
            count++;
            console.log(count);
            isPlayerOneTurn = false;
            isPlayerTwoTurn = true;
        } else {
            // it's player2 turn :: O
            count++;
            console.log(count);
            isPlayerTwoTurn = false;
            isPlayerOneTurn = true;
        }
    };

    return {addGridListeners, updateGameboardAndGrid, isValidGrid, turnCounter};
})();

GameStateModule.addGridListeners();

