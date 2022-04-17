
const can_sel = document.getElementById('can-select');
const usa_sel = document.querySelector('#usa-select');
const uk_sel = document.querySelector('#uk-select');

///////////////////////////////////////

// select data

///////////////////////////////////////

function goToGame(dataPath, countryName){
  sessionStorage.setItem('dataPath', dataPath);
  sessionStorage.setItem('countryName', countryName);
  window.location.replace("game.html");
}

function chooseCAN(){
  goToGame('Data Processing/processed data/CAN_2017-2021.json', 'Canada')
  can_sel.removeEventListener("click", chooseCAN) 
}

function chooseUSA(){
  goToGame('Data Processing/processed data/US_2017-2021.json', 'the United States')
  usa_sel.removeEventListener("click", chooseUSA)
}

function chooseUK(){
  goToGame('Data Processing/processed data/UK_2017-2021.json', 'the United Kingdom')
  uk_sel.removeEventListener("click", chooseUK)
}

can_sel.addEventListener("click", chooseCAN)
usa_sel.addEventListener("click", chooseUSA)
uk_sel.addEventListener("click", chooseUK)
sessionStorage.clear();