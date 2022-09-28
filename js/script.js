google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
const flipLog = [["iter","rate"]];
const resLog = [];
const numFlip = searchParam.get(`flip`) || `100`

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function Flip() {
	return (Math.floor(Math.random() * 2) == 0) ? 1 : 0;
}

for (let i = 1; i < parseInt(numFlip)+1; i++) {
	var res = Flip()
	resLog.push(res)
	var Hrate = countOccurrences(resLog, 1)/resLog.length;
	console.log(i,Hrate)
	flipLog.push([i,Hrate])
}
function drawChart() {
  var data = google.visualization.arrayToDataTable(flipLog);
  var options = {
    title: `${numFlip} Coin Flip`,
    curveType: 'linear',
    width: 1300,
    height: 500,
    vAxis: { ticks: [0,0.5,1] },
    legend: {position: 'none'}
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}