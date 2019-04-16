
d3.json("data.json").then(function(dahta) {
  //console.log(data);
  data = data;
  
  var expensesCount = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return v.length; })
  .entries(data);
  console.log(expensesCount);


  var root = d3.hierarchy(data);
  var handleEvents = function( selection ) {
    selection.on('mouseover', function(d) {
      let g = d3.select(this);
      let n = g.select('.the-node');

      if(n.classed('solid')) {
        n.transition().duration(400)
        .style('opacity', "0.8" )
        .attr('r', 18)
        .attr();
      } else {
        n.transition().duration(400)
        .style('opacity', "0.8" )
        .attr();
      }
      
      g.select('.label')
        .transition().duration(700)
        .style('opacity', "0.5" )
        .style("font-size","13px")

      tooltip
      .style("visibility", "visible")
      .html("<embed width=100% height=100% src="+d.data.name+".html"+">");


      
    })
    .on('mouseout', function(d) {
      let g = d3.select(this);
      let n = g.select('.the-node');
   
      if(n.classed('solid')) {
        n.transition().duration(400)
        .style('opacity', "1" )
        .attr('r',14);
      }  else {
       n.transition().duration(400)
        .style('opacity', "1" )
      }
      g.select('.label')
        .transition().duration(700)
        .style('opacity', "1" )
        .style("font-size","12px")

     // tooltip2.style("visibility", "hidden")
    })

      .on('mousemove', function(d) {
      let g = d3.select(this);
      let n = g.select('.the-node');
        tooltip
      .style("top", (event.pageY-2390)+"px").style("left",(event.pageX-800)+"px");
    })

    .on('click', function(d) {
      let g = d3.select(this);
      let n = g.select('.the-node');
      window.open(d.data.link)


    })




    ;
  }      


  /* SUNBURST LAYOUT */



  var sunburstLayout = d3.partition();

  var radius = 100;
  sunburstLayout.size([2*Math.PI, radius]);
  // sunburstLayout.padding(2);

  var arc= d3.arc()
  .startAngle( function(d) { return d.x0 })
  .endAngle(   function(d) { return d.x1 })

  .innerRadius(function(d) { return d.y0 })
  .outerRadius(function(d) { return d.data.value > 5 ? radius +40 : d.y1 })

  root.sum(d  => d.value);

  sunburstLayout(root);

  var main = d3.select('#partition-sunburst g')

  var sunburstNodes = main.selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g').attr("class", "node")
      //.attr("xlink:href",  function(d) { return d.data.link + "/editor" })
      .call(handleEvents)
  var paths = sunburstNodes.append('path')
      .attr('d', arc)
      .classed('the-node', true)
      .style('fill', function(d) { return d.data.value < 5 ? d.data.color : "white"})
  //    .style('stroke', '#2f2f2f')



  var labels = sunburstNodes.append("text") 
      .attr('class', 'label')
      .style("text-anchor", function(d) { return d.data.align })
      .attr("transform", function(d) {
            return d.data.value < 5 ? "translate(" + arc.centroid(d) + ")":
            "translate(" + arc.centroid(d) + ") rotate(" + computeTextRotation(d) + ")"; })
      .attr("dx", "0")  
      .attr("dy", ".5em")
      .style('fill', function(d) { return d.data.value < 5 ? "white" : "#1B4F72"}) 
      .text(function(d) { return d.parent ? d.data.name : "" });

  var link = sunburstNodes.append("a") 
      .attr("xlink:href", function (d) { return "http://www.example.com/flare/" ; });

  // https://bl.ocks.org/denjn5/f059c1f78f9c39d922b1c208815d18af
  function computeTextRotation(d) {
      var angle = (d.x0 + d.x1) / Math.PI * 90; 
      return (angle < 180) ? angle - 90 : angle + 90;  
  }




  // create a tooltip
  var tooltip = d3.select("#div_customContent")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("width", 20)
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "10px")
      .style("padding", "10px");



});
