// carry over data from country-select
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
const q_des_sel = document.querySelector('.question-description')
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
var data;
var formatter;

for (let i = START_YEAR; i <= END_YEAR; i++){
  years.push(String(i))
};

switch (countryName){
  case 'Canada':
    data = CAN_DATA;
    formatter = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    });
    break;
  case 'the United States':
    data = US_DATA;
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    break;
  case 'the United Kingdom':
    data = UK_DATA;
    formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    });
    break;
}


var keys = Object.keys(data)
var medianIncome = formatter.format(data[keys[0]]['2021']['median'])

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
var questionContent = [
  generateContent(['a','b','c','d']),
  ``,
  ``,
  ``,
  ``
];
var questionDescription = [
  `The median salary should mean that 50% of citizens are making above that number, and 50% of citizens are making below that number`,
  ``,
  ``,
  ``,
  ``
];
var answerDescription = [
  `The median income of ${countryName} is ${medianIncome}`
]
var answerLst = [
  'b',
  1,
  1,
  1,
  1
]
var submission
var questionNumber = 0

function generateOption(opt){
  /*
  I need a way to create options and tag whether it is the correct answer
  I guess I can just compare the text content with a switch case rather than have
  the answer be in the HTML
  but that's annoying lol - we'll see what I'm vibing with by the end of the day
  */

  let str;
  str = 
  `<span id="flex-triplet-child">
      <button class="quiz btn active" id='option'>${opt}</button>
  </span>`
  return str

}

function generateContent(lstOfOptions){
  /*
  I need a way to randomize the order in which options appear so the quiz answers aren't randomly correct every time
  */

  let str = `<div class='flex-triplet'>`;
  // need to declare this here since the length will change once we start poppin 
  let len = lstOfOptions.length; 
  
  for (let i = 0; i < len; i++){
    let option = generateOption(lstOfOptions.sort(function() { return 0.5 - Math.random();}).pop());
    str +=
    `${option}` + `\n`
  }
  
  str += `</div>`
  console.log(str)
  return str
}

var opts_sel;
var answer_sel;

const abortController = new AbortController();

function askQuestion(questionNumber) {
  console.log(questionNumber)
  score_fromDoc.textContent = score;
  q_num_sel.innerHTML = `Question ${questionNumber + 1}/${NUM_QUESTIONS}`
  q_des_sel.innerHTML = `${questionDescription[questionNumber]}`
  q_sel.innerHTML = questionText[questionNumber]
  q_el_sel.innerHTML = questionContent[questionNumber]
  
  opts_sel = document.querySelectorAll('#option')

  // create an event listener for each button
  // update the submission value whenever they click

  opts_sel.forEach((i)=>{
    i.addEventListener('click',()=>{
      opts_sel.forEach((e)=>e.style.backgroundColor = '#E9EAE8')
      i.style.backgroundColor = '#92DC58'
      submission = [i, i.textContent]
    }, {signal: abortController.signal})
  })

  nav_btn.textContent = 'submit answer ->'
  nav_btn.addEventListener('click',checkAnswer)
}

function checkAnswer(e){
  // im pretty sure this is here because i made all the buttons links for some reason
  e.preventDefault();

  // make the buttons inactive so they dont have a hover effect
  opts_sel.forEach((e)=>e.classList.remove("active"));

  // abort the event listeners so you don't click and erase the correct answer
  abortController.abort()

  // kill the old nav_button listener
  nav_btn.removeEventListener('click', checkAnswer)

  // have button content depend on question number
  if (questionNumber < NUM_QUESTIONS-1){
    nav_btn.textContent = `next question ->`
  } else {
    nav_btn.textContent = `finish quiz ->`
  }

  // create a new one to go to the next question
  nav_btn.addEventListener('click',nextQuestion)

  // select the answer
  opts_sel.forEach((e)=>{
    if (e.textContent == answerLst[questionNumber]){
      answer_sel = e      
    }
  })

  // actually validate the answer
  if (submission[1] == answerLst[questionNumber]){
    score++;
    q_des_sel.textContent = `Correct! ${answerDescription[questionNumber]}`
  } else {
    // if the submission is wrong, we want to mark it red
    // and show the correct answer
    q_des_sel.textContent = `Incorrect! ${answerDescription[questionNumber]}`
    submission[0].style.backgroundColor = '#F24949'
    answer_sel.style.backgroundColor = '#92DC58'
  }
  score_fromDoc.textContent = score;
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
startTimer()
