let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

//variabeln userGuess får värdet som skrivs in av användaren och gör säkert
//att det är ett nummer som skrivs in med Number()
//Första if-satsen kollar att detta är användarens första spelomgång, dvs
// att variabeln guessCount = 1

function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
//Kollar om användarens gissning är lika med randomNumber. Om true så är
//spelet vunnet och skriver ut "congratulations" meddelande

  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.color = 'green';
    lowOrHi.textContent = '';
    setGameOver();
//Kollar om detta är användarens sista tur, om det är fallet skrivs
//game over ut istället för "congratulations" som ovanstående
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
//Denna else körs om inga av de tidigare satserna är true, dvs om användaren
//gissade fel och har gissningar kvar, det sker alltså ett till test för att
//se om denna gissning är högre eller lägre än det korrekta numret, samt skriver ut det
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.color = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!' ;
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
//Lägger till 1 till guessCount variabeln så användaren använt en omgång
  guessCount++;
  guessField.value = '';
  guessField.focus();
}
//lägger till en eventlistener till min knapp,
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
//disablar form text input så användaren inte kan gissa fler gånger
//efter spelet är över
  guessField.disabled = true;
  guessSubmit.disabled = true;
//här skapas en ny knapp i botten av sidan med texten "Start new game"
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
//Kallar på funktionen resetGame som deklareras nedanför
  resetButton.addEventListener('click', resetGame);
}

//När denna funktion körs återstället spelet. Direkt nedan sätts guessCount 
//till 1 igen som i början av spelet
function resetGame() {
  guessCount = 1;
//Här töms all text inom div: resultParas. Med for-loopen loopas alla 
//paragrafer igenom och sätter textContent till '', dvs tömmer dem.
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }
//Här tas reset knappen bort från koden
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  //Tar bort färgen fråm lastResult
  lastResult.style.backgroundColor = 'white';
  //Genererar ett nytt nummer till nästa omgång
  randomNumber = Math.floor(Math.random() * 100) + 1;
}