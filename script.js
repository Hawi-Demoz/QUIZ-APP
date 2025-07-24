// script.js
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "London"],
    correct: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  }
];

const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;
  answerButtons.forEach((btn, index) => {
    btn.textContent = current.answers[index];
    btn.onclick = () => selectAnswer(btn, current.correct);
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  const isCorrect = selectedBtn.textContent === correctAnswer;
  if (isCorrect) {
    selectedBtn.style.backgroundColor = "lightgreen";
    score++;
  } else {
    selectedBtn.style.backgroundColor = "lightcoral";
  }

  // Disable all buttons
  answerButtons.forEach(btn => btn.disabled = true);

  nextBtn.style.display = "block";
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = "#eee";
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
  document.querySelector(".answers").style.display = "none";
  nextBtn.textContent = "Restart";
  nextBtn.style.display = "block";
  nextBtn.onclick = () => location.reload();
}

// Start the quiz
showQuestion();
