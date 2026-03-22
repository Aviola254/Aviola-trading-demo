let sessionToken = "";



async function loginUser(){

let u =
document.getElementById(
"user"
).value;

let p =
document.getElementById(
"pass"
).value;



let r = await fetch(

"https://YOURSERVER.onrender.com/login",

{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

username:u,
password:p

})

}

);



let data = await r.json();



if(data.success){

sessionToken = data.token;

document.getElementById(
"loginStatus"
).innerHTML =
"Logged in";


/* connect API after login */

connectAPI(data.token);

}

else{

document.getElementById(
"loginStatus"
).innerHTML =
"Wrong login";

}

  }
