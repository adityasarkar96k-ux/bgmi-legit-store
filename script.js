document.getElementById("uidSubmit").addEventListener("click", () => {
  const uid = document.getElementById("uidInput").value.trim();
  if(uid) {
    document.getElementById("packs-section").classList.remove("hidden");
  } else {
    alert("Please enter a valid UID!");
  }
});

// Packs
const packs = [
  {price:199, uc:1250},
  {price:299, uc:4230},
  {price:399, uc:6800},
  {price:899, uc:35200}
];

const packsContainer = document.getElementById("packsContainer");

packs.forEach(pack => {
  const card = document.createElement("div");
  card.classList.add("pack");
  card.innerHTML = `
    <h3>${pack.uc} UC</h3>
    <p>₹${pack.price}</p>
    <button onclick="buyPack(${pack.price}, ${pack.uc})">Buy Now</button>
  `;
  packsContainer.appendChild(card);
});

let timerInterval;

function buyPack(price, uc){
  document.getElementById("paymentModal").classList.remove("hidden");
  startTimer(5 * 60);
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("paymentModal").classList.add("hidden");
  clearInterval(timerInterval);
};

function startTimer(duration) {
  let time = duration;
  const display = document.getElementById("timer");
  const thankyouMsg = document.getElementById("thankyouMsg");
  thankyouMsg.classList.add("hidden");

  timerInterval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
    if (--time < 0) {
      clearInterval(timerInterval);
      thankyouMsg.classList.remove("hidden");
    }
  }, 1000);
}
