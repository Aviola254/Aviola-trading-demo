let ws;

let token = "";

let totalProfit =
Number(localStorage.getItem("profit")) || 0;



function connectAPI(t){

token = t;

ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);

ws.onopen = function(){

ws.send(JSON.stringify({
authorize: token
}));

};


ws.onmessage = function(msg){

let data = JSON.parse(msg.data);



if(data.msg_type === "authorize"){

logHistory("Authorized");

ws.send(JSON.stringify({
balance: 1
}));

}



if(data.msg_type === "balance"){

document.getElementById(
"balance"
).innerHTML =
"Balance: " + data.balance.balance;

}



if(data.msg_type === "buy"){

document.getElementById(
"result"
).innerHTML =
"Trade sent";

logHistory("Trade");

}



};



}



function buyContract(type){

if(!ws) return;

ws.send(JSON.stringify({

buy:1,

price:1,

parameters:{

amount:1,

basis:"stake",

contract_type:type,

currency:"USD",

duration:1,

duration_unit:"t",

symbol:"R_100"

}

}));

}



function updateProfit(p){

totalProfit += p;

localStorage.setItem(
"profit",
totalProfit
);

let box =
document.getElementById("profit");

if(box){

box.innerHTML =
"Profit: " + totalProfit;

}

}



function logHistory(text){

let h =
document.getElementById("history");

if(!h) return;

h.innerHTML +=
"<br>" + text;

}
