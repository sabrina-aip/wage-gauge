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
    console.log(data)
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
  ``,
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
  1,
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

  let str;
  console.log(`list length: ${lstOfOptions.length}`)
  for (let i = 0; i <= lstOfOptions.length; i+){
    console.log(lstOfOptions.sort(function() { return 0.5 - Math.random();}).pop());
  }
  
  
  // create an options string
  // create a lstOfIndices in lstOfOptions
  // randomly select index and append it to the options string (with a linebreak inbetween)
  // pop the index from the list
  // repeat until lstOfIndices is empty

  str = 
  `<div class="flex-triplet">
    stuff here
  </div>
  `
  return str

}

lstOfOptions = [1,2,3,4,5,6,7,8,9]
generateContent(lstOfOptions)

var opt1_sel;
var opt2_sel;
var opt3_sel;

const abortController = new AbortController();

function askQuestion(questionNumber) {
  console.log(questionNumber)
  score_fromDoc.textContent = score;
  q_num_sel.innerHTML = `Question ${questionNumber + 1}/${NUM_QUESTIONS}`
  q_des_sel.innerHTML = `${questionDescription[questionNumber]}`
  q_sel.innerHTML = questionText[questionNumber]
  q_el_sel.innerHTML = questionContent[questionNumber]
  
  opt1_sel = document.querySelector('#option-1')
  opt2_sel = document.querySelector('#option-2')
  opt3_sel = document.querySelector('#option-3')
  answer = answerLst[questionNumber]

  // click effects
  opt1_sel.addEventListener('click',()=>{
    opt1_sel.style.backgroundColor = '#92DC58'
    opt2_sel.style.backgroundColor = '#E9EAE8'
    opt3_sel.style.backgroundColor = '#E9EAE8'
    submission = 1
  },  { signal: abortController.signal });

  opt2_sel.addEventListener('click',()=>{
    opt1_sel.style.backgroundColor = '#E9EAE8'
    opt2_sel.style.backgroundColor = '#92DC58'
    opt3_sel.style.backgroundColor = '#E9EAE8'
    submission = 2
  },  { signal: abortController.signal });

  opt3_sel.addEventListener('click',()=>{
    opt1_sel.style.backgroundColor = '#E9EAE8'
    opt2_sel.style.backgroundColor = '#E9EAE8'
    opt3_sel.style.backgroundColor = '#92DC58'
    submission = 3
  }, { signal: abortController.signal });

  nav_btn.textContent = 'submit answer ->'
  nav_btn.addEventListener('click',checkAnswer)
}

function checkAnswer(e){
  // im pretty sure this is here because i made all the buttons links for some reason
  e.preventDefault();

  // make the buttons inactive so they dont have a hover effect
  opt1_sel.classList.remove("active")
  opt2_sel.classList.remove("active")
  opt3_sel.classList.remove("active")

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

  // actually validate the answer
  if (submission == answer){
    score++;
    q_des_sel.textContent = `Correct! ${answerDescription[questionNumber]}`
  } else {
    // if the submission is wrong, we want to mark it red
    // and show the correct answer
    q_des_sel.textContent = `Incorrect! ${answerDescription[questionNumber]}`
    switch (submission) {
      case 1:
        opt1_sel.style.backgroundColor = '#F24949'
        break;
      case 2:
        opt2_sel.style.backgroundColor = '#F24949'
        break;
      case 3:
        opt3_sel.style.backgroundColor = '#F24949'
        break;
    }
    switch (answer) {
      case 1:
        opt1_sel.style.backgroundColor = '#92DC58'
        break;
      case 2:
        opt2_sel.style.backgroundColor = '#92DC58'
        break;
      case 3:
        opt3_sel.style.backgroundColor = '#92DC58'
        break;
  }
  score_fromDoc.textContent = score;
  }


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



//askQuestion(questionNumber)
startTimer()
