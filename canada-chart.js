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
    dataPoint['lineTension'] = false;
    dataPoint['fill'] = true;
    dataPoint['backgroundColor'] = 'rgba(146,220,88,.01)';
    dataPoint['borderColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointRadius'] = 10;
    dataPoint['pointBackgroundColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointBorderColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointHoverRadius'] = 10;
    dataPoint['pointHoverBackgroundColor'] = 'rgba(146,220,88,1)';
    dataPoint['pointHitRadius'] = 50;
    dataPoint['pointBorderWidth'] = 2;
    dataPoint['data'] = data[occupation];
    datasets.push(dataPoint)
})

console.log(datasets)

var ctx = document.getElementById("myChart");
var line = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets,
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: true
          },
        }],
        yAxes: [{
          ticks: {
            min: 0,
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: true,
        labels: {
            fontColor: 'white'
        }
        
      }
    }
  });