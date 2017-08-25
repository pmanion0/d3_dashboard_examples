var appsPerMinuteGraph = function(graphID, h, w) {

  d3.select(graphID).select(".title")
    .text("Applications per Minute");

  var svg2 = d3.select(graphID).select(".graph")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var dataset2 = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                   11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  var xScale = d3.scaleBand()
    .domain(d3.range(dataset2.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset2)])
    .range([0, h]);

  svg2.selectAll("rect")
    .data(dataset2)
    .enter()
    .append("rect")
    .attr("x", function(d,i) { return xScale(i); })
    .attr("y", function(d) { return h - yScale(d); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return yScale(d); })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + Math.round(d*10) + ")";
    });

  svg2.selectAll("text")
    .data(dataset2)
    .enter()
    .append("text")
    .text(function(d) { return d; })
    .attr("x", function(d,i) { return xScale(i) + 0.5 * xScale.bandwidth(); })
    .attr("y", function(d) { return h - yScale(d) + 14; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");

  var dataNew;

  d3.select(graphID).select(".graph")
    .on("click", function() {
      dataNew = []
      for (var i=0; i < 20; i++) {
        var newNum = dataset2[i] + Math.floor(Math.random() * 15) - 5;
        if (newNum > 50 || newNum < 0) {
          newNum = 7;
        }
        dataNew.push(newNum);
      }
      dataNew[0] = 2;

      var transitionType = d3.easeCubicInOut;

      yScale.domain([0, d3.max(dataNew)]);

      svg2.selectAll("rect")
        .data(dataNew)
        .transition()
        .duration(500)
        .delay(function(d,i) { return i*10; })
        .ease(transitionType)
        .attr("y", function(d) { return h - yScale(d); })
        .attr("height", function(d) { return yScale(d); })
        .attr("fill", function(d) {
          return "rgb(0, 0, " + Math.round(d*10) + ")";
        });

      svg2.selectAll("text")
        .data(dataNew)
        .transition()
        .delay(function(d,i) { return i*10; })
        .duration(500)
        .ease(transitionType)
        .text(function(d) { return d; })
        .attr("x", function(d,i) { return xScale(i) + 0.5 * xScale.bandwidth(); })
        .attr("y", function(d) { return h - yScale(d) + 14; });
    })

    d3.select("#bar_text2")
      .on("click", function() {
        var newNum = Math.floor(Math.random() * 50);
        dataNew.push(newNum);

        xScale.domain(d3.range(dataNew.length));
        yScale.domain([0, d3.max(dataNew)]);

        var bars = svg2.selectAll("rect")
          .data(dataNew);

        bars.enter()
          .append("rect")
          .attr("x", w) // Store bar JUST out of sight
          .attr("y", function(d) { return h - yScale(d); })
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) { return yScale(d); })
          .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d*10) + ")";
          })
          .merge(bars)
          .transition()
          .duration(500)
          .attr("x", function(d,i) { return xScale(i); })
          .attr("y", function(d) { return h - yScale(d); })
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) { return yScale(d); });

        var texts = svg2.selectAll("text")
          .data(dataNew);

        texts.enter()
          .append("text")
          .text(function(d) { return d; })
          .attr("x", w)
          .attr("y", function(d) { return h - yScale(d) + 14; })
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .merge(texts)
          .transition()
          .duration(500)
          .attr("x", function(d,i) { return xScale(i) + 0.5 * xScale.bandwidth(); })
          .attr("y", function(d) { return h - yScale(d) + 14; });
      })

    d3.select("#bar_text3")
      .on("click", function() {
        dataNew.shift();

        var bars = svg2.selectAll("rect")
          .data(dataNew);

        bars.exit()
          .transition()
          .duration(500)
          .attr("x", w)
          .remove();
      })
}
