years = ['2017', '2018', '2019', '2020', '2021']

var data = {}

Object.keys(CAN_DATA).forEach((occupation)=>{
    data[occupation] = []
    years.forEach((year)=>{
        if (typeof CAN_DATA[occupation][year]['median'] !== 'undefined') {
            data[occupation].push(CAN_DATA[occupation][year]['median'])
        } else {
            data[occupation].push(null)
        }
    })
})

var datasets = []

Object.keys(data).forEach((occupation)=>{
    dataPoint = {};
    dataPoint['hidden'] = true;
    dataPoint['label'] = occupation;
    dataPoint['lineTension'] = .1;
    dataPoint['fill'] = true;
    dataPoint['backgroundColor'] = 'rgba(146,220,88,.01)';
    dataPoint['borderColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointRadius'] = 3;
    dataPoint['pointBackgroundColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointBorderColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointHoverRadius'] = 10;
    dataPoint['pointHoverBackgroundColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointHitRadius'] = 50;
    dataPoint['pointBorderWidth'] = 1;
    dataPoint['data'] = data[occupation];
    datasets.push(dataPoint)
})

var ctx = document.getElementById("myChart");
var line = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets,
    },
    options: {
      animation:{
        duration: 100,
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Median Wage (CAD $)'
          },
          suggestedMax: 51000,
        },
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        } 
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

const legendBox = document.querySelector('.legend-container')
var i = 0;

Object.keys(data).forEach((occupation)=>{
  let btn = document.createElement('button')
  btn.setAttribute('onclick',`toggleData(${i})`)
  btn.setAttribute('id',`occupation-${i}`)
  btn.setAttribute('class', 'occupationBtn')
  btn.innerText = `${occupation}`
  legendBox.appendChild(btn)
  i++;
})

function toggleData(value){
  selectedBtn = document.getElementById(`occupation-${value}`)
  const visibilityData = line.isDatasetVisible(value);
  if (visibilityData){
    line.hide(value)
    selectedBtn.style.backgroundColor = '#06070B'
    selectedBtn.style.color = 'white'
  } else {
    line.show(value)
    selectedBtn.style.backgroundColor = '#92DC58'
    selectedBtn.style.color = '#06070B'
  }
}

function hideAll(){
  for (let j=0; j<Object.keys(data).length; j++){
    line.hide(j)
    document.getElementById(`occupation-${j}`).style.backgroundColor = '#06070B'
    document.getElementById(`occupation-${j}`).style.color = 'white'
  }
}

function showAll(){
  for (let j=0; j<Object.keys(data).length; j++){
    line.show(j)
    document.getElementById(`occupation-${j}`).style.backgroundColor = '#92DC58'
    document.getElementById(`occupation-${j}`).style.color = '#06070B'
  }
}

function searchFilter() {
  // Declare variables
  var input, filter, textValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  btns = document.querySelectorAll('.occupationBtn')

  btns.forEach((btn)=>{
    textValue = btn.textContent || btn.innerText
    console.log(textValue)
    if (textValue.toUpperCase().indexOf(filter) >-1){
      btn.style.display = "";
    } else {
      btn.style.display = "none";
    }
  })
}

