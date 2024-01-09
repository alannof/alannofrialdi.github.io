// Loading feature
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const home = document.getElementById("home");

  setTimeout(() => {
    loader.style.opacity = 0;
    home.style.opacity = 1;
    loader.addEventListener("transitionend", () => {
      loader.classList.add("hidden");
      home.classList.remove("hidden");
      handlePageLoad();
    });
  }, 2500);
});

const mostRecentScore = localStorage.getItem("mostRecentScore");

// Handle page load functionality
const handlePageLoad = () => {
  const finalScore = document.getElementById("finalScore");
  finalScore.style.textTransform = "uppercase";

  if (mostRecentScore !== null) {
    finalScore.innerText = ` Score : ${mostRecentScore}`;

    setTimeout(() => {
      const message =
        mostRecentScore <= 60
          ? "Don't give up, play again to improve the score!"
          : "Congrats! Your grade is more than KKM.";

      alert(message);
    }, 2500);
  }
};

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

// Enable/disable save button based on username input
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value.trim();
});

const playAgain = document.getElementById("playAgain");

// Event listener for play again button
playAgain.onclick = () => confirm("Want to play again?");

// Save high score function
const saveHighScore = () => {
  console.log("saveHighScore function is called");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const enteredName = username.value.trim();
  const MAX_HIGH_SCORES = 5;
  const scoreObject = { name: enteredName, score: mostRecentScore };

  highScores.push(scoreObject);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  console.log("High score saved successfully");
};

// Event listener for save score button
saveScoreBtn.addEventListener("click", (e) => {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const valueUserInput = username.value.trim();
  const duplicate = highScores.find((person) => person.name === valueUserInput);
  e.preventDefault();

  // Check value
  if (valueUserInput !== "") {
    if (duplicate) {
      alert("This name is already taken. Please choose a different one.");
    } else {
      saveHighScore();
      console.log("Before window.location.assign");
      window.location.assign("../app.html");
      console.log("After window.location.assign");
    }
  } else {
    alert("Invalid name!");
  }
});
