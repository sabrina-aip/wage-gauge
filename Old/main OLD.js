const DATA = [
  {
    occupation: "Millennial Meme Maker",
    country: "Canada",
    medianSalary: 80000,
  }
];

const MAX_SALARY = 150000;
const MIN_SALARY = 15000;
const MAX_QUESTIONS = 5;
let score = 0;
let questionNumber = 1;


let canada_flag = `<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/flag-canada_1f1e8-1f1e6.png" alt="canadian flag emoji">`


let usa_flag = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/flag-united-states_1f1fa-1f1f8.png";
let uk_flag = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/flag-united-kingdom_1f1ec-1f1e7.png";


var guess;
var answer;

// variables for timer
let second = 00;
let minute = 00;
let hour = 00;
let elapsed;

// Events

const questionNumber_fromDoc = document.querySelector('.question-number');
const occupation_fromDoc = document.querySelector('.occupation');
const country_fromDoc = document.querySelector('.country');
const medianSalary_fromDoc = document.querySelector('.medianSalary');
const generatedSalary_fromDoc = document.querySelector('.generatedSalary');

const score_fromDoc = document.querySelector('.score');
const hr = document.querySelector('.hour')
const min = document.querySelector('.minute')
const sec = document.querySelector('.second')

// core game functions

function generateSalary() {
  return Math.round(Math.random()*(MAX_SALARY-MIN_SALARY)+MIN_SALARY);
};

function formatSalary(country, unformattedSalary) {
  let currencySymbol;
  if (country == "Canada" | "USA"){
    currencySymbol = "$";
  } else if (country== "UK") {
    currencySymbol = "£";
  }
  return currencySymbol + unformattedSalary.toLocaleString('en-US');  
}

function makeGuess(choice){
  guess = choice;
  evaluateGuess();
}

function generateQuestion() {
  questionNumber_fromDoc.textContent = `Question ${questionNumber}`;
  let i = Math.floor(Math.random()*DATA.length); // it would  be better to make this a weighted average based on our subs

  // generate a salary that definitely isn't equal to the median (guaranteeing an over vs under situation)
  let generatedSalary = generateSalary()
  while (generatedSalary == DATA[i].medianSalary){
    generatedSalary = generateSalary();
  }

  // answer is true if the generatedSalary is greater than the median

  answer = (generatedSalary > DATA[i].medianSalary);

  // send info to html
  score_fromDoc.textContent = score;

  switch (DATA[i].country){
    case DATA[i].country == "Canada":
      country_fromDoc.textContent = canada_flag
      break;
  }
  occupation_fromDoc.textContent = DATA[i].occupation;
  country_fromDoc.textContent = canada_flag;
  generatedSalary_fromDoc.textContent = formatSalary(DATA[i].country, generatedSalary);
};

function evaluateGuess(){
  if (guess == answer){
    score ++;
    score_fromDoc.textContent = score;
  } else {
    console.log("wrong")
  }
  if (questionNumber == MAX_QUESTIONS){
    closeOutGame();
  } else {
    questionNumber ++;
    generateQuestion();    
  }
};

function closeOutGame(){
  window.location.replace("results.html");
}

// timer functions

function start(){
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

// run when page opens
sessionStorage.clear();
generateQuestion();
start();