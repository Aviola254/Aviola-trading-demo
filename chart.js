let prices = [];



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

handleTick(
data.tick.quote
);

}

};

}

}



function handleTick(p){

prices.push(p);

if(prices.length > 40){

prices.shift();

}

drawChart();

}



function drawChart(){

let box =
document.getElementById("chartBox");

if(!box) return;

let html = "";

prices.forEach(v => {

let h =
Math.floor(
(v % 10) * 20
);

html +=
"<div style='display:inline-block;width:6px;height:"
+ h +
"px;background:#00ff9c;margin:1px'></div>";

});

box.innerHTML = html;

}
