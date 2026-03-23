window.addEventListener("load", function(){
let loader = document.getElementById("loader");
if(loader){
loader.style.display = "none";
}
});

function showPage(page, element){
document.getElementById(page).classList.add("active");
if(page === "about"){
startCounters();
}
document.getElementById(page).classList.add("active");
if(page === "projects"){
loadProjects();
}
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

function startCounters(){
document.querySelectorAll(".counter").forEach(counter => {
let target = +counter.getAttribute("data-target");
let updateCount = () => {
let count = +counter.innerText;
let speed = target / 50;
if(count < target){
counter.innerText = Math.ceil(count + speed);
setTimeout(updateCount, 20);
}else{
counter.innerText = target+"+";
}
};
updateCount();
});
}

function loadProjects(){
fetch("projects.json")
.then(res => res.json())
.then(data => {
let container = document.getElementById("projectsContainer");
container.innerHTML = "";
data.forEach(project => {
container.innerHTML += `
<div class="project-card">
  <img src="${project.image}" alt="">
  <p>${project.title}</p>
</div>
`;
});
});
}

const roles = ["Backend Developer", "Web Developer"];
let i = 0, j = 0;
function type() {
  document.getElementById("typing").innerText = roles[i].substring(0, j++);
  if (j > roles[i].length) {
    j = 0;
    i = (i + 1) % roles.length;
  }
  setTimeout(type, 160);
}
type();
