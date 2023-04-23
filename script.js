const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset');
const playerTurn = document.getElementById("player-turn")
const gameStatus = document.getElementById("status")
const buttonReset = document.getElementById("reset")

let boardState = ['', '', '', '', '', '', '', '', ''];
let variavelGameStatus = "not playing"

/*Possibilitys of wins */
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//Resets the game
resetButton.addEventListener("click", resetGame)

function resetGame() {
  gameStatus.textContent = "Playing"
  boardState = ['', '', '', '', '', '', '', '', ''];
  squares.forEach((square) => {
    square.textContent = ""
  })
  gameStart()
}

//Ends the game
function gameOver(result) {
  if(result == "player1") {
    gameStatus.textContent = "Player X was the winner"
  }
  if(result == "player2") {
    gameStatus.textContent = "Player O was the winner"
  }
  if(result == "") {
    gameStatus.textContent = "The match ended in a draw"
  }
  squares.forEach((square) => {
    square.removeEventListener("click", game)
  })
}

//Starts the game
function gameStart() {

  gameStatus.textContent = "Playing"
  squares.forEach((square) => {
    square.addEventListener("click", game)
  })
}



function game(square) {
  variavelGameStatus = "Playing"
  const squareIndex = parseInt(square.target.getAttribute('data-index'))
  if(boardState[squareIndex]== "X" || boardState[squareIndex] == "O"){
  } else {
    if(gameStatus.textContent == "Playing") {
      if(currentPlayer == "X") {
        playerTurn.textContent = currentPlayer
        currentPlayer = "O"
      } else {
        playerTurn.textContent = currentPlayer
        currentPlayer = "X"
      }
    }
    boardState.splice(squareIndex, 1, currentPlayer)
    square.target.textContent = currentPlayer
  }
  checkWinner()
}

//Verify match status
function checkWinner() {
  winningCombinations.forEach((linha) => {
    if(boardState[linha[0]] == "X" && boardState[linha[1]] == "X" && boardState[linha[2]] == "X") {
      let player = document.getElementById("points-player1")
      let player1Point = player.textContent
      player1Point = parseInt(player1Point) + 1
      player.textContent = player1Point
      variavelGameStatus = "Game over"
      firstTime = false
      gameOver("player1")
    }
    if(boardState[linha[0]] == "O" && boardState[linha[1]] == "O" && boardState[linha[2]] == "O") {
      let player = document.getElementById("points-player2")
      let player1Point = player.textContent
      player1Point = parseInt(player1Point) + 1
      player.innerText = player1Point
      variavelGameStatus = "Game over"
      firstTime = false
      gameOver("player2")
    } else if(!boardState.includes("") && variavelGameStatus == "Playing"){
      variavelGameStatus = "Game over"
      firstTime = false
      gameOver("")
    }
  })
  
}

//Raffle the first player
function playerStart() {
  const player = Math.floor(Math.random()*2)+1
  if(player == 1) {
    currentPlayer = "X"
    playerTurn.textContent = currentPlayer
  } else {
    currentPlayer = "O"
    playerTurn.textContent = currentPlayer
  }
}

playerStart()
gameStart()

