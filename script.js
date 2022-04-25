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
      maximumFractionDigits: 0
    });
    break;
  case 'the United States':
    data = US_DATA;
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
    break;
  case 'the United Kingdom':
    data = UK_DATA;
    formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    });
    break;
}

var keys = Object.keys(data)
var medianIncome = data[keys[0]]['2021']['median']
var medianRateChange = (data[keys[0]]['2021']['median'] - data[keys[0]]['2020']['median'])/data[keys[0]]['2020']['median']*100
var medianAbsChange = data[keys[0]]['2021']['median'] - data[keys[0]]['2020']['median']
// after we get the median, we should remove the first key from the array so we dont accidentally call the median
delete data[keys[0]];
keys = keys.splice(1)

// i know this is a mess
// so am i
var aboveMedian = []
var belowMedian = []
var has2021median = {}
var raises_2021 = {}
var paycuts_2020 = {}

keys.forEach((e)=>{
  // check to see if there's a 2021 value
  if (typeof data[e]['2021'] !== 'undefined'){
    // check to see if there's a median value in 2021
    if (typeof data[e]['2021']['median'] !== 'undefined'){
      // store whether the value is above or below the national median
      if (data[e]['2021']['median']>medianIncome){
        aboveMedian.push(e)
      } else {
        belowMedian.push(e)
      }
    }
  }
});

keys.forEach((e)=>{
  // check to see if there's a 2021 value
  if (typeof data[e]['2021'] !== 'undefined'){
    // check to see if there's a median value in 2021
    if (typeof data[e]['2021']['median'] !== 'undefined'){
      // store whether the value is above or below the national median
      has2021median[e] = data[e]['2021']['median'];
    }
  }
});

// calculate raises in 2021 for q5
keys.forEach((e)=>{
  // check to see if there's are 2020 and 2021 values
  if ((typeof data[e]['2020'] !== 'undefined') & typeof data[e]['2021'] !== 'undefined'){
    // check to see if there's are median values for both years
    if ((typeof data[e]['2020']['median'] !== 'undefined') & (typeof data[e]['2021']['median'] !== 'undefined')){
      // store whether they got a raise/paycut and by how much
      if (data[e]['2021']['median']>data[e]['2020']['median']){ // check if raise
        raises_2021[e] = {}
        raises_2021[e]['rate'] = (data[e]['2021']['median']-data[e]['2020']['median'])/data[e]['2020']['median']*100
        raises_2021[e]['abs'] = data[e]['2021']['median']-data[e]['2020']['median']
      }
    }
  }
});


// calculate paycuts in 2020 for q4
keys.forEach((e)=>{
  // check to see if there's are 2020 and 2021 values
  if ((typeof data[e]['2019'] !== 'undefined') & typeof data[e]['2020'] !== 'undefined'){
    // check to see if there's are median values for both years
    if ((typeof data[e]['2019']['median'] !== 'undefined') & (typeof data[e]['2020']['median'] !== 'undefined')){
      // store whether they got a raise/paycut and by how much
      if (data[e]['2019']['median']>data[e]['2020']['median']){ // check if paycut
        paycuts_2020[e] = {}
        paycuts_2020[e]['rate'] = -(data[e]['2020']['median']-data[e]['2019']['median'])/(data[e]['2019']['median'])*100 // find value of the paycut
        paycuts_2020[e]['abs'] = -(data[e]['2020']['median']-data[e]['2019']['median']) // find value of the paycut
      }
    }
  }
});

function genRandom(max, min){
  // generate a random positive or negative number with an absolute value between max and min
  return (Math.ceil(Math.random() * (max-min))+min) * (Math.round(Math.random()) ? 1 : -1)
}

function selectRandom_noRepeat(lst, numWanted){
  // create a copy of the list so you don't permanently damage the list
  copyLst = Array.from(structuredClone(lst));
  finalLst = []
  for (let i=0;i<numWanted; i++){
    finalLst.push(copyLst.sort(()=>{
      return 0.5 - Math.random();
    }).pop())
  };
  return finalLst
}

function getLstContent(dom){
  lst = []
  items = Array.from(dom.getElementsByTagName("li"))
  items.forEach((item)=>{
    lst.push(item.textContent)
  })
  return lst
}

let q2_a = selectRandom_noRepeat(aboveMedian,1)[0]
let q2_w = selectRandom_noRepeat(belowMedian,2)

let q3_o_names = selectRandom_noRepeat(Object.keys(has2021median), 3) // i need to make sure this list is ordered properly
let q3_o= [] 

// figured out a cleaner way to do this 
// will i implement this on the other stuff
// maYBE
q3_o_names.forEach((e) =>{
  q3_o.push([e,has2021median[e]])
});

q3_o.sort((a,b)=>{
  return b[1]-a[1];
})

q3_o_str = 
`
<ul class="list-group" id="simpleList">
    <li class="list-group-item">${q3_o_names[0]}</li>
    <li class="list-group-item">${q3_o_names[1]}</li>
    <li class="list-group-item">${q3_o_names[2]}</li>
</ul>
`

// lmaooo what the fuck is this. i'm running out of time and coming up with the whackest shit lmaooooo
if (countryName=='Canada'){
  var theCanadaNum = 2;
} else {
  var theCanadaNum = 3;
}
let q4_o = Array.from(selectRandom_noRepeat(Object.keys(paycuts_2020),theCanadaNum))
q4_o.forEach((e)=>{
  q4_o[e] = {}
  q4_o[e]['rate'] = paycuts_2020[e]['rate']
  q4_o[e]['abs'] = paycuts_2020[e]['abs']
})

let q4_a_rate = q4_o[Object.keys(q4_o)[q4_o.length]]['rate'];
let q4_a_abs = q4_o[Object.keys(q4_o)[q4_o.length]]['abs'];
let q4_a_name = Object.keys(q4_o)[q4_o.length];
q4_a_rate = q4_o[Object.keys(q4_o)[q4_o.length]]['rate'] // starting at that index because Object.keys is giving me some whack output that I don't wanna deal with rn

Object.keys(q4_o).forEach((e)=>{
  if (q4_o[e]['rate']>q4_a_rate){
    q4_a_rate = q4_o[e]['rate']
    q4_a_abs = q4_o[e]['abs']
    q4_a_name = e
  }
})

// aND I'D DO IT AGAIN
let q5_o = Array.from(selectRandom_noRepeat(Object.keys(raises_2021),3))
q5_o.forEach((e)=>{
  q5_o[e] = {}
  q5_o[e]['rate'] = raises_2021[e]['rate']
  q5_o[e]['abs'] = raises_2021[e]['abs']
})

let q5_a_rate = q5_o[Object.keys(q5_o)[q5_o.length]]['rate'];
let q5_a_abs = q5_o[Object.keys(q5_o)[q5_o.length]]['abs'];
let q5_a_name = Object.keys(q5_o)[q5_o.length];

Object.keys(q5_o).forEach((e)=>{
  if (q5_o[e]['rate']>q5_a_rate){
    q5_a_rate = q5_o[e]['rate']
    q5_a_abs = q5_o[e]['abs']
    q5_a_name = e
  }
})


///////////////////////////////////////

// build quiz

///////////////////////////////////////

var questionText = [
  `What was the <span id='green-text'>median income</span> of <span id='green-text'>${countryName}</span> in 2021?`,
  `Which job earns <span id='green-text'>above</span> the <span id='green-text'>median wage</span>?`,
  `Can you rank these jobs in order of <span id='green-text'>highest to lowest</span> median wage?`,
  `Which job's wages took the <span id='green-text'>biggest hit</span> in <span id='green-text'>2020</span>?`,
  `Which job saw the <span id='green-text'>biggest raise</span> from <span id='green-text'>2020</span> to <span id='green-text'>2021</span>?`
];
var questionContent = [
  generateContent([formatter.format(medianIncome), formatter.format(medianIncome+genRandom(20000,5000)), formatter.format(medianIncome+genRandom(20000,5000))]),
  generateContent([q2_w[0], q2_w[1],q2_a]),
  q3_o_str,
  generateContent(q4_o),
  generateContent(q5_o)
];
var questionDescription = [
  `The median means that 50% makes above the number and 50% make below it.`,
  `The median income was ${formatter.format(medianIncome)} in 2021.`,
  `Drag the boxes in order of their earnings (highest at the top).`,
  `Which job saw the biggest decrease in wages from 2019 to 2020?`,
  `Which job saw the biggest increase in wages from 2020 to 2021?`
];
var answerDescription = [
  `The median income of ${countryName} was ${formatter.format(medianIncome)} in 2021.`,
  `${q2_a}'s median wage was ${formatter.format(data[q2_a]['2021']['median'])} which is ${formatter.format(data[q2_a]['2021']['median']-medianIncome)} above the median.`,
  `The median wages for each occupation in 2021 are displayed on their right.`,
  `${q4_a_name} saw a median paycut of ${formatter.format(q4_a_abs)} (or ${Math.round(q4_a_rate*100)/100}%) from 2019 to 2020.`,
  `${q5_a_name} saw a median raise of ${formatter.format(q5_a_abs)} (or ${Math.round(q5_a_rate * 100)/100}%) from 2020 to 2021.`
]
var answerLst = [
  formatter.format(medianIncome),
  q2_a,
  q3_o.map(function(value,index) { return value[0]; }),
  q4_a_name,
  q5_a_name
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
  return str
}

var opts_sel;
var answer_sel;
const abortController = new AbortController();


console.log(answerLst)

function askQuestion(questionNumber) {
  score_fromDoc.textContent = score;
  q_num_sel.innerHTML = `Question ${questionNumber + 1}/${NUM_QUESTIONS}`
  q_des_sel.innerHTML = `${questionDescription[questionNumber]}`
  q_sel.innerHTML = questionText[questionNumber]
  
  q_el_sel.innerHTML = questionContent[questionNumber]
  opts_sel = document.querySelectorAll('#option')

  if (questionNumber==2){
    Sortable.create(simpleList,{
      animation:150,
      swapThreshold:0.3
    })
  } else {
    // create an event listener for each button
    // update the submission value whenever they click
    
    opts_sel.forEach((i)=>{
      i.addEventListener('click',()=>{
        opts_sel.forEach((e)=>e.style.backgroundColor = '#E9EAE8')
        i.style.backgroundColor = '#92DC58'
        submission = [i, i.textContent]
      }, {signal: abortController.signal})
    })

  }

  nav_btn.textContent = 'submit answer ->'
  nav_btn.addEventListener('click',checkAnswer)
}

function checkAnswer(e){
  // im pretty sure this is here because i made all the buttons links for some reason
  e.preventDefault();

  // make the buttons inactive so they dont have a hover effect
  opts_sel.forEach((e)=>e.classList.remove("active"));

  // abort the event listeners so you don't click and erase the correct answer
  //abortController.abort()
  

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

  if (questionNumber==2){
    submission = getLstContent(document.getElementById('simpleList'))
    opts = document.querySelectorAll('.list-group-item')
    let i = 0
    let c = 0
    opts.forEach ((e)=>{
      if (submission[i] == answerLst[questionNumber][i]){
        q_des_sel.innerHTML = `Correct!<br><br>${answerDescription[questionNumber]}`
        e.style.backgroundColor = '#92DC58';
        c++
      } else {
        q_des_sel.innerHTML = `Incorrect!<br><br>${answerDescription[questionNumber]}`
        e.style.backgroundColor = '#F24949';
      }
      i++;
    })  

    if (c==3){
      score++ // why do this instead of checkking if the arrays are equal? because i am stupid and i could not figure it out idk how i couldn't figure it out but i sure couldn't figure it out
    }

    q_el_sel.innerHTML = 
    `
    <div class="flex-split-inline"> 
      <div>
        ${q_el_sel.innerHTML}
      </div>
      <div>
        <ul class="list-group" id="answerList">
          <li class = 'answer-list-item'>${formatter.format(has2021median[submission[0]])}</li>
          <li class = 'answer-list-item'>${formatter.format(has2021median[submission[1]])}</li>
          <li class = 'answer-list-item'>${formatter.format(has2021median[submission[2]])}</li>
        </ul> 
      </div> 
    </div>
    `
    

  } else {
    // select the answer
    opts_sel.forEach((e)=>{
      if (e.textContent == answerLst[questionNumber]){
        answer_sel = e      
      }
    })

    // actually validate the answer
    if (submission[1] == answerLst[questionNumber]){
      score++;
      q_des_sel.innerHTML = `Correct!<br><br>${answerDescription[questionNumber]}`
    } else {
      // if the submission is wrong, we want to mark it red
      // and show the correct answer
      q_des_sel.innerHTML = `Incorrect!<br><br>${answerDescription[questionNumber]}`
      submission[0].style.backgroundColor = '#F24949'
      answer_sel.style.backgroundColor = '#92DC58'
    }
  }
  score_fromDoc.textContent = score;
}

function nextQuestion(e) {
  e.preventDefault();
  if (questionNumber < NUM_QUESTIONS-1){
    nav_btn.removeEventListener('click', nextQuestion)
    questionNumber ++;
    askQuestion(questionNumber);  
  } else {
    endGame()
  }
}

function endGame(){
  sessionStorage.setItem('hour', hour);
  sessionStorage.setItem('minute', minute);
  sessionStorage.setItem('second', second);
  sessionStorage.setItem('score', score);
  window.location.replace("results.html");
}



///////////////////////////////////////

// run

///////////////////////////////////////



askQuestion(questionNumber)
startTimer()
