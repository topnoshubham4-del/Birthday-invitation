/*
  EDIT YOUR QUIZ HERE:
  - Change each question's question, hint, options, correctIndex, and explanation.
  - correctIndex is zero-based: 0 = first option, 1 = second, etc.
  - There are 5 sample questions. The pass score is 70% (4 correct out of 5).
*/
const QUESTIONS = [
  {
    category: "FRIENDSHIP AUDIT",
    question: "What is the most important rule of a birthday party?",
    hint: "Choose the answer that protects your snack privileges.",
    options: ["Arrive hungry and ready for cake", "Give a 40-minute speech", "Bring a spreadsheet", "Ask for a performance review"],
    correctIndex: 0,
    explanation: "Correct. Your priorities are deliciously aligned."
  },
  {
    category: "SNACK SECURITY",
    question: "If someone says 'I don't want cake,' what should you do?",
    hint: "This is a highly advanced social situation.",
    options: ["Eat their slice immediately", "Offer them a tiny piece anyway", "Call a press conference", "Hide all the forks"],
    correctIndex: 1,
    explanation: "Good answer. A tiny piece is legally different from a whole slice. Probably."
  },
  {
    category: "DANCE-FLOOR READINESS",
    question: "What should you do when your favourite song plays?",
    hint: "No dancing qualifications required.",
    options: ["Remain completely motionless", "Start a serious business meeting", "Dance like the Wi-Fi is lagging", "Leave the building"],
    correctIndex: 2,
    explanation: "Correct. Unusual movements are encouraged."
  },
  {
    category: "GIFTING DEPARTMENT",
    question: "What is an acceptable birthday gift?",
    hint: "The examiner appreciates honesty.",
    options: ["A handwritten note and genuine effort", "An invoice for your travel costs", "A single grain of rice", "A reminder that everyone is aging"],
    correctIndex: 0,
    explanation: "Correct. Thoughtfulness beats a suspicious grain of rice."
  },
  {
    category: "FINAL VIBE CHECK",
    question: "Why should you receive this invitation?",
    hint: "This is definitely not a trick question. Probably.",
    options: ["Because you are a certified cake inspector", "Because parties are better with you there", "Because the cake demanded it", "All of the above, obviously"],
    correctIndex: 3,
    explanation: "Excellent. The cake, the host, and the imaginary department approve."
  }
];

const PASS_PERCENT = 70; // Change this number if you want a different pass mark.
const PASS_COUNT = Math.ceil(QUESTIONS.length * PASS_PERCENT / 100);

const screens = {
  intro: document.querySelector("#intro-screen"),
  quiz: document.querySelector("#quiz-screen"),
  result: document.querySelector("#result-screen"),
  invite: document.querySelector("#invite-screen")
};
const $ = (selector) => document.querySelector(selector);

let questionIndex = 0;
let score = 0;
let selectedIndex = null;
let answered = false;
let lastResults = [];

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => element.classList.toggle("hidden", key !== name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  questionIndex = 0;
  score = 0;
  selectedIndex = null;
  answered = false;
  lastResults = [];
  renderQuestion();
  showScreen("quiz");
}

function renderQuestion() {
  const item = QUESTIONS[questionIndex];
  selectedIndex = null;
  answered = false;
  $("#question-count").textContent = `QUESTION ${questionIndex + 1} OF ${QUESTIONS.length}`;
  $("#score-preview").textContent = `Current score: ${score}`;
  $("#progress-bar").style.width = `${(questionIndex / QUESTIONS.length) * 100}%`;
  $("#question-category").textContent = item.category;
  $("#question-text").textContent = item.question;
  $("#question-hint").textContent = item.hint;
  $("#feedback").textContent = "";
  $("#next-btn").disabled = true;
  $("#next-btn").textContent = "Lock in answer";
  const answers = $("#answers");
  answers.replaceChildren();

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = option;
    button.addEventListener("click", () => selectAnswer(index));
    answers.append(button);
  });
}

function selectAnswer(index) {
  if (answered) return;
  selectedIndex = index;
  document.querySelectorAll(".answer-option").forEach((button, buttonIndex) => {
    button.classList.toggle("selected", buttonIndex === index);
  });
  $("#next-btn").disabled = false;
  $("#next-btn").textContent = "Submit answer";
  $("#feedback").textContent = "";
}

function submitAnswer() {
  if (selectedIndex === null || answered) return;
  answered = true;
  const item = QUESTIONS[questionIndex];
  const isCorrect = selectedIndex === item.correctIndex;
  if (isCorrect) score++;
  lastResults.push(isCorrect);

  document.querySelectorAll(".answer-option").forEach((button, index) => {
    button.disabled = true;
    if (index === item.correctIndex) button.classList.add("correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("incorrect");
  });
  $("#score-preview").textContent = `Current score: ${score}`;
  $("#feedback").textContent = isCorrect
    ? `✓ ${item.explanation}`
    : `✗ Not quite. ${item.explanation}`;
  $("#feedback").style.color = isCorrect ? "var(--mint)" : "var(--danger)";
  $("#next-btn").textContent = questionIndex === QUESTIONS.length - 1 ? "See my results" : "Next question →";
  $("#progress-bar").style.width = `${((questionIndex + 1) / QUESTIONS.length) * 100}%`;
}

function nextQuestion() {
  if (!answered) {
    submitAnswer();
    return;
  }
  if (questionIndex < QUESTIONS.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const percent = Math.round((score / QUESTIONS.length) * 100);
  $("#final-score").textContent = `${score}/${QUESTIONS.length}`;
  $("#score-percent").textContent = `${percent}%`;
  if (score >= PASS_COUNT) {
    $("#result-icon").textContent = "🔓";
    $("#result-eyebrow").textContent = "ACCESS GRANTED";
    $("#result-title").textContent = "You passed the vibe check!";
    $("#result-message").textContent = `You scored ${percent}%. The highly advanced Cake Security System has approved you. Your invitation is ready.`;
    $("#retry-btn").textContent = "Try again for bragging rights ↻";
    $("#retry-btn").dataset.action = "invite";
  } else {
    $("#result-icon").textContent = "🫠";
    $("#result-eyebrow").textContent = "ACCESS DENIED (FOR NOW)";
    $("#result-title").textContent = "The cake is disappointed.";
    $("#result-message").textContent = `You scored ${percent}%. You need ${PASS_COUNT} correct answers to pass. Review your life choices and try again.`;
    $("#retry-btn").textContent = "Retry the mission ↻";
    $("#retry-btn").dataset.action = "retry";
  }
  showScreen("result");
}

function showInvitation() {
  showScreen("invite");
}

function openEditDialog() {
  $("#name-input").value = $("#invite-name").textContent.startsWith("[") ? "" : $("#invite-name").textContent;
  $("#date-input").value = $("#invite-date").textContent.startsWith("[") ? "" : $("#invite-date").textContent;
  $("#venue-input").value = $("#invite-venue").textContent.startsWith("[") ? "" : $("#invite-venue").textContent;
  $("#edit-dialog").showModal();
}

function saveInvitationDetails(event) {
  event.preventDefault();
  const name = $("#name-input").value.trim();
  const date = $("#date-input").value.trim();
  const venue = $("#venue-input").value.trim();
  $("#invite-name").textContent = name || "[Birthday person's name]";
  $("#invite-date").textContent = date || "[Add birthday date]";
  $("#invite-venue").textContent = venue || "[Add party venue]";
  $("#edit-dialog").close();
}

async function shareInvitation() {
  const shareText = [
    "YOU HAVE BEEN INVITED!",
    `Birthday legend: ${$("#invite-name").textContent}`,
    `Date: ${$("#invite-date").textContent}`,
    `Location: ${$("#invite-venue").textContent}`,
    "Mission: eat cake and act surprised.",
    window.location.href
  ].join("\n");
  const status = $("#share-status");
  try {
    if (navigator.share) {
      await navigator.share({ title: "You're invited!", text: shareText, url: window.location.href });
      status.textContent = "Share sheet opened. Mission: spread the invitation.";
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareText);
      status.textContent = "Invitation copied. Paste it into your favourite chat.";
    } else {
      status.textContent = "Copy this page's URL from your browser and send it with the invitation details.";
    }
  } catch (error) {
    if (error.name !== "AbortError") status.textContent = "Sharing wasn't available. Copy the website address from your browser.";
  }
}

$("#start-btn").addEventListener("click", startQuiz);
$("#next-btn").addEventListener("click", nextQuestion);
$("#retry-btn").addEventListener("click", () => {
  if ($("#retry-btn").dataset.action === "invite") showInvitation();
  else startQuiz();
});
$("#edit-details-btn").addEventListener("click", openEditDialog);
$("#edit-form").addEventListener("submit", saveInvitationDetails);
$("#share-btn").addEventListener("click", shareInvitation);
$("#restart-btn").addEventListener("click", () => showScreen("intro"));
