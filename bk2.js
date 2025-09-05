document.addEventListener("DOMContentLoaded", () => {
  const gameScreen = document.getElementById("centurycyclememoria-game-screen");
  const bgImage = document.getElementById("centurycyclememoria-bg-image");
  const charImage = document.getElementById("centurycyclememoria-char-image");
  const textBox = document.getElementById("centurycyclememoria-text");
  const overlay = document.getElementById("centurycyclememoria-overlay");
  const nameBox = document.getElementById("centurycyclememoria-name");
  const choiceContainer = document.getElementById("choice-container");
  const textboxWrapper = document.getElementById("centurycyclememoria-textbox-wrapper");

  const menuButton = document.getElementById("menu-button");
  const menuPanel = document.getElementById("menu-panel");
  const saveButton = document.getElementById("save-button");
  const loadButton = document.getElementById("load-button");
  const logButton = document.getElementById("log-button");
  const menuHome = document.getElementById("menu-home");
  const menuClose = document.getElementById("menu-close");

  const logOverlay = document.getElementById("log-overlay");
  const logClose = document.getElementById("log-close");
  const logContent = document.getElementById("log-content");

  let currentLine = 0;
  let waitingChoice = false;   // 選択肢処理中かどうか
  let wasChoiceVisible = false; // ログを閉じた後に選択肢を復元するため

  const affection = { miku: 0, shizuka: 0, rena: 0 };
  const logHistory = [];

  
  const scenario = [
    { text: "──闇の中、ただひとつの光が浮かんでいた。", bg: "bg_black.jpg" },
    { text: "月明かりに照らされ、桜の花びらが静かに舞う。", bg: "bg_night_sakura.jpg" },
    { text: "その夜に交わされた約束は、百年の輪を越えて──再び巡る。", bg: "bg_night_sakura.jpg", overlay: true },

    { text: "──そして、四月。", bg: "bg_classroom_morning.jpg" },
    { text: "「……ここが、俺の新しい日常か」", bg: "bg_classroom_morning.jpg" },
    { text: "緊張で胸が重い。それでも、期待に似たざわつきがどこか奥にある。", bg: "bg_classroom_morning.jpg" },
    { text: "黒板には『席替え』と書かれていた。", bg: "bg_classroom_morning.jpg" },
    { text: "残った席は──桜井 未来の隣だった。", bg: "bg_classroom_morning.jpg" },
    { speaker: "桜井 未来", text: "よろしくね！", bg: "bg_classroom_morning.jpg", char: "char_miku_smile.png" },
    { text: "偶然のようでいて、なぜかずっと前から決まっていた気がした。", bg: "bg_classroom_morning.jpg", char: "char_miku_dream.png", overlay: true },
    { speaker: "桜井 未来", text: "転校生なんだよね？ どこから来たの？", bg: "bg_classroom_morning.jpg", char: "char_miku_smile.png" },
    { text: "……ああ、ちょっと遠くから。", bg: "bg_classroom_morning.jpg" },
    { speaker: "桜井 未来", text: "へえ！　なんだか楽しみだね。クラス替えもあったし、ちょうど新しいスタートだよ", bg: "bg_classroom_morning.jpg", char: "char_miku_smile.png" },
    { text: "その言葉に、不安が少しだけ和らいだ。", bg: "bg_classroom_morning.jpg" },
    { text: "窓の外、春風に舞う桜の花びらが、未来の笑顔を一層まぶしくしていた。", bg: "bg_classroom_sakura.jpg" },
    { speaker: "桜井 未来", text: "ねえ、もしよかったら──放課後、学校案内してあげる！", bg: "bg_classroom_sakura.jpg", char: "char_miku_smile.png" },
    { text: "唐突な誘いに、胸の奥が熱くなる。", bg: "bg_classroom_sakura.jpg" },
    { text: "まるで、ずっと前から待ち望んでいた約束のように。", bg: "bg_dream_overlay.jpg", overlay: true },

    { 
      choice: true,
      text: "未来の案内をどうする？",
      options: [
        { text: "未来と一緒に学校を見て回る", next: "library_intro", affection: { miku: 1 } },
        { text: "一人で校内を歩いてみたい", next: "self_walk" }
      ]
    },

    // 未来ルート
    { id: "library_intro", text: "未来に連れられて、静かな図書室へと足を踏み入れる。", bg: "bg_library_inside.jpg" },
    { text: "本の匂いと、窓から差す夕陽の柔らかな光。時間が止まったような空気だった。", bg: "bg_library_inside.jpg" },
    { speaker: "桜井 未来", text: "ここには、よく静がいるんだよ", bg: "bg_library_inside.jpg", char: "char_miku_smile.png" },
    { speaker: "桜井 未来", text: "本に夢中になってて、声をかけても気づかないことがあるくらい", bg: "bg_library_inside.jpg", char: "char_miku_smile.png" },
    { text: "……静かに本をめくる姿が、容易に想像できた。", bg: "bg_library_inside.jpg" },

    // 自分で歩くルート
    { id: "self_walk", text: "一人で校内を歩いてみることにした。", bg: "bg_school_corridor_noon.jpg" },
    { text: "静かな廊下を歩いていると、ふと開いたドアの奥で、本を読んでいる少女の姿が目に入る。", bg: "bg_library_inside.jpg" },
    { text: "──おそらく、未来が言っていた『静』だろう。", bg: "bg_library_inside.jpg" },
    { speaker: "？？？", text: "……あ、えっと……転校生……？", bg: "bg_library_inside.jpg", char: "char_shizuka_shy.png" },
    { text: "お互いにぎこちない挨拶を交わした。", bg: "bg_library_inside.jpg" },

    // 共通で次のキャラに繋がる
    { text: "図書室を後にし、やがて生徒会室の前に立つ。", bg: "bg_council_door.jpg" },
    { speaker: "桜井 未来", text: "ここは玲奈がよくいるところ。生徒会長なんだ", bg: "bg_council_door.jpg", char: "char_miku_smile.png" },
    { text: "扉の奥からは、誰かが書類をめくる音がかすかに聞こえた。", bg: "bg_council_door.jpg" },
    { speaker: "桜井 未来", text: "真面目でしっかりしてるけど……ちょっと厳しいところもあるかな", bg: "bg_council_door.jpg", char: "char_miku_smile.png" },

    { text: "案内はひと通り終わり、気づけば夕暮れ時になっていた。", bg: "bg_school_corridor_evening.jpg" },
    { speaker: "桜井 未来", text: "最後に……特別な場所、見せてあげる！", bg: "bg_school_corridor_evening.jpg" },
    { text: "未来に手を引かれ、階段を上る。", bg: "bg_school_stairs_evening.jpg" },
    { text: "扉を開けた先に広がっていたのは──", bg: "bg_rooftop_evening.jpg" },
    { text: "茜色の空と、遠くに見える街並み。", bg: "bg_rooftop_evening.jpg" },
    { speaker: "桜井 未来", text: "ここ、私のお気に入りなんだ。嫌なことがあっても……ここに来ると落ち着くの", bg: "bg_rooftop_evening.jpg" },
    { text: "未来の横顔は、夕陽に照らされて金色に輝いていた。", bg: "bg_rooftop_evening.jpg", overlay: true },
    { text: "風が吹き抜け、桜の花びらが舞い込む。", bg: "bg_rooftop_evening.jpg" },
    { speaker: "桜井 未来", text: "ねえ……また、ここに来てくれる？", bg: "bg_rooftop_evening.jpg" },
    { text: "その問いに、自然と頷いていた。", bg: "bg_rooftop_evening.jpg" },

    { 
      choice: true,
      text: "放課後、どうする？",
      options: [
        { text: "未来と一緒に帰る", next: "miku_root", bg: "bg_school_gate_evening.jpg", affection: { miku: 1 } },
        { text: "図書室に寄る", next: "shizuka_root", bg: "bg_library_inside_evening.jpg", affection: { shizuka: 1 } },
        { text: "生徒会室に寄る", next: "rena_root", bg: "bg_council_inside_evening.jpg", affection: { rena: 1 } },
        { text: "一人で帰る", next: "solo_root", bg: "bg_street_evening.jpg" }
      ]
    },

    // 未来ルート
    { id: "miku_root", text: "校門を出ると、未来が少し照れたようにこちらを見た。", bg: "bg_school_gate_evening.jpg", char: "char_miku_smile.png" },
    { speaker: "桜井 未来", text: "ねえ……一緒に帰ってもいい？", bg: "bg_school_gate_evening.jpg", char: "char_miku_blush.png" },
    { text: "不思議と自然に『うん』と答えていた。", bg: "bg_street_evening.jpg" },
    { text: "並んで歩く道は、さっきよりもずっと近く感じられた。", bg: "bg_street_evening.jpg", overlay: true },

    // 静ルート
    { id: "shizuka_root", text: "未来と別れ、図書室に足を運んだ。", bg: "bg_library_inside_evening.jpg" },
    { text: "夕陽に照らされる窓辺で、一人の少女が静かに本を読んでいた。", bg: "bg_library_inside_evening.jpg" },
    { speaker: "？？？", text: "……転校生？", bg: "bg_library_inside_evening.jpg", char: "char_shizuka_shy.png" },
    { text: "本を閉じ、はにかむように微笑む彼女の姿に、不思議と落ち着きを感じた。", bg: "bg_library_inside_evening.jpg" },

    // 玲奈ルート
    { id: "rena_root", text: "生徒会室の扉をノックすると、中から凛とした声が返ってきた。", bg: "bg_council_inside_evening.jpg" },
    { speaker: "？？？", text: "入っていいわよ。……転校生ね？", bg: "bg_council_inside_evening.jpg", char: "char_rena_cool.png" },
    { text: "整然と並ぶ書類と、机に座る少女の姿。", bg: "bg_council_inside_evening.jpg" },
    { speaker: "玲奈", text: "私は生徒会長の一ノ瀬玲奈。困ったことがあれば言いなさい。ただし、甘えは許さないわよ", bg: "bg_council_inside_evening.jpg", char: "char_rena_serious.png" }
  ];

 // ----------------- 状態管理用の変数 -----------------
let waitingChoice = false;   // 選択肢処理中かどうか
let wasChoiceVisible = false; // ログを閉じた後に選択肢を復元するため
 // ----------------- showLine -----------------
function showLine() {
  const line = scenario[currentLine];
  if (!line) return;

  // 選択肢判定
  if (line.choice) {
    waitingChoice = true;
    displayChoice(line);
    textboxWrapper.style.display = "none";
    wasChoiceVisible = true; // 選択肢表示中を記録
    return;
  } else {
    waitingChoice = false;
    choiceContainer.style.display = "none";
    textboxWrapper.style.display = "block";
    wasChoiceVisible = false; // テキスト表示中を記録
  }

  // 背景・キャラクター・オーバーレイ
  if (line.bg) bgImage.src = line.bg;
  if (line.char) {
    charImage.src = line.char;
    charImage.style.display = "block";
  } else {
    charImage.style.display = "none";
  }
  overlay.style.opacity = line.overlay ? 1 : 0;

  // スピーカー・テキスト
  if (line.speaker) {
    nameBox.style.display = "inline-block";
    nameBox.textContent = line.speaker;
    textBox.textContent = `「${line.text}」`;
  } else {
    nameBox.style.display = "none";
    textBox.textContent = line.text;
  }

  // ※ログ追加はここでは行わない
  // （次へボタンや選択肢決定時に追加する）
}

// ----------------- 次へボタン -----------------
//nextButton.addEventListener("click", () => {
  // 今表示中のセリフをログに追加
  //const line = scenario[currentLine];
  //if (line && !line.choice) {
    //logHistory.push({ speaker: line.speaker || null, text: line.text });
  //}

  //currentLine++;
  //showLine();
//});

// ----------------- displayChoice -----------------
function displayChoice(line) {
  choiceContainer.innerHTML = "";
  choiceContainer.style.display = "flex";
  waitingChoice = line;

  // 質問文を表示
  const prompt = document.createElement("div");
  prompt.id = "choice-prompt";
  prompt.className = "choice-prompt";
  prompt.textContent = line.text;
  choiceContainer.appendChild(prompt);

  // 質問文をログに追加
  logHistory.push({ speaker: line.speaker || null, text: line.text });

  const choicesLog = [];

  line.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.className = "scenario-choice";

    btn.addEventListener("click", () => {
      // 好感度加算
      if (opt.affection) {
        for (const key in opt.affection) {
          affection[key] += opt.affection[key];
        }
      }
      // 次のシナリオへ
      if (opt.next) {
        const nextIndex = scenario.findIndex(l => l.id === opt.next);
        if (nextIndex >= 0) currentLine = nextIndex;
      } else {
        currentLine++;
      }

      waitingChoice = false;
      choiceContainer.innerHTML = "";

      // ログに選択肢を記録
      line.options.forEach(o => {
        choicesLog.push({ text: o.text, selected: o.text === opt.text });
      });
      logHistory.push({ choices: choicesLog });

      showLine();
    });

    choiceContainer.appendChild(btn);
  });

  textBox.textContent = "";
  nameBox.style.display = "none";
}

// ----------------- ログ表示 -----------------
logButton.addEventListener("click", () => {
  updateLog();
  logOverlay.style.display = "block";

  // 現在の状態を記録
  wasChoiceVisible = (choiceContainer.style.display === "flex");

  textboxWrapper.style.display = "none";
  choiceContainer.style.display = "none";
  menuPanel.classList.remove("show");
  menuButton.style.display = "none";
});

// ----------------- ログ閉じる -----------------
logClose.addEventListener("click", () => {
  logOverlay.style.display = "none";

  // メニューボタン復帰
  menuButton.style.display = "block";
  menuPanel.style.display = "flex";
  menuPanel.classList.remove("show");

  // 状態を復元
  if (wasChoiceVisible) {
    choiceContainer.style.display = "flex";   // 選択肢を復活
    textboxWrapper.style.display = "none";
  } else {
    choiceContainer.style.display = "none";
    textboxWrapper.style.display = "block";   // テキストボックスを復活
  }
});

// ----------------- ログ更新 -----------------
function updateLog() {
  logContent.innerHTML = "";
  logHistory.forEach(entry => {
    if (entry.text) {
      const div = document.createElement("div");
      div.className = "log-entry";
      div.textContent = entry.speaker ? `${entry.speaker}「${entry.text}」` : entry.text;
      logContent.appendChild(div);
    }

    if (entry.choices) {
      entry.choices.forEach(opt => {
        const c = document.createElement("div");
        c.className = "log-choice" + (opt.selected ? " log-selected" : "");
        c.textContent = opt.text;
        logContent.appendChild(c);
      });
    }
  });
}

  // ----------------- クリック進行 -----------------
gameScreen.addEventListener("click", (e) => {
  // メニューが開いている場合は無視
  if (menuPanel.classList.contains("show")) return;

  // ログ表示中は無視
  if (logOverlay.style.display === "block") return;

  // 選択肢表示中は無視
  if (waitingChoice) return;

  // メニュー関連クリックも無視
  if (e.target.closest("#menu-button, #menu-panel")) return;

  // 次の行を表示
  currentLine++;
  if (currentLine < scenario.length) showLine();
});

  // ----------------- セーブ・ロード -----------------
  function saveGame() {
    const saveData = { currentLine, affection, logHistory };
    localStorage.setItem("centurycyclememoria-save", JSON.stringify(saveData));
    alert("ゲームをセーブしました。");
  }

  function loadGame(showAlert = true) {
    const saveData = JSON.parse(localStorage.getItem("centurycyclememoria-save"));
    if (saveData) {
      currentLine = saveData.currentLine;
      Object.assign(affection, saveData.affection);
      logHistory.length = 0;
      logHistory.push(...saveData.logHistory);
      showLine();
      if (showAlert) alert("ゲームをロードしました。");
      return true;
    } else {
      if (showAlert) alert("セーブデータがありません。");
      return false;
    }
  }

  const shouldLoad = localStorage.getItem("loadOnStart") === "true";
  localStorage.removeItem("loadOnStart");
  if (shouldLoad) {
    const loaded = loadGame(false);
    if (!loaded) showLine();
  } else {
    showLine();
  }

  // ----------------- メニュー操作 -----------------
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menuPanel.classList.toggle("show");
    menuButton.classList.toggle("active", isOpen); // ← 黒背景付与
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false"); // アクセシビリティ対応
　});
  
  // パネルの「閉じる」ボタン
  menuClose.addEventListener("click", () => {
    menuPanel.classList.remove("show");
    menuButton.setAttribute("aria-expanded", "false");
  });
  
  // パネルの外側クリックで閉じる（任意）
  document.addEventListener("click", (e) => {
    if (!menuPanel.contains(e.target) && e.target !== menuButton) {
      menuPanel.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  
  // 既存のイベント
  saveButton.addEventListener("click", saveGame);
  loadButton.addEventListener("click", loadGame);

  // ----------------- ホームに戻る -----------------
  menuHome.addEventListener("click", () => {
    window.location.href = "index.html"; // ← ここでトップページへ遷移
  });

});
