const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
const MAX_QUESTION = 10;
let questions = [];

fetch("../json/api.json")
  .then(res => res.json())
  .then(loadedQuestions => {
    questions = loadedQuestions.results;
  })
  .catch(err => {
    console.error(err);
  });

window.addEventListener("load", () => {
  const preloader = document.getElementById("loader");
  const quiz = document.getElementById("quiz");

  setTimeout(() => {
    preloader.style.opacity = 0;
    quiz.style.opacity = 1;
    setTimeout(() => {
      preloader.classList.add("hidden");
      quiz.classList.remove("hidden");
    }, 500);
    startGame();
  }, 2500);
});

const CORRECT_BONUS = 10;

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const startGame = () => {
  questionCounter = 0;
  score = 0;
  getNewQuestion();
};

const getNewQuestion = () => {
  if (questionCounter >= MAX_QUESTION) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("../html/end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;

  const questionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions.splice(questionIndex, 1)[0];
  question.innerText = he.decode(currentQuestion.question);

  const shuffledAnswers = shuffleArray([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  choices.forEach((choice, index) => {
    choice.dataset["number"] = shuffledAnswers[index];
    choice.innerText = he.decode(`${shuffledAnswers[index]}`);
  });

  acceptingAnswers = true;
};

const handleChoiceClick = e => {
  if (!acceptingAnswers) return;

  acceptingAnswers = false;
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];
  const correctAnswer = currentQuestion.correct_answer.toString();

  const classToApply = selectedAnswer === correctAnswer ? "correct" : "incorrect";

  console.log(classToApply);
  console.log(`correct: ${correctAnswer}, your answer: ${selectedAnswer}`);

  selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(() => {
    if (classToApply === "correct") {
      increamentScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 800);
};

choices.forEach(choice => choice.addEventListener("click", handleChoiceClick));

const increamentScore = num => {
  score += num;
  scoreText.innerText = score;
};
