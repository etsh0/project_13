import {questionBank} from "./question-bank.js"
export const quizScreen = document.querySelector('.quiz-screen')
const questionContent = document.getElementById('question-content')
const questionNumber = document.getElementById('question-number')
const options = document.querySelector('.options-container')
const progressBar = document.getElementById('progress')
export const nextBtn = document.getElementById("next-btn")

export let randomQuestions = []
export let QuestionNumber = 0;
export let userAnswers = []
export let correctAnswers = 0

export function stratQuiz() {
    for (let i = 0 ; i < questionBank.length ; i++) {

        const firstIdx = Math.floor(Math.random() * 15)
        const secondIdx = Math.floor(Math.random() * 15) 

        let temp = questionBank[firstIdx]
        questionBank[firstIdx] = questionBank[secondIdx]
        questionBank[secondIdx] = temp
    }
    randomQuestions = questionBank.slice(0,5);
    renderQuestion()
}

export function renderQuestion() {

    const currentQuestion = randomQuestions[QuestionNumber]
    questionContent.textContent = currentQuestion.question
    questionNumber.textContent = QuestionNumber + 1
    progressBar.style.width = `${ ((QuestionNumber + 1) / randomQuestions.length * 100)}%`
    options.innerHTML = ""   

    currentQuestion.options.forEach((option,optionIdx) => {
        const optionBtn = document.createElement("button")
        optionBtn.className = "option border border-[#e0e0e0] px-5 py-4 w-full rounded-2xl text-left text-[1rem] cursor-pointer transition-all duration-300 hover:border-[#667eea] hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(102,126,234,0.2)]"
        optionBtn.textContent = option
        options.appendChild(optionBtn)

        optionBtn.addEventListener('click' , () => {
            handelClickOptionBtn(optionBtn,optionIdx,currentQuestion)
        })
    });
    nextBtn.disabled = true
}

function handelClickOptionBtn(optionBtn,optionIdx,currentQuestion) { 
    const optionBtns = document.querySelectorAll('.option')

    if (optionIdx !== currentQuestion.correct) {
        optionBtn.classList.add("incorrect")
    }
    optionBtns.forEach(btn => {btn.disabled = true})
    optionBtns[currentQuestion.correct].classList.add("correct")
    if (optionIdx === currentQuestion.correct) correctAnswers++
    nextBtn.disabled = false
    userAnswers.push({
        question:currentQuestion,
        userAnswer:optionIdx
    })
}

export function incrementQuestionNumber() {
    QuestionNumber++
}

export function restartQuiz() {
    QuestionNumber = 0
    userAnswers = []
    randomQuestions = []
    correctAnswers = 0
    nextBtn.textContent = "Next Question"
}