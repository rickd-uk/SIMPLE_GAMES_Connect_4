let playerRed = 'r'
let playerYellow = 'y'
let curPlayer = playerRed

let gameOver = false
let board
let curCols

const rows = 6
const cols = 7

window.onload = () => {
	startGame()
}

function startGame() {
	board = []
	curCols = [5, 5, 5, 5, 5, 5, 5]

	for (let r = 0; r < rows; r++) {
		let row = []
		for (let c = 0; c < cols; c++) {
			// JS
			row.push(' ')

			// html
			let tile = document.createElement('div')
			tile.id = r.toString() + '-' + c.toString()
			tile.classList.add('tile')
			tile.addEventListener('click', setPiece)
			document.getElementById('board').append(tile)
		}
		board.push(row)
	}
}

function setPiece() {
	if (gameOver) {
		return
	}
	let coords = this.id.split('-')
	let r = parseInt(coords[0])
	let c = parseInt(coords[1])

	r = curCols[c]
	if (r < 0) return

	board[r][c] = curPlayer
	let tile = document.getElementById(r.toString() + '-' + c.toString())
	if (curPlayer == playerRed) {
		tile.classList.add('red-piece')
		curPlayer = playerYellow
	} else {
		tile.classList.add('yellow-piece')
		curPlayer = playerRed
	}

	r -= 1 // Updating row height for col
	curCols[c] = r // update the array

	checkForWinner()
}

function checkForWinner() {
	// horizontally
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols - 3; c++) {
			if (board[r][c] != ' ') {
				if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
					setWinner(r, c)
					return
				}
			}
		}
	}

	// Vertically
	for (let c = 0; c < cols; c++) {
		for (let r = 0; r < rows - 3; r++) {
			if (board[r][c] != ' ') {
				if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
					setWinner(r, c)
					return
				}
			}
		}
	}

	// anti diagonally
	for (let r = 0; r < rows - 3; r++) {
		for (let c = 0; c < cols - 3; c++) {
			if (board[r][c] != ' ') {
				if (
					board[r][c] == board[r + 1][c + 1] &&
					board[r + 1][c + 1] == board[r + 2][c + 2] &&
					board[r + 2][c + 2] == board[r + 3][c + 3]
				) {
					setWinner(r, c)
					return
				}
			}
		}
	}

	// diagonally
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols - 3; c++) {
			if (board[r][c] != ' ') {
				if (
					board[r][c] == board[r - 1][c + 1] &&
					board[r - 1][c + 1] == board[r - 2][c + 2] &&
					board[r - 2][c + 2] == board[r - 3][c + 3]
				) {
					setWinner(r, c)
					return
				}
			}
		}
	}
}

function setWinner(r, c) {
	let winner = document.getElementById('winner')
	if (board[r][c] == playerRed) {
		winner.innerText = 'Red Wins!'
	} else {
		winner.innerText = 'Yellow Wins!'
	}
	gameOver = true
}
