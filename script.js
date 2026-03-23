window.addEventListener("load", function(){
let loader = document.getElementById("loader");
if(loader){
loader.style.display = "none";
}
});

function toggleDark(){
document.body.classList.toggle("dark");
let isDark = document.body.classList.contains("dark");
localStorage.setItem("darkMode", isDark);
}

window.addEventListener("DOMContentLoaded", function(){
let saved = localStorage.getItem("darkMode");
if(saved === "true"){
document.body.classList.add("dark");
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
if(window.innerWidth < 768){
document.querySelector(".sidebar").classList.remove("active");
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

let allProjects = [];
function loadProjects(){
fetch("projects.json")
.then(res => res.json())
.then(data => {
allProjects = data;
displayProjects(data);
});
}

function filterProjects(category){
if(category === "all"){
displayProjects(allProjects);
}else{
let filtered = allProjects.filter(p => p.category === category);
displayProjects(filtered);
}
}

document.addEventListener("input", function(e){
if(e.target.id === "searchInput"){
let value = e.target.value.toLowerCase();
let filtered = allProjects.filter(p =>
p.title.toLowerCase().includes(value)
);
displayProjects(filtered);
}
});

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

function trackDownload(){
let count = localStorage.getItem("downloads") || 0;
count++;
localStorage.setItem("downloads", count);
console.log("Resume downloaded:", count);
}

function showDownloads(){
let count = localStorage.getItem("downloads") || 0;
let el = document.getElementById("downloadCount");
if(el){
el.innerText = "Downloads: " + count;
}
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

let menuBtn = document.querySelector(".menu-btn");
let sidebar = document.querySelector(".sidebar");
menuBtn.onclick = () => {
sidebar.classList.toggle("active");
};

function updateVisits(){
let visits = localStorage.getItem("visits") || 0;
visits++;
localStorage.setItem("visits", visits);
let el = document.getElementById("visitCount");
if(el){
el.innerText = "Visitors: " + visits;
}
}

window.addEventListener("DOMContentLoaded", function(){
updateVisits();
});
function editAbout(){
let text = document.getElementById("aboutText").innerText;
document.getElementById("aboutInput").value = text;
document.getElementById("aboutText").style.display = "none";
document.getElementById("aboutInput").style.display = "block";
document.getElementById("saveBtn").style.display = "inline-block";
}

function saveAbout(){
let newText = document.getElementById("aboutInput").value;
localStorage.setItem("aboutText", newText);
document.getElementById("aboutText").innerText = newText;
document.getElementById("aboutText").style.display = "block";
document.getElementById("aboutInput").style.display = "none";
document.getElementById("saveBtn").style.display = "none";
}

window.addEventListener("DOMContentLoaded", function(){
let saved = localStorage.getItem("aboutText");
if(saved){
document.getElementById("aboutText").innerText = saved;
}
});

function addProject(){
let title = document.getElementById("pTitle").value;
let image = document.getElementById("pImage").value;
let projects = JSON.parse(localStorage.getItem("projects")) || [];
projects.push({title, image});
localStorage.setItem("projects", JSON.stringify(projects));
displayProjects(projects);
}

function loadProjects(){
let local = localStorage.getItem("projects");
if(local){
let data = JSON.parse(local);
displayProjects(data);
return;
}
fetch("projects.json")
.then(res => res.json())
.then(data => {
displayProjects(data);
});
}