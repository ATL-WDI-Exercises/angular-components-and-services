# Angular Components and Services

## Codepen Settings

* https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min.js
* https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.bundle.js
* https://cdn.jsdelivr.net/angular.chartjs/latest/angular-chart.min.js


## HTML

```html
<section ng-app="chartApp">
  <h1>Salaries for Software Engineers</h1>
  <div class="container">
    <simple-table></simple-table>
    <pie-chart></pie-chart>
  </div>
</section>
```

## CSS

```css
body {
  text-align: center;
  width: 100%;
  height: 100%;
}

table {
  margin: auto;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 5px;
  width: 100px;
}
table tr:nth-child(even) {
  background-color: #eee;
}
table tr:nth-child(odd) {
  background-color:#fff;
}
table th {
  background-color: #4080ff;
  color: white;
}
```

## JavaScript

```javascript
angular.module('chartApp', ["chart.js"]);
const app = angular.module('chartApp');

app.service('myDataService', function() {
  this.series = ['Atlanta', 'San Francisco'];
  this.labels = ['2009', '2010', '2011', '2012', '2013', '2014', '2015'];
  this.data = [
    [65000, 67300, 71100, 73900, 74600, 77100, 82700],
    [74500, 76700, 83200, 86599, 88900, 91200, 94500]
  ];
});

app.component('simpleTable', {
  template: `
<div class="my-table">
  <h2>Table</h2>
  <table>
    <tr>
      <th ng-repeat="series in $ctrl.series">{{ series }}</th>
    </tr>
    <tr ng-repeat="r in $ctrl.data">
      <td ng-repeat="d in r">{{ d | currency }}</td>
    </tr>
  </table>
</div>
`,
  controller: function(myDataService) {
    this.labels = myDataService.labels;
    this.series = myDataService.series;
    
    // transpose the array
    this.data = myDataService.data[0].map( (col, i) => { 
      return myDataService.data.map( (row) => { 
        return row[i];
      });
    });
  }
});

app.component('pieChart', {
  template: `
<div class="my-chart">
  <h2>Chart</h2>
  <div class="my-canvas">
    <canvas id="bar"
            class="chart chart-bar"
            chart-data="$ctrl.data"
            chart-labels="$ctrl.labels"
            chart-series="$ctrl.series"
            chart-options="$ctrl.options">
    </canvas>
  </div>
</div>
`,
  controller: function(myDataService) {
    console.log('controller is alive!');
    this.options = { legend: { display: true, responsive: true, maintainAspectRatio: false } };
    this.labels = myDataService.labels;
    this.series = myDataService.series;
    this.data = myDataService.data;
  }
});
```