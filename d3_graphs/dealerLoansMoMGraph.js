var dealerLoansMoMGraph = function(graphID, h, w) {

  d3.select(graphID).select(".title")
    .text("Dealer Loans Month over Month");

  var scatSvg = d3.select(graphID).select(".graph")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

  var padding = 30;

  var scatData = []
  var numDataPoints = 50;
  var xRange = Math.random() * 1000;
  var yRange = Math.random() * 1000;

  for (var i=0; i < numDataPoints; i++) {
    var newNumX = Math.floor(Math.random() * xRange);
    var newNumY = Math.floor(Math.random() * yRange);
    scatData.push([newNumX, newNumY]);
  }

  var xScatScale = d3.scaleLinear()
    .domain([0, d3.max(scatData, function(d) { return d[0]; })])
    .range([padding, w-padding*2]);

  var yScatScale = d3.scaleLinear()
    .domain([0, d3.max(scatData, function(d) { return d[1]; })])
    .range([h-padding, padding]);

  var xScatAxis = d3.axisBottom().scale(xScatScale);
  var yScatAxis = d3.axisLeft().scale(yScatScale);

  scatSvg.append("g")
    .attr("id", "circles")
    .attr("clip-path", "url(#chart-area)")
    .selectAll("circle")
    .data(scatData)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScatScale(d[0]); })
    .attr("cy", function(d) { return yScatScale(d[1]); })
    .attr("r",  3);

  scatSvg.append("clipPath")
    .attr("id", "chart-area")
    .append("rect")
    .attr("x", padding)
    .attr("y", padding)
    .attr("width", w-padding*3)
    .attr("height", h-padding*2);

  scatSvg.append("g")
    .attr("class", "x scat axis")
    .attr("transform", "translate(0," + (h-padding) + ")")
    .call(xScatAxis);

  scatSvg.append("g")
    .attr("class", "y scat axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yScatAxis);

  var newScatData;

  d3.select(graphID).select(".graph")
    .on("click", function() {
      newScatData = [];
      for (var i=0; i < numDataPoints; i++) {
        var newNumX = Math.floor(Math.random() * xRange);
        var newNumY = Math.floor(Math.random() * yRange);
        newScatData.push([newNumX, newNumY]);
      }

      xScatScale.domain([0, d3.max(newScatData, function(d) { return d[0]; })])
      yScatScale.domain([0, d3.max(newScatData, function(d) { return d[1]; })])

      scatSvg.selectAll("circle")
        .data(newScatData)
        .transition()
        .duration(1000)
        .on("start", function() {
          d3.select(this)
            .attr("fill", "magenta")
            .attr("r", 4);
        })
        .attr("cx", function(d) { return xScatScale(d[0]); })
        .attr("cy", function(d) { return yScatScale(d[1]); })
        .transition()
        .duration(1000)
        .attr("fill", "black")
        .attr("r", 2);

      scatSvg.select(".x.scat.axis")
        .transition()
        .duration(1000)
        .call(xScatAxis);

      scatSvg.select(".y.scat.axis")
        .transition()
        .duration(1000)
        .call(yScatAxis);
    })
}
