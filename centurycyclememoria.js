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
  { text: "偶然のようでいて、なぜかずっと前から決まっていた気がした。", bg: "ccm_miku_dream.jpg", overlay: true },
  { text: "未来「転校生なんだよね？ どこから来たの？」", bg: "ccm_classroom_bg.jpg" },
  { text: "「……ああ、ちょっと遠くから」", bg: "ccm_classroom_bg.jpg" },
  { text: "未来「へえ！　なんだか楽しみだね。クラス替えもあったし、ちょうど新しいスタートだよ」", bg: "ccm_classroom_bg.jpg" },
  { text: "その言葉に、不安が少しだけ和らいだ。", bg: "ccm_classroom_bg.jpg" },
  { text: "窓の外、春風に舞う桜の花びらが、未来の笑顔を一層まぶしくしていた。", bg: "ccm_classroom_sakura.jpg" },
  { text: "未来「ねえ、もしよかったら──放課後、学校案内してあげる！」", bg: "ccm_classroom_sakura.jpg" },
  { text: "唐突な誘いに、胸の奥が熱くなる。", bg: "ccm_classroom_sakura.jpg" },
  { text: "まるで、ずっと前から待ち望んでいた約束のように。", bg: "ccm_dream_overlay.png", overlay: true }
];

let currentLine = 0;

function showLine() {
  let line = scenario[currentLine];
  let nextLine = scenario[currentLine + 1];
  let displayText = "";

  // group: true がある場合は2行まとめて表示
  if (line.group && nextLine) {
    displayText = formatText(line.text) + "\n" + formatText(nextLine.text);
    currentLine += 2; // 2行進める
    applyLineSettings(nextLine); // 演出は後ろの行を反映
  } else {
    displayText = formatText(line.text);
    currentLine += 1;
    applyLineSettings(line);
  }

  textElement.innerHTML = displayText.replace(/\n/g, "<br>");
}

// テキスト整形（キャラ名で色分けなど）
function formatText(text) {
  if (text.startsWith("未来")) {
    return text.replace(
      "未来",
      "<span style='color:#ff7fbf;font-weight:bold;'>未来</span>"
    );
  }
  return text;
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
