console.log(CAN_DATA)
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
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          },
        }],
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



function hideAll(){
  console.log(`hide all clicked`)
  Array.from({length: i}, (x, y) => y).forEach((value)=>{
    console.log(value)
  })
}

function showAll(){
  [...Array(i).keys()].forEach((value)=>{
    line.show(value)
  })
}

function toggleData(value){
  console.log(value)
  const visibilityData = line.isDatasetVisible(value);
  if (visibilityData){
    line.hide(value)
  } else {
    line.show(value)
  }
  console.log(visibilityData)
}



var hideAll = document.createElement('button')
hideAll.setAttribute('onclick','hideAll()')
hideAll.setAttribute('id','hideAll')
hideAll.innerText = 'Hide All'
legendBox.appendChild(hideAll)

var showAll = document.createElement('button')
showAll.setAttribute('onclick','showAll()')
showAll.setAttribute('id','showAll')
showAll.innerText = 'Show All'
legendBox.appendChild(showAll)

Object.keys(data).forEach((occupation)=>{
  var btn = document.createElement('button')
  btn.setAttribute('onclick',`toggleData(${i})`)
  btn.setAttribute('id',`${occupation}`)
  btn.innerText = `${occupation}`
  legendBox.appendChild(btn)
  i++;
})
