const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let noseHairs = [];
let eyeOpen = true;
let gameOver = false;

// 鼻毛を抜く音
const pullSound = new Audio('hanagegame.mp3');

// 鼻毛生成（揺れなし）
function generateNoseHairs() {
    noseHairs = [];
    const numHairs = 20;
    for (let i = 0; i < numHairs; i++) {
        noseHairs.push({
            x: 180 + Math.random() * 40,
            y: 200 + Math.random() * 20,
            length: 15 + Math.random() * 20,
            pulled: false,
            pullProgress: 0,
            width: 1 + Math.random() * 0.5
        });
    }
}

// 描画
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 顔（丸くて可愛く）
    ctx.fillStyle = '#ffd0a0';
    ctx.beginPath();
    ctx.arc(200, 200, 80, 0, Math.PI*2);
    ctx.fill();

    // ほっぺ
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath();
    ctx.arc(160, 220, 15, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(240, 220, 15, 0, Math.PI*2);
    ctx.fill();

    // 目
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(170, 180, 12, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(230, 180, 12, 0, Math.PI*2);
    ctx.fill();

    // 瞳
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(170 + (eyeOpen ? 0 : 3), 180, 5, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(230 + (eyeOpen ? 0 : 3), 180, 5, 0, Math.PI*2);
    ctx.fill();

    // 鼻
    ctx.fillStyle = '#ffb380';
    ctx.beginPath();
    ctx.arc(200, 200, 12, 0, Math.PI*2);
    ctx.fill();

    // 鼻毛描画
    noseHairs.forEach(hair => {
        if (hair.pulled && hair.pullProgress >= 1) return;

        ctx.save();
        ctx.translate(hair.x, hair.y);

        // 抜くアニメーション
        let length = hair.length;
        if (hair.pulled && hair.pullProgress < 1) {
            hair.pullProgress += 0.08;
            length = hair.length * (1 - hair.pullProgress);
            hair.y += 1.5; // 下方向に移動
        }

        ctx.strokeStyle = `rgb(${100 + Math.random()*50}, 50, 0)`;
        ctx.lineWidth = hair.width * (1 - hair.pullProgress);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, length); // 下向き
        ctx.stroke();
        ctx.restore();
    });

    requestAnimationFrame(draw);
}

// 鼻毛クリック判定
canvas.addEventListener('click', (e) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    noseHairs.forEach(hair => {
        if (!hair.pulled) {
            const hx = hair.x;
            const hy = hair.y;
            if (mx > hx - 5 && mx < hx + 5 && my > hy && my < hy + hair.length) {
                hair.pulled = true;
                pullSound.currentTime = 0;
                pullSound.play();
                score++;
                document.getElementById('score').textContent = `スコア: ${score}`;

                if (!eyeOpen && !gameOver) {
                    gameOver = true;
                    setTimeout(() => {
                        alert('おじさんにバレた！ゲームオーバー');
                        score = 0;
                        generateNoseHairs();
                        document.getElementById('score').textContent = `スコア: ${score}`;
                        gameOver = false;
                    }, 100);
                }
            }
        }
    });
});

// 目パチパチ
setInterval(() => {
    eyeOpen = !eyeOpen;
}, 1500);

generateNoseHairs();
draw();
