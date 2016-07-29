var app = angular.module('stocks');

app.controller('stockController', stocks);

function stocks($http, $interval){
  vm = this;

  vm.search = function(symbol){
    var data = {};
    data.symbol = symbol;
    var request = $http.post('http://localhost:8080/search', data);
    request.then(function(datum){
      if (datum.data.query.results.quote.Name != null){
        vm.name = datum.data.query.results.quote.Name;
        vm.symbol = datum.data.query.results.quote.symbol;
        vm.price = datum.data.query.results.quote.LastTradePriceOnly;
        vm.open = datum.data.query.results.quote.Open;
        vm.changePercent = datum.data.query.results.quote.PercentChange;
        vm.change = datum.data.query.results.quote.Change;
        vm.previous = datum.data.query.results.quote.PreviousClose;

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        // parse the date / time
        var parseTime = d3.timeParse("%Y-%m-%d");
        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        // define the line
        var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });
        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
        // Get the data
        d3.request('https://www.quandl.com/api/v3/datasets/WIKI/'+vm.symbol+'.json?api_key=Cf5fdwzihyoxY8HwbBHT', function(error, data) {
          if (error) throw error;
          // format the data
          var dataPoints = [];
          var jData = (JSON.parse(data.response));
          console.log(jData);
          jData.dataset.data.forEach(function(arr){
            var dataPoint = {};
            dataPoint.date = arr[0];
            dataPoint.close = arr[4];
            dataPoints.push(dataPoint);
          })
          console.log(dataPoints);
          dataPoints.forEach(function(d) {
            d.date = parseTime(d.date);
            d.close = +d.close;
          });
          // Scale the range of the data
          x.domain(d3.extent(dataPoints, function(d) { return d.date; }));
          y.domain([0, d3.max(dataPoints, function(d) { return d.close; })]);
          // Add the valueline path.
          svg.append("path")
          .data([dataPoints])
          .attr("class", "line")
          .attr("d", valueline);
          // Add the X Axis
          svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
          // Add the Y Axis
          svg.append("g")
          .call(d3.axisLeft(y));
        });
      }
      else {
        vm.name = "Invalid ticker symbol";
        vm.symbol = '';
        vm.price = '';
        vm.open = '';
        vm.changePercent = '';
        vm.change = '';
      }
    })
  }

  // var getData = function(){
  //
  //   var data = $http.get('http://localhost:8080/data');
  //   data.then(function(datum){
  //     vm.name = datum.data.query.results.quote.Name;
  //     vm.symbol = datum.data.query.results.quote.symbol;
  //     vm.price = datum.data.query.results.quote.LastTradePriceOnly;
  //     vm.open = datum.data.query.results.quote.Open;
  //     vm.changePercent = datum.data.query.results.quote.PercentChange;
  //     vm.change = datum.data.query.results.quote.Change;
  //   })
  // }
  // $interval(getData, 5000);
}
