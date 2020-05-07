const question = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const options = Array.from(document.getElementsByClassName("options-text"));
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let quizOption1 = document.getElementById("option-1");
let quizOption2 = document.getElementById("option-2");
let quizOption3 = document.getElementById("option-3");
// let quizOption4 = document.getElementById("option-4");

let questions = [
  {
    question: "Who is the founder of Facebook?",
    option1: "Elon Musk",
    option2: "Magaret Thatcher",
    option3: "Mark Zuckerberg",
    answer: 3,
  },
  {
    question: `Who is the founder of Microsoft?`,
    option1: "Melinda Gates",
    option2: "Bill Gates",
    option3: "Aristotle",
    answer: 2,
  },
  {
    question:
      "Who is the founder of Google?",
    option1: `Larry Page`,
    option2: `Arsene Wenger`,
    option3: `Dev Patel`,
    answer: 1,
  },
  {
    question:
      "Who is the founder of Twitter?",
    option1: "Richard Branson",
    option2: "Jack Dorsey",
    option3: "Kanye West",
    answer: 2,
  },
  {
    question:
      "Who is the founder of Snapchat?",
    option1: "Evan Spiegel",
    option2: "Kevin Systrom",
    option3: "Brian Acton",
    answer: 1,
  },
];

// Constants
const Correct_Point = 2;
const Max_Questions = 5;

startQuiz = () => {
  questionCounter = 0;
  sscore = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter} of ${Max_Questions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      increaseScore(Correct_Point);
      selectedOption.parentElement.classList.add(classToApply);
    } else {
      selectedOption.parentElement.classList.add(classToApply);

      if (currentQuestion.answer === 1) {
        quizOption1.classList.add("correct");
      } else if (currentQuestion.answer === 2) {
        quizOption2.classList.add("correct");
      } else if (currentQuestion.answer === 3) {
        quizOption3.classList.add("correct");
      // } else if (currentQuestion.answer === 4) {
      //   quizOption4.classList.add("correct");
      }
    }

    setTimeout(() => {
      quizOption1.classList.remove("correct");
      quizOption2.classList.remove("correct");
      quizOption3.classList.remove("correct");
      // quizOption4.classList.remove("correct");
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 650);
  });
});

nextButton.addEventListener("click", (event) => {
  getNewQuestion();
});

increaseScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();
