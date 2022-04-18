const can_sel = document.getElementById('can-select');
const usa_sel = document.querySelector('#usa-select');
const uk_sel = document.querySelector('#uk-select');

///////////////////////////////////////

// select data

///////////////////////////////////////

function goToGame(countryName){
  sessionStorage.setItem('countryName', countryName);
  window.location.replace("game.html");
}

function chooseCAN(){
  goToGame('Canada')
  can_sel.removeEventListener("click", chooseCAN) 
}

function chooseUSA(){
  goToGame('the United States')
  usa_sel.removeEventListener("click", chooseUSA)
}

function chooseUK(){
  goToGame('the United Kingdom')
  uk_sel.removeEventListener("click", chooseUK)
}

can_sel.addEventListener("click", chooseCAN)
usa_sel.addEventListener("click", chooseUSA)
uk_sel.addEventListener("click", chooseUK)
sessionStorage.clear();