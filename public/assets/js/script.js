const PASSWORD = "meiga";

const messages = [
  {
    heart: "🤍🙏",
    text: "Deus vê cada lágrima sua e se importa profundamente com o que você está sentindo.",
  },
  { heart: "✨🤗", text: "Você tem uma forma única de deixar tudo mais leve" },
  {
    heart: "😊💕",
    text: "Quando seu coração estiver cansado, entregue tudo a Deus. Ele sabe exatamente como te aliviar.",
  },
  {
    heart: "✨👩‍👧",
    text: "Você tem uma luz própria que faz tudo ao seu redor brilhar.",
  },
  {
    heart: "💌💘",
    text: "Seu jeito doce marca a vida de quem tem a sorte de te conhecer.",
  },
  {
    heart: "🌸🥰",
    text: "Você faz diferença na vida das pessoas mais do que imagina.",
  },
  {
    heart: "💫😁",
    text: "Seu sorriso tem o poder de melhorar qualquer momento.",
  },
  {
    heart: "🌷🤗",
    text: "Você é uma daquelas pessoas raras que fazem bem só de existir.",
  },
  {
    heart: "💞😍",
    text: "Você tem um jeito único de cuidar das pessoas.",
  },
];

/* ── PETALS ── */
const particles = document.getElementById("particles");
for (let i = 0; i < 22; i++) {
  const p = document.createElement("div");
  p.className = "petal";
  p.style.cssText = `
      left:${Math.random() * 100}%;
      width:${6 + Math.random() * 7}px;
      height:${6 + Math.random() * 7}px;
      animation-duration:${5 + Math.random() * 9}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${0.3 + Math.random() * 0.4};
      background:hsl(${340 + Math.random() * 20},${60 + Math.random() * 20}%,${75 + Math.random() * 10}%);
    `;
  particles.appendChild(p);
}

/* ── SCREEN 1 LOGIC ── */
const heartReveal = document.getElementById("heartReveal");
const bigHeart = heartReveal.querySelector(".big-heart");
const hintText = document.getElementById("hintText");
const passwordBubble = document.getElementById("passwordBubble");
const revealedPass = document.getElementById("revealedPass");
const passInput = document.getElementById("passInput");
const passError = document.getElementById("passError");
const btnEnter = document.getElementById("btnEnter");

let revealed = false;
heartReveal.addEventListener("click", () => {
  if (!revealed) {
    bigHeart.textContent = "❤️";
    bigHeart.style.filter = "drop-shadow(0 8px 24px rgba(219,97,114,.55))";
    hintText.style.display = "none";
    passwordBubble.style.display = "";
    revealed = true;
  }
});

function tryEnter() {
  const val = passInput.value.trim().toLowerCase();
  if (val === PASSWORD.toLowerCase()) {
    goToScreen2();
  } else {
    passError.style.display = "";
    passInput.value = "";
    passInput.classList.add("shake");
    setTimeout(() => (passError.style.display = "none"), 2400);
  }
}
btnEnter.addEventListener("click", tryEnter);
passInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") tryEnter();
});

/* ── TRANSITION ── */
function goToScreen2() {
  const s1 = document.getElementById("screen1");
  const s2 = document.getElementById("screen2");
  s1.style.opacity = "0";
  s1.style.transform = "scale(.96)";
  setTimeout(() => {
    s1.classList.add("hidden");
    s2.classList.remove("hidden");
    spawnFloatingHearts();
  }, 900);
}

/* ── SCREEN 2 HEARTS ── */
const grid = document.getElementById("heartsGrid");
messages.forEach((m, i) => {
  const btn = document.createElement("button");
  btn.className = "heart-btn";
  btn.innerHTML = `<span class="hb-icon">${m.heart}</span><span class="hb-label">${i + 1}</span>`;
  btn.addEventListener("click", () => openCard(m));
  grid.appendChild(btn);
});

/* ── MODAL ── */
const overlay = document.getElementById("overlay");
const cardHeart = document.getElementById("cardHeart");
const cardMsg = document.getElementById("cardMsg");
const cardClose = document.getElementById("cardClose");

function openCard(m) {
  cardHeart.textContent = m.heart;
  cardMsg.textContent = m.text;
  overlay.classList.add("open");
}
cardClose.addEventListener("click", () => overlay.classList.remove("open"));
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.remove("open");
});

/* ── FLOATING BG HEARTS ── */
function spawnFloatingHearts() {
  const emojis = ["💕", "🌸", "✨", "💗", "🌷", "💖"];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("div");
    h.className = "float-heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.cssText = `
        left:${Math.random() * 100}%;
        font-size:${0.9 + Math.random() * 1.4}rem;
        animation-duration:${6 + Math.random() * 8}s;
        animation-delay:${Math.random() * 8}s;
      `;
    document.body.appendChild(h);
  }
}
