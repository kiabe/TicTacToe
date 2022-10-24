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
const PlayerFactory = (tagName) => {

    const getTagName = () => tagName;

    // const chooseSide = function () {
    // // what is player playing? X or O? initially undefined
    // let firstPlayer = 'X';
    // let secondPlayer = 'O';

    // let symbol = prompt("Do you want to go first or second?");

    //     if (symbol !== null && symbol === 'first') {
    //         side = 'X';
    //         console.log(side);
    //     } else if (symbol !== null && symbol === 'second') {
    //         side = 'O';
    //         console.log(side);
    //     } else {
    //         console.log("Hey, if you're here, it's time to reset")
    //     }
    // }

    return {getTagName};
};

const gorny = PlayerFactory('Gorny');
console.log(gorny.tagName);
console.log(gorny.getTagName());
// gorny.chooseSide();

// Game State Module to keep track of board state represented by array
const GameStateModule = (() => {
    // TicTacToe board as array with 9 empty elements
    const gameboard = [,,,,,,,,,];
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
            publicBoardAll();
        } else if (gameboard[gridID] === undefined && isPlayerTwoTurn === true) {
            gameboard[gridID] = 'O';
            markGrid(gridID);
            turnCounter();
            publicBoardAll();
        };
    };

    const markGrid = function(num) {
        const gridNodes = document.querySelectorAll('.grid');
        const mark = document.createElement('div');
        mark.classList.add('mark');
        mark.textContent = gameboard[num];
        gridNodes[num].appendChild(mark);
    };

    const publicBoardAll = function() {
        // shows state of board, empty or filled. initially empty
        console.log(gameboard);
        return gameboard;
    };

    const publicBoardSpecific = function(num) {
        console.log(gameboard[num]);
        return gameboard[num];
    };

    const computerFillArray = function(num, symbol) {
        return gameboard[num] = symbol;
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

    return {addGridListeners, isValidGrid, updateGameboardAndGrid, markGrid, turnCounter, publicBoardAll, publicBoardSpecific, computerFillArray};
})();

GameStateModule.addGridListeners();

const Computer = () => {
    const {markGrid, publicBoardAll, publicBoardSpecific, computerFillArray} = GameStateModule;


    const getRandomNum = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    const publicRNG = function() {
        console.log(getRandomNum(0, 8));
    }

    // move computer
    const computerMove = function() {
        let num = getRandomNum(0, 8);
        // checks array. if array at random index is undefined/empty, spot is available
        if (publicBoardSpecific(num) === undefined) {
            console.log('succ?');
            computerFillArray(num, 'X');
            markGrid(num);
            publicBoardAll();
        };
    };


    return {getRandomNum, publicRNG, computerMove};
}

const computer = Computer();
console.log(computer.getRandomNum(0, 8));
