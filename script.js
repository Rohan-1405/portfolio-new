window.addEventListener("load", function(){
let loader = document.getElementById("loader");
if(loader){
loader.style.display = "none";
}
});

function showPage(page, element){
let loader = document.getElementById("loader");
/* show loader */
loader.style.display = "flex";
setTimeout(function(){
/* hide all pages */
document.querySelectorAll(".page").forEach(function(p){
p.classList.remove("active");
});
/* show selected page */
document.getElementById(page).classList.add("active");
/* remove active menu */
document.querySelectorAll(".nav-item").forEach(function(i){
i.classList.remove("active");
});
/* activate clicked icon */
if(element){
element.classList.add("active");
}
/* hide loader */
loader.style.display = "none";
},600);
}

const words = [
"Web Developer",
"Backend Developer"
];

let i = 0;
let j = 0;
let current = "";
let deleting = false;

function type(){

current = words[i];

if(deleting){
j--;
}else{
j++;
}

let typing = document.getElementById("typing");

if(typing){
typing.textContent = current.substring(0,j);
}

/* word completed */

if(!deleting && j === current.length){

deleting = true;
setTimeout(type,1000);
return;

}

/* word deleted */

if(deleting && j === 0){

deleting = false;
i++;

if(i === words.length){
i = 0;
}

}

setTimeout(type,120);

}

type();