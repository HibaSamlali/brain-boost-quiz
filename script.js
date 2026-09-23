"use strict";

// ---------- Data ----------
const QUESTIONS = [
  { question: "What is 5 + 3?", answers: ["6", "8", "9", "10"], correct: 1, explanation: "5 + 3 = 8." },
  { question: "Which one is a fruit?", answers: ["Carrot", "Potato", "Apple", "Onion"], correct: 2, explanation: "An apple grows on a tree and has seeds inside." },
  { question: "What color is the sky on a sunny day?", answers: ["Blue", "Green", "Red", "Black"], correct: 0, explanation: "Sunlight scatters in the air and makes the sky look blue." },
  { question: "How many days are there in a week?", answers: ["5", "6", "7", "8"], correct: 2, explanation: "Monday to Sunday makes 7 days." },
  { question: "Which animal says “meow”?", answers: ["Dog", "Cat", "Cow", "Duck"], correct: 1, explanation: "Cats meow to talk to people." },
  { question: "What is 10 − 4?", answers: ["5", "7", "4", "6"], correct: 3, explanation: "10 − 4 = 6." }
];
const STORAGE_KEY = "brain-boost-best";

// ---------- State ----------
let questions = [];
let current = 0;
let score = 0;
let answered = false;

// ---------- Elements ----------
const $ = (id) => document.getElementById(id);
const screens = { start: $("start-screen"), quiz: $("quiz-screen"), result: $("result-screen") };
const el = {
  question: $("question"), answers: $("answers"), feedback: $("feedback"),
  next: $("next-btn"), progressText: $("progress-text"), scoreText: $("score-text"),
  progress: $("progress"), bar: $("progress-bar"), best: $("best-score"),
  ring: $("ring"), ringText: $("ring-text"), title: $("result-title"), message: $("result-message")
};

// ---------- Helpers ----------
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function show(name) {
  Object.entries(screens).forEach(([key, node]) => { node.hidden = key !== name; });
}

function getBest() {
  try { return Number(localStorage.getItem(STORAGE_KEY)); } catch { return 0; }
}

function saveBest(value) {
  try { localStorage.setItem(STORAGE_KEY, String(value)); } catch { /* storage unavailable */ }
}

function renderBest() {
  const best = getBest();
  el.best.hidden = !best;
  if (best) el.best.textContent = `Your best score: ${best} / ${QUESTIONS.length}`;
}

// ---------- Quiz flow ----------
function startQuiz() {
  questions = shuffle(QUESTIONS);
  current = 0;
  score = 0;
  show("quiz");
  showQuestion();
}

function showQuestion() {
  answered = false;
  const q = questions[current];
  const percent = (current / questions.length) * 100;

  el.question.textContent = q.question;
  el.progressText.textContent = `Question ${current + 1} of ${questions.length}`;
  el.scoreText.textContent = `Score: ${score}`;
  el.bar.style.width = `${percent}%`;
  el.progress.setAttribute("aria-valuenow", Math.round(percent));
  el.feedback.textContent = "";
  el.feedback.className = "feedback";
  el.next.disabled = true;
  el.next.textContent = current === questions.length - 1 ? "See results" : "Next question";

  el.answers.innerHTML = "";
  q.answers.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.type = "button";
    btn.innerHTML = `<span class="key">${"ABCD"[index]}</span><span></span>`;
    btn.lastChild.textContent = text;
    btn.addEventListener("click", () => checkAnswer(index));
    el.answers.appendChild(btn);
  });
  el.question.focus();
}

function checkAnswer(index) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const buttons = el.answers.querySelectorAll(".answer-btn");
  buttons.forEach((b) => (b.disabled = true));
  buttons[q.correct].classList.add("correct");

  if (index === q.correct) {
    score++;
    el.feedback.textContent = `Correct! ${q.explanation}`;
    el.feedback.classList.add("good");
  } else {
    buttons[index].classList.add("wrong");
    el.feedback.textContent = `Not quite. ${q.explanation}`;
    el.feedback.classList.add("bad");
  }
  el.scoreText.textContent = `Score: ${score}`;
  el.next.disabled = false;
  el.next.focus();
}

function nextQuestion() {
  if (!answered) return;
  current++;
  current < questions.length ? showQuestion() : showResult();
}

function showResult() {
  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  if (score > getBest()) saveBest(score);

  let title = "Keep practicing!";
  let message = "Every mistake helps you learn. Try again and beat your score.";
  if (percent === 100) { title = "Perfect score!"; message = "You answered every question correctly. Amazing work!"; }
  else if (percent >= 60) { title = "Great job!"; message = "You know a lot already. One more try for a perfect score?"; }

  el.title.textContent = title;
  el.message.textContent = `You got ${score} out of ${total}. ${message}`;
  el.ringText.textContent = `${percent}%`;
  el.ring.style.setProperty("--pct", percent);
  show("result");
}

function goHome() {
  renderBest();
  show("start");
}

// ---------- Events ----------
$("start-btn").addEventListener("click", startQuiz);
$("restart-btn").addEventListener("click", startQuiz);
$("home-btn").addEventListener("click", goHome);
el.next.addEventListener("click", nextQuestion);

// Keyboard: press A-D to answer, Enter for next
document.addEventListener("keydown", (e) => {
  if (screens.quiz.hidden) return;
  const index = "abcd".indexOf(e.key.toLowerCase());
  if (index !== -1 && e.key.length === 1 && !answered) checkAnswer(index);
});

renderBest();