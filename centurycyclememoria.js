const startButton = document.getElementById("centurycyclememoria-start-button");
const startScreen = document.getElementById("centurycyclememoria-start-screen");
const gameScreen = document.getElementById("centurycyclememoria-game-screen");
const textElement = document.getElementById("centurycyclememoria-text");
const bgImage = document.getElementById("centurycyclememoria-bg-image");
const charImage = document.getElementById("centurycyclememoria-char-image");
const overlay = document.getElementById("centurycyclememoria-overlay");
const subtitle = document.querySelector(".centurycyclememoria-subtitle");

// タイトル画面の演出
window.addEventListener("load", () => {
  // サブタイトルをフェードイン
  setTimeout(() => {
    subtitle.style.opacity = 1;
  }, 500);

  // サブタイトル表示後にボタンを出す
  setTimeout(() => {
    startButton.style.display = "block";
  }, 4000);
});

// シナリオ（未来との出会い）
const scenario = [
  { text: "──四月、転校初日の朝。", bg: "ccm_classroom_bg.jpg", group: true },
  { text: "教室に入ると、ざわめきと新しい匂いが押し寄せてきた。", bg: "ccm_classroom_bg.jpg" },
  { text: "「……ここが、俺の新しい日常か」", bg: "ccm_classroom_bg.jpg" },
  { text: "緊張で胸が重い。それでも、期待に似たざわつきがどこか奥にある。", bg: "ccm_classroom_bg.jpg", group: true },
  { text: "黒板には『席替え』と書かれていた。", bg: "ccm_classroom_bg.jpg" },
  { text: "残った席は──桜井未来の隣だった。", bg: "ccm_classroom_bg.jpg" },
  { text: "未来が振り返り、ぱっと咲くように笑った。", bg: "ccm_miku_smile.jpg" },
  { text: "未来「よろしくね！」", bg: "ccm_miku_smile.jpg" },
  { text: "偶然のようでいて、なぜかずっと前から決まっていた気がした。", bg: "ccm_miku_dream.jpg", overlay: true }
];

let currentLine = 0;

function showLine() {
  let line = scenario[currentLine];
  let nextLine = scenario[currentLine + 1];

  // group: true がある場合は、次の行と一緒に表示
  if (line.group && nextLine) {
    textElement.textContent = line.text + "\n" + nextLine.text;
    currentLine += 2; // 2行進める
    applyLineSettings(nextLine); // 演出は後ろの行の設定を反映
  } else {
    textElement.textContent = line.text;
    currentLine += 1; // 1行進める
    applyLineSettings(line);
  }
}

function applyLineSettings(line) {
  if (line.bg) bgImage.src = line.bg;
  if (line.char) {
    charImage.style.display = "block";
    charImage.src = line.char;
  } else {
    charImage.style.display = "none";
  }
  overlay.style.opacity = line.overlay ? 1 : 0;
}

gameScreen.addEventListener("click", () => {
  if (currentLine < scenario.length) {
    showLine();
  } else {
    textElement.textContent = "（次のシナリオへ…）";
  }
});

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  currentLine = 0;
  showLine();
});
