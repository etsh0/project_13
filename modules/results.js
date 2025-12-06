import { correctAnswers } from "./quiz-screen.js"
import { saveToLocalStorage } from "./user-attempts.js"

export const resultScreen = document.querySelector(".result-screen")
export const answersList = document.querySelector(".answers-list")
export const restartBtn = document.querySelector(".restart-btn")
const scoreNumber = document.getElementById("score")
const scoreMessage = document.getElementById("score-message")

export function renderResults(userAnswers) {
    scoreNumber.textContent = correctAnswers
    const percentage = (correctAnswers / userAnswers.length) * 100 
    if (percentage === 100) {
        scoreMessage.textContent = "Perfect! Outstanding work!"
    }
    else if (percentage >= 80) {
        scoreMessage.textContent = "Excellent! Great job!"
    }
    else if (percentage >= 60) {
        scoreMessage.textContent = "Great work! keep it up!"
    }
    else {
        scoreMessage.textContent = "Keep practicing! you'll get better!"
    }
    showUserAnswers(userAnswers)
    saveToLocalStorage(correctAnswers, userAnswers.length)
}

function showUserAnswers(userAnswers) {
    answersList.innerHTML = ""
    userAnswers.forEach((answer,idx) => {
        answersList.innerHTML += `

        <div class="answer-item ${answer.userAnswer == answer.question.correct ? "correct":"incorrect"} p-3 rounded-xl flex items-center justify-between">
            <div class="answer-text">
                <strong>Q${idx + 1}:</strong>${answer.question.question}<br>
                <small>Your answer: ${answer.question.options[answer.userAnswer]}</small><br>
                <small>Correct answer: ${answer.question.options[answer.question.correct]}</small>
            </div>
            <div class="answer-status ${answer.userAnswer == answer.question.correct ? "correct":"incorrect"} px-3 py-1 font-bold rounded-3xl">${answer.userAnswer == answer.question.correct ? "correct":"incorrect"}</div>
        </div>
        
        `
    });
}


