const express = require("express");
const WebSocket = require("ws");

const app = express();

app.use(express.json());



/* ===== USERS ===== */

let users = [

{ username:"admin", password:"1234" }

];



let sessions = {};



/* ===== DERIV TOKEN ===== */

 "2MyyvNOIshKa67H";



/* ===== LOGIN ===== */

app.post("/login", (req,res)=>{

let {username,password} =
req.body;

let user = users.find(

u =>
u.username===username &&
u.password===password

);

if(!user){

return res.json({
success:false
});

}

let token =
Math.random()
.toString(36)
.substring(2);

sessions[token] =
username;

res.json({

success:true,
token:token

});

});



/* ===== BALANCE PROXY ===== */

app.get("/balance", (req,res)=>{

const ws =
new WebSocket(

"wss://ws.derivws.com/websockets/v3?app_id=1089"

);

ws.on("open", ()=>{

ws.send(JSON.stringify({

authorize: DERIV_TOKEN

}));

});

ws.on("message",(msg)=>{

let data =
JSON.parse(msg);

if(
data.msg_type==="authorize"
){

ws.send(JSON.stringify({

balance:1

}));

}

if(
data.msg_type==="balance"
){

res.json(
data.balance
);

ws.close();

}

});

});



/* ===== ROOT ===== */

app.get("/",(req,res)=>{

res.send(
"Server running"
);

});



app.listen(3000,()=>{

console.log(
"Server started"
);

});
