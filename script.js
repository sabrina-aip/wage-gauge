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

/*///////////////////////////////////////

// data selection

// the idea is to call the JSON data once and select the data
// i need for the questions before the questions even start populating

///////////////////////////////////////*/

var nationalMedianIncome;
var years = ['2017', '2018', '2019', '2020', '2021']
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

// run

///////////////////////////////////////

sessionStorage.clear();
startTimer();
