import img1 from "../public/1.jpg"
import img2 from "../public/2.jpg"
import img3 from "../public/3.jpg"
import img4 from "../public/4.jpg"
import img5 from "../public/5.jpg"
import img6 from "../public/6.jpg"
import img7 from "../public/7.jpg"
import img8 from "../public/8.jpg"
import img9 from "../public/9.jpg"
import img10 from "../public/10.jpg"

const css = `
body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  color: #333;
  font-size: 1.1em;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

img {
  max-width: 400px;
  max-height: 300px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.1);
}

form {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

form:hover {
  transform: scale(1.05);
}

label {
  margin-bottom: 10px;
  font-size: 1.2em;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

#recommendation {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  text-align: center;
  max-width: 600px;
  width: 100%;
}

#recommendation h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

#recommendation p {
  font-size: 1.2em;
  line-height: 1.5;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #ff5252;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none;
}
`

const style = document.createElement("style")
style.type = "text/css"
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)

const questions = [
  {
    img: img1,
    question: "Сколько вам лет?",
    answers: [
      "до 14 лет",
      "15-24 года",
      "25-44 года",
      "45-64 лет",
      "старше 65 лет",
    ],
    points: [0, 1, 2, 3, 3],
  },
  {
    img: img2,
    question:
      "Как часто вы употребляете быстроусвояемые углеводы ( соки , газировки, сладости, чипсы и т.д.) ? ",
    answers: [
      "часто - практически каждый день ",
      "иногда - пару раз в неделю ",
      "редко - 1-2 раза в месяц",
    ],
    points: [2, 1, 0],
  },
  {
    img: img3,
    question: "Ощущаете ли сухость во рту?",
    answers: ["да", "нет"],
    points: [1, 0],
  },
  {
    img: img4,
    question: "Какой наблюдаете характер слюны?",
    answers: ["вязкий", "текучий"],
    points: [1, 0],
  },
  {
    img: img5,
    question:
      "После использования красителей для выявления налёта, какой появился цвет?",
    answers: ["розовый", "синий", "никакой"],
    points: [1, 2, 0],
  },
  {
    img: img6,
    question: "Сколько раз в день чистите зубы?",
    answers: ["0", "1 раз в день", "2 раза в день", "более 2 раз"],
    points: [2, 1, 0, 0],
  },
  {
    img: img7,
    question: "Какие используете дополнительные средства гигиены?",
    answers: [
      "зубная нить",
      "ирригатор",
      "ополаскиватель",
      "зубной ёршик",
      "скребок для языка",
      "никакие",
    ],
    points: [0, 0, 0, 0, 0, 1],
    multiple: true,
  },
  {
    img: img8,
    question: "Как часто вы посещаете стоматолога?",
    answers: ["раз в полгода", "раз в год", "по необходимости"],
    points: [0, 1, 2],
  },
  {
    img: img9,
    question: "Какая концентрация фтора в воде в вашем городе?",
    answers: [
      "более 1,5 мг/л (повышенное содержание)",
      "0,5 - 1,5 мг/л ( в пределах нормы) ",
      "менее 0,5 мг/л (пониженное содержание) ",
      "не знаю",
    ],
    points: [0, 0, 1, 0],
  },
  {
    img: img10,
    question: "Каков показатель pH слюны?",
    answers: ["в пределах нормы", "выше нормы", "ниже нормы"],
    points: [0, 0, 1],
  },
]

let currentQuestion = 0
let totalScore = 0

const startBtn = document.getElementById("start-btn")
const questionContainer = document.getElementById("question-container")
const questionImg = document.getElementById("question-img")
const questionForm = document.getElementById("question-form")
const resultContainer = document.getElementById("result")
const scoreDisplay = document.getElementById("score")
const restartBtn = document.getElementById("restart-btn")
const recommendationContainer = document.createElement("div")
recommendationContainer.id = "recommendation"
const notification = document.createElement("div")
notification.className = "notification"
notification.textContent = "Пожалуйста, выберите хотя бы один вариант ответа."
document.body.appendChild(notification)

// Функция отображения следующего вопроса
function showNextQuestion() {
  if (currentQuestion >= questions.length) {
    showResult()
    return
  }
  const question = questions[currentQuestion]
  questionImg.src = question.img
  const inputType = question.multiple ? "checkbox" : "radio"
  questionForm.innerHTML = `
    <p>${question.question}</p>
    ${question.answers
      .map(
        (answer, idx) => `
      <label>
        <input type="${inputType}" name="answer" value="${idx}">
        ${answer}
      </label>
    `
      )
      .join("")}
    <button type="submit">Ответить</button>
  `
}

// Обработчик отправки формы
questionForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const selectedAnswers = Array.from(
    document.querySelectorAll('input[name="answer"]:checked')
  ).map((input) => parseInt(input.value))
  if (selectedAnswers.length === 0) {
    notification.style.display = "block"
    setTimeout(() => {
      notification.style.display = "none"
    }, 3000)
    return
  }
  let points = 0
  selectedAnswers.forEach((answer) => {
    points += questions[currentQuestion].points[answer]
  })
  totalScore += points
  currentQuestion++
  showNextQuestion()
})

// Функция для отображения результата
function showResult() {
  questionContainer.style.display = "none"
  resultContainer.style.display = "block"
  scoreDisplay.textContent = totalScore

  let recommendation = ""
  if (totalScore <= 4) {
    scoreDisplay.textContent += " (Низкий риск)"
    recommendation = "Продолжать гигиену полости рта."
  } else if (totalScore <= 8) {
    scoreDisplay.textContent += " (Средний риск)"
    recommendation =
      "Соблюдать гигиену полости рта, ограничить употребление быстроусвояемых углеводов."
  } else if (totalScore <= 12) {
    scoreDisplay.textContent += " (Высокий риск)"
    recommendation =
      "Визит к врачу-стоматологу, соблюдать гигиену полости рта, ограничить употребление быстроусвояемых углеводов."
  } else {
    scoreDisplay.textContent += " (Очень высокий риск)"
    recommendation =
      "Более частые визиты к врачу-стоматологу, использование специальных паст по рекомендации стоматолога, соблюдать гигиену полости рта, ограничить употребление быстроусвояемых углеводов."
  }

  recommendationContainer.innerHTML = `
    <h2>Рекомендации</h2>
    <p>${recommendation}</p>
  `
  resultContainer.appendChild(recommendationContainer)
}

// Обработчик перезапуска теста
restartBtn.addEventListener("click", function () {
  totalScore = 0
  currentQuestion = 0
  resultContainer.style.display = "none"
  questionContainer.style.display = "block"
  showNextQuestion()
})

// Начало теста
startBtn.addEventListener("click", function () {
  startBtn.style.display = "none"
  questionContainer.style.display = "block"
  showNextQuestion()
})
