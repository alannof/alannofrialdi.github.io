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

const handlePageLoad = () => {
  const finalScore = document.getElementById("finalScore");
  const mostRecentScore = localStorage.getItem("mostRecentScore");
  finalScore.style.textTransform = "Uppercase";

  if (mostRecentScore !== null) {
    finalScore.innerText = ` Score : ${mostRecentScore}`;

    setTimeout(() => {
      if (mostRecentScore <= 60) {
        alert("Don't give up, play again to improve the score!");
      } else {
        alert("Congrats! Your grade is more than KKM.");
      }
    }, 4000);
  } else {
    console.error(
      "mostRecentScore is null. Check if it's set correctly in your code."
    );
  }
};

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value.trim();
});

const playAgain = document.getElementById("playAgain");
playAgain.onclick = () => confirm("Want to play again?");

const saveHighScore = (event) => {
  event.preventDefault();

  const enteredName = username.value.trim();
  const mostRecentScore = localStorage.getItem("mostRecentScore");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const MAX_HIGH_SCORES = 5;

  if (!enteredName) {
    return alert("Please enter a valid name.");
  }

  if (highScores.some((score) => score.name === enteredName)) {
    return alert("This name is already taken. Please choose a different one.");
  }

  const scoreObject = { name: enteredName, score: mostRecentScore };
  highScores.push(scoreObject);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("../app.html");
};

saveScoreBtn.addEventListener("click", saveHighScore);
