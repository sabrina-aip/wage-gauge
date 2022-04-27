const hour = (sessionStorage.getItem('hour') || '0').padStart(2, '0')
const minute = (sessionStorage.getItem('minute') || '0').padStart(2, '0')
const second = (sessionStorage.getItem('second') || '0').padStart(2, '0')
const score = (sessionStorage.getItem('score') || '0')

const resultStatement = document.querySelector('.result-statement')

resultStatement.textContent = `You answered ${score}/5 questions correctly in ${hour}:${minute}:${second}`

