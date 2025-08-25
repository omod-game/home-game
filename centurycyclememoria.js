function startgame() {
  document.querySelector(".centurycyclememoria-title-screen").style.display = "none";
  document.getElementById("centurycyclememoria-game-container").style.display = "block";

  showtext("4月、新しい街に転入してきた。教室で席替えが始まる…");
  showchoices([
    { text: "未来の隣に座る", action: () => showtext("未来がこちらを見て微笑んだ…") },
    { text: "図書室へ行く", action: () => showtext("静が黙々と本を整理している…") },
    { text: "生徒会へ行く", action: () => showtext("玲奈が冷静に資料を仕分けている…") }
  ]);
}

function showtext(text) {
  document.getElementById("centurycyclememoria-game-text").innerText = text;
}

function showchoices(choices) {
  const container = document.getElementById("centurycyclememoria-game-choices");
  container.innerHTML = "";
  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = choice.action;
    container.appendChild(btn);
  });
}
function setBackground(newSrc) {
  if (bgImage.src.includes(newSrc)) return; // 同じ画像なら無視

  bgImage.style.opacity = 0; // フェードアウト開始
  setTimeout(() => {
    bgImage.src = newSrc;
    bgImage.onload = () => {
      bgImage.style.opacity = 1; // フェードイン
    };
  }, 500); // 0.5秒後に切り替え
}

function showLine() {
  const line = scenario[currentLine];
  textElement.textContent = line.text;
  if (line.bg) setBackground(line.bg);
  if (line.char) {
    charImage.style.display = "block";
    charImage.src = line.char;
  } else {
    charImage.style.display = "none";
  }
}
