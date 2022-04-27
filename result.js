const hour = sessionStorage.getItem('hour')
const minute = sessionStorage.getItem('minute').padStart(2, '0')
const second = sessionStorage.getItem('second').padStart(2, '0')
const score = sessionStorage.getItem('score')

const resultStatement = document.querySelector('.result-statement')

resultStatement.textContent = `You answered ${score}/5 questions correctly in ${hour}:${minute}:${second}`

