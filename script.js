// carry over data from country-select
const dataPath = sessionStorage.getItem('dataPath')
const countryName = sessionStorage.getItem('countryName')

// setting the start and end year of the data just for robustness
// idk if i'll ever update this tho
const START_YEAR = 2017
const END_YEAR = 2021
const NUM_QUESTIONS = 5

// events
const score_fromDoc = document.querySelector('.score');
const hr = document.querySelector('.hour')
const min = document.querySelector('.minute')
const sec = document.querySelector('.second')

const q_num_sel = document.querySelector('.question-number')
const q_sel = document.querySelector('.question')
const q_el_sel = document.querySelector('.question-element')
const nav_btn = document.querySelector('.navigator')

// variables for timer
let second = 00;
let minute = 00;
let hour = 00;
let elapsed;

let score = 0;

///////////////////////////////////////

// timer functions

///////////////////////////////////////

function startTimer(){
  // every second, elapsed 
  addTime()
  timer = setInterval(addTime, 1000)
}

function convertToString(e){
  if (e < 10){
    e = `0${e}`;
  }
  return e;
}

function addTime(){
  second++;
  if (second === 60){
    minute++;
    second = 00
  }
  if (minute === 60){
    hour++;
    minute = 00
  }
  hr.textContent = convertToString(hour);
  min.textContent = convertToString(minute);
  sec.textContent = convertToString(second);
}

/*///////////////////////////////////////

// data selection

// the idea is to call the JSON data once and select the data
// i need for the questions before the questions even start populating

///////////////////////////////////////*/

var years = [];

for (let i = START_YEAR; i <= END_YEAR; i++){
  years.push(String(i))
};

var nationalMedianIncome;
var q2_jobs = {};
var q3_jobs = {};
var q4_jobs = {};
var q5_jobs = {};

var jsonCall = $.getJSON('Data Processing/processed data/CAN_2017-2021.json'/*dataPath*/,function(){
  var jobData = JSON.parse(jsonCall.responseText);
  var keys = Object.keys(jobData)
  console.log(keys)
  nationalMedianIncome = jobData[keys[0]]['2021']['median'] // this structure assumes that the first row has the national data
  console.log(nationalMedianIncome)
  });

///////////////////////////////////////

// build quiz

///////////////////////////////////////

var questionText = [
  `What is the <span id='green-text'>median income</span> of <span id='green-text'>${countryName}</span> in 2021?`,
  `Which job earns <span id='green-text'>above</span> the <span id='green-text'>median wage</span>?`,
  `Can you rank these jobs in order of <span id='green-text'>highest to lowest</span> median wage?`,
  `Which job's wages took the <span id='green-text'>biggest hit</span> in <span id='green-text'>2020</span>?`,
  `Which job saw the <span id='green-text'>biggest raise</span> from <span id='green-text'>2020</span> to <span id='green-text'>2021</span>?`
];
var questionOptions;
var answer;
var questionNumber = 0



function askQuestion(questionNumber) {
  console.log(questionNumber)
  q_num_sel.innerHTML = `Question ${questionNumber + 1}/${NUM_QUESTIONS}`
  q_sel.innerHTML = questionText[questionNumber]
  nav_btn.textContent = 'submit answer ->'
  nav_btn.addEventListener('click',checkAnswer)
}

function checkAnswer(e){
  e.preventDefault();
  console.log('RUN: check answer')
  nav_btn.removeEventListener('click', checkAnswer)
  if (questionNumber < NUM_QUESTIONS-1){
    nav_btn.textContent = `next question ->`
  } else {
    nav_btn.textContent = `finish quiz ->`
  }
  showAnswer()
  nav_btn.addEventListener('click',nextQuestion)
}

function showAnswer() {
  console.log('RUN: showAnswer')
}

function nextQuestion(e) {
  e.preventDefault();
  console.log('RUN: nextQuestion')
  if (questionNumber < NUM_QUESTIONS-1){
    console.log(`Go to next questions`)
    nav_btn.removeEventListener('click', nextQuestion)
    questionNumber ++;
    askQuestion(questionNumber);  
  } else {
    endGame()
  }
}

function endGame(){
  window.location.replace("results.html");
}


///////////////////////////////////////

// run

///////////////////////////////////////


askQuestion(questionNumber)
startTimer();
