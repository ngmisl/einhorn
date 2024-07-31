const questions = [
  {
    q: "Welche Farbe hat das Einhorn?",
    a: "Weiß",
    options: ["Weiß", "Blau", "Grün"],
  },
  {
    q: "Wie viele Beine hat ein Einhorn?",
    a: "4",
    options: ["2", "4", "6"],
  },
  {
    q: "Was ist auf dem Kopf des Einhorns?",
    a: "Horn",
    options: ["Hut", "Horn", "Haare"],
  },
  {
    q: "Welche magische Kraft haben Einhörner oft in Geschichten?",
    a: "Heilung",
    options: ["Fliegen", "Heilung", "Unsichtbarkeit"],
  },
  {
    q: "In welcher Farbe wird die Mähne des Einhorns oft dargestellt?",
    a: "Regenbogenfarben",
    options: ["Schwarz", "Braun", "Regenbogenfarben"],
  },
  {
    q: "Was essen Einhörner in vielen Geschichten am liebsten?",
    a: "Regenbogen",
    options: ["Gras", "Regenbogen", "Äpfel"],
  },
  {
    q: "Welches mythische Wesen ist dem Einhorn ähnlich, hat aber Flügel?",
    a: "Pegasus",
    options: ["Drache", "Pegasus", "Meerjungfrau"],
  },
  {
    q: "Welche Form hat das Horn eines Einhorns normalerweise?",
    a: "Spiralförmig",
    options: ["Gerade", "Spiralförmig", "Wellenförmig"],
  },
  {
    q: "In welcher Art von Märchen findet man Einhörner oft?",
    a: "Fantasie",
    options: ["Krimi", "Fantasie", "Science-Fiction"],
  },
  {
    q: "Was symbolisiert ein Einhorn häufig?",
    a: "Reinheit",
    options: ["Stärke", "Weisheit", "Reinheit"],
  },
];

let currentQuestion = 0;
let speechEnabled = true;

function speak(text) {
  if ("speechSynthesis" in window && speechEnabled) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}

function displayQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.q;
  speak(q.q);
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "option";
    button.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(button);
  });
  document.getElementById("feedback").textContent = "";
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].a;
  const feedbackDiv = document.getElementById("feedback");
  if (selected === correct) {
    feedbackDiv.textContent = "Richtig! Das Einhorn ist glücklich! 🌈";
    feedbackDiv.style.color = "green";
    speak("Richtig! Das Einhorn ist glücklich!");
  } else {
    feedbackDiv.textContent =
      "Ups! Versuch es nochmal. Das Einhorn glaubt an dich! ✨";
    feedbackDiv.style.color = "red";
    speak("Ups! Versuch es nochmal. Das Einhorn glaubt an dich!");
    return;
  }
  setTimeout(() => {
    currentQuestion = (currentQuestion + 1) % questions.length;
    displayQuestion();
  }, 4000);
}

document.getElementById("toggleSpeech").addEventListener("click", function () {
  speechEnabled = !speechEnabled;
  this.textContent = speechEnabled ? "Sprache Aus" : "Sprache Ein";
});

displayQuestion();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("Service worker registered.", reg))
    .catch((err) => console.log("Service worker registration failed.", err));
}
