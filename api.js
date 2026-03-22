let ws;
let token = "";

function connectAPI(userToken){

token = userToken;

ws = new WebSocket(
"wss://ws.derivws.com/websockets/v3?app_id=1089"
);

ws.onopen = function(){

if(token !== ""){

ws.send(JSON.stringify({
authorize: token
}));

}

};

ws.onmessage = function(msg){

let data = JSON.parse(msg.data);

console.log(data);

if(data.msg_type === "tick"){
handleTick(data);
}

};

}
