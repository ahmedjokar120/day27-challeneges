const menuBtn=document.getElementById("menuBtn"),navMenu=document.getElementById("navMenu");
if(menuBtn) menuBtn.addEventListener("click",()=>navMenu.classList.toggle("open"));

document.querySelectorAll(".save").forEach(btn=>btn.addEventListener("click",()=>{btn.classList.toggle("saved");btn.textContent=btn.classList.contains("saved")?"♥":"♡"}));

const jobs=[
{title:"Senior Frontend Developer",company:"NovaTech",location:"Remote",category:"Technology",type:"Full Time",experience:"Senior",salary:3600},
{title:"UI/UX Designer",company:"PixelWorks",location:"Dubai",category:"Design",type:"Full Time",experience:"Mid Level",salary:2800},
{title:"Marketing Manager",company:"Marketly",location:"Nairobi",category:"Marketing",type:"Full Time",experience:"Senior",salary:2500},
{title:"Registered Nurse",company:"MediCare Group",location:"London",category:"Healthcare",type:"Full Time",experience:"Mid Level",salary:3200},
{title:"Financial Analyst",company:"Finova",location:"Singapore",category:"Finance",type:"Full Time",experience:"Mid Level",salary:3000},
{title:"Junior Web Developer",company:"BrightLabs",location:"Remote",category:"Technology",type:"Remote",experience:"Entry Level",salary:1900},
{title:"Graphic Designer",company:"CreativeHub",location:"Dubai",category:"Design",type:"Contract",experience:"Mid Level",salary:2200},
{title:"English Teacher",company:"LearnSpace",location:"Toronto",category:"Education",type:"Full Time",experience:"Entry Level",salary:2100}
];
function logoFor(c){let x=c[0], cls={NovaTech:"blue",PixelWorks:"purple",Marketly:"orange","MediCare Group":"green",Finova:"orange",BrightLabs:"blue",CreativeHub:"purple",LearnSpace:"blue"}[c]||"blue";return `<div class="company-logo ${cls}">${x}</div>`}
function renderJobs(list){
 const box=document.getElementById("jobResults"); if(!box)return;
 box.innerHTML=list.map(j=>`<article class="result-job">${logoFor(j.company)}<div><h3>${j.title}</h3><p>${j.company} · ${j.location}</p><div class="tags"><span>${j.type}</span><span>${j.experience}</span><span>${j.category}</span></div></div><div class="job-actions"><b>$${j.salary.toLocaleString()} / mo</b><a href="job-details.html">View Details →</a></div></article>`).join("");
 document.getElementById("resultCount").textContent=list.length;
 document.getElementById("noJobs").style.display=list.length?"none":"block";
}
function filterJobs(){
 const k=(document.getElementById("keyword")?.value||"").toLowerCase(),l=(document.getElementById("location")?.value||"").toLowerCase();
 const c=document.getElementById("category")?.value||"",t=document.getElementById("type")?.value||"",e=document.getElementById("experience")?.value||"",w=document.getElementById("workstyle")?.value||"";
 const out=jobs.filter(j=>(!k||`${j.title} ${j.company} ${j.category}`.toLowerCase().includes(k))&&(!l||j.location.toLowerCase().includes(l))&&(!c||j.category===c)&&(!t||j.type===t)&&(!e||j.experience===e)&&(!w||j.location==="Remote"=== (w==="Remote")));
 renderJobs(out);
}
if(document.getElementById("jobResults")){
 renderJobs(jobs);
 ["keyword","location","category","type","experience","workstyle"].forEach(id=>document.getElementById(id)?.addEventListener("input",filterJobs));
 document.getElementById("searchBtn")?.addEventListener("click",filterJobs);
 document.getElementById("clearBtn")?.addEventListener("click",()=>{["keyword","location","category","type","experience","workstyle"].forEach(id=>{let x=document.getElementById(id);if(x)x.value=""});renderJobs(jobs)});
 const params=new URLSearchParams(location.search);if(params.get("search"))document.getElementById("keyword").value=params.get("search");if(params.get("category"))document.getElementById("category").value=params.get("category");if(params.toString())filterJobs();
}
const homeSearch=document.getElementById("homeSearch");
if(homeSearch)homeSearch.addEventListener("submit",e=>{e.preventDefault();const k=document.getElementById("homeKeyword").value,l=document.getElementById("homeLocation").value;location.href=`jobs.html?search=${encodeURIComponent(k)}&location=${encodeURIComponent(l)}`});

const companySearch=document.getElementById("companySearch"),cards=[...document.querySelectorAll(".company-card")];
function filterCompanies(){if(!companySearch)return;const q=companySearch.value.toLowerCase();const active=document.querySelector(".pill.active")?.dataset.category||"";cards.forEach(c=>c.style.display=(!q||c.dataset.search.includes(q))&&(!active||c.dataset.category===active)?"block":"none")}
if(companySearch)companySearch.addEventListener("input",filterCompanies);
document.querySelectorAll(".pill").forEach(p=>p.addEventListener("click",()=>{document.querySelectorAll(".pill").forEach(x=>x.classList.remove("active"));p.classList.add("active");filterCompanies()}));

const applyBtn=document.getElementById("applyBtn"),application=document.getElementById("application");
if(applyBtn)applyBtn.addEventListener("click",()=>application?.scrollIntoView({behavior:"smooth"}));
const saveDetail=document.getElementById("saveDetail");
if(saveDetail)saveDetail.addEventListener("click",()=>{saveDetail.textContent=saveDetail.textContent.includes("Save")?"♥ Saved":"♡ Save Job"});
const form=document.getElementById("applyForm");
if(form)form.addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="✓ Application submitted successfully! The hiring team will review your application.";form.reset()});
