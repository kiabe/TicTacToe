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

// Game State Module to keep track of board state
const GameStateModule = (() => {
    // TicTacToe board as array with 9 empty elements
    const gameboard = [,,,,,,,,,];
    const gridNodes = document.querySelectorAll('.grid');

    const addGridListeners = function() {

        gridNodes.forEach(grid => {
            grid.addEventListener('click', logTarget);
        });

        gridNodes.forEach(grid => {
            grid.addEventListener('click', isValidGrid);
        });
    };

    function logTarget(e) {
        console.log(e.target)
        console.log(typeof e.target.id);
        console.log(e.target.hasChildNodes());
        let gridID = parseInt(e.target.id);
        console.log(typeof gridID);
        console.log(gridID);
    };

    // keeps track of gameboard array, and if a grid is valid (ergo empty/undefined)
    const isValidGrid = function(e) {
        let gridID = parseInt(e.target.id);
        // is array index [i] empty?
        if (gameboard[gridID] === undefined) {
            //is valid place to mark
            return "Valid area";
        } else {
            return "That grid is already taken";
        };
    };

    // assign array value index
    const assignMark = function() {
        // sample assign
        gameboard[0] = 'O';
        console.log(gameboard);
    }

    const publicBoard = function() {
        // shows state of board, empty or filled. initially empty
        console.log(gameboard);
    };

    return {addGridListeners, assignMark, isValidGrid};
})();

GameStateModule.addGridListeners();
GameStateModule.assignMark();

// Now that board is created and kept track of, create players for use
// Player Factory
const playerFactory = (tagName) => {
    const getTagName = () => tagName;

    const chooseSide = function () {
    // what is player playing? X or O? initially undefined
    let side;
    let symbol = prompt("Do you want to go first or second?");

        if (symbol !== null && symbol === 'first') {
            side = 'X';
            console.log(side);
        } else if (symbol !== null && symbol === 'second') {
            side = 'O';
            console.log(side);
        }    
    }
    const markBoard = function() {
        const gridNodes = document.querySelectorAll('.grid');
        for (let i = 0; i < gridNodes.length; i++) {
            const mark = document.createElement('div');
            mark.classList.add('mark');
            mark.textContent = gameboard[i];
            gridNodes[i].appendChild(mark);
        };
    };

    return {getTagName, chooseSide};
};

const gorny = playerFactory('Gorny');
console.log(gorny.tagName);
console.log(gorny.getTagName());

// reorganize code, consider deferring adding event listeners on grids on board creation to a later point
// click grid and mark symbol