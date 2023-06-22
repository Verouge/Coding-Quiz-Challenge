document.getElementById("start-btn").addEventListener("click", startQuiz);

const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const endContainer = document.getElementById("end-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const countdownElement = document.getElementById("countdown");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const scoreForm = document.getElementById("score-form");

let currentQuestionIndex = 0;
let countdown;
let timerInterval;

// Define your quiz questions and answers
const quizData = [
  {
    question: "What does HTML stand for?",
    choices: [
      "1. Hypertext Markup Language",
      "2. Hyper Text",
      "3. Web Language",
      "4. Document Formatting Language",
    ],
    answer: "1. Hypertext Markup Language",
  },
  {
    question: "What is the main purpose of HTML?",
    choices: [
      "1. Structure content",
      "2. Add interactivity",
      "3. Style elements",
      "4. Handle events",
    ],
    answer: "1. Structure content",
  },
  {
    question: "Which tag is used to define a table row in HTML?",
    choices: ["1. <tr>", "2. <td>", "3. <th>", "4. <table>"],
    answer: "1. <tr>",
  },
  {
    question: "How do you create a comment in HTML?",
    choices: [
      "1. <!-- Comment -->",
      "2. // Comment",
      "3. /* Comment */",
      "4. # Comment",
    ],
    answer: "1. <!-- Comment -->",
  },
  {
    question: "What type of programming language is JavaScript?",
    choices: [
      "1. Scripting",
      "2. Object-oriented",
      "3. Markup",
      "4. Functional",
    ],
    answer: "1. Scripting",
  },
  {
    question: "How do you declare a variable in JavaScript?",
    choices: ["1. var", "2. let", "3. const", "4. All of the above"],
    answer: "4. All of the Above",
  },
  {
    question: "What is the purpose of the querySelector method in JavaScript?",
    choices: [
      "1. Select DOM element",
      "2. Perform calculations",
      "3. Execute a function",
      "4. Manipulate arrays",
    ],
    answer: "1. Select DOM element",
  },
  {
    question: "What is an event handler in JavaScript?",
    choices: ["1. Function", "2. Method", "3. Variable", "4. Callback"],
    answer: "1. Function",
  },
];

function startQuiz() {
  document.getElementById("start-text").style.display = "none";
  //   startContainer.style.display = "none";
  quizContainer.style.display = "block";
  countdown = 60;
  countdownElement.textContent = countdown;
  timerInterval = setInterval(startTimer, 1000);
  showQuestion();
}

function startTimer() {
  countdown--;

  if (countdown <= 0) {
    countdown = 0;
    endQuiz();
  }

  updateTimer();
}
function showQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    endQuiz();
    return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const choice = currentQuestion.choices[i];
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(choice));
    choicesElement.appendChild(button);
  }

  feedbackElement.textContent = "";
}

function checkAnswer(answer) {
  const currentQuestion = quizData[currentQuestionIndex];

  if (answer === currentQuestion.answer) {
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Wrong!";
    if (countdown < 10) {
      countdown = 0;
    } else {
      countdown -= 10;
    }
  }

  clearInterval(timerInterval);
  updateTimer(); // Update the timer immediately after the user selects an answer

  currentQuestionIndex++;
  setTimeout(() => {
    showQuestion();
    timerInterval = setInterval(startTimer, 1000);
  }, 1000);

  if (countdown === 0) {
    endQuiz();
  }
}

function updateTimer() {
  countdownElement.textContent = countdown;
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  endContainer.style.display = "block";
  scoreElement.textContent = countdown;

  scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const initials = document.getElementById("initials").value;
    const scoreData = {
      initials: initials,
      score: countdown,
    };

    // Retrieve existing scores from local storage or initialize an empty array
    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    // Add the new score data to the array
    scores.push(scoreData);

    // Sort the scores array in descending order based on the score
    scores.sort((a, b) => b.score - a.score);

    // Store the updated scores array in local storage
    localStorage.setItem("scores", JSON.stringify(scores));

    // Redirect to the high scores page
    window.location.href = "highscores.html";
  });
}
