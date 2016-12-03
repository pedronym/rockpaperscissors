(function (win, doc, undefined) {

  // Constants //
  const readable = {
    '0': {
      name: 'rock',
      beats: [2]
    },
    '1': {
      name: 'paper',
      beats: [0]
    },
    '2': {
      name: 'scissors',
      beats: [1]
    }
  };

  // Game Variables //
  let gameScore  = {
        player: 0,
        cpu: 0
      },
      maxChoices = Object.keys(readable).length,
      cpuChoice,
      playerChoice;

  // UI Elements //
  const icons  = doc.querySelectorAll('.icon'),
        last   = doc.querySelector('.last'),
        result = doc.querySelector('.result'),
        score  = doc.querySelector('.score');

  function onIconClick (e) {
    const choice = parseInt(e.currentTarget.getAttribute('data-choice'), 10);

    cpuChoice = randomChoice();
    playerChoice = choice;

    updateView();
  }

  function randomChoice () {
    return Math.floor(Math.random() * maxChoices);
  }

  function updateView () {
    evalResult();
    score.textContent  = `Player ${gameScore.player} / CPU: ${gameScore.cpu}`;
    result.textContent = `Player chose ${readable[playerChoice].name} and CPU chose ${readable[cpuChoice].name}`;
  }

  function evalResult () {
    if (playerChoice === cpuChoice) {
      tie();
    } else if (readable[playerChoice].beats.indexOf(cpuChoice) > -1) {
      playerWins();
    } else if (readable[cpuChoice].beats.indexOf(playerChoice) > -1) {
      cpuWins();
    }
  }

  function playerWins () {
    gameScore.player += 1;
    last.textContent = 'Player Wins!';
  }

  function cpuWins () {
    gameScore.cpu += 1;
    last.textContent = 'CPU Wins!';
  }

  function tie () {
    last.textContent = 'Tie! No one wins! :(';
  }

  function init () {
    icons.forEach(function (el) {
      el.addEventListener('click', onIconClick);
    })
  }

  init();

})(window, document);
