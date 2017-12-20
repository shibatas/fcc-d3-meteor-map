// http://bl.ocks.org/tjdecke/5558084

/* global $ d3 */
const url='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
const svgWidth = $(window).width() > 1000 ? 700 : $(window).width()*0.8;  // width of plot area
const svgHeight = svgWidth*2/3;  //height of plot area
const legendLeft = ($(window).width() - svgWidth)/2 + svgWidth-200;

const month = (numMonth) => {
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return months[numMonth-1];
};

const normalize = (val, max, min) => {
    return (val-min)/(max-min);
};

console.log($(window).width() > 1000 ? 700 : $(window).width()*0.8 );

$.get(url, function(result) {
    handleData(result);
}, 'json')
    .fail(function(){ alert('error') });

const handleData = (data) => {
  console.log(data);
    const title = "Monthly Global Land-Surface Temperature";
    const subtitle = "1753 - 2015";
    let AxisValX = [];
    let AxisValY = [0];
    let val = [];
    data.monthlyVariance.forEach(function(item) {
        AxisValX.push(item.year);
        AxisValY.push(item.month);
        val.push(item.variance);
    });    
    const max=d3.max(val), min=d3.min(val);

    console.log(AxisValX, AxisValY, val);

    let titleDiv = d3.select(".title");
    titleDiv.append("h3")
        .html(title);
    titleDiv.append("p")
        .html(subtitle);
     
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
    
    const gridWidth = width/(d3.max(AxisValX)-d3.min(AxisValX)),
    gridHeight = height/12;
    console.log(gridWidth,gridHeight);
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = d3.select(".chart").append("svg")
        .attr("class", "chart-area")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    x.domain(d3.extent(AxisValX));
    y.domain(d3.extent(AxisValY));
    
    // heat map
    let cells = svg.selectAll('rect')
        .data(data.monthlyVariance)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', gridWidth)
        .attr('height', gridHeight)
        .attr('y', function(d) { return y(d.month); })
        .attr('x', function(d) { return x(d.year); })
        .attr('fill', 'yellow');

    // add the x Axis
    const xAxis = d3.axisBottom(x)
            .ticks(10)
            .tickFormat(d3.format(.4));
            
    const yAxis = d3.axisLeft(y)
            .tickFormat(function(d) {
                return month(d)
            });
    
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
    // add the y Axis
    svg.append("g")
      .call(yAxis);
      
    const colorScale = d3.scaleSequential(d3.interpolateSpectral).domain([1, 0]);

    cells.transition().duration(1000)
              .style("fill", function(d) { return colorScale(normalize(d.variance,max,min)); });
      
    //tooltip
    let toolTip = d3.select(".contents").append("div").attr("class", "toolTip");
    
    cells.on("mousemove", function(d){
            toolTip.style("left", d3.event.pageX+10+"px");
            toolTip.style("top", d3.event.pageY-25+"px");
            toolTip.style("display", "inline-block");
            toolTip.html("variance: "+d.variance.toFixed(3)+"<br/>"+month(d.month)+"-"+d.year);
        });
    cells.on("mouseout", function(d){
            toolTip.style("display", "none");
        });
}
