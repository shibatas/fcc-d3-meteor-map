// https://bl.ocks.org/mbostock/4062045

$(document).ready(function() {

/* global $ d3 */
const url='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
const svgWidth = $(window).width()*0.9;  // width of plot area
const svgHeight = $(window).height()*0.75;  //height of plot area

const forceRatio = (1000-svgWidth)/5000;

console.log(svgWidth, forceRatio);

let svg = d3.select(".chart").append("svg")
    .attr("class", "chart-area")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
svg.append("image")
        .attr("width", 1920)
        .attr("height", 1629)
        .attr("xlink:href", "http://blogs.discovermagazine.com/d-brief/files/2016/11/Mercator_projection_SW.jpg")

$.get(url, function(result) {
    handleData(result);
}, 'json')
    .fail(function(){ alert('error') });

const handleData = (data) => {
    console.log(data);
    const title = "History of Meteor Landings";
    const subtitle = "";

    let titleDiv = d3.select(".title");
    titleDiv.append("h3")
        .html(title);
    titleDiv.append("p")
        .html(subtitle);
    
        /*
    //tooltip
    let toolTip = d3.select(".contents").append("div").attr("class", "toolTip");
    
    node.on("mousemove", function(d){
            toolTip.style("left", d3.event.pageX+10+"px");
            toolTip.style("top", d3.event.pageY-25+"px");
            toolTip.style("display", "inline-block");
            toolTip.html( d.country );
        });
    node.on("mouseout", function(d){
            toolTip.style("display", "none");
        });
    */
}

}); 
