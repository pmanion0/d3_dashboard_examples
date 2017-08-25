var originationsGrowthGraph = function(graphID, h, w) {

  d3.select(graphID).select(".title")
    .text("Originations Growth by Quarter");

  var padding = 30;

  var svg3 = d3.select(graphID).select(".graph")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

  var dataset3 = []
  var numDataPoints = 50;
  var xRange = Math.random() * 1000;
  var yRange = Math.random() * 1000;

  for (var i=0; i < numDataPoints; i++) {
    var newNumX = Math.floor(Math.random() * xRange);
    var newNumY = Math.floor(Math.random() * yRange);
    dataset3.push([newNumX, newNumY]);
  }

  var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset3, function(d) { return d[0]; })])
    .range([padding, w-padding*2]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset3, function(d) { return d[1]; })])
    .range([h-padding, padding]);

  var rScale = d3.scaleLinear()
    .domain([0, d3.max(dataset3, function(d) { return d[1]; })])
    .range([2,5]);

  var aScale = d3.scaleSqrt()
    .domain([0, d3.max(dataset3, function(d) { return d[1]; })])
    .range([0, 5]);

  var formatAsFloat = d3.format(".1f");

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickValues([0, 100, 250, 500, 600])
    .tickFormat(formatAsFloat);

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(7);

  svg3.selectAll("line")
    .data(dataset3)
    .enter()
    .append("line")
    .attr("x1", function(d) { return xScale(d[0]); })
    .attr("x2", function(d) { return xScale(d[0]); })
    .attr("y1", h-padding)
    .attr("y2", function(d) { return yScale(d[1]); })
    .attr("stroke", "#ddd")
    .attr("stroke-width", 1);

  svg3.selectAll("circle")
    .data(dataset3)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(d[0]); })
    .attr("cy", function(d) { return yScale(d[1]); })
    .attr("r",  function(d) { return aScale(d[1]); });

  svg3.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-padding) + ")")
    .call(xAxis);

  svg3.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
}
