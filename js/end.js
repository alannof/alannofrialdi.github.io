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
const myForm = document.getElementById("myForm");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = `score: ${mostRecentScore}`;

// validator

const validator = () => {
  const enteredName = username.value.trim();

  if (enteredName === "") {
    alert("Please enter a name!");
    return;
  }

  const isDuplicate = highScores.some(
    ({ name }) => name.toLowerCase() === enteredName.toLowerCase()
  );

  console.log(isDuplicate);

  if (!isDuplicate) {
    const score = {
      name: enteredName,
      score: mostRecentScore,
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/app.html");
  } else {
    alert(`${enteredName} already taken. Please enter another name!`);
  }
};

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validator();
});
