// tutorial url https://bost.ocks.org/mike/bar/
const url='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'

$.get(url, function(result) {
    handleData(result.data);
}, 'json')
    .fail(function(){ alert('error') });

function handleData(data) {
    const title = 'US GDP Over Time';

    console.log(title,data);
}