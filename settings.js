let botSymbol = "R_100";



function saveSettings(){

maxTrades =
document.getElementById(
"setMax"
).value;

delay =
document.getElementById(
"setDelay"
).value;

botSymbol =
document.getElementById(
"setSymbol"
).value;



localStorage.setItem(
"maxTrades",
maxTrades
);

localStorage.setItem(
"delay",
delay
);

localStorage.setItem(
"symbol",
botSymbol
);



logHistory(
"Settings saved"
);

}



function loadSettings(){

maxTrades =
localStorage.getItem(
"maxTrades"
) || 10;

delay =
localStorage.getItem(
"delay"
) || 5000;

botSymbol =
localStorage.getItem(
"symbol"
) || "R_100";

}



loadSettings();
