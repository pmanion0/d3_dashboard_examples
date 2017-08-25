var nacoByVintageGraph = function(graphID, h, w) {

  d3.select(graphID).select(".title")
    .text("NACO by Horizontal Monthly Vintage");

  var padding = 30;

  var rowCoverter = function(d) {
    return {
      date: new Date(+d.year, (+d.month-1)),
      average: parseFloat(d.average)
    };
  }

  var dataset;

  d3.csv("d3_data/mauna_loa_co2_monthly_averages.csv", rowCoverter, function(data) {
    dataset = data;

    var xScale = d3.scaleTime()
      .domain([d3.min(data, function(d) { return d.date; }),
               d3.max(data, function(d) { return d.date; })])
      .range([padding, w]);

    var yScale = d3.scaleLinear()
      .domain([300, d3.max(data, function(d) { return d.average; })])
      .range([h-padding, 0]);

    var line = d3.line()
      .defined(function(d) { return d.average >= 0; })
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.average); });

    var area = d3.area()
      .defined(function(d) { return d.average >= 0; })
      .x(function(d) { return xScale(d.date); })
      .y0(function(d) { return yScale.range()[0]; })
      .y1(function(d) { return yScale(d.average); });

    var dangerArea = d3.area()
      .defined(function(d) { return d.average >= 350; })
      .x(function(d) { return xScale(d.date); })
      .y0(function(d) { return yScale(350); })
      .y1(function(d) { return yScale(d.average); });

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var svg = d3.select(graphID).select(".graph")
      .append("svg")
      .attr("height", h)
      .attr("width", w);

    svg.append("path")
      .datum(dataset)
      .attr("clip-path", "url(#danger-area)")
      .attr("class", "line")
      .attr("d", area);

    svg.append("clipPath")
      .attr("id", "danger-area")
      .append("rect")
      .attr("x", padding)
      .attr("y", yScale(350))
      .attr("width", w-padding)
      .attr("height", h-yScale(350));

    svg.append("path")
      .datum(dataset)
      .attr("class", "line danger")
      .attr("d", dangerArea);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (h-padding) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

    svg.append("line")
      .attr("class", "line safeLevel")
      .attr("x1", padding)
      .attr("x2", w)
      .attr("y1", yScale(350))
      .attr("y2", yScale(350));
  });
}
