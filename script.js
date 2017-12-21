// http://bl.ocks.org/almccon/fe445f1d6b177fd0946800a48aa59c71

$(document).ready(function() {

/* global $ d3 */
const url='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
const svgWidth = $(window).width()*0.9;  // width of plot area
const svgHeight = $(window).height()*0.75;  //height of plot area
const title = "History of Meteor Landings";
const subtitle = "";

let titleDiv = d3.select(".title");
titleDiv.append("h3")
        .html(title);
titleDiv.append("p")
        .html(subtitle);
    
const projection = d3.geoMercator()
    .scale(svgWidth/3)
    .translate([svgWidth, svgHeight]);
const path = d3.geoPath().projection(projection);;

let svg = d3.select(".chart").append("svg")
    .attr("class", "chart-area")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    

const mapUrl = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson"

d3.json(mapUrl, function(error, geojson) {
    if (error) throw error;
    let map = svg.append("path")
        .attr("d", path(geojson));

    function zoomed() {
            map.attr("transform", d3.event.transform);
          }
        
    const zoom = d3.zoom()
        .scaleExtent([.4, 40])
        .translateExtent([[-100, -100], [svgWidth + 1200, svgHeight + 500]])
        .on("zoom", zoomed);
    
    svg.call(zoom);

    
    });
        

$.get(url, function(result) {
    handleData(result);
}, 'json')
    .fail(function(){ alert('error') });

const handleData = (data) => {
    console.log(data);
    
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



