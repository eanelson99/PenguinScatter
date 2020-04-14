


var header = d3.select("#penguintable")
    .selectAll("th")
    .data(["Penguin", "Mean Quiz Grade", "Mean Homework Grade", "Mean Test Grade", "Grade on Final","Overall Grade"])
    .enter()
    .append("th")
    .text (function(d){return d})
   




var svg = d3.select("id")
    .attr("width", width)