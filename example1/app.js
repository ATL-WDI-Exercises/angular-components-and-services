angular.module('chartApp', ['chart.js']);

const app = angular.module('chartApp');

app.service('myDataService', function() {
  this.series = ['Atlanta', 'San Francisco', 'Chicago'];
  this.labels = ['2009', '2010', '2011', '2012', '2013', '2014', '2015'];
  this.data = [
    [65000, 67300, 71100, 73900, 74600, 77100, 82700],
    [74500, 76700, 83200, 86599, 88900, 91200, 94500],
    [84500, 86700, 93200, 96599, 98900, 101200, 104500]
  ];

  this.getData = function() {
    return this.data;
  };
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
    this.series = myDataService.series;

    // transpose the array
    this.data = myDataService.data[0].map( (col, i) => {
      return myDataService.data.map( (row) => {
        return row[i];
      });
    });
  }
});

app.component('barChart', {
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
    this.data = myDataService.data;
    this.series = myDataService.series;
    this.labels = myDataService.labels;
    this.options = { legend: { display: true }, responsive: true, maintainAspectRatio: false };
  }
});
