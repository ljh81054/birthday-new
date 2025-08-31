

(function () {
    console.log('index.js 开始加载...');

    // ====== 星空效果 ======
    function initStarField() {
        const canvas = document.getElementById('stars');
        if (!canvas) return console.log('未找到stars画布');

        const ctx = canvas.getContext('2d');
        let stars = [];

        function buildStars() {
            const area = window.innerWidth * window.innerHeight;
            const count = Math.min(260, Math.max(80, Math.floor(area / 9000)));
            stars = Array.from({ length: count }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.4 + 0.2,
                a: Math.random() * 0.8 + 0.1,
                tw: (Math.random() * 0.02 + 0.003) * (Math.random() < 0.5 ? -1 : 1)
            }));
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            buildStars();
        }

        window.addEventListener('resize', resizeCanvas, { passive: true });
        resizeCanvas();

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const s of stars) {
                s.a += s.tw;
                if (s.a < 0.08 || s.a > 0.95) s.tw *= -1;
                ctx.globalAlpha = s.a;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }
        draw();
        console.log('星空效果初始化完成');
    }

    // ====== 音乐控制 ======
    function initMusicControl() {
        const playBtn = document.getElementById('playMusic');
        const bgm = document.getElementById('bgm');

        if (!playBtn || !bgm) return console.warn('音乐元素缺失');

        // 音量与静音检查
        bgm.volume = 0.7;
        bgm.muted = false;

        function updateButtonText(isPlaying) {
            playBtn.textContent = isPlaying ? '⏸ 暂停音乐' : '♪ 播放音乐';
        }

        // 初始化按钮状态
        updateButtonText(false);

        // 绑定点击事件
        playBtn.addEventListener('click', async () => {
            try {
                if (bgm.paused || bgm.ended) {
                    await bgm.play();
                    updateButtonText(true);
                    console.log('音乐开始播放');
                } else {
                    bgm.pause();
                    updateButtonText(false);
                    console.log('音乐暂停');
                }
            } catch (err) {
                console.error('音频播放错误:', err);
                alert('音乐播放失败，可能是浏览器限制或音频文件问题');
            }
        });

        // 音乐结束重置按钮
        bgm.addEventListener('ended', () => updateButtonText(false));

        console.log('音乐控制初始化完成');
    }

    // ====== 礼物按钮和卡片显示 ======
    function initGiftButton() {
        const giftBtn = document.getElementById('giftBtn');
        const messageCard = document.getElementById('messageCard');

        if (!giftBtn || !messageCard) return console.warn('礼物元素缺失');

        giftBtn.addEventListener('click', () => {
            messageCard.classList.remove('hidden');
            messageCard.style.opacity = '0';
            messageCard.style.transform = 'scale(0.8)';
            messageCard.style.transition = 'all 0.5s ease-out';

            setTimeout(() => {
                messageCard.style.opacity = '1';
                messageCard.style.transform = 'scale(1)';
                messageCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 50);

            // 启动烟花效果
            if (window.startFireworks && typeof window.startFireworks === 'function') {
                setTimeout(() => {
                    try { window.startFireworks(); }
                    catch(e) { console.warn('烟花效果启动失败:', e); }
                }, 200);
            }
        });

        console.log('礼物按钮初始化完成');
    }

    // ====== 漂浮爱心点击效果 ======
    function initFloatingHearts() {
        document.body.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName.toLowerCase() === 'button' || target.classList.contains('btn')) return;

            const x = e.pageX;
            const y = e.pageY;
            for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
                spawnHeart(x + (Math.random() * 24 - 12), y + (Math.random() * 18 - 9));
            }
        }, { passive: true });

        function spawnHeart(left, top) {
            const heart = document.createElement('div');
            heart.textContent = '❤';
            heart.style.cssText = `
                position: fixed;
                left: ${left}px;
                top: ${top}px;
                transform: translate(-50%, -50%);
                pointer-events: none;
                font-size: ${14 + Math.floor(Math.random() * 12)}px;
                color: #ff69b4;
                z-index: 9999;
                user-select: none;
            `;
            document.body.appendChild(heart);

            heart.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(-50%, -50%) translateY(-${120 + Math.random() * 90}px) scale(${1.1 + Math.random() * 0.8})`, opacity: 0 }
            ], {
                duration: 1400 + Math.random() * 900,
                easing: 'cubic-bezier(.22,.9,.35,1)'
            }).onfinish = () => heart.remove();
        }

        console.log('漂浮爱心效果初始化完成');
    }

    // ====== 主初始化函数 ======
    function init() {
        console.log('开始初始化所有功能...');
        initStarField();
        initMusicControl();
        initGiftButton();
        initFloatingHearts();
        console.log('所有功能初始化完成！');
    }

    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();