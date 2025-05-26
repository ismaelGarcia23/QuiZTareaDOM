import './style.css'
import { quizData } from './data.js';

const app = document.getElementById('app');

// Estado del quiz
let currentTopic = '';
let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let score = 0;

// Renderizar pantalla inicial
function renderTopicSelection() {
  app.innerHTML = `
    <div class="screen">
      <h1>Welcome to the <strong>Frontend Quiz!</strong></h1>
      <p>Pick a subject to get started.</p>
      <div class="topics">
        ${Object.keys(quizData).map(topic => `
          <button class="topic-btn" data-topic="${topic}">${topic.toUpperCase()}</button>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.topic-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const selected = e.target.dataset.topic;
      startQuiz(selected);
    });
  });
}

// Iniciar quiz
function startQuiz(topic) {
  currentTopic = topic;
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswerIndex = null;
  showQuestion();
}

// Mostrar una pregunta
function showQuestion() {
  const questionData = quizData[currentTopic][currentQuestionIndex];

  app.innerHTML = `
    <div class="screen">
      <p>Question ${currentQuestionIndex + 1} of ${quizData[currentTopic].length}</p>
      <h2>${questionData.question}</h2>
      <div class="options">
        ${questionData.options.map((opt, i) => `
          <label class="option">
            <input type="radio" name="answer" value="${i}" />
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
      <button id="submitBtn">Submit answer</button>
      <p id="errorMsg" class="error-msg" style="display: none;">Please select an option</p>
    </div>
  `;

  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.addEventListener('change', (e) => {
      selectedAnswerIndex = parseInt(e.target.value);
      document.getElementById('errorMsg').style.display = 'none';
    });
  });

  document.getElementById('submitBtn').addEventListener('click', () => {
    if (selectedAnswerIndex === null) {
      document.getElementById('errorMsg').style.display = 'block';
      return;
    }

    checkAnswer();
  });
}

// Revisar si la respuesta es correcta
function checkAnswer() {
  const questionData = quizData[currentTopic][currentQuestionIndex];
  const isCorrect = selectedAnswerIndex === questionData.answer;

  if (isCorrect) score++;

  // Feedback visual
  app.innerHTML += `
    <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
      ${isCorrect ? '✅ Correct!' : `❌ Wrong. Correct answer: ${questionData.options[questionData.answer]}`}
    </div>
    <button id="nextBtn">Next</button>
  `;

  document.querySelectorAll('input[name="answer"]').forEach(input => input.disabled = true);
  document.getElementById('submitBtn').disabled = true;

  document.getElementById('nextBtn').addEventListener('click', () => {
    selectedAnswerIndex = null;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData[currentTopic].length) {
      showQuestion();
    } else {
      showFinalScore();
    }
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Al iniciar la app
applyThemeFromStorage();
renderHome(app);

// Navegacion
document.addEventListener("navigate", (e) => {
  //! TODO: Implementar navegacion
});
