var app = angular.module('stocks');

app.controller('stockController', stocks);

function stocks($http, $interval){
  vm = this;

  vm.search = function(symbol){
    var data = {};
    data.symbol = symbol;
    if(symbol.length>0){

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
        vm.volume = datum.data.query.results.quote.Volume;
        vm.range = datum.data.query.results.quote.DaysRange;
        vm.ratio = datum.data.query.results.quote.PEGRatio;

        var name = {};
        name.name = vm.name;
        var news = $http.post('http://localhost:8080/search/news', name);
        news.then(function(datum){
          vm.newsList = datum.data;
        })

        var graph = d3.selectAll('svg');
        graph.remove();

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 690 - margin.left - margin.right,
        height = 375 - margin.top - margin.bottom;

        var parseTime = d3.timeParse("%Y-%m-%d");

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

        var svg = d3.select("#chart").append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

        d3.request('https://www.quandl.com/api/v3/datasets/WIKI/'+vm.symbol+'.json?api_key=Cf5fdwzihyoxY8HwbBHT', function(error, data) {
          if (error) throw error;

          var dataPoints = [];
          var jData = (JSON.parse(data.response));
          jData.dataset.data.forEach(function(arr){
            var dataPoint = {};
            dataPoint.date = arr[0];
            dataPoint.close = arr[4];
            dataPoints.push(dataPoint);
          })
          dataPoints.forEach(function(d) {
            d.date = parseTime(d.date);
            d.close = +d.close;
          })

          x.domain(d3.extent(dataPoints, function(d) { return d.date; }));
          y.domain([0, d3.max(dataPoints, function(d) { return d.close; })]);

          svg.append("path")
          .data([dataPoints])
          .attr("class", "line")
          .attr("d", valueline);

          svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

          svg.append("g")
          .call(d3.axisLeft(y));

          svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", 6)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Price (US Dollars)");
        });
      }
      else {
        vm.name = "Invalid ticker symbol";
        vm.symbol = '';
        vm.price = '';
        vm.open = '';
        vm.changePercent = '';
        vm.change = '';
        vm.previous = '';
        vm.volume = '';
        vm.range = '';
        vm.ratio = '';

        var graph = d3.selectAll('svg');
        graph.remove();
      }
    })
  }
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
