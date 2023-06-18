const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let players = [];
let currentPlayerIndex = 0;
let word = 'hangman';
let guessedLetters = [];

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Assign a name to the connected player
    const playerName = `Player ${players.length + 1}`;
    players.push(playerName);

    ws.on('message', (message) => {
        const guess = message.trim().toLowerCase();

        if (guess.length === 1 && currentPlayerIndex === players.indexOf(playerName)) {
            handleGuess(guess);
            broadcastGameState();
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');

        // Remove the player from the players array
        const playerIndex = players.indexOf(playerName);
        if (playerIndex !== -1) {
            players.splice(playerIndex, 1);
        }

        // Reset the game if there are no players remaining
        if (players.length === 0) {
            currentPlayerIndex = 0;
            word = 'hangman';
            guessedLetters = [];
        }
    });

    // Send initial game state to the connected player
    ws.send(JSON.stringify(getGameState()));
});

function handleGuess(guess) {
    if (word.includes(guess) && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function broadcastGameState() {
    const gameState = getGameState();
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(gameState));
    });
}

function getGameState() {
    return {
        word: word,
        guessedLetters: guessedLetters,
        currentPlayer: players[currentPlayerIndex]
    };
}
