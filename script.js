const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
    const gameState = JSON.parse(event.data);
    updateGame(gameState);
};

document.getElementById('guessButton').addEventListener('click', guessLetter);

function guessLetter() {
    const letterInput = document.getElementById('letterInput');
    const letter = letterInput.value;

    if (letter !== '') {
        const guess = {
            type: 'guess',
            letter: letter
        };

        ws.send(JSON.stringify(guess));

        // Clear input field after sending
        letterInput.value = '';
    }
}

function updateGame(gameState) {
    const wordElement = document.getElementById('word');
    const guessedLettersElement = document.getElementById('guessed-letters');

    // Clear elements before updating
    wordElement.innerHTML = '';
    guessedLettersElement.innerHTML = '';

    // Display guessed letters
    gameState.word.split('').forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = gameState.guessedLetters.includes(letter) ? letter : '_';
        wordElement.appendChild(span);
    });

    // Display guessed letters
    gameState.guessedLetters.forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        guessedLettersElement.appendChild(span);
    });
}
