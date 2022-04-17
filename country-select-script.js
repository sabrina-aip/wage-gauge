
const can_sel = document.getElementById('can-select');
const usa_sel = document.querySelector('#usa-select');
const uk_sel = document.querySelector('#uk-select');

///////////////////////////////////////

// select data

///////////////////////////////////////

function goToGame(dataPath){
  sessionStorage.setItem('dataPath', dataPath);
  window.location.replace("game.html");
}

function chooseCAN(){
  var dataPath = 'Data Processing/processed data/CAN_2017-2021.json'
  console.log(dataPath)
  goToGame(dataPath)
  can_sel.removeEventListener("click", chooseCAN) 
}

function chooseUSA(){
  var dataPath = 'Data Processing/processed data/US_2017-2021.json'
  console.log(dataPath)
  goToGame(dataPath)
  usa_sel.removeEventListener("click", chooseUSA)
}

function chooseUK(){
  var dataPath = 'Data Processing/processed data/UK_2017-2021.json'
  console.log(dataPath)
  goToGame(dataPath)
  uk_sel.removeEventListener("click", chooseUK)
}

can_sel.addEventListener("click", chooseCAN)
usa_sel.addEventListener("click", chooseUSA)
uk_sel.addEventListener("click", chooseUK)
sessionStorage.clear();