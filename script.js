const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const statusEl = document.getElementById("status");

sendBtn.onclick = sendMessage;
clearBtn.onclick = () => { chatEl.innerHTML = ""; };

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  renderMessage(text, 'user');
  inputEl.value = '';
  statusEl.textContent = 'Bot is typing…';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    renderMessage(data.reply, 'bot');
  } catch (err) {
    renderMessage("Error: Could not reach server.", 'bot');
    console.error(err);
  } finally {
    statusEl.textContent = 'Ready';
  }
}

function renderMessage(text, who) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${who}`;
  bubble.textContent = text;
  chatEl.appendChild(bubble);
  chatEl.scrollTop = chatEl.scrollHeight;
}
