var journeyPassRateGraph = function(graphID, h, w) {
  var dataset2 = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                   11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

  var sortAscending = false;
  var barPadding = 1;

  d3.select(graphID).select(".title")
    .text("Pass Rate by Experience");

  var svg2 = d3.select(graphID).select(".graph")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

  var xScale = d3.scaleBand()
    .domain(d3.range(dataset2.length))
    .rangeRound([0, w])

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset2)])
    .range([0, h]);

  svg2.selectAll("rect")
    .data(dataset2)
    .enter()
    .append("rect")
    .attr("x", function(d,i) { return xScale(i); })
    .attr("y", function(d) { return h-yScale(d); })
    .attr("width", w / dataset2.length - barPadding)
    .attr("height", function(d,i) { return yScale(d); })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + Math.round(d*10) + ")";
    })
    .on("click", function(d) {
      sortBars();
    })
    .on("mouseover", function(d) {
      d3.select(this)
        .attr("fill", "orange");
      var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
      var yPos = parseFloat(d3.select(this).attr("y")) + 14;

      svg2.append("text")
        .attr("id", "tooltip")
        .attr("x", xPos)
        .attr("y", yPos)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(d);
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .transition("restoreBarColors")
        .duration(250)
        .attr("fill", "rgb(0, 0, " + Math.round(d*10) + ")");

      d3.select("#tooltip")
        .remove();
    })
    .append("title")
    .text(function(d) { return d; });

  var sortBars = function() {
    svg2.selectAll("rect")
      .sort(function(a,b,) {
        if (!sortAscending) {
          return d3.ascending(a,b);
        } else {
          return d3.descending(a,b);
        }
      })
      .transition("SortBars")
      .delay(function(d,i) {
        return i*50;
      })
      .duration(1000)
      .attr("x", function(d,i) { return xScale(i); });

    // Flip the sort order
    sortAscending = !sortAscending;
  }
}
