function showPage(name){

document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"))

document.getElementById(name)
.classList.add("active")

}
