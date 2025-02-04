document.addEventListener("DOMContentLoaded", () => {
  const colorBox = document.querySelector(".color-box");
  const colorOptions = document.querySelectorAll(".color-option");
  const gameStatus = document.querySelector("[data-testid='gameStatus']");
  const scoreDisplay = document.querySelectorAll(".score");
  const newGameButton = document.querySelectorAll(".newGameButton");
  const gameRulesButton = document.getElementById("gameRulesButton");
  const timerDisplay = document.getElementById("timer");
  const gameOver = document.getElementById("gameOver");
  const colorContainer = document.querySelector("#disp");
  const main = document.getElementById("main");

  let score = 0;
  let targetColor = "";
  let timer;
  let timeLeft = 10; // 10 seconds per round

  // Generate a random color in hex format
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Start the timer countdown
  const startTimer = () => {
    clearInterval(timer); // Clear any previous timer
    timeLeft = 10; // Reset time
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft === 0) {
        clearInterval(timer);
        gameStatus.textContent = "⏳ Time's up! New round started.";
        gameEnd(); // Auto-start new game when time runs out
      }
    }, 1000);
  };

  // Start a new game
  const startGame = () => {
    score = 0;
    gameOver.setAttribute("class", "hideGameOver");
    main.setAttribute("class", "showMain");
    gameStatus.textContent = "";

    let colors = [];
    for (let i = 0; i < 6; i++) {
      colors.push(getRandomColor());
    }

    // Select a random color from the options as the target
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;

    // Assign colors to buttons
    colorOptions.forEach((button, index) => {
      button.style.backgroundColor = colors[index];
      button.classList.remove("correct", "wrong"); // Remove animations
      button.onclick = () => checkGuess(colors[index], button);
    });

    startTimer(); // Start the timer for the round
  };
  const gameEnd = () => {
    clearInterval(timer);
    gameOver.setAttribute("class", "gameOver");
    main.setAttribute("class", "hideMain");
    scoreDisplay.forEach((content) => {
      content.textContent = score;
    });
    console.log("game ended");
    console.log(score);
  };
  const continueGame = () => {
    let colors = [];
    for (let i = 0; i < 6; i++) {
      colors.push(getRandomColor());
    }

    // Select a random color from the options as the target
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;

    // Assign colors to buttons
    colorOptions.forEach((button, index) => {
      button.style.backgroundColor = colors[index];
      button.onclick = () => checkGuess(colors[index], button);
    });

    startTimer(); // Start the timer for the round
  };

  // Check the user's guess
  const checkGuess = (chosenColor, button) => {
    if (chosenColor === targetColor) {
      gameStatus.textContent = "🎉 Correct! Well done!";
      score++;

      scoreDisplay.forEach((content) => {
        content.textContent = score;
      });

      button.classList.add("correct");
      clearInterval(timer); // Stop timer on correct guess
      continueGame();
    } else {
      gameStatus.textContent = "❌ Wrong! Try again.";
      gameEnd();
      button.classList.add("wrong");
    }
  };

  // Reset the game manually
  newGameButton.forEach((button) =>
    button.addEventListener("click", startGame)
  );
  gameRulesButton.addEventListener("click", () =>
    alert(
      "From the color pallet, click on the color that is displayed before the timer runs out "
    )
  );

  // Initialize game on page load
  startGame();
});
