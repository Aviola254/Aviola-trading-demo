let ticks = [];

function startTicks(symbol){

if(!ws){

connectAPI("");

}

ws.send(JSON.stringify({
ticks: symbol,
subscribe: 1
}));

}

function handleTick(data){

ticks.push(data.tick.quote);

if(ticks.length > 30){
ticks.shift();
}

drawChart();

}

function drawChart(){

let chart = document.getElementById("chartBox");

if(!chart) return;

chart.innerHTML = ticks.join("<br>");

}
