import {startScreen, startBtn, ShowResultsBtn} from "./modules/start-screen.js"
import {quizScreen, stratQuiz, renderQuestion, randomQuestions , nextBtn, QuestionNumber, incrementQuestionNumber, userAnswers, restartQuiz} from './modules/quiz-screen.js'
import { renderResults, resultScreen, restartBtn } from "./modules/results.js"
import { userAttempScreen, closeResults, renderAttempts, clearAllResults, clearResults } from "./modules/user-attempts.js"

startBtn.addEventListener('click' , () => {
    startScreen.classList.add("hidden")
    quizScreen.classList.remove("hidden")
    quizScreen.classList.add("active")
    stratQuiz() 
})

nextBtn.addEventListener('click' , () => {
    incrementQuestionNumber()
    if (QuestionNumber === randomQuestions.length - 1) {
        nextBtn.textContent = "Finish Quiz" 
    } 
    if (QuestionNumber === randomQuestions.length) {
    quizScreen.classList.add("hidden")
    resultScreen.classList.remove("hidden")
    resultScreen.classList.add("active")
    renderResults(userAnswers)
    return
    }
    renderQuestion()
})

restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden")
    startScreen.classList.remove("hidden")
    startScreen.classList.add("active")
    restartQuiz()
})

ShowResultsBtn.addEventListener("click" , () => {
    startScreen.classList.add("hidden")
    userAttempScreen.classList.remove("hidden")
    userAttempScreen.classList.add("active")
    renderAttempts()
})

closeResults.addEventListener("click" , () => {
    startScreen.classList.remove("hidden")
    startScreen.classList.add("active")
    userAttempScreen.classList.add("hidden")
})

clearResults.addEventListener("click" , () => {
    clearAllResults()
    renderAttempts()
})