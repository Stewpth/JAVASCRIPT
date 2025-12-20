let score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };

updateScoreResult();

function pickBotMove() {
    const randomNumber = Math.random();

    let botMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        botMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        botMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        botMove = 'scissors';
    }

    return botMove;
}

function playGame(buttonMove) {
    const botMove = pickBotMove();

    let result = '';

    if (buttonMove === 'rock') {
        if (botMove === 'rock') {
            result = 'Tie';
        } else if (botMove === 'paper') {
            result = 'You lose';
        } else if (botMove === 'scissors') {
            result = 'You win';
        }
    } else if (buttonMove === 'paper') {
        if (botMove === 'rock') {
            result = 'You win';
        } else if (botMove === 'paper') {
            result = 'Tie';
        } else if (botMove === 'scissors') {
            result = 'You lose';
        }
    } else if (buttonMove === 'scissors') {
        if (botMove === 'rock') {
            result = 'You lose';
        } else if (botMove === 'paper') {
            result = 'You win';
        } else if (botMove === 'scissors') {
            result = 'Tie';
        }
    }

    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-move').innerHTML =
        `You <img class="move-icon" src="RockPaperScissor-icon/${buttonMove}-emoji.png">  <img class="move-icon" src="RockPaperScissor-icon/${botMove}-emoji.png"> Bot`
        ;
    updateScoreResult();

    return result;
}

function updateScoreResult() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-move').innerHTML = '';
    localStorage.removeItem('score');
    updateScoreResult();
}