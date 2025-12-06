export const closeResults = document.getElementById("close-results")
export const userAttempScreen = document.getElementById("user-attemps")
export const resultsList = document.getElementById("results-list")
export const clearResults = document.getElementById("clear-results")

export function saveToLocalStorage(score,total) {

    let attemps = JSON.parse(localStorage.getItem("quizResult")) || []

    const newAttemps = {
        score: score,
        total: total,
        attempNumber: attemps.length + 1,
        date: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    attemps.push(newAttemps)
    localStorage.setItem("quizResult", JSON.stringify(attemps))
}

export function renderAttempts() {

    let attemps = JSON.parse(localStorage.getItem("quizResult")) || []

    resultsList.innerHTML = ""
    if (attemps.length === 0) {
        resultsList.innerHTML = '<li style="text-align: center; color: #666; font-style: italic;">No attempts yet. Take the quiz to see your results here!</li>'
        return;
    }

    attemps.forEach(attemp => {
        const percentage = (attemp.score / attemp.total) * 100
        const li = document.createElement("li")
        li.innerHTML = `
            <strong>Attempt ${attemp.attempNumber}:</strong>
            ${attemp.score} / ${attemp.total}
            <span style="color: #667eea;">(${percentage}%)</span> 
            <br>
            <small style="color: #999;">${attemp.date}</small>
        `
        resultsList.append(li)
    });

}

export function clearAllResults() {
    localStorage.removeItem("quizResult")
}