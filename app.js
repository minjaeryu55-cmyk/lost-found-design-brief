const DEFAULT_ITEMS = [
  {title:"Dog walking exchange", student:"Manveer"},
  {title:"Community kitchen", student:"Maya"},
  {title:"Lost & found", student:"Jaemin Ryu"}
];

const BRIEFS = [
  "Lost & found",
  "Dog walking exchange",
  "Community kitchen",
  "Study room sharing",
  "Campus repair board",
  "Borrow a charger",
  "Quiet space finder",
  "Textbook exchange"
];

const list = document.querySelector("#drawnList");
const nameInput = document.querySelector("#studentName");
const status = document.querySelector("#status");

function getItems(){
  try{
    const saved = JSON.parse(localStorage.getItem("lostFoundBriefs"));
    return Array.isArray(saved) ? saved : DEFAULT_ITEMS;
  }catch{
    return DEFAULT_ITEMS;
  }
}

function saveItems(items){
  localStorage.setItem("lostFoundBriefs", JSON.stringify(items));
}

function safe(text){
  return String(text).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

function render(items){
  list.innerHTML = "";
  if(!items.length){
    list.innerHTML = '<div class="empty">Nothing drawn yet.</div>';
    return;
  }
  items.forEach(item=>{
    const row = document.createElement("article");
    row.className = "item";
    row.innerHTML = `<div class="brief-name">${safe(item.title)}</div>
                     <div class="student">${safe(item.student)}</div>`;
    list.appendChild(row);
  });
}

document.querySelector("#drawBtn").addEventListener("click", ()=>{
  const student = nameInput.value.trim();
  if(!student){
    status.textContent = "Enter your name first.";
    nameInput.focus();
    return;
  }
  const items = getItems();
  const title = BRIEFS[Math.floor(Math.random()*BRIEFS.length)];
  items.unshift({title,student});
  saveItems(items);
  render(items);
  status.textContent = `Brief drawn: ${title}`;
  nameInput.value = "";
});

nameInput.addEventListener("keydown", e=>{
  if(e.key === "Enter") document.querySelector("#drawBtn").click();
});

document.querySelector("#resetBtn").addEventListener("click", ()=>{
  localStorage.removeItem("lostFoundBriefs");
  render([]);
  status.textContent = "List reset.";
});

render(getItems());
