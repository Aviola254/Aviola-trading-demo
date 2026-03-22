let ws;
let token = "";

function connectAPI(userToken){

token = userToken;

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

console.log(data);

};

}
