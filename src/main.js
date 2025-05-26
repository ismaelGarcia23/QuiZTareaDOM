import "./css/style.css";
import javascriptLogo from "./assets/javascript.svg";
import cssLogo from "./assets/css.square.svg";
import htmlLogo from "./assets/html.svg";
import accesibilidadLogo from "./assets/accessibility.svg";
//import { renderQuiz } from "./quiz.js";

const app = document.querySelector("#app");

function applyThemeFromStorage() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}

export function renderHome(app) {
  app.innerHTML = ""; 

  const container = document.createElement("div");
  container.classList.add("grid-container");

  // TEMA
  const themeToggle = document.createElement("div");
  themeToggle.classList.add("theme-toggle");

  const toggleWrapper = document.createElement("div");
  toggleWrapper.classList.add("container-toggle");

  toggleWrapper.innerHTML = `
    <span>🌜</span>
    <label class="switch">
      <input type="checkbox" id="toggle-theme" />
      <span class="slider"></span>
    </label>
    <span>🌞</span>
  `;
  themeToggle.appendChild(toggleWrapper);

  // PRESENTACION
  const presentacion = document.createElement("section");
  presentacion.classList.add("presentacion");
  presentacion.innerHTML = `
    <h1>Welcome to the <b>Frontend Quizz!</b></h1>
    <h4>Pick a subject to get started</h4>
  `;

  // BOTONES
  const buttonsContainer = document.createElement("section");
  buttonsContainer.classList.add("buttonsquizz");

  const topics = [
    { name: "html", label: "HTML", icon: htmlLogo },
    { name: "javascript", label: "Javascript", icon: javascriptLogo },
    { name: "css", label: "CSS", icon: cssLogo },
    { name: "accessibility", label: "Accessibility", icon: accesibilidadLogo }
  ];

  topics.forEach(({ name, label, icon }) => {
    const section = document.createElement("section");
    section.classList.add(`quizz${capitalize(name)}`);
    section.classList.add("quizz");

    section.innerHTML = `
      <img src="${icon}" alt="${label}" />
      <a><b>${label}</b></a>
    `;

    section.addEventListener("click", () => {
      document.dispatchEvent(
        new CustomEvent("navigate", { detail: { page: name } })
      );
    });

    buttonsContainer.appendChild(section);
  });

  // Renderizar todo
  container.appendChild(themeToggle);
  container.appendChild(presentacion);
  container.appendChild(buttonsContainer);
  app.appendChild(container);

  // Logica toggle
  const toggle = document.getElementById("toggle-theme");
  toggle.checked = document.body.classList.contains("light-theme");

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("light-theme");
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", theme);
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
  const page = e.detail.page;

  if (["html", "css", "javascript", "accessibility"].includes(page)) {
    import('./quiz.js').then(module => {
      module.renderQuiz(document.getElementById("app"), page);
    });
  } else {
    renderHome(document.getElementById("app"));
  }
});