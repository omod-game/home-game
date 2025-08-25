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
  { text: "──四月、転校初日の朝。", bg: "ccm_classroom_bg.jpg", char: "" },
  { text: "教室に入ると、ざわめきと新しい匂いが押し寄せてきた。", bg: "ccm_classroom_bg.jpg", char: "" },
  { text: "「……ここが、俺の新しい日常か」", bg: "ccm_classroom_bg.jpg", char: "" },
  { text: "緊張で胸が重い。それでも、期待に似たざわつきがどこか奥にある。", bg: "ccm_classroom_bg.jpg", char: "" },
  { text: "黒板には『席替え』と書かれていた。", bg: "ccm_classroom_bg.jpg", char: "" },
  { text: "残った席は──桜井未来の隣だった。", bg: "ccm_classroom_bg.jpg", char: "" },
  { text: "未来が振り返り、ぱっと咲くように笑った。", bg: "ccm_miku_smile.jpg", char: "" },
  { text: "未来「よろしくね！」", bg: "ccm_miku_smile.jpg", char: "" },
  { text: "偶然のようでいて、なぜかずっと前から決まっていた気がした。", bg: "ccm_miku_dream.jpg", char: "" , overlay: true}
];

let currentLine = 0;

function showLine() {
  const line = scenario[currentLine];
  textElement.textContent = line.text;
  if (line.bg) bgImage.src = line.bg;
  if (line.char) {
    charImage.style.display = "block";
    charImage.src = line.char;
  } else {
    charImage.style.display = "none";
  }
  if (line.overlay) {
    overlay.style.opacity = 1;
  } else {
    overlay.style.opacity = 0;
  }
}

gameScreen.addEventListener("click", () => {
  if (currentLine < scenario.length - 1) {
    currentLine++;
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
