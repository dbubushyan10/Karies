const questions = [
  {
    img: "1.jpg",
    question: "Сколько вам лет?",
    answers: ["до 14 лет", "15-24 года", "25-44 года"],
    points: [0, 1, 2],
  },
  {
    img: "2.jpg",
    question: "Как часто вы употребляете быстроусвояемые углеводы?",
    answers: ["очень часто", "не так часто", "редко"],
    points: [2, 1, 0],
  },
  {
    img: "3.jpg",
    question: "Ощущаете ли сухость во рту?",
    answers: ["да", "нет"],
    points: [1, 0],
  },
  {
    img: "4.jpg",
    question: "Какой наблюдаете характер слюны?",
    answers: ["вязкий", "текучий"],
    points: [1, 0],
  },
  {
    img: "5.jpg",
    question:
      "После использования красителей для выявления налёта, какой появился цвет?",
    answers: ["розовый", "синий", "никакой"],
    points: [1, 2, 0],
  },
  {
    img: "6.jpg",
    question: "Сколько раз в день чистите зубы?",
    answers: ["0", "1 раз в день", "2 раза в день", "более 2 раз"],
    points: [2, 1, 0, 0],
  },
  {
    img: "7.jpg",
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
    img: "8.jpg",
    question: "Как часто вы посещаете стоматолога?",
    answers: ["раз в полгода", "раз в год", "по необходимости"],
    points: [0, 1, 2],
  },
  {
    img: "9.jpg",
    question: "Какова концентрация фтора в воде?",
    answers: ["более 1,5 мг/л", "0,5 - 1,5 мг/л", "менее 0,5 мг/л"],
    points: [0, 0, 1],
  },
  {
    img: "10.jpg",
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
const recommendations = document.getElementById("recommendations")
const appointmentForm = document.getElementById("appointment-form")

// Добавляем стили с помощью JavaScript
const style = document.createElement("style")
style.innerHTML = `
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
    font-size: 1.1em; /* Увеличенный размер текста */
  }

  h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2.5em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  img {
    max-width: 400px; /* Увеличенный размер картинок */
    max-height: 300px; /* Увеличенный размер картинок */
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
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    padding: 10px;
    border-radius: 5px;
  }

  label:hover {
    background-color: #f5f7fa;
  }

  input[type="radio"], input[type="checkbox"] {
    margin-right: 10px;
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

  #result {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  #result-text {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  #recommendations {
    font-size: 1.2em;
  }

  #appointment-form {
    display: none;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    transition: transform 0.3s ease;
  }

  #appointment-form input {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  #appointment-form button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #appointment-form button:hover {
    background-color: #45a049;
  }
`
document.head.appendChild(style)

// Функция отображения следующего вопроса
function showNextQuestion() {
  if (currentQuestion >= questions.length) {
    showResult()
    return
  }
  const question = questions[currentQuestion]
  questionImg.src = `./${question.img}`
  questionForm.innerHTML = `
    <p>${question.question}</p>
    ${question.answers
      .map(
        (answer, idx) => `
      <label>
        ${
          currentQuestion === 6
            ? `<input type="checkbox" name="answer" value="${idx}">`
            : `<input type="radio" name="answer" value="${idx}">`
        }
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
  const selectedAnswers =
    currentQuestion === 6
      ? Array.from(
          document.querySelectorAll('input[name="answer"]:checked')
        ).map((input) => parseInt(input.value))
      : [
          parseInt(
            document.querySelector('input[name="answer"]:checked')?.value
          ),
        ]
  if (selectedAnswers.length > 0) {
    selectedAnswers.forEach((answer) => {
      totalScore += questions[currentQuestion].points[answer]
    })
    currentQuestion++
    showNextQuestion()
  }
})

// Функция для отображения результата
function showResult() {
  questionContainer.style.display = "none"
  resultContainer.style.display = "block"
  scoreDisplay.textContent = totalScore

  let recommendationsText = ""
  if (totalScore <= 4) {
    scoreDisplay.textContent += " (Низкий риск)"
    recommendationsText = "Продолжайте соблюдать гигиену полости рта."
  } else if (totalScore <= 8) {
    scoreDisplay.textContent += " (Средний риск)"
    recommendationsText =
      "Соблюдайте гигиену полости рта и ограничьте употребление быстроусвояемых углеводов."
  } else if (totalScore <= 12) {
    scoreDisplay.textContent += " (Высокий риск)"
    recommendationsText =
      "Рекомендуется визит к врачу-стоматологу, соблюдение гигиены полости рта и ограничение употребления быстроусвояемых углеводов."
    showAppointmentForm()
  } else {
    scoreDisplay.textContent += " (Очень высокий риск)"
    recommendationsText =
      "Рекомендуются более частые визиты к врачу-стоматологу, использование специальных паст по рекомендации стоматолога, соблюдение гигиены полости рта и ограничение употребления быстроусвояемых углеводов."
    showAppointmentForm()
  }

  recommendations.textContent = recommendationsText
}

// Функция для отображения формы записи к врачу
function showAppointmentForm() {
  appointmentForm.style.display = "flex"
  appointmentForm.innerHTML = `
    <h2>Запись к врачу Бубшян Мишелю Бруновичу</h2>
    <input type="text" id="name" placeholder="Ваше имя" required>
    <input type="tel" id="phone" placeholder="Номер телефона" required>
    <input type="datetime-local" id="time" placeholder="Время записи" required>
    <button type="submit">Записаться</button>
  `

  const appointmentSubmitBtn = appointmentForm.querySelector(
    'button[type="submit"]'
  )
  appointmentSubmitBtn.addEventListener("click", function (event) {
    event.preventDefault()
    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const time = document.getElementById("time").value
    if (name && phone && time) {
      alert(
        `Спасибо, ${name}! Вы записаны на прием к врачу Бубушяну Мишелю Бруновичу на ${time}. Мы свяжемся с вами по номеру ${phone}.`
      )
      appointmentForm.style.display = "none"
    } else {
      alert("Пожалуйста, заполните все поля.")
    }
  })
}

// Обработчик перезапуска теста
restartBtn.addEventListener("click", function () {
  totalScore = 0
  currentQuestion = 0
  resultContainer.style.display = "none"
  questionContainer.style.display = "block"
  appointmentForm.style.display = "none"
  showNextQuestion()
})

// Начало теста
startBtn.addEventListener("click", function () {
  startBtn.style.display = "none"
  questionContainer.style.display = "block"
  showNextQuestion()
})
