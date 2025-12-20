let score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
        };

function pickComputerMove() {
    const randomMove = Math.random();
  
    if (randomMove >= 0 && randomMove < 1/2) {
        computerMove = 'coin-heads';
    } else {
        computerMove = 'coin-tails';
    }

    return computerMove;
}

function playGame(playerMove) {
    let computerMove = pickComputerMove();

    let result = '';

    if (computerMove === playerMove) {
        result = 'You win!';
    } else {
        result = 'You lose!';
    }

    if (result === 'You win!') {
        score.wins += 1;
    } else if (result === 'You lose!') {
        score.losses += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));


    document.querySelector('.result-text').innerHTML = `${result}`;
    document.querySelector('.result-pic').innerHTML = `<img src="coinflip-image/${computerMove}.png" class="coin-design">`;

    updateScore();
}

function updateScore() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}`;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    localStorage.removeItem(score);
    updateScore();
}

