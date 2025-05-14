'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const startButton = document.querySelector('.button, .start');
const startMessage = document.querySelector('.message-start');
const hint = startMessage.nextElementSibling;
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');
const gameBoard = document.querySelector('tbody');
const score = document.querySelector('.game-score');

function printBoard() {
  for (let i = 0; i < gameBoard.rows.length; i++) {
    for (let j = 0; j < gameBoard.rows[i].cells.length; j++) {
      const cell = gameBoard.rows[i].cells[j];
      const cellValue = game.currentState[i][j];

      if (game.currentState[i][j] !== 0) {
        cell.innerHTML = cellValue;
        cell.className = 'field-cell';
        cell.classList.add(`field-cell--${cellValue}`);
      } else {
        cell.innerHTML = '';
        cell.className = 'field-cell';
      }
    }
  }
}

startButton.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.isIdle = false;
    game.start();
    startButton.innerHTML = 'Restart';
    startButton.classList.add('restart');
    startButton.classList.remove('start');
    startMessage.classList.add('hidden');
    hint.classList.remove('hidden');
    winMessage.classList.add('hidden');
    loseMessage.classList.add('hidden');
  } else {
    game.isIdle = true;
    game.restart();
    startButton.innerHTML = 'Start';
    startButton.classList.remove('restart');
    startButton.classList.add('start');
    startMessage.classList.remove('hidden');
    hint.classList.add('hidden');
    winMessage.classList.add('hidden');
    loseMessage.classList.add('hidden');
  }

  score.innerHTML = game.getScore();

  printBoard();
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  switch (key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      break;
  }

  if (
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'ArrowUp' ||
    key === 'ArrowDown'
  ) {
    printBoard();
  }

  score.innerHTML = game.getScore();

  if (game.getStatus() === 'win') {
    hint.classList.add('hidden');
    winMessage.classList.remove('hidden');
  } else if (game.getStatus() === 'lose') {
    hint.classList.add('hidden');
    loseMessage.classList.remove('hidden');
  }
});
