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
    //dataPoint['hidden'] = true;
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
        },
        onClick: function(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
  
          ci.data.datasets.forEach(function(e, i) {
            var meta = ci.getDatasetMeta(i);
  
            if (i !== index) {
              if (!alreadyHidden) {
                meta.hidden = meta.hidden === null ? !meta.hidden : null;
              } else if (meta.hidden === null) {
                meta.hidden = true;
              }
            } else if (i === index) {
              meta.hidden = null;
            }
          });
        }
      }
    }
  });

const legendBox = document.querySelector('.legend-container')
Object.keys(data).forEach((occupation)=>{
  btn = document.createElement('button')
  btn.innerHTML = occupation
  console.log(btn)
  legendBox.appendChild(btn)
})