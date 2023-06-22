const highscoresList = document.getElementById("highscores-list");

// Retrieve scores from local storage
const scores = JSON.parse(localStorage.getItem("scores")) || [];

// Display the scores in the list
scores.forEach((score, index) => {
  const li = document.createElement("li");
  li.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
  highscoresList.appendChild(li);
});
