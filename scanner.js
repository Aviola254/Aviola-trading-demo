let digitList = [];

function startScanner(){

if(!ws){

ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);

ws.onopen = function(){

ws.send(JSON.stringify({
ticks: "R_100",
subscribe: 1
}));

};

ws.onmessage = function(msg){

let data = JSON.parse(msg.data);

if(data.msg_type === "tick"){

handleScan(data.tick.quote);

}

};

}else{

ws.send(JSON.stringify({
ticks: "R_100",
subscribe: 1
}));

}

}

function handleScan(price){

let digit = price.toString().slice(-1);

digitList.push(digit);

if(digitList.length > 50){
digitList.shift();
}

drawScanner();

}

function drawScanner(){

let box = document.getElementById("scanBox");

if(!box) return;

let count = {};

for(let i=0;i<=9;i++){
count[i]=0;
}

digitList.forEach(d=>{
count[d]++;
});

let text = "";

for(let i=0;i<=9;i++){
text += i + " : " + count[i] + "<br>";
}

box.innerHTML = text;

}
