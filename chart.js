let ticks = [];

function startTicks(symbol){

if(!ws) return;

ws.send(JSON.stringify({
ticks: symbol,
subscribe: 1
}));

ws.onmessage = function(msg){

let data = JSON.parse(msg.data);

if(data.msg_type === "tick"){

ticks.push(data.tick.quote);

if(ticks.length > 50){
ticks.shift();
}

drawChart();

}

};

}

function drawChart(){

let chart = document.getElementById("chartBox");

if(!chart) return;

chart.innerHTML = ticks.join("<br>");

}
