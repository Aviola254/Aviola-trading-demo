let botRunning = false;

let bot2Running = false;

let strategy = "DIGITOVER";

let strategies = [
"DIGITOVER",
"DIGITUNDER",
"DIGITEVEN",
"DIGITODD",
"DIGITDIFF"
];

let strategyIndex = 0;

let tradeCount = 0;

let maxTrades = 10;

let delay = 5000;

let lossLimit = -10;



function setStrategy(s){

strategy = s;

document.getElementById(
"botType"
).innerHTML =
"Strategy: " + s;

}



function startBot(){

botRunning = true;

tradeCount = 0;

maxTrades =
document.getElementById("setMax").value;

delay =
document.getElementById("setDelay").value;

runBot();

}



function stopBot(){

botRunning = false;

}



function runBot(){

if(!botRunning) return;



if(tradeCount >= maxTrades){

logHistory("Limit stop");

stopBot();

return;

}



/* read signal */

let s =
document.getElementById("signalBox");

if(s){

let t = s.innerHTML;

if(t.includes("OVER")) strategy="DIGITOVER";
if(t.includes("UNDER")) strategy="DIGITUNDER";
if(t.includes("EVEN")) strategy="DIGITEVEN";
if(t.includes("ODD")) strategy="DIGITODD";
if(t.includes("DIFF")) strategy="DIGITDIFF";

}



/* rotate strategy */

strategy = strategies[
strategyIndex
];

strategyIndex++;

if(strategyIndex >= strategies.length){

strategyIndex = 0;

}



/* trade */

buyContract(strategy);

tradeCount++;

logHistory(
"Trade " + tradeCount
);



checkSafety();



setTimeout(
runBot,
delay
);

}



function checkSafety(){

if(totalProfit <= lossLimit){

logHistory(
"Safety stop"
);

stopBot();

}

}



/* SECOND BOT */

function startBot2(){

bot2Running = true;

runBot2();

}

function stopBot2(){

bot2Running = false;

}

function runBot2(){

if(!bot2Running) return;

buyContract("DIGITEVEN");

logHistory("Bot2 trade");

setTimeout(
runBot2,
delay
);

}
