const hour = sessionStorage.getItem('hour')
const minute = sessionStorage.getItem('minute')
const second = sessionStorage.getItem('second')
const score = sessionStorage.getItem('score')

const resultStatement = document.querySelector('.result-statement')

resultStatement.textContent = `You answered ${score}/5 questions correctly in ${hour}:${minute}:${second}`

