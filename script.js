const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.interimResults = false;

function startListening() {
  recognition.start();
}

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  handleUserQuestion(text);
};

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
};

function sendText() {
  const text = document.getElementById("textInput").value;
  if (text.trim() !== "") {
    handleUserQuestion(text);
  }
}

async function handleUserQuestion(text) {
  document.getElementById("userText").innerText = text;

  const response = await fetch("http://localhost:3001/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();

  document.getElementById("aiText").innerText = data.reply;
  speak(data.reply);
}

function speak(text) {
  speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  msg.rate = 0.9;
  msg.pitch = 1.0;
  msg.volume = 1.0;

  speechSynthesis.speak(msg);
}

function sendText() {
  const input = document.getElementById("textInput");
  const text = input.value.trim();

  if (!text) return;

  handleUserQuestion(text);
  input.value = "";
}




