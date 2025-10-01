const packs = [
  { price:199, uc:1250 },
  { price:299, uc:4230 },
  { price:399, uc:6800 },
  { price:899, uc:35200 }
];

const uidInput = document.getElementById("uidInput");
const uidSubmit = document.getElementById("uidSubmit");
const playerNameElem = document.getElementById("playerName");
const packsSection = document.getElementById("packsSection");
const packsContainer = document.getElementById("packsContainer");

uidSubmit.addEventListener("click", () => {
  const uid = uidInput.value.trim();
  if(!uid) {
    playerNameElem.textContent = "❌ Enter UID";
    packsSection.classList.add("hidden");
    return;
  }
  // Simulated auto name (demo) — in real use, call backend
  playerNameElem.textContent = "Player: " + "User" + uid.slice(-4);
  packsSection.classList.remove("hidden");
  renderPacks();
});

function renderPacks(){
  packsContainer.innerHTML = "";
  for(const p of packs){
    const div = document.createElement("div");
    div.classList.add("pack");
    div.innerHTML = `
      <h3>${p.uc} UC</h3>
      <p>₹${p.price}</p>
      <button onclick="buyPack(${p.price}, ${p.uc})">Buy Now</button>
    `;
    packsContainer.appendChild(div);
  }
}

const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");
const qrArea = document.getElementById("qrArea");
const thankArea = document.getElementById("thankArea");
const timerElem = document.getElementById("timer");
let timerInterval;

function buyPack(price, uc){
  paymentModal.classList.remove("hidden");
  qrArea.classList.add("hidden");
  thankArea.classList.add("hidden");
}

closeModal.addEventListener("click", () => {
  paymentModal.classList.add("hidden");
  clearInterval(timerInterval);
});

document.querySelectorAll(".pay-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    qrArea.classList.remove("hidden");
    startTimer(5 * 60);
  });
});

function startTimer(duration){
  let time = duration;
  timerElem.textContent = formatTime(time);
  timerInterval = setInterval(()=>{
    time--;
    timerElem.textContent = formatTime(time);
    if(time <= 0){
      clearInterval(timerInterval);
      thankArea.classList.remove("hidden");
    }
  }, 1000);
}

function formatTime(sec){
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0'+s : s}`;
}
