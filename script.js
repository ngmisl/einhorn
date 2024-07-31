const unicornEmojis = ["🦄", "🎠"];
const colors = ["Rot", "Blau", "Gelb", "Grün", "Rosa", "Lila"];

let speechEnabled = true;

function speak(text) {
  if ("speechSynthesis" in window && speechEnabled) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

function generateUniqueOptions(correct, max) {
  const options = [correct];
  while (options.length < 3) {
    const option = Math.floor(Math.random() * max) + 1;
    if (!options.includes(option.toString())) {
      options.push(option.toString());
    }
  }
  return options.sort(() => Math.random() - 0.5);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateQuestion() {
  const questionType = Math.random() < 0.5 ? "count" : "color";

  if (questionType === "count") {
    const count = Math.floor(Math.random() * 5) + 1;
    const unicornContainer = document.getElementById("unicorn-container");
    unicornContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const unicorn = document.createElement("div");
      unicorn.className = "unicorn";
      unicorn.textContent =
        unicornEmojis[Math.floor(Math.random() * unicornEmojis.length)];
      unicornContainer.appendChild(unicorn);
    }
    return {
      question: "Wie viele Einhörner siehst du?",
      answer: count.toString(),
      options: generateUniqueOptions(count.toString(), 7),
    };
  } else {
    const color = "Rosa";
    document.getElementById("unicorn-container").innerHTML =
      `<div class="unicorn" style="color: ${color.toLowerCase()}">🦄</div>`;
    const wrongColors = colors.filter((c) => c !== color);
    shuffleArray(wrongColors);
    return {
      question: "Welche Farbe hat das Einhorn?",
      answer: color,
      options: shuffleArray([color, wrongColors[0], wrongColors[1]]),
    };
  }
}

function displayQuestion(q) {
  document.getElementById("question").textContent = q.question;
  speak(q.question);
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";
  q.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.onclick = () => checkAnswer(option, q.answer);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    feedback.textContent = "Super! Das ist richtig! 🎉";
    feedback.style.color = "green";
    speak("Super! Das ist richtig!");
    setTimeout(() => {
      nextQuestion();
    }, 2000); // Wait for 2 seconds before moving to the next question
  } else {
    feedback.textContent = "Ups! Versuche es noch einmal. 😊";
    feedback.style.color = "red";
    speak("Ups! Versuche es noch einmal.");
  }
}

function nextQuestion() {
  const q = generateQuestion();
  displayQuestion(q);
  document.getElementById("feedback").textContent = "";
}

document.getElementById("toggleSpeech").addEventListener("click", function () {
  speechEnabled = !speechEnabled;
  this.textContent = speechEnabled ? "Sprache Aus" : "Sprache Ein";
});

// Start the game
nextQuestion();
