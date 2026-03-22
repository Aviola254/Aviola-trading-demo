let pages = [

"login",
"dashboard",
"trade",
"chart",
"scanner",
"bot",
"settings"

];


function showPage(p){

pages.forEach(id => {

let el = document.getElementById(id);

if(el){

el.style.display = "none";

}

});

let page = document.getElementById(p);

if(page){

page.style.display = "block";

}

}


/* start with login */

window.onload = function(){

showPage("login");

};
