// tutorial url https://bost.ocks.org/mike/bar/2/
const url='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
const chartHeight=0.5; //as percentage of viewport height
const chartWidth=0.8; //as percentage of viewport width


$.get(url, function(result) {
    handleData(result.data);
}, 'json')
    .fail(function(){ alert('error') });

function handleData(data) {
    const title = 'US GDP Over Time';
    let dates = [];
    let vals = [];
    
    d3.select(".title")
        .append("h2")
        .html(title);
    
    data.forEach(function(item){
        dates.push(item[0]);
        vals.push(Number(item[1]));
    });
    
    const colWidth=($(window).width()*chartWidth/data.length)+'px';
    const k=($(window).height()*chartHeight)/(Math.max(...vals));
    
    d3.select(".chart")
    .selectAll("div")
     .data(vals)
    .enter().append("div")
     .style("display", "inline-block")
     .style("height", function(d) { return d*k + "px"; })
     .style("width", function() {return colWidth;})
     .style("background-color", "blue");
}