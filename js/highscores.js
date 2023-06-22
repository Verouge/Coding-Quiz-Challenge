const highscoresList = document.getElementById("highscores-list");
const backBtn = document.getElementById("back-btn");
const clearBtn = document.getElementById("clear-btn");

// Retrieve scores from local storage
let scores = JSON.parse(localStorage.getItem("scores")) || [];

// Display the scores in the list
function displayScores() {
  highscoresList.innerHTML = "";

  scores.forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
    highscoresList.appendChild(li);
  });
}

displayScores();

backBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
  scores = [];
  localStorage.setItem("scores", JSON.stringify(scores));
  displayScores();
});
