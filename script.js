// Список слов для угадывания
const words = [
    "автобус",
    "ананас",
    "апельсин",
    "арбуз",
    "багато",
    "банан",
    "буква",
    "велосипед",
    "вишня",
    "вода",
    "гірка",
    "горобець",
    "гранат",
    "двері",
    "дерево",
    "дитина",
    "дощ",
    "жаба",
    "життя",
    "зебра",
    "зірка",
    "зошит",
    "іграшка",
    "ім'я",
    "квітка",
    "килим",
    "кіт",
    "ластівка",
    "літо",
    "льодяник",
    "магазин",
    "мак",
    "мама",
    "метро",
    "місяць",
    "ніж",
    "носок",
    "обличчя",
    "океан",
    "осінь",
    "павук",
    "папір",
    "парк",
    "пензлик",
    "піраміда",
    "ранок",
    "риба",
    "роза",
    "скло",
    "слово",
    "сніг",
    "сонце",
    "сорока",
    "телефон",
    "трава",
    "трамвай",
    "україна",
    "фіолетовий",
    "футбол",
    "хмара",
    "цукерка",
    "чайка",
    "чарівник",
    "шапка",
    "школа",
    "щастя",
    "юність",
    "яблуко",
    "ялинка",
    "ярмарок",
    "ясли",
    "аеропорт",
    "багаж",
    "басейн",
    "берег",
    "вагон",
    "вечір",
    "вітер",
    "вовк",
    "гарячий",
    "гора",
    "горщик",
    "дім",
    "довгий",
    "дорога",
    "дружба",
    "жарти",
    "жінка",
    "зал",
    "замок",
    "запах",
    "земля",
    "інструмент",
    "кава",
    "картопля",
    "каша",
    "квітень",
    "книжка",
    "колір",
    "лампа",
    "листопад",
    "літак",
    "літо",
    "майстерня",
    "мільйон",
    "міст",
    "мішок",
    "надія",
    "навчання",
    "ніч",
    "обід",
    "олівець",
    "операція",
    "острів",
    "парашут",
    "пахощі",
    "підлога",
    "повітря",
    "пори року",
    "пошта",
    "принтер",
    "радість",
    "рибалка",
    "світло",
    "серце",
    "сніжок",
    "сокіл",
    "стілець",
    "тепло",
    "тиждень",
    "троянда",
    "улюблений",
    "фламінго",
    "фонтан",
    "хата",
    "хліб",
    "церква",
    "червень",
    "черепаха",
    "шапка",
    "шина",
    "щастя",
    "юність",
    "ялинка",
    "яхта"
];


// Выбор случайного слова из списка
var randomIndex = Math.floor(Math.random() * words.length);
var selectedWord = words[randomIndex];

// Список игроков
var players = [];

// Индекс текущего игрока
var currentPlayerIndex = 0;

// Переменные для угаданных и неправильных букв
var guessedLetters = [];
var wrongLetters = [];

// Отображение слова на игровом поле
function displayWord() {
    var wordContainer = document.getElementById("word");
    wordContainer.innerHTML = "";

    var wordLength = selectedWord.length;
    var wordInfo = document.createElement("p");
    wordInfo.textContent = "Количество букв: " + wordLength;
    wordContainer.appendChild(wordInfo);

    for (var i = 0; i < wordLength; i++) {
        var letter = selectedWord[i];
        var placeholder = guessedLetters.includes(letter) ? letter : "_";
        var letterSpan = document.createElement("span");
        letterSpan.textContent = placeholder + " ";
        wordContainer.appendChild(letterSpan);
    }
}

// Обновление отображения угаданных и неправильных букв
function updateLetters() {
    var lettersContainer = document.getElementById("letters");
    lettersContainer.innerHTML = "";

    var guessedLettersText = document.createElement("p");
    guessedLettersText.textContent = "Угаданные буквы: " + guessedLetters.join(", ");
    lettersContainer.appendChild(guessedLettersText);

    var wrongLettersText = document.createElement("p");
    wrongLettersText.textContent = "Неправильные буквы: " + wrongLetters.join(", ");
    lettersContainer.appendChild(wrongLettersText);
}

// Обработчик события для угадывания буквы
function guessLetter() {
    var letterInput = document.getElementById("letterInput");
    var letter = letterInput.value.toLowerCase();

    if (!letter || letter.length !== 1) {
        return;
    }

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        alert("Вы уже угадывали эту букву!");
        return;
    }

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        displayWord();

        if (!selectedWord.split("").some(function (char) {
            return !guessedLetters.includes(char);
        })) {
            alert("Поздравляем! Игрок " + players[currentPlayerIndex] + " угадал все буквы слова: " + selectedWord);
        }
    } else {
        wrongLetters.push(letter);
        updateLetters();

        if (wrongLetters.length >= 6) {
            alert("К сожалению, вы проиграли. Загаданное слово было: " + selectedWord);
        } else {
            alert("Неправильно! Следующий игрок: " + getNextPlayerName());
        }
    }

    letterInput.value = "";
    letterInput.focus();
}

// Функция для получения имени следующего игрока
function getNextPlayerName() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    return players[currentPlayerIndex];
}

// Функция для начала игры
function startGame() {
    var playersInput = document.getElementById("playersInput");
    var playersList = playersInput.value.split(",").map(function (player) {
        return player.trim();
    });

    if (playersList.length < 2) {
        alert("Введите как минимум два имени игроков!");
        return;
    }

    players = playersList;
    playersInput.disabled = true;

    var currentPlayerText = document.createElement("p");
    currentPlayerText.textContent = "Текущий игрок: " + players[currentPlayerIndex];
    var wordContainer = document.getElementById("word");
    wordContainer.insertBefore(currentPlayerText, wordContainer.firstChild);

    displayWord();
    updateLetters();
}

// Начало игры
window.onload = function () {
    var startButton = document.createElement("button");
    startButton.textContent = "Начать игру";
    startButton.onclick = startGame;

    var playersInput = document.createElement("input");
    playersInput.type = "text";
    playersInput.placeholder = "Введите имена игроков через запятую";
    playersInput.id = "playersInput";

    var inputContainer = document.getElementById("input");
    inputContainer.appendChild(playersInput);
    inputContainer.appendChild(startButton);
};
