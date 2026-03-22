let ticks = [];

function startTicks(symbol){

if(!ws){

ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);

ws.onopen = function(){

ws.send(JSON.stringify({
ticks: symbol,
subscribe: 1
}));

};

ws.onmessage = function(msg){

let data = JSON.parse(msg.data);

if(data.msg_type === "tick"){

ticks.push(data.tick.quote);

if(ticks.length > 20){
ticks.shift();
}

drawChart();

}

};

}else{

ws.send(JSON.stringify({
ticks: symbol,
subscribe: 1
}));

}

}

function drawChart(){

let chart = document.getElementById("chartBox");

if(!chart) return;

chart.innerHTML = ticks.join("<br>");

}
