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
    const parseTime = d3.timeParse("%m/%Y");
    
    data.forEach(function(d) {
       d[0] = new Date(d[0]); 
    });
    
    console.log(data);
    
    d3.select(".title")
        .append("h2")
        .html(title);
     
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
            
    console.log(x);
              
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
    svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d[0]); })
     // .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return height - y(d[1]); });
    
    // add the x Axis
    let xAxis = d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%m/%Y"))
        .ticks(5);
    
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5));
}

function filterDates(date) {
    const year = date[0].split('-')[0];
    const month = date[0].split('-')[1];
    
    if ( year%10 === 0 && month === "01") {
        return year;
    } else {
        return '.';
    }
}