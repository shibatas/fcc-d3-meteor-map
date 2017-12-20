// http://bl.ocks.org/tjdecke/5558084

/* global $ d3 */
const url='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
const svgWidth = $(window).width() > 1000 ? 700 : $(window).width()*0.8;  // width of plot area
const svgHeight = svgWidth*2/3;  //height of plot area
const legendLeft = ($(window).width() - svgWidth)/2 + svgWidth-200;

console.log($(window).width() > 1000 ? 700 : $(window).width()*0.8 );

$.get(url, function(result) {
    handleData(result);
}, 'json')
    .fail(function(){ alert('error') });

function handleData(data) {
  console.log(data);
    const title = "Monthly Global Land-Surface Temperature";
    const subtitle = "1753 - 2015";
    let AxisValX = [];
    let AxisValY = [];
    let val = [];
    data.monthlyVariance.forEach(function(item) {
        AxisValX.push(item.year);
        AxisValY.push(item.month);
        val.push(item.variance);
    });    

    console.log(AxisValX, AxisValY, val);

    let titleDiv = d3.select(".title");
    titleDiv.append("h3")
        .html(title);
    titleDiv.append("p")
        .html(subtitle);
     
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
              
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

    x.domain(d3.extent(AxisValX));
    y.domain(d3.extent(AxisValY));
    
    // heat map
    const colors = ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"];
    const colorScale = d3.scale.quantile()
    .domain(d3.extent(val))
    .range(colors);


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
      
    //tooltip
    let toolTip = d3.select(".contents").append("div").attr("class", "toolTip");
    
    dots.on("mousemove", function(d){
            toolTip.style("left", d3.event.pageX+10+"px");
            toolTip.style("top", d3.event.pageY-25+"px");
            toolTip.style("display", "inline-block");
            toolTip.html((d.Name)+"<br>"+d.Time);
        });
    dots.on("mouseout", function(d){
            toolTip.style("display", "none");
        });
}

const month = (numMonth) => {
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return months[numMonth-1];
}