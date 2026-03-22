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
detectSignal();

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

function detectSignal(){

let signalBox = document.getElementById("signalBox");

if(!signalBox) return;

let last = digitList[digitList.length-1];

if(last == 0 || last == 1){
signalBox.innerHTML = "Signal: OVER";
}
else if(last == 8 || last == 9){
signalBox.innerHTML = "Signal: UNDER";
}
else if(last % 2 == 0){
signalBox.innerHTML = "Signal: EVEN";
}
else{
signalBox.innerHTML = "Signal: ODD";
}

  }
