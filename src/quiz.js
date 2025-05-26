import "./css/quiz.css";
import javascriptLogo from "./assets/javascript.svg";
import cssLogo from "./assets/css.square.svg";
import htmlLogo from "./assets/html.svg";
import accesibilidadLogo from "./assets/accessibility.svg";
import { quizData } from "./data.js";

export function renderQuiz(app, category) {
  const logos = {
    html: { title: "HTML", icon: htmlLogo },
    css: { title: "CSS", icon: cssLogo },
    javascript: { title: "Javascript", icon: javascriptLogo },
    accessibility: { title: "Accessibility", icon: accesibilidadLogo },
  };

  const questions = quizData[category];
  if (!questions) {
    app.textContent = "No hay preguntas disponibles para esta categoría.";
    return;
  }

  let current = 0;
  let score = 0;

  function renderQuestion() {
    app.innerHTML = "";
    document.body.classList.add("quiz-body");
    const q = questions[current];
    const progress = (current / questions.length) * 100;
    let selected = null;

    const wrapper = document.createElement("div");
    wrapper.className = "acc-wrapper";

    const header = document.createElement("header");
    header.className = "acc-header";

    const sectionLeft = document.createElement("div");
    sectionLeft.className = "acc-section-left";
    const img = document.createElement("img");
    img.src = logos[category].icon;
    img.alt = "icon";
    img.className = "section-icon";
    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = logos[category].title;
    sectionLeft.append(img, title);

    const themeToggle = document.createElement("div");
    themeToggle.className = "acc-theme-toggle";
    themeToggle.innerHTML = `
      <span>🌜</span>
      <label class="switch">
        <input type="checkbox" id="toggle-theme" />
        <span class="slider"></span>
      </label>
      <span>🌞</span>
    `;

    header.append(sectionLeft, themeToggle);

    const grid = document.createElement("div");
    grid.className = "acc-grid-container";

    const presentacion = document.createElement("section");
    presentacion.className = "acc-presentacion";
    presentacion.innerHTML = `
      <i>Pregunta ${current + 1} de ${questions.length}</i>
      <h4 class="accAsk">${q.question}</h4>
      <input type="range" class="rangeAcc" value="${progress}" readonly min="0" max="100" />
    `;

    const opciones = document.createElement("section");
    opciones.className = "acc-buttonsquizz";

    q.options.forEach((option, i) => {
      const opt = document.createElement("section");
      opt.className = "quizzOption";
      opt.dataset.index = i;
      opt.innerHTML = `
        <span class="accOptionLet">${String.fromCharCode(65 + i)}</span>
        <a><b class="accTxtOP">${option}</b></a>
      `;

      opt.addEventListener("click", () => {
        selected = i;
        if (selected === q.answer) score++;
        current++;
        current < questions.length ? renderQuestion() : renderScore();
      });

      opciones.appendChild(opt);
    });

    grid.append(presentacion, opciones);
    wrapper.append(header, grid);
    app.appendChild(wrapper);

    const range = app.querySelector(".rangeAcc");
    if (range) {
      const progressColor = "#d000ff";
      const backgroundTrack = "#2c3e50";
      range.style.background = linear-gradient(`to right, ${progressColor} ${progress}%, ${backgroundTrack} ${progress}%`);
    }

    const toggle = app.querySelector("#toggle-theme");
    toggle.checked = document.body.classList.contains("light-theme");
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("light-theme");
    });
  }

  function renderScore() {
    app.innerHTML = "";
    const result = document.createElement("div");
    result.className = "result";
    result.innerHTML = `
      <h2>¡Cuestionario terminado!</h2>
      <p>Obtuviste ${score} de ${questions.length} correctas.</p>
    `;
    const btn = document.createElement("button");
    btn.id = "go-home";
    btn.textContent = "Volver al inicio";
    btn.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("navigate", { detail: { page: "home" } }));
      document.body.classList.remove("quiz-body");
    });
    result.appendChild(btn);
    app.appendChild(result);
  }

  renderQuestion();
}

