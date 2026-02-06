document.addEventListener("DOMContentLoaded", () => {

const quizData = [
    { question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool ML", "None"],
      answer: 0 },

    { question: "Which language is used for styling web pages?",
      options: ["HTML", "CSS", "Python", "Java"],
      answer: 1 },

    { question: "Which is not a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Django"],
      answer: 3 },

    { question: "Inside which HTML tag do we put JavaScript?",
      options: ["<js>", "<javascript>", "<script>", "<code>"],
      answer: 2 },

    { question: "Which company developed JavaScript?",
      options: ["Google", "Microsoft", "Netscape", "Amazon"],
      answer: 2 },

    { question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "<!-- -->", "#", "**"],
      answer: 0 },

    { question: "What does CSS stand for?",
      options: ["Color Style Sheet", "Cascading Style Sheets", "Creative Style System", "Computer Style Sheet"],
      answer: 1 },

    { question: "Which method selects an element by ID?",
      options: ["getElement()", "getElementById()", "querySelectorAll()", "getById()"],
      answer: 1 },

    { question: "Which keyword declares a constant?",
      options: ["var", "let", "const", "static"],
      answer: 2 },

    { question: "Which tag links JavaScript to HTML?",
      options: ["<js>", "<script>", "<link>", "<javascript>"],
      answer: 1 }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const startBtn = document.getElementById("startBtn");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

startBtn.onclick = () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
};

function startTimer() {
    timeLeft = 10;
    timerEl.textContent = `⏱ ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱ ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            autoMove();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    feedbackEl.textContent = "";
    optionsEl.innerHTML = "";

    const q = quizData[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });

    startTimer();
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn => btn.classList.add("disabled"));

    if (selected === correct) {
        buttons[selected].classList.add("correct");
        feedbackEl.textContent = "✅ Correct (+1)";
        score += 1;
    } else {
        buttons[selected].classList.add("wrong");
        buttons[correct].classList.add("correct");
        feedbackEl.textContent = "❌ Wrong (-1)";
        score -= 1;
    }

    scoreEl.textContent = `Score: ${score}`;

    setTimeout(nextQuestion, 1500);
}

function autoMove() {
    feedbackEl.textContent = "⏰ Time's up!";
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Completed 🎉";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = `Final Score: ${score} / 10`;
    restartBtn.style.display = "block";
}

restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = "Score: 0";
    restartBtn.style.display = "none";
    quizScreen.style.display = "none";
    startScreen.style.display = "block";
};

});
