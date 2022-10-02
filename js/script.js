google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
const TossLog = [["iter","rate"]];
const resLog = [];
const searchParam = new URLSearchParams(location.search)
const numToss = searchParam.get(`toss`) || `100`


const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function Toss() {
	return Math.floor(Math.random() * 2)
}

for (let i = 1; i < parseInt(numToss)+1; i++) {
	var res = Toss()
	resLog.push(res)
	var Hrate = countOccurrences(resLog, 1)/resLog.length;
	console.log(i,Hrate)
	TossLog.push([i,Hrate])
}
function drawChart() {
  var data = google.visualization.arrayToDataTable(TossLog);
  var options = {
    title: `${numToss} Coin Toss`,
    curveType: 'linear',
    width: 1300,
    height: 500,
    vAxis: { ticks: [0,0.5,1] },
    legend: {position: 'none'}
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options)
  const url = new URL(location)
  url.searchParams.set(`toss`, numToss)
  history.pushState({}, '', url)
}