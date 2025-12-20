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

// For control button events.
// Still works like onclick but for the best
// Practice. I will use addEventListener instead
// onclick or any on${event} attributes.
document.querySelector('.js-rock-btn')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-btn')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-btn')
    .addEventListener('click', () => {
        playGame('scissors');
    });

// If the player wants to play by using keyboard
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
})

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

// For Reset Button
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-move').innerHTML = '';
    localStorage.removeItem('score');
    updateScoreResult();
}

// For Autoplaying button
let isAutoPlaying = false;
let autoPlayingId;

function autoPlay() {
    if (!isAutoPlaying) {
        document.querySelector('.js-autoplay-btn')
            .innerHTML = 'Stop Playing';

        autoPlayingId = setInterval(function() {
            const playerMove = pickBotMove();
            playGame(playerMove);
            isAutoPlaying = true;
        }, 1000);
    } else {
        clearInterval(autoPlayingId);
        isAutoPlaying = false;
        document.querySelector('.js-autoplay-btn')
            .innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-autoplay-btn').addEventListener('click', () => {
    autoPlay();
});

document.querySelector('.js-reset-btn').addEventListener('click', () => {
    notifyPlayer();
});

// For space key input 
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        notifyPlayer();
    }
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    }
});

function notifyPlayer() {
    document.querySelector('.reset-notify')
        .innerHTML = `
            <p>Are you sure you want to reset the score?
                <button class="reset-yes js-reset-yes">Yes</button>
                <button class="reset-no js-reset-no">No</button>
            </p>
        `;

    document.querySelector('.js-reset-yes').addEventListener('click', () => {
        resetScore();
        document.querySelector('.reset-notify')
            .innerHTML = ``;
    });

    document.querySelector('.js-reset-no').addEventListener('click', () => {
        document.querySelector('.reset-notify')
            .innerHTML = ``;
    });
}



