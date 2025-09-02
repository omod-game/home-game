document.addEventListener("DOMContentLoaded", () => {
  const gameScreen = document.getElementById("centurycyclememoria-game-screen");
  const bgImage = document.getElementById("centurycyclememoria-bg-image");
  const charImage = document.getElementById("centurycyclememoria-char-image");
  const overlay = document.getElementById("centurycyclememoria-overlay");
  const textBoxWrapper = document.getElementById("centurycyclememoria-textbox-wrapper");
  const textBox = document.getElementById("centurycyclememoria-text");
  const nameBox = document.getElementById("centurycyclememoria-name");

  const choiceOverlay = document.getElementById("choice-overlay");
  const choiceText = document.getElementById("choice-text");
  const choiceButtons = document.getElementById("choice-buttons");

  let currentLine = 0;
  let waitingChoice = false;

  const affection = { miku: 0, shizuka: 0, rena: 0 };

  // -------------------------
  // シナリオ（短縮例）
  const scenario = [
    { text: "──闇の中、ただひとつの光が浮かんでいた。", bg: "bg_black.jpg" },
    { text: "月明かりに照らされ、桜の花びらが静かに舞う。", bg: "bg_night_sakura.jpg" },
    { text: "その夜に交わされた約束は、百年の輪を越えて──再び巡る。", bg: "bg_night_sakura.jpg", overlay: true },

    { text: "──そして、四月。", bg: "bg_classroom_morning.jpg" },
    { speaker: "桜井 未来", text: "よろしくね！", bg: "bg_classroom_morning.jpg", char: "char_miku_smile.png" },

    // 選択肢
    { 
      choice: true,
      text: "未来の案内をどうする？",
      options: [
        { text: "未来と一緒に学校を見て回る", next: "library_intro", affection: { miku: 1 }, bg: "bg_library_inside.jpg" },
        { text: "一人で校内を歩いてみたい", next: "self_walk", bg: "bg_school_corridor_noon.jpg" }
      ]
    },

    { id: "library_intro", text: "未来に連れられて、静かな図書室へと足を踏み入れる。", bg: "bg_library_inside.jpg" },
    { id: "self_walk", text: "一人で校内を歩いてみることにした。", bg: "bg_school_corridor_noon.jpg" }
  ];

  // -------------------------
  function showLine() {
    const line = scenario[currentLine];
    if (!line) return;

    if (line.choice) {
      waitingChoice = true;
      displayChoice(line);
      return;
    }
    waitingChoice = false;

    // 背景切替
    if (line.bg) bgImage.src = line.bg;

    // キャラ切替
    if (line.char) {
      charImage.src = line.char;
      charImage.style.display = "block";
    } else {
      charImage.style.display = "none";
    }

    // オーバーレイ
    overlay.style.opacity = line.overlay ? 1 : 0;

    // 名前とセリフ
    if (line.speaker) {
      nameBox.textContent = line.speaker;
      nameBox.style.display = "inline-block";
      textBox.textContent = `「${line.text}」`;
    } else {
      nameBox.style.display = "none";
      textBox.textContent = line.text;
    }

    // affection
    if (line.affection) {
      for (const key in line.affection) affection[key] += line.affection[key];
    }
  }

  // -------------------------
  function displayChoice(line) {
    choiceOverlay.style.display = "flex";
    choiceText.textContent = line.text;
    choiceButtons.innerHTML = "";

    line.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;

      // hoverで背景切替
      btn.addEventListener("mouseenter", () => {
        if (opt.bg) bgImage.src = opt.bg;
      });

      btn.addEventListener("click", () => {
        if (opt.affection) {
          for (const key in opt.affection) affection[key] += opt.affection[key];
        }
        if (opt.next) {
          currentLine = scenario.findIndex(l => l.id === opt.next);
        } else {
          currentLine++;
        }
        choiceOverlay.style.display = "none";
        showLine();
      });

      choiceButtons.appendChild(btn);
    });
  }

  // -------------------------
  gameScreen.addEventListener("click", () => {
    if (waitingChoice) return;
    currentLine++;
    if (currentLine < scenario.length) showLine();
  });

  showLine();
});
