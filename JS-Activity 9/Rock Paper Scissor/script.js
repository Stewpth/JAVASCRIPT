let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };

// After taking the computer's move this code will run
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie!';
        } else if (computerMove === 'paper') {
            result = 'You lose!';
        } else if (computerMove === 'scissor') {
            result = 'You win!';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win!';
        } else if (computerMove === 'paper') {
            result = 'Tie!';
        } else if (computerMove === 'scissor') {
            result = 'You lose!';
        }
    } else if (playerMove === 'scissor') {
        if (computerMove === 'rock') {
            result = 'You lose!';
        } else if (computerMove === 'paper') {
            result = 'You win!';
        } else if (computerMove === 'scissor') {
            result = 'Tie!';
        }
    }

    if (result === 'You win!') {
        score.wins += 1;
    } else if (result === 'You lose!') {
        score.losses += 1;
    } else if (result === 'Tie!') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.result').innerHTML = result;

    document.querySelector('.play-game').innerHTML = `Player ${playerMove} - ${computerMove} Computer`;

    updateScore();

    return result;
}

// computer pick a random move and submit the move and use it on playGame() function.
function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissor';
    }

    return computerMove;
}

function updateScore() {
    document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties ${score.ties}`;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScore();
    document.querySelector('.result').innerHTML = '';
    document.querySelector('.play-game').innerHTML = '';
    localStorage.removeItem('score');
}