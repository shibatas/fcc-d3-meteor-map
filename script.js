// http://bl.ocks.org/almccon/fe445f1d6b177fd0946800a48aa59c71

$(document).ready(function() {

/* global $ d3 */
const meteorUrl='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
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
    .scale(svgWidth/6)
    .translate([svgWidth/2, svgHeight*.8]);
const path = d3.geoPath().projection(projection);

let svg = d3.select(".chart").append("svg")
    .attr("class", "chart-area")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

const mapUrl = "https://enjalot.github.io/wwsd/data/world/world-110m.geojson"

d3.json(mapUrl, function(error, geojson) {
    if (error) throw error;
    let map = svg.append("path")
        .attr("d", path(geojson))
        .attr("fill", "#ccc");

    d3.json(meteorUrl, function(error, result) {
        if (error) throw error;
        handleData(result, map);
    });
});
        
const handleData = (meteor, map) => {
    console.log(meteor);
    let dots = svg.selectAll("circle")
        .data(meteor.features)
        .enter().append("circle")
        .attr("cx", function(d) { if (d.geometry) return projection(d.geometry.coordinates)[0]; })
        .attr("cy", function(d) { if (d.geometry) return projection(d.geometry.coordinates)[1]; })
        .attr("r", function(d) { if (d.geometry) return d.properties.mass > 25000 ? Math.sqrt(d.properties.mass)*0.01 : 2; })
        .attr("fill", "red")
        .attr("fill-opacity", 0.6)
        .attr("stroke", "black")
        .attr("stroke-width", 0.3);

    function zoomed() {
            map.attr("transform", d3.event.transform);
            dots.attr("transform", d3.event.transform);
          }
        
    const zoom = d3.zoom()
        .scaleExtent([1, 40])
        .translateExtent([[0, 0], [svgWidth, svgHeight + 400]])
        .on("zoom", zoomed);
    
    svg.call(zoom);
        
    //tooltip
    let toolTip = d3.select(".contents").append("div").attr("class", "toolTip");
    
    dots.on("mousemove", function(d){
            toolTip.style("left", d3.event.pageX+10+"px");
            toolTip.style("top", d3.event.pageY-25+"px");
            toolTip.style("display", "inline-block");
            toolTip.html( "<em>"+d.properties.name+"</em><br/>"+d.properties.year.slice(0,4)+"<br/>Mass: "+ d.properties.mass);
        });
    dots.on("mouseout", function(d){
            toolTip.style("display", "none");
        });
    
}

});



