function verifyUID() {
  const uid = document.getElementById("uidInput").value.trim();
  const playerName = document.getElementById("playerName");

  if(uid === "") {
    playerName.textContent = "❌ Please enter a UID";
    playerName.style.color = "red";
  } else {
    // हे फक्त demo आहे (कारण BGMI चं official API नाही)
    if(uid === "12345678") {
      playerName.textContent = "Player Name: Aditya_Sarkar";
      playerName.style.color = "#00ff88";
    } else {
      playerName.textContent = "❌ Invalid UID";
      playerName.style.color = "red";
    }
  }
}
