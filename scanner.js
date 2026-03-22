let digitList = [];



function startScanner(){

if(!ws){

ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);

ws.onopen = function(){

ws.send(JSON.stringify({
ticks:"R_100",
subscribe:1
}));

};

ws.onmessage = function(msg){

let data = JSON.parse(msg.data);

if(data.msg_type === "tick"){

handleScan(
data.tick.quote
);

}

};

}

}



function handleScan(price){

let digit =
price.toString().slice(-1);

digitList.push(digit);

if(digitList.length > 30){

digitList.shift();

}

drawScanner();

detectSignal();

}



function drawScanner(){

let box =
document.getElementById("scanBox");

if(!box) return;

let count = {};

for(let i=0;i<=9;i++){

count[i] = 0;

}

digitList.forEach(d => {

count[d]++;

});

let text = "";

for(let i=0;i<=9;i++){

text +=
i + " : " +
count[i] +
"<br>";

}

box.innerHTML = text;

}



/* SIGNAL ENGINE */

function detectSignal(){

let box =
document.getElementById("signalBox");

if(!box) return;

let last =
digitList[
digitList.length-1
];

let prev =
digitList[
digitList.length-2
];

if(last == prev){

box.innerHTML =
"Signal: DIFF";

}

else if(last <= 1){

box.innerHTML =
"Signal: OVER";

}

else if(last >= 8){

box.innerHTML =
"Signal: UNDER";

}

else if(last % 2 == 0){

box.innerHTML =
"Signal: EVEN";

}

else{

box.innerHTML =
"Signal: ODD";

}

}
