const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score"> ${score.name}, score: ${score.score} </li>`;
  })
  .join("");
