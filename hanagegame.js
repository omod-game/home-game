const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let noseHairs = [];
let eyeOpen = true;

// 鼻毛を抜く音
const pullSound = new Audio('hanagegame.mp3');

// 鼻毛生成
function generateNoseHairs() {
    noseHairs = [];
    const numHairs = 15;
    for (let i = 0; i < numHairs; i++) {
        noseHairs.push({
            x: 180 + Math.random() * 40,
            y: 180 + Math.random() * 20,
            length: 20 + Math.random() * 15,
            angle: Math.random() * Math.PI/6 - Math.PI/12,
            swayDir: Math.random() > 0.5 ? 1 : -1,
            swaySpeed: 0.02 + Math.random() * 0.02,
            pulled: false,
            pullProgress: 0
        });
    }
}

// 描画
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 顔
    ctx.fillStyle = '#ffc080';
    ctx.beginPath();
    ctx.arc(200, 200, 80, 0, Math.PI*2);
    ctx.fill();

    // 目
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(170, 180, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(230, 180, 10, 0, Math.PI*2);
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
    ctx.arc(200, 200, 15, 0, Math.PI*2);
    ctx.fill();

    // 鼻毛描画
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 2;
    noseHairs.forEach(hair => {
        ctx.save();
        ctx.translate(hair.x, hair.y);

        if (!hair.pulled) {
            hair.angle += hair.swaySpeed * hair.swayDir;
            if (Math.abs(hair.angle) > Math.PI/6) hair.swayDir *= -1;
        }

        ctx.rotate(hair.angle);

        let length = hair.length;
        if (hair.pulled && hair.pullProgress < 1) {
            hair.pullProgress += 0.1;
            length = hair.length * (1 - hair.pullProgress);
        }

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.restore();
    });

    requestAnimationFrame(draw);
}

// 鼻毛クリック判定
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    noseHairs.forEach(hair => {
        if (!hair.pulled) {
            const hx = hair.x;
            const hy = hair.y;
            if (mx > hx - 5 && mx < hx + 5 && my > hy - hair.length && my < hy) {
                hair.pulled = true;
                pullSound.currentTime = 0;
                pullSound.play();
                score++;
                document.getElementById('score').textContent = `スコア: ${score}`;

                if (!eyeOpen) {
                    setTimeout(() => {
                        alert('おじさんにバレた！ゲームオーバー');
                        score = 0;
                        generateNoseHairs();
                        document.getElementById('score').textContent = `スコア: ${score}`;
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
