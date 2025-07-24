let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15; // seconds per question

const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz");
const startBtn = document.getElementById("start-btn");
const categorySelect = document.getElementById("category");

startBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  startBtn.style.display = "none";
  categorySelect.disabled = true;
  fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`)
    .then(res => res.json())
    .then(data => {
      questions = data.results.map(q => {
        const answers = [...q.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * 4);
        answers.splice(randomIndex, 0, q.correct_answer);
        return {
          question: decodeHTML(q.question),
          answers: answers.map(a => decodeHTML(a)),
          correct: decodeHTML(q.correct_answer)
        };
      });
      quizContainer.style.display = "block";
      showQuestion();
    });
});


// Step 2: Decode HTML special characters (like &quot;)
function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// Step 3: Show current question
function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;
  answerButtons.forEach((btn, index) => {
    btn.textContent = current.answers[index];
    btn.onclick = () => selectAnswer(btn, current.correct);
  });
}

// Step 4: Handle answer selection
function selectAnswer(selectedBtn, correctAnswer) {
  const isCorrect = selectedBtn.textContent === correctAnswer;
  if (isCorrect) {
    selectedBtn.style.backgroundColor = "lightgreen";
    score++;
  } else {
    selectedBtn.style.backgroundColor = "lightcoral";
  }

  answerButtons.forEach(btn => btn.disabled = true);
  nextBtn.style.display = "block";
}

// Step 5: Reset buttons and hide "Next"
function resetState() {
  nextBtn.style.display = "none";
  answerButtons.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = "#eee";
  });
}

// Step 6: Handle next question or show score
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// Step 7: Show final score and restart option
function showScore() {
  questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
  document.querySelector(".answers").style.display = "none";
  nextBtn.textContent = "Restart";
  nextBtn.style.display = "block";
  nextBtn.onclick = () => location.reload();
}
