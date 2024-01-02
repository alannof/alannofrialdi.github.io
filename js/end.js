const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentStore = localStorage.getItem("mostRecentStore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = `SCORE = ${mostRecentStore}`;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value.trim();
});

saveHighScore = (event) => {
  event.preventDefault();

  const enteredName = username.value.trim();
  if (!enteredName) {
    return alert("Please enter a valid name.");
  }

  if (highScores.some((score) => score.name === enteredName)) {
    return alert("This name is already taken. Please choose a different one.");
  }

  const score = { name: enteredName, score: mostRecentStore };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("../app.html");
};
