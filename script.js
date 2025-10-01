// packs
const packs = [
  {id:1, price:199, uc:1250, tag:'Starter'},
  {id:2, price:299, uc:4230, tag:'Value'},
  {id:3, price:399, uc:6800, tag:'Best'},
  {id:4, price:899, uc:35200, tag:'Mega'}
];

const uidInput = document.getElementById('uidInput');
const uidSubmit = document.getElementById('uidSubmit');
const uidMessage = document.getElementById('uidMessage');
const packsSection = document.getElementById('packsSection');
const packsContainer = document.getElementById('packsContainer');

uidSubmit.addEventListener('click', () => {
  const uid = uidInput.value.trim();
  if(!/^[0-9]{6,12}$/.test(uid)){ // simple numeric length check
    uidMessage.textContent = '❌ Invalid UID — enter numeric UID';
    packsSection.classList.add('hidden');
    return;
  }
  // Demo auto name — in real use call backend validate API
  uidMessage.textContent = 'Player: User' + uid.slice(-4);
  packsSection.classList.remove('hidden');
  renderPacks();
});

function renderPacks(){
  packsContainer.innerHTML = '';
  packs.forEach(p=>{
    const el = document.createElement('div'); el.className = 'pack';
    el.innerHTML = `<div class="uc">${p.uc} UC</div><div class="price">₹${p.price}</div><div class="small">${p.tag}</div><button class="buy-btn" data-id="${p.id}">Buy Now</button>`;
    packsContainer.appendChild(el);
  });
}

// Modal & payment logic
const modal = document.getElementById('paymentModal');
const closeModal = document.getElementById('closeModal');
const payBtns = document.querySelectorAll('.pay-btn');
const qrArea = document.getElementById('qrArea');
const qrImage = document.getElementById('qrImage');
const countdown = document.getElementById('countdown');
const paidActions = document.getElementById('paidActions');
const paidBtn = document.getElementById('paidBtn');
const cancelBtn = document.getElementById('cancelBtn');
const thankArea = document.getElementById('thankArea');
const orderIdEl = document.getElementById('orderId');

let countdownTimer = null;
let selectedPack = null;

document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.buy-btn');
  if(!btn) return;
  const id = Number(btn.dataset.id);
  selectedPack = packs.find(x=>x.id===id);
  document.getElementById('modalTitle').textContent = `Pay ₹${selectedPack.price} for ${selectedPack.uc} UC`;
  showModal();
});

function showModal(){
  modal.classList.remove('hidden');
  qrArea.classList.add('hidden');
  paidActions.classList.add('hidden');
  thankArea.classList.add('hidden');
  // set a placeholder qr (replace file in repo)
  qrImage.src = 'assets/qr.png';
}

closeModal.addEventListener('click', ()=>{ modal.classList.add('hidden'); stopTimer(); });

document.querySelectorAll('.pay-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    qrArea.classList.remove('hidden');
    paidActions.classList.remove('hidden');
    startTimer(5*60);
  });
});

function startTimer(secs){
  stopTimer();
  let rem = secs;
  updateClock(rem);
  countdownTimer = setInterval(()=>{
    rem--; if(rem<=0){ stopTimer(); showThank(); } else updateClock(rem);
  },1000);
}
function updateClock(rem){
  const m = Math.floor(rem/60), s = rem%60;
  countdown.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function stopTimer(){ if(countdownTimer) clearInterval(countdownTimer); countdownTimer = null; }

paidBtn.addEventListener('click', ()=>{ stopTimer(); showThank(); });
cancelBtn.addEventListener('click', ()=>{ modal.classList.add('hidden'); stopTimer(); });

function showThank(){
  qrArea.classList.add('hidden'); paidActions.classList.add('hidden');
  thankArea.classList.remove('hidden');
  const id = 'ORD' + Date.now().toString().slice(-6);
  orderIdEl.textContent = id + (selectedPack?(' • '+selectedPack.uc+' UC'):'');
}
