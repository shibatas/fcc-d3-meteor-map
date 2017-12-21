// https://bl.ocks.org/mbostock/4062045

$(document).ready(function() {

/* global $ d3 */
const url='https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
const svgWidth = $(window).width() > 1000 ? 700 : $(window).width()*0.9;  // width of plot area
const svgHeight = svgWidth;  //height of plot area

const forceRatio = (1000-svgWidth)/5000;

console.log(svgWidth, forceRatio);

let svg = d3.select(".chart").append("svg")
    .attr("class", "chart-area")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let simulation = d3.forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(svgWidth/2, svgHeight/2))
    .force("y", d3.forceY().strength(forceRatio))
    .force("x", d3.forceX().strength(forceRatio));

$.get(url, function(result) {
    handleData(result);
}, 'json')
    .fail(function(){ alert('error') });

const handleData = (data) => {
    console.log(data);
    const title = "Countries Grouped by Contiguity";
    const subtitle = "";
    const ticked = () => {
        link.attr("x1", function(d) { return d.source.x })
            .attr("y1", function(d) { return d.source.y })
            .attr("x2", function(d) { return d.target.x })
            .attr("y2", function(d) { return d.target.y });
        node.attr("x", function(d) { return d.x-15; })
            .attr("y", function(d) { return d.y-15; });
    }

    let titleDiv = d3.select(".title");
    titleDiv.append("h3")
        .html(title);
    titleDiv.append("p")
        .html(subtitle);

    let link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter().append("line")
          .attr("stroke", "black")
          .attr("stroke-width", "1");
        
    let node = svg.append("g")
          .attr("class", "nodes")
        .selectAll("image")
        .data(data.nodes)
        .enter().append("image")
          .attr("width",30)
          .attr("height", 30)
          .attr("xlink:href", function(d){return "http://www.countryflags.io/"+d.code+"/flat/64.png"})
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
            
    simulation 
        .nodes(data.nodes)
        .on("tick", ticked);

    
    // The `links` array contains objects with a `source` and a `target`
    // property. The values of those properties are the indices in
    // the `nodes` array of the two endpoints of the link.
    simulation
        .force("link")
        .links(data.links);

    
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
    
}


const dragstarted = (d) => {
    if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
};

const dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
};

const dragended = (d) => {
    if (!d3.event.active) {
        simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
};


});
