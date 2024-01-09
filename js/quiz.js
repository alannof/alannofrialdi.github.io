// DOM Elements

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const MAX_QUESTION = 10;

// Game Variables

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let questions = [];

// Fetch Questions from API

const fetchQuestions = async () => {
  try {
    const res = await fetch("../json/api.json");
    const loadedQuestions = await res.json();
    questions = loadedQuestions.results;
  } catch (err) {
    console.error(err);
  }
};

// Initial Page Load Event

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

// Constants

const CORRECT_BONUS = 10;

// Utility function to shuffle an array

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Game Initialization

const startGame = () => {
  questionCounter = 0;
  score = 0;
  getNewQuestion();
};

// Get a new question

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

// Handle click on a choice

const handleChoiceClick = (e) => {
  if (!acceptingAnswers) return;

  acceptingAnswers = false;
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];
  const correctAnswer = currentQuestion.correct_answer.toString();
  const classToApply =
    selectedAnswer === correctAnswer ? "correct" : "incorrect";

  highlightChoices(selectedChoice, correctAnswer, classToApply);
};

// Event listener for choice clicks

choices.forEach((choice) =>
  choice.addEventListener("click", handleChoiceClick)
);

// Increment the score

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// Utility function to highlight choices

const highlightChoices = (selectedChoice, correctAnswer, classToApply) => {
  selectedChoice.parentElement.classList.add(classToApply);

  // Highlight the correct answer after a brief delay
  const correctChoice = choices.find(
    (choice) => choice.dataset["number"] === correctAnswer
  );

  if (classToApply === "correct") {
    incrementScore(CORRECT_BONUS);
  } else {
    correctChoice.parentElement.classList.add("correct");
  }

  setTimeout(() => {
    correctChoice.parentElement.classList.remove("correct");
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 1000);
};

// Call fetchQuestions on page load
fetchQuestions();
