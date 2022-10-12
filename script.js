// Gameboard Module with IIFE
const Gameboard = (() => {
    // TicTacToe board as array
    const gameboard = [1,2,3,4,5,6,7,8,9];
    // DOM stuff
    const selectBoard = document.querySelector('#board');

    const createBoard = function() {
        for (let i = 0; i < gameboard.length; i++) {
            const grid = document.createElement('div');
            grid.classList.add('grid');
            selectBoard.appendChild(grid);
        };
    };

    const markBoard = function () {
        const gridNodes = document.querySelectorAll('.grid');
        for (let i = 0; i < gridNodes.length; i++) {
            const mark = document.createElement('div');
            mark.classList.add('mark');
            mark.textContent = gameboard[i];
            gridNodes[i].appendChild(mark);
        };
    };
    return {gameboard, createBoard, markBoard};
})();

Gameboard.createBoard();
Gameboard.markBoard();

// Player Factory
const playerFactory = (tagName) => {
    const sayTagName = () => console.log("Greetings from " + tagName);
    return {tagName, sayTagName};
};

const gorny = playerFactory('Gorny');
console.log(gorny.tagName);
console.log(gorny.sayTagName());