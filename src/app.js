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
`

const style = document.createElement("style")
style.type = "text/css"
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)

const questions = [
  {
    img: img1,
    question: "Сколько вам лет?",
    answers: ["до 14 лет", "15-24 года", "25-44 года"],
    points: [0, 1, 2],
  },
  {
    img: img2,
    question: "Как часто вы употребляете быстроусвояемые углеводы?",
    answers: ["очень часто", "не так часто", "редко"],
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
  },
  {
    img: img8,
    question: "Как часто вы посещаете стоматолога?",
    answers: ["раз в полгода", "раз в год", "по необходимости"],
    points: [0, 1, 2],
  },
  {
    img: img9,
    question: "Какова концентрация фтора в воде?",
    answers: ["более 1,5 мг/л", "0,5 - 1,5 мг/л", "менее 0,5 мг/л"],
    points: [0, 0, 1],
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

// Функция отображения следующего вопроса
function showNextQuestion() {
  if (currentQuestion >= questions.length) {
    showResult()
    return
  }
  const question = questions[currentQuestion]
  questionImg.src = question.img
  questionForm.innerHTML = `
    <p>${question.question}</p>
    ${question.answers
      .map(
        (answer, idx) => `
      <label>
        <input type="radio" name="answer" value="${idx}">
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
  const selectedAnswer = parseInt(
    document.querySelector('input[name="answer"]:checked')?.value
  )
  if (selectedAnswer !== undefined) {
    totalScore += questions[currentQuestion].points[selectedAnswer]
    currentQuestion++
    showNextQuestion()
  }
})

// Функция для отображения результата
function showResult() {
  questionContainer.style.display = "none"
  resultContainer.style.display = "block"
  scoreDisplay.textContent = totalScore

  if (totalScore <= 4) {
    scoreDisplay.textContent += " (Низкий риск)"
  } else if (totalScore <= 8) {
    scoreDisplay.textContent += " (Средний риск)"
  } else if (totalScore <= 12) {
    scoreDisplay.textContent += " (Высокий риск)"
  } else {
    scoreDisplay.textContent += " (Очень высокий риск)"
  }
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
