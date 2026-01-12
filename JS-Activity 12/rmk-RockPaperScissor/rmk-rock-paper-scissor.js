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
        `You <img class="move-icon" src="12-RockPaperScissor-icon/${buttonMove}-emoji.png">  <img class="move-icon" src="12-RockPaperScissor-icon/${botMove}-emoji.png"> Bot`
        ;
    updateScoreResult();

    return result;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    const button = document.querySelector('.js-auto-play-btn');
    if (!isAutoPlaying) {
        button.innerHTML = 'Stop Playing';
        intervalId = setInterval(() => {
            const playerMove = pickBotMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        button.innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-auto-play-btn').addEventListener('click', () => {
    autoPlay();
});

document.querySelector('.js-rock-btn').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissor-btn').addEventListener('click', () => {
    playGame('scissors');
});

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

document.querySelector('.js-reset-btn').addEventListener('click', () => {
    verifyPlayer();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        verifyPlayer();
    }
});

function verifyPlayer() {
    const verifyMsg = document.querySelector('.js-verify-msg-box');
    verifyMsg.innerHTML = 
    `<p>Are you sure you want to reset the score?
    <button class="js-verify-yes-btn verify-btn">Yes</button>
    <button class="js-verify-no-btn verify-btn">No</button><p/>`
    ;

    document.querySelector('.js-verify-yes-btn').addEventListener('click', () => {
        resetScore(); 
        verifyMsg.innerHTML = '';
    });

    document.querySelector('.js-verify-no-btn').addEventListener('click', () => {
        resetScore(); 
        verifyMsg.innerHTML = '';
    });
}