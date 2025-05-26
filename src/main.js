import './style.css'
import { quizData } from './data.js'


const app = document.getElementById('app');

function renderTopicSelection() {
  app.innerHTML = `
  <div class="screen"> 
  <h1>Welcome to the <strong>Frontend Quiz!</strong></h1>
      <p>Pick a subject to get started.</p>
      <div class = "topics">
      ${Object.keys(quizData).map(topic => `
        <button class = "topic-btn" data-topic="${topic}">${topic.toUpperCase()}</button>
        `).join('')}
      </div>
  </div`;

  document.querySelectorAll('.topic-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const  selectTopic = e.target.dataset.topic; 
      startQuiz(selectTopic)
    })
  })
}
function startQuiz(topic){
  console.log(`Comenzando el Quiz de ${topic}`);
}

renderTopicSelection();
