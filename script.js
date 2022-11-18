const tileDisplay = document.querySelector("[data-tile]");
const keyboard = document.querySelector("[data-key]");
const msgComponent = document.querySelector("[data-message]");

const wordle = "SUPER";
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "≪",
];

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const handleClick = (key) => {
  console.log("clicked", key);

  if (key === "ENTER") {
    onEnter();
    return;
  }
  if (key === "≪") {
    currentTile > 0 && deleteLetter();
    return;
  }
  if (currentTile < 5 && currentTile < 6) {
    addLetter(key);
  }

  console.log(currentRow);
};

const deleteLetter = () => {
  const tile = document.getElementById(
    `guessRow${currentRow}-tile-${currentTile - 1}`
  );

  tile.textContent = "";
  guessRows[currentRow][currentTile] = "";
  currentTile--;
};

const addLetter = (letter) => {
  const tile = document.getElementById(
    `guessRow${currentRow}-tile-${currentTile}`
  );

  tile.textContent = letter;
  tile.setAttribute("data", letter);
  guessRows[currentRow][currentTile] = letter;
  currentTile++;

  console.log(guessRows[currentRow]);
};

const onEnter = () => {
  const guess = guessRows[currentRow].join("");

  if (currentTile > 4) {
    flipTile();
    if (guess === wordle) {
      showMessage("Well done!");
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        isGameOver = true;
        showMessage("Better Luck Next Time");
        return;
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
  }
};

const showMessage = (message) => {
  const messageBody = document.createElement("p");
  messageBody.textContent = message;

  msgComponent.append(messageBody);
  setTimeout(() => msgComponent.removeChild(messageBody), 2000);
};

const flipTile = () => {
  const rowTiles = document.getElementById(`guessRow${currentRow}`).childNodes;
  let checkWordle = wordle;
  let guess = [];

  rowTiles.forEach((tile) => {
    guess.push({
      letter: tile.getAttribute("data"),
      color: "gray-overlay",
    });
  });

  guess.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = "green-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  guess.forEach((guess, index) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = "yellow-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("flip");
      tile.classList.add(guess[index].color);
    }, 500 * index);
  });
};

guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", `guessRow${guessRowIndex}`);

  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute(
      "id",
      `guessRow${guessRowIndex}-tile-${guessIndex}`
    );
    tileElement.classList.add("tile");

    rowElement.append(tileElement);
  });

  tileDisplay.append(rowElement);
});

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;

  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));

  keyboard.append(buttonElement);
});
