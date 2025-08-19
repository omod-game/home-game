<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>爆発飲みゲーム</title>
  <style>
    body {
      font-family: sans-serif;
      text-align: center;
      background-color: #fdf6e3;
      padding: 50px;
    }
    #button {
      font-size: 2em;
      padding: 20px 40px;
      margin: 20px;
      cursor: pointer;
    }
    #result {
      font-size: 1.5em;
      margin-top: 30px;
    }
    .boom {
      color: red;
      font-size: 2em;
      font-weight: bold;
      animation: shake 0.3s infinite;
    }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
    /* ゲーム説明ボタン */
    #explainBtn {
      margin-top: 40px;
      font-size: 1.2em;
      color: #0066cc;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
    }

    /* ポップアップのスタイル */
    #popupOverlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    #popupContent {
      background-color: white;
      padding: 20px 30px;
      border-radius: 8px;
      max-width: 400px;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      text-align: left;
      font-size: 1em;
      line-height: 1.4em;
      position: relative;
    }
    #popupClose {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 1.2em;
      border: none;
      background: none;
      cursor: pointer;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>爆発飲みゲーム</h1>
  <p>1/10の確率で爆発！爆発した人は飲んでください🍻</p>
  <button id="button">押す！</button>
  <div id="result"></div>

  <!-- ゲーム説明ボタン -->
  <button id="explainBtn">ゲーム説明</button>

  <!-- ポップアップ -->
  <div id="popupOverlay">
    <div id="popupContent">
      <button id="popupClose" aria-label="閉じる">&times;</button>
      <h2>ゲーム説明</h2>
      <p>
        このゲームは、画面の「押す！」ボタンを押すと1/10の確率で爆発します。<br />
        爆発した人は飲み物を飲んでください！<br />
        爆発しなければセーフです。みんなで順番に楽しんでくださいね。<br />
        飲みすぎにはご注意を！楽しい飲み会をお過ごしください🍻
      </p>
    </div>
  </div>

  <script>
    const button = document.getElementById("button");
    const result = document.getElementById("result");
    const explainBtn = document.getElementById("explainBtn");
    const popupOverlay = document.getElementById("popupOverlay");
    const popupClose = document.getElementById("popupClose");

    button.addEventListener("click", () => {
      const random = Math.floor(Math.random() * 10);
      if (random === 0) {
        result.innerHTML = "💥 爆発！あなたが飲んでください 🍶";
        result.className = "boom";
        button.disabled = true;
        setTimeout(() => {
          button.disabled = false;
          result.innerHTML = "";
          result.className = "";
        }, 3000);
      } else {
        result.innerHTML = "😌 セーフ！次の人へ…";
        result.className = "";
      }
    });

    explainBtn.addEventListener("click", () => {
      popupOverlay.style.display = "flex";
    });

    popupClose.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });

    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.style.display = "none";
      }
    });
  </script>
</body>
</html>
