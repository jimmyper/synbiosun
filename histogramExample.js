// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

// Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);


// add the SVG element
var svg = d3.select('div').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("data.json", function(error, data) {
  //console.log(data);
  expenses = data;


console.log(expenses);
var names=[];
for (i in expenses["children"])
    for (j in expenses["children"][i]["children"])
         names.push(expenses["children"][i]["children"][j]) ;
    console.log(names);
      
   pubyear = d3.nest()
  .key(function(d) { return d.year; })
  .rollup(function(v) { return v.length; })
  .entries(names);
console.log(pubyear);
console.log("pubyear");

   pub = d3.nest()
  .key(function(d) { return d.year; })
  .entries(names);
  for (var item in pub.values){
    console.log(pub.values[i]['name']);
  }
console.log(pub[2004]);
console.log(pub);
console.log("pub");

  // scale the range of the data
  x.domain(pub.map(function(d) { return Number(d.key); }));
  y.domain([0, d3.max(pub, function(d) { return d.values.length; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");


  // Add bar chart
  svg.selectAll("bar")
      .data(pub)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(Number(d.key)); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.values.length); })
      .attr("height", function(d) { return height - y(d.values.length)})
        .on("mouseover", function(d) { 
      var nom = []
    for (var i = 0; i < d.values.length; i++){
      nom.push(d.values[i]["name"]+"<br>")
    }
    console.log(nom.join(" "))   
    console.log(d.values[0]["name"])

            div.transition()    
                .duration(200)    
                .style("opacity", .9);

            div .html(nom.join(" "))  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });




});




