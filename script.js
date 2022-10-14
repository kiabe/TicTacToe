// Gameboard Module with IIFE. Just create board.
const Gameboard = (() => {
    // TicTacToe board as array with 9 empty elements
    const gameboard = [,,,,,,,,,];

    // DOM stuff
    const selectBoard = document.querySelector('#board');

    const createBoard = function() {
        for (let i = 0; i < gameboard.length; i++) {
            const grid = document.createElement('div');
            grid.setAttribute('id', i);
            grid.classList.add('grid');
            // grid.addEventListener('click', e => {
            //     console.log(e.target);
            //     console.log(e.target.hasChildNodes());
            // });
            grid.addEventListener('click', logTarget);
            selectBoard.appendChild(grid);
        };
    };

    function logTarget(e) {
        console.log(e.target)
        console.log(typeof e.target.id);
        console.log(e.target.hasChildNodes());
        let gridID = e.target.id;
        return console.log(gridID);
    };

    const publicBoard = function() {
        // shows state of board, empty or filled. initially empty
        console.log(gameboard);
    };

    return {createBoard, publicBoard, gameboard};
})();

Gameboard.createBoard();
Gameboard.publicBoard();

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

    const {publicBoard} = Gameboard;

    return {getTagName, chooseSide, publicBoard};
};

const gorny = playerFactory('Gorny');
console.log(gorny.tagName);
console.log(gorny.getTagName());

// Game State Module
const GameStateModule = (() => {
    //keeps track of game state of board
    const {gameboard} = Gameboard;

    // keeps track of gameboard array, and if a grid is valid (ergo empty)
    const isValidGrid = function() {
        // is array index [i] empty?
    }

    // assign array value index
    const assignMark = function() {
        // sample push
        gameboard[0] = 'O';
        console.log(gameboard);
    }

    return {assignMark};
})();

GameStateModule.assignMark();