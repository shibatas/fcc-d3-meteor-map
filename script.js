// tutorial url https://bost.ocks.org/mike/bar/2/
// another tutorial url https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4

/* global $ d3 */
const url='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
const chartHeight=0.5; //as percentage of viewport height
const chartWidth=0.8; //as percentage of viewport width


$.get(url, function(result) {
    handleData(result.data);
}, 'json')
    .fail(function(){ alert('error') });

function handleData(data) {
    const title = 'US GDP Over Time';
    const subtitle = 'in Billions of US Dollars';
    
    data.forEach(function(d) {
       d[0] = new Date(d[0]); 
    });
    
    let titleDiv = d3.select(".title");
    titleDiv.append("h3")
        .html(title);
    titleDiv.append("p")
        .html(subtitle);
     
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    
    x.domain(d3.extent(data, function(d) { return d[0]; }));
    y.domain([0, d3.max(data, function(d) { return d[1]; })]);
              
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
    
    // append the rectangles for the bar chart
    let bar = svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return  x(d[0]); })
      .attr("width", width/data.length-0.5)
      .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return height - y(d[1]); })
    
    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    
    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5));
      
    //tooltip
    let toolTip = d3.select(".contents").append("div").attr("class", "toolTip");
    
    bar.on("mousemove", function(d){
            const monthArr = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
            let date = monthArr[d[0].getMonth()] + '-' + (1900+d[0].getYear());
            toolTip.style("left", d3.event.pageX+10+"px");
            toolTip.style("top", d3.event.pageY-25+"px");
            toolTip.style("display", "inline-block");
            toolTip.html((date)+"<br>$"+(d[1])+"B");
        });
    bar.on("mouseout", function(d){
            toolTip.style("display", "none");
        });

}