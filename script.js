const dataPath = sessionStorage.getItem('dataPath')

// events
const score_fromDoc = document.querySelector('.score');
const hr = document.querySelector('.hour')
const min = document.querySelector('.minute')
const sec = document.querySelector('.second')

const q_num_sel = document.querySelector('.question-number')
const q_sel = document.querySelector('.question')
const q_el_sel = document.querySelector('question-element')

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

///////////////////////////////////////

// data selection

///////////////////////////////////////

var jsonCall = $.getJSON('Data Processing/processed data/UK_2017-2021.json',function(){
  var jobData = JSON.parse(jsonCall.responseText);
  console.log(jobData);
  });


///////////////////////////////////////

// run

///////////////////////////////////////

sessionStorage.clear();
startTimer();
